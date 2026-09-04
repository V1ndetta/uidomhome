"use client";

import { useMemo, useState } from "react";
import {
  ApartmentLeadOffer,
  CrmLeadForm,
  useCrmEnabled,
} from "../crm-lead-form";

type ProjectKey = "baqyt" | "happy-land";
type ProjectFilter = ProjectKey | "all";
type SortKey =
  | "project"
  | "price-asc"
  | "price-desc"
  | "area-asc"
  | "area-desc"
  | "floor-asc"
  | "floor-desc";

type ApartmentOffer = {
  id: string;
  project: ProjectKey;
  projectLabel: string;
  rooms: number[];
  title: string;
  area: string;
  minArea: number;
  maxArea: number;
  floor: string;
  minFloor: number;
  maxFloor: number;
  building: string;
  price: string;
  priceValue: number | null;
  status: string;
};

const offers: ApartmentOffer[] = [
  {
    id: "BQ-01",
    project: "baqyt",
    projectLabel: "BAQYT",
    rooms: [1],
    title: "1-комнатные квартиры",
    area: "31,99–46,19 м²",
    minArea: 31.99,
    maxArea: 46.19,
    floor: "1–9 этаж",
    minFloor: 1,
    maxFloor: 9,
    building: "5 жилых блоков",
    price: "от 19,2 млн ₸",
    priceValue: 19.2,
    status: "Предварительно",
  },
  {
    id: "BQ-02",
    project: "baqyt",
    projectLabel: "BAQYT",
    rooms: [2],
    title: "2-комнатные квартиры",
    area: "39,08–73,25 м²",
    minArea: 39.08,
    maxArea: 73.25,
    floor: "1–9 этаж",
    minFloor: 1,
    maxFloor: 9,
    building: "5 жилых блоков",
    price: "от 20,4 млн ₸",
    priceValue: 20.4,
    status: "Предварительно",
  },
  {
    id: "BQ-03",
    project: "baqyt",
    projectLabel: "BAQYT",
    rooms: [3],
    title: "3-комнатные квартиры",
    area: "63,10–87,09 м²",
    minArea: 63.1,
    maxArea: 87.09,
    floor: "1–9 этаж",
    minFloor: 1,
    maxFloor: 9,
    building: "5 жилых блоков",
    price: "от 28,4 млн ₸",
    priceValue: 28.4,
    status: "Предварительно",
  },
  {
    id: "BQ-04",
    project: "baqyt",
    projectLabel: "BAQYT",
    rooms: [4],
    title: "4-комнатные квартиры",
    area: "119,74 м²",
    minArea: 119.74,
    maxArea: 119.74,
    floor: "1–9 этаж",
    minFloor: 1,
    maxFloor: 9,
    building: "5 жилых блоков",
    price: "от 47,5 млн ₸",
    priceValue: 47.5,
    status: "Предварительно",
  },
  {
    id: "HL-01",
    project: "happy-land",
    projectLabel: "Happy Land",
    rooms: [1, 2],
    title: "Квартиры на 1–2 комнаты",
    area: "39,64–57,87 м²",
    minArea: 39.64,
    maxArea: 57.87,
    floor: "1–5 этаж",
    minFloor: 1,
    maxFloor: 5,
    building: "Секция 1",
    price: "по запросу",
    priceValue: null,
    status: "Дом сдан",
  },
  {
    id: "HL-02",
    project: "happy-land",
    projectLabel: "Happy Land",
    rooms: [1, 2],
    title: "Квартиры на 1–2 комнаты",
    area: "34,31–68,65 м²",
    minArea: 34.31,
    maxArea: 68.65,
    floor: "1–5 этаж",
    minFloor: 1,
    maxFloor: 5,
    building: "Секция 2",
    price: "по запросу",
    priceValue: null,
    status: "Дом сдан",
  },
  {
    id: "HL-03",
    project: "happy-land",
    projectLabel: "Happy Land",
    rooms: [1, 2],
    title: "Квартиры на 1–2 комнаты",
    area: "36,31–59,35 м²",
    minArea: 36.31,
    maxArea: 59.35,
    floor: "1–5 этаж",
    minFloor: 1,
    maxFloor: 5,
    building: "Секция 3",
    price: "по запросу",
    priceValue: null,
    status: "Дом сдан",
  },
  {
    id: "HL-04",
    project: "happy-land",
    projectLabel: "Happy Land",
    rooms: [1, 2, 3],
    title: "Квартиры на 1–3 комнаты",
    area: "36,31–86,96 м²",
    minArea: 36.31,
    maxArea: 86.96,
    floor: "1–5 этаж",
    minFloor: 1,
    maxFloor: 5,
    building: "Секция 4",
    price: "по запросу",
    priceValue: null,
    status: "Дом сдан",
  },
];

const projectNames: Record<ProjectKey, string> = {
  baqyt: "BAQYT",
  "happy-land": "Happy Land",
};

function parseFilterNumber(value: string) {
  const parsed = Number(value.replace(",", "."));
  return value.trim() !== "" && Number.isFinite(parsed) ? parsed : null;
}

export function ApartmentsCatalog({
  project,
  embedded = false,
}: {
  project?: ProjectKey;
  embedded?: boolean;
}) {
  const [activeProject, setActiveProject] = useState<ProjectFilter>(
    project ?? "all",
  );
  const [room, setRoom] = useState(0);
  const [sort, setSort] = useState<SortKey>("project");
  const [areaFrom, setAreaFrom] = useState("");
  const [areaTo, setAreaTo] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [floorFrom, setFloorFrom] = useState("");
  const [floorTo, setFloorTo] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<ApartmentOffer | null>(null);
  const crmEnabled = useCrmEnabled();

  const visibleOffers = useMemo(() => {
    const selectedProject = project ?? activeProject;
    const areaFromValue = parseFilterNumber(areaFrom);
    const areaToValue = parseFilterNumber(areaTo);
    const priceFromValue = parseFilterNumber(priceFrom);
    const priceToValue = parseFilterNumber(priceTo);
    const floorFromValue = parseFilterNumber(floorFrom);
    const floorToValue = parseFilterNumber(floorTo);
    const priceFilterActive = priceFromValue !== null || priceToValue !== null;

    return offers
      .filter((offer) => {
        const matchesPrice =
          !priceFilterActive ||
          (offer.priceValue !== null &&
            (priceFromValue === null || offer.priceValue >= priceFromValue) &&
            (priceToValue === null || offer.priceValue <= priceToValue));

        return (
          (selectedProject === "all" || offer.project === selectedProject) &&
          (room === 0 || offer.rooms.includes(room)) &&
          (areaFromValue === null || offer.maxArea >= areaFromValue) &&
          (areaToValue === null || offer.minArea <= areaToValue) &&
          matchesPrice &&
          (floorFromValue === null || offer.maxFloor >= floorFromValue) &&
          (floorToValue === null || offer.minFloor <= floorToValue)
        );
      })
      .sort((a, b) => {
        if (sort === "price-asc" || sort === "price-desc") {
          if (a.priceValue === null && b.priceValue === null) return 0;
          if (a.priceValue === null) return 1;
          if (b.priceValue === null) return -1;
          return sort === "price-desc"
            ? b.priceValue - a.priceValue
            : a.priceValue - b.priceValue;
        }
        if (sort === "area-asc") return a.minArea - b.minArea;
        if (sort === "area-desc") return b.minArea - a.minArea;
        if (sort === "floor-asc") return a.minFloor - b.minFloor;
        if (sort === "floor-desc") return b.minFloor - a.minFloor;
        return a.project.localeCompare(b.project) || a.id.localeCompare(b.id);
      });
  }, [
    activeProject,
    areaFrom,
    areaTo,
    floorFrom,
    floorTo,
    priceFrom,
    priceTo,
    project,
    room,
    sort,
  ]);

  function resetFilters() {
    setActiveProject(project ?? "all");
    setRoom(0);
    setAreaFrom("");
    setAreaTo("");
    setPriceFrom("");
    setPriceTo("");
    setFloorFrom("");
    setFloorTo("");
    setSort("project");
  }

  const sectionTitle = project
    ? `Квартиры ${projectNames[project]}`
    : "Карточки квартир";

  return (
    <section
      className={`apartmentCatalogSection ${embedded ? "embedded" : ""}`}
      id="apartments"
    >
      <div className="apartmentCatalogHead">
        <div>
          <p className="eyebrow">Каталог UIDOMHOME</p>
          <h2>{sectionTitle}</h2>
        </div>
        <p>
          Подготовили карточки по имеющимся проектным данным. Изображения
          планировок добавим в пустые блоки после получения файлов.
        </p>
      </div>

      <div className="catalogToolbar" aria-label="Фильтры квартир">
        {!project && (
          <div className="catalogFilterGroup projectFilter">
            <span>Жилой комплекс</span>
            <div>
              {[
                ["all", "Все"],
                ["baqyt", "BAQYT"],
                ["happy-land", "Happy Land"],
              ].map(([value, label]) => (
                <button
                  type="button"
                  className={activeProject === value ? "active" : ""}
                  aria-pressed={activeProject === value}
                  onClick={() => setActiveProject(value as ProjectFilter)}
                  key={value}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="catalogFilterGroup roomFilter">
          <span>Комнатность</span>
          <div>
            {[0, 1, 2, 3, 4].map((value) => (
              <button
                type="button"
                className={room === value ? "active" : ""}
                aria-pressed={room === value}
                onClick={() => setRoom(value)}
                key={value}
              >
                {value === 0 ? "Все" : value}
              </button>
            ))}
          </div>
        </div>

        <div className="catalogRange">
          <span>Площадь, м²</span>
          <div>
            <input
              type="number"
              min="0"
              step="0.1"
              inputMode="decimal"
              placeholder="от"
              aria-label="Площадь от"
              value={areaFrom}
              onChange={(event) => setAreaFrom(event.target.value)}
            />
            <i>—</i>
            <input
              type="number"
              min="0"
              step="0.1"
              inputMode="decimal"
              placeholder="до"
              aria-label="Площадь до"
              value={areaTo}
              onChange={(event) => setAreaTo(event.target.value)}
            />
          </div>
        </div>

        <div className="catalogRange">
          <span>Цена, млн ₸</span>
          <div>
            <input
              type="number"
              min="0"
              step="0.1"
              inputMode="decimal"
              placeholder="от"
              aria-label="Цена от"
              value={priceFrom}
              onChange={(event) => setPriceFrom(event.target.value)}
            />
            <i>—</i>
            <input
              type="number"
              min="0"
              step="0.1"
              inputMode="decimal"
              placeholder="до"
              aria-label="Цена до"
              value={priceTo}
              onChange={(event) => setPriceTo(event.target.value)}
            />
          </div>
        </div>

        <div className="catalogRange">
          <span>Этаж</span>
          <div>
            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              placeholder="от"
              aria-label="Этаж от"
              value={floorFrom}
              onChange={(event) => setFloorFrom(event.target.value)}
            />
            <i>—</i>
            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              placeholder="до"
              aria-label="Этаж до"
              value={floorTo}
              onChange={(event) => setFloorTo(event.target.value)}
            />
          </div>
        </div>

        <label className="catalogSort">
          <span>Сортировка</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
          >
            <option value="project">По проекту</option>
            <option value="price-asc">Цена: сначала дешевле</option>
            <option value="price-desc">Цена: сначала дороже</option>
            <option value="area-asc">Площадь: по возрастанию</option>
            <option value="area-desc">Площадь: по убыванию</option>
            <option value="floor-asc">Этаж: по возрастанию</option>
            <option value="floor-desc">Этаж: по убыванию</option>
          </select>
        </label>

        <div className="catalogResult">
          <small>Показано</small>
          <strong>{visibleOffers.length}</strong>
        </div>

        <button className="catalogReset" type="button" onClick={resetFilters}>
          Сбросить
        </button>
      </div>

      <div className="listingGrid">
        {visibleOffers.map((offer, index) => (
          <article className={`listingCard ${offer.project}`} key={offer.id}>
            <div className="listingPlanPlaceholder">
              <span className="listingStatus">{offer.status}</span>
              <span className="listingProject">{offer.projectLabel}</span>
              <div className="planSlotCopy">
                <strong>Планировка</strong>
                <small>место подготовлено</small>
              </div>
              <span className="listingIndex">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="listingBody">
              <p>{offer.building}</p>
              <h3>{offer.title}</h3>
              <dl className="listingSpecs">
                <div>
                  <dt>Площадь</dt>
                  <dd>{offer.area}</dd>
                </div>
                <div>
                  <dt>Этажность</dt>
                  <dd>{offer.floor}</dd>
                </div>
              </dl>
              <div className="listingBottom">
                <div>
                  <small>Стоимость</small>
                  <strong>{offer.price}</strong>
                </div>
                {crmEnabled ? (
                  <button
                    className="detailAction"
                    type="button"
                    onClick={() => setSelectedOffer(offer)}
                    aria-label={`Оставить заявку: ${offer.title}`}
                  >
                    Оставить заявку <span>↗</span>
                  </button>
                ) : (
                  <a className="detailAction" href="tel:+77765114796" aria-label={`Уточнить детали: ${offer.title}`}>
                    Подробнее <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {visibleOffers.length === 0 && (
        <div className="catalogEmpty">
          <strong>Таких вариантов пока нет</strong>
          <button type="button" onClick={resetFilters}>
            Показать все
          </button>
        </div>
      )}

      <p className="catalogDisclaimer">
        Точный номер квартиры, этаж, стоимость и статус наличия подтверждаются
        менеджером. Карточки будут дополнены по мере получения актуального
        квартирного фонда и изображений планировок.
      </p>

      {selectedOffer && (
        <div className="crmOverlay" role="dialog" aria-modal="true" aria-label="Заявка по квартире">
          <div className="crmModal">
            <button
              className="crmClose"
              type="button"
              onClick={() => setSelectedOffer(null)}
              aria-label="Закрыть форму"
            >
              ×
            </button>
            <CrmLeadForm
              kind="apartment"
              offer={selectedOffer as ApartmentLeadOffer}
            />
          </div>
        </div>
      )}
    </section>
  );
}
