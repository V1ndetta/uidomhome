import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../../site-ui";
import { ApartmentsCatalog } from "../../apartments/apartments-catalog";

export const metadata: Metadata = {
  title: "ЖК Happy Land",
  description:
    "Завершённый жилой комплекс комфорт-класса Happy Land: 123 квартиры, 4 секции, шоссе Коргалжын, 128, Астана.",
  openGraph: {
    title: "ЖК Happy Land — UIDOMHOME",
    description: "Завершённый жилой комплекс комфорт-класса в районе Нура.",
    images: ["/happy-land-hero.webp"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/happy-land-hero.webp"],
  },
};

const features = [
  {
    number: "01",
    title: "Закрытый двор",
    text: "Защищённая территория, детская площадка и тёплое вечернее освещение.",
  },
  {
    number: "02",
    title: "Парковка",
    text: "20 придомовых парковочных мест и гостевые места по периметру комплекса.",
  },
  {
    number: "03",
    title: "Кладовые",
    text: "Дополнительные помещения для хранения предусмотрены на цокольном этаже.",
  },
  {
    number: "04",
    title: "Электронные замки",
    text: "В проекте предусмотрены электронные замки для удобного и современного доступа.",
  },
  {
    number: "05",
    title: "Тёплый контур",
    text: "Утолщённые кирпичные стены с утеплением и декоративной штукатуркой.",
  },
  {
    number: "06",
    title: "Светлые квартиры",
    text: "Окна 1,8 × 1,8 м, витражное остекление балконов и корзины для кондиционеров.",
  },
];

const gallery = [
  { src: "/happy-land-night.webp", label: "Вечерний вид" },
  { src: "/happy-land-yard.webp", label: "Двор и фасад" },
  { src: "/happy-land-lobby.webp", label: "Дизайнерский холл" },
];

const layouts = [
  {
    section: "Секция 1",
    meta: "1–2 комнаты · 39,64–57,87 м²",
    src: "/happy-land-section-1.webp",
  },
  {
    section: "Секция 2",
    meta: "1–2 комнаты · 34,31–68,65 м²",
    src: "/happy-land-section-2.webp",
  },
  {
    section: "Секция 3",
    meta: "1–2 комнаты · 36,31–59,35 м²",
    src: "/happy-land-section-3.webp",
  },
  {
    section: "Секция 4",
    meta: "1–3 комнаты · 36,31–86,96 м²",
    src: "/happy-land-section-4.webp",
  },
];

export default function HappyLand() {
  return (
    <>
      <SiteHeader />
      <section className="happyHero">
        <div>
          <p className="eyebrow">Завершённый проект · комфорт-класс</p>
          <h1>Happy Land</h1>
          <p>
            Камерный жилой комплекс в районе Нура — для спокойной городской
            жизни рядом со всем необходимым.
          </p>
          <div className="happyHeroActions">
            <a
              className="primary"
              href="https://2gis.kz/astana/geo/70030076746678769"
              target="_blank"
              rel="noreferrer"
            >
              Открыть в 2ГИС ↗
            </a>
            <span>шоссе Коргалжын, 128 · Астана</span>
          </div>
        </div>
        <figure>
          <img src="/happy-land-hero.webp" alt="Жилой комплекс Happy Land" />
          <figcaption>Архитектурная визуализация проекта</figcaption>
        </figure>
      </section>

      <section className="facts happyFacts">
        <div>
          <small>Класс</small>
          <b>Комфорт</b>
        </div>
        <div>
          <small>Квартиры</small>
          <b>123</b>
        </div>
        <div>
          <small>Секции</small>
          <b>4</b>
        </div>
        <div>
          <small>Статус</small>
          <b>Дом сдан</b>
        </div>
      </section>

      <section className="happyIntro">
        <div>
          <p className="eyebrow">О проекте</p>
          <h2>
            Малоэтажный дом,
            <br /> продуманный для жизни
          </h2>
        </div>
        <div>
          <p>
            Happy Land — реализованный проект UIDOMHOME из четырёх секций и
            пяти жилых этажей.
          </p>
          <p>
            В проекте предусмотрены квартиры площадью от 34,31 до 86,96 м² с
            потолками 2,7 м. Наружные стены выполнены из кирпича с утеплением,
            внутренние перегородки — из керамического кирпича толщиной 120 мм.
          </p>
        </div>
      </section>

      <section className="happyPlanFacts">
        <article>
          <strong>34,31–86,96 м²</strong>
          <span>диапазон площадей</span>
        </article>
        <article>
          <strong>2,7 м</strong>
          <span>высота потолков</span>
        </article>
        <article>
          <strong>5</strong>
          <span>жилых этажей</span>
        </article>
        <article>
          <strong>4</strong>
          <span>секции комплекса</span>
        </article>
      </section>

      <section className="happyLayouts">
        <div className="baqytSectionHead">
          <div>
            <p className="eyebrow">Планировки</p>
            <h2>Типовые этажи четырёх секций</h2>
          </div>
          <p>
            Нажмите на схему, чтобы открыть её в полном размере и рассмотреть
            площади и расположение комнат.
          </p>
        </div>
        <div className="happyLayoutGrid">
          {layouts.map((layout, index) => (
            <article key={layout.section}>
              <div className="happyLayoutTitle">
                <span>0{index + 1}</span>
                <div>
                  <h3>{layout.section}</h3>
                  <p>{layout.meta}</p>
                </div>
              </div>
              <a
                className="happyLayoutImage"
                href={layout.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`${layout.section}: открыть план в полном размере`}
              >
                <img
                  src={layout.src}
                  alt={`План типового этажа, ${layout.section}`}
                />
                <span>Увеличить план ↗</span>
              </a>
            </article>
          ))}
        </div>
        <p className="happyLayoutNote">
          Планировки приведены по проектным материалам и не отражают текущую
          доступность квартир.
        </p>
      </section>

      <ApartmentsCatalog project="happy-land" embedded />

      <section className="happyFeatures">
        <div className="baqytSectionHead">
          <div>
            <p className="eyebrow">Детали проекта</p>
            <h2>Комфорт каждый день</h2>
          </div>
          <p>
            Решения, которые помогают поддерживать порядок, безопасность и
            удобство внутри дома и во дворе.
          </p>
        </div>
        <div className="happyFeatureGrid">
          {features.map((feature) => (
            <article key={feature.number}>
              <span>{feature.number}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="happyGalleryReal">
        <div className="baqytSectionHead">
          <div>
            <p className="eyebrow">Архитектура</p>
            <h2>Облик Happy Land</h2>
          </div>
          <p>Визуализации из презентационных материалов проекта.</p>
        </div>
        <div className="happyGalleryGrid">
          <figure className="happyGalleryLead">
            <img
              src="/happy-land-facade.webp"
              alt="Фасад жилого комплекса Happy Land"
            />
            <figcaption>Фасад и благоустройство</figcaption>
          </figure>
          {gallery.map((item) => (
            <figure key={item.src}>
              <img src={item.src} alt={item.label} />
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="happyLocation">
        <div>
          <p className="eyebrow">Расположение</p>
          <h2>Район Нура, шоссе Коргалжын, 128</h2>
          <p>
            Рядом находятся школы и детские сады, магазины, парковые зоны,
            спортивная инфраструктура и городские маршруты.
          </p>
        </div>
        <div className="happyLocationCard">
          <small>UIDOMHOME</small>
          <b>Хотите узнать больше о завершённых проектах?</b>
          <a className="primary" href="tel:+77765114796">
            +7 776 511 4796
          </a>
          <a
            className="detailAction"
            href="https://2gis.kz/astana/geo/70030076746678769"
            target="_blank"
            rel="noreferrer"
          >
            Посмотреть адрес в 2ГИС <span>↗</span>
          </a>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
