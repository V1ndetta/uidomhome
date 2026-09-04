"use client";

import { FormEvent, useEffect, useState } from "react";

type LeadKind = "apartment" | "repair";

export type ApartmentLeadOffer = {
  projectLabel: string;
  title: string;
  rooms: number[];
  area: string;
  floor: string;
  building: string;
};

function trackingData() {
  if (typeof window === "undefined") return {};
  const query = new URLSearchParams(window.location.search);
  return {
    page: window.location.href,
    utmSource: query.get("utm_source") || "",
    utmMedium: query.get("utm_medium") || "",
    utmCampaign: query.get("utm_campaign") || "",
    utmContent: query.get("utm_content") || "",
    utmTerm: query.get("utm_term") || "",
  };
}

export function useCrmEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/crm/status", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { enabled?: boolean }) => {
        if (active) setEnabled(Boolean(data.enabled));
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  return enabled;
}

export function CrmLeadForm({
  kind,
  offer,
  onSuccess,
}: {
  kind: LeadKind;
  offer?: ApartmentLeadOffer;
  onSuccess?: () => void;
}) {
  const [startedAt] = useState(() => Date.now());
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/crm/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          ...trackingData(),
          kind,
          startedAt,
          complex: offer?.projectLabel,
          rooms: offer?.rooms.length === 1 ? String(offer.rooms[0]) : "",
          offerTitle: offer?.title,
          offerDetails: offer
            ? `${offer.building}; ${offer.area}; ${offer.floor}`
            : "",
        }),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "Ошибка отправки");

      setState("success");
      form.reset();
      onSuccess?.();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Не удалось отправить заявку");
    }
  }

  if (state === "success") {
    return (
      <div className="crmSuccess" role="status">
        <strong>Заявка отправлена</strong>
        <p>Менеджер UIDOMHOME свяжется с вами в рабочее время.</p>
      </div>
    );
  }

  return (
    <form className={`crmForm ${kind}`} onSubmit={submit}>
      <div className="crmFormHead">
        <p>{kind === "repair" ? "Заявка на ремонт" : "Консультация по квартире"}</p>
        <h3>
          {kind === "repair"
            ? "Расскажите о вашем объекте"
            : offer?.projectLabel || "UIDOMHOME"}
        </h3>
        {offer && <span>{offer.title}</span>}
      </div>

      <div className="crmFields">
        <label>
          <span>Ваше имя</span>
          <input name="name" autoComplete="name" maxLength={100} required />
        </label>
        <label>
          <span>Телефон</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+7 700 000 00 00"
            maxLength={40}
            required
          />
        </label>

        {kind === "apartment" ? (
          <label>
            <span>Способ оплаты</span>
            <select name="payment" defaultValue="">
              <option value="">Пока не решил(а)</option>
              <option>Полная оплата</option>
              <option>Ипотека</option>
              <option>Рассрочка</option>
            </select>
          </label>
        ) : (
          <>
            <label>
              <span>Тип объекта</span>
              <select name="objectType" defaultValue="Квартира">
                <option>Квартира</option>
                <option>Частный дом</option>
                <option>Коммерческое помещение</option>
              </select>
            </label>
            <label>
              <span>Вид ремонта</span>
              <select name="repairType" defaultValue="Ремонт под ключ">
                <option>Черновая отделка</option>
                <option>Косметический ремонт</option>
                <option>Капитальный ремонт</option>
                <option>Дизайнерский ремонт</option>
                <option>Ремонт под ключ</option>
                <option>Отдельные работы</option>
              </select>
            </label>
            <label className="wide">
              <span>Адрес объекта</span>
              <input name="address" maxLength={300} />
            </label>
            <label>
              <span>Бюджет, ₸</span>
              <input name="budget" type="number" min="0" step="10000" inputMode="numeric" />
            </label>
            <label>
              <span>Когда хотите начать</span>
              <input name="desiredDate" type="date" />
            </label>
          </>
        )}

        <label className="wide">
          <span>Комментарий</span>
          <textarea name="message" rows={3} maxLength={1000} />
        </label>
      </div>

      <label className="crmConsent">
        <input type="checkbox" required />
        <span>Согласен(на) на обработку данных для обратной связи</span>
      </label>
      <label className="crmHoney" aria-hidden="true">
        Компания
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <button className="crmSubmit" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Отправляем…" : "Отправить заявку"}
      </button>
      {state === "error" && (
        <p className="crmError" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}

export function RepairCrmSection() {
  const enabled = useCrmEnabled();
  if (!enabled) return null;

  return (
    <section className="repairCrmSection" id="request">
      <CrmLeadForm kind="repair" />
    </section>
  );
}
