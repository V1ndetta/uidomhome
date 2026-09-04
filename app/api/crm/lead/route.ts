export const dynamic = "force-dynamic";

type LeadKind = "apartment" | "repair";

type LeadPayload = {
  kind?: LeadKind;
  name?: string;
  phone?: string;
  page?: string;
  complex?: string;
  rooms?: string;
  payment?: string;
  objectType?: string;
  repairType?: string;
  address?: string;
  budget?: string;
  desiredDate?: string;
  message?: string;
  offerTitle?: string;
  offerDetails?: string;
  company?: string;
  startedAt?: number;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
};

type BitrixUserField = {
  FIELD_NAME?: string;
  EDIT_FORM_LABEL?: string;
  LIST?: Array<{ ID?: string | number; VALUE?: string }>;
};

function clean(value: unknown, maxLength = 240) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function webhookBase() {
  const raw = process.env.BITRIX24_WEBHOOK_URL?.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    return `${url.toString().replace(/\/+$/, "")}/`;
  } catch {
    return null;
  }
}

async function callBitrix<T>(
  base: string,
  method: string,
  params: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(`${base}${method}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const body = (await response.json()) as {
    result?: T;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || body.error || body.result === undefined) {
    throw new Error(body.error_description || body.error || "Bitrix24 request failed");
  }

  return body.result;
}

function fieldLabel(field: BitrixUserField) {
  return clean(field.EDIT_FORM_LABEL).toLocaleLowerCase("ru");
}

function setCustomField(
  target: Record<string, unknown>,
  fields: BitrixUserField[],
  label: string,
  value: string,
) {
  if (!value) return;
  const field = fields.find(
    (item) => fieldLabel(item) === label.toLocaleLowerCase("ru"),
  );
  if (!field?.FIELD_NAME) return;

  const enumValue = field.LIST?.find(
    (item) => clean(item.VALUE).toLocaleLowerCase("ru") === value.toLocaleLowerCase("ru"),
  );
  target[field.FIELD_NAME] = enumValue?.ID ?? value;
}

async function contactId(base: string, name: string, phone: string) {
  const duplicates = await callBitrix<Record<string, Array<string | number>>>(
    base,
    "crm.duplicate.findbycomm",
    { entity_type: "CONTACT", type: "PHONE", values: [phone] },
  );
  const existing = duplicates.CONTACT?.[0];
  if (existing) return Number(existing);

  return Number(
    await callBitrix<string | number>(base, "crm.contact.add", {
      fields: {
        NAME: name,
        PHONE: [{ VALUE: phone, VALUE_TYPE: "MOBILE" }],
        SOURCE_ID: "WEB",
        SOURCE_DESCRIPTION: "Форма на сайте UIDOMHOME",
      },
      params: { REGISTER_SONET_EVENT: "N" },
    }),
  );
}

async function categoryId(base: string, wantedName: string) {
  const result = await callBitrix<{
    categories?: Array<{ id?: number; name?: string }>;
  }>(base, "crm.category.list", { entityTypeId: 2 });

  const category = result.categories?.find(
    (item) => clean(item.name).toLocaleLowerCase("ru") === wantedName.toLocaleLowerCase("ru"),
  );
  return category?.id;
}

function commentLines(payload: Required<Pick<LeadPayload, "kind">> & LeadPayload) {
  const pairs =
    payload.kind === "apartment"
      ? [
          ["Жилой комплекс", payload.complex],
          ["Вариант", payload.offerTitle],
          ["Параметры", payload.offerDetails],
          ["Комнат", payload.rooms],
          ["Способ оплаты", payload.payment],
        ]
      : [
          ["Тип объекта", payload.objectType],
          ["Вид ремонта", payload.repairType],
          ["Адрес", payload.address],
          ["Бюджет", payload.budget ? `${payload.budget} ₸` : ""],
          ["Желаемая дата начала", payload.desiredDate],
        ];

  return [
    ...pairs,
    ["Комментарий", payload.message],
    ["Страница", payload.page],
  ]
    .filter(([, value]) => clean(value))
    .map(([label, value]) => `[B]${label}:[/B] ${clean(value, 1000)}`)
    .join("\n");
}

export async function POST(request: Request) {
  const base = webhookBase();
  if (!base) {
    return Response.json(
      { ok: false, message: "CRM ещё не подключена" },
      { status: 503 },
    );
  }

  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return Response.json({ ok: false }, { status: 403 });
  }

  let raw: LeadPayload;
  try {
    raw = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ ok: false, message: "Некорректные данные" }, { status: 400 });
  }

  if (clean(raw.company)) {
    return Response.json({ ok: true });
  }

  const kind: LeadKind = raw.kind === "repair" ? "repair" : "apartment";
  const name = clean(raw.name, 100);
  const phone = clean(raw.phone, 40);
  const phoneDigits = phone.replace(/\D/g, "");
  const startedAt = Number(raw.startedAt || 0);

  if (!name || phoneDigits.length < 10 || !startedAt || Date.now() - startedAt < 900) {
    return Response.json(
      { ok: false, message: "Проверьте имя и номер телефона" },
      { status: 400 },
    );
  }

  const payload: Required<Pick<LeadPayload, "kind">> & LeadPayload = {
    kind,
    name,
    phone,
    page: clean(raw.page, 500),
    complex: clean(raw.complex, 100),
    rooms: clean(raw.rooms, 20),
    payment: clean(raw.payment, 100),
    objectType: clean(raw.objectType, 100),
    repairType: clean(raw.repairType, 100),
    address: clean(raw.address, 300),
    budget: clean(raw.budget, 40),
    desiredDate: clean(raw.desiredDate, 30),
    message: clean(raw.message, 1000),
    offerTitle: clean(raw.offerTitle, 200),
    offerDetails: clean(raw.offerDetails, 300),
    utmSource: clean(raw.utmSource, 100),
    utmMedium: clean(raw.utmMedium, 100),
    utmCampaign: clean(raw.utmCampaign, 100),
    utmContent: clean(raw.utmContent, 100),
    utmTerm: clean(raw.utmTerm, 100),
  };

  try {
    const [contact, userFields, category] = await Promise.all([
      contactId(base, name, phone),
      callBitrix<BitrixUserField[]>(base, "crm.deal.userfield.list", {
        order: { SORT: "ASC" },
        filter: {},
      }),
      categoryId(base, kind === "repair" ? "Ремонт" : "Продажа квартир"),
    ]);

    const dealFields: Record<string, unknown> = {
      TITLE:
        kind === "repair"
          ? `Заявка с сайта — ремонт — ${name}`
          : `Заявка с сайта — ${payload.complex || "квартира"} — ${name}`,
      CONTACT_IDS: [contact],
      SOURCE_ID: "WEB",
      SOURCE_DESCRIPTION: "Форма на сайте UIDOMHOME",
      COMMENTS: commentLines(payload),
      OPENED: "Y",
      UTM_SOURCE: payload.utmSource,
      UTM_MEDIUM: payload.utmMedium,
      UTM_CAMPAIGN: payload.utmCampaign,
      UTM_CONTENT: payload.utmContent,
      UTM_TERM: payload.utmTerm,
    };

    if (category !== undefined) dealFields.CATEGORY_ID = category;

    if (kind === "apartment") {
      setCustomField(dealFields, userFields, "Жилой комплекс", payload.complex || "");
      setCustomField(dealFields, userFields, "Количество комнат", payload.rooms || "");
      setCustomField(dealFields, userFields, "Способ оплаты", payload.payment || "");
    } else {
      setCustomField(dealFields, userFields, "Тип объекта", payload.objectType || "");
      setCustomField(dealFields, userFields, "Вид ремонта", payload.repairType || "");
      setCustomField(dealFields, userFields, "Адрес объекта", payload.address || "");
      setCustomField(dealFields, userFields, "Бюджет клиента, ₸", payload.budget || "");
      setCustomField(dealFields, userFields, "Желаемая дата начала", payload.desiredDate || "");
    }
    setCustomField(dealFields, userFields, "Страница заявки", payload.page || "");

    const dealId = await callBitrix<string | number>(base, "crm.deal.add", {
      fields: dealFields,
      params: { REGISTER_SONET_EVENT: "N" },
    });

    return Response.json({ ok: true, dealId: Number(dealId) });
  } catch (error) {
    console.error("Bitrix24 lead submission failed", error);
    return Response.json(
      {
        ok: false,
        message: "Не удалось отправить заявку. Позвоните нам: +7 776 511 4796",
      },
      { status: 502 },
    );
  }
}
