import type { Metadata } from "next";
import { RepairCrmSection } from "../crm-lead-form";

export const metadata: Metadata = {
  title: "Ремонт квартир",
  description:
    "Ремонт UIDOMHOME в Астане: под ключ, капитальный ремонт и коммерческие помещения.",
};

const services = [
  {
    number: "01",
    title: "Под ключ",
    text: "Берём на себя весь цикл — от первого замера и сметы до готового интерьера.",
  },
  {
    number: "02",
    title: "Капитальный",
    text: "Комплексно обновим инженерные решения, поверхности и внутреннюю отделку.",
  },
  {
    number: "03",
    title: "Коммерческие помещения",
    text: "Создаём функциональные интерьеры для офисов, магазинов и других коммерческих пространств.",
  },
];

const steps = [
  ["01", "Знакомство", "Обсуждаем квартиру, задачи, стиль и желаемый результат."],
  ["02", "Замер и смета", "Фиксируем объём работ и формируем понятную основу проекта."],
  ["03", "Ремонт", "Организуем работы по согласованной последовательности этапов."],
  ["04", "Готовый дом", "Проверяем детали и передаём пространство владельцу."],
];

export default function RepairPage() {
  return (
    <main className="repairPage">
      <header className="repairNav">
        <a className="repairLogo" href="/repair" aria-label="UIDOMHOME ремонт — на главную раздела">
          <img
            src="/uidomhome-logo.webp"
            alt="UIDOMHOME — дом дизайна и ремонта"
          />
        </a>
        <a className="repairBack" href="/">
          Недвижимость <span>↗</span>
        </a>
        <nav>
          <a href="#services">Услуги</a>
          <a href="#process">Как работаем</a>
          <a href="#contact">Контакты</a>
        </nav>
      </header>

      <section className="repairHero">
        <div className="repairHeroCopy">
          <p className="repairOverline">UIDOMHOME · Астана</p>
          <h1 className="repairHeroTitleLong">
            Ремонт
            <br />
            <em>профессионально</em>
            <br />
            в срок
          </h1>
          <p className="repairLead">
            Превращаем квартиру в цельное пространство — с понятной логикой,
            вниманием к деталям и одним ответственным процессом.
          </p>
          <div className="repairHeroActions">
            <a className="repairPrimary" href="tel:+77765114796">
              Обсудить ремонт <span>↗</span>
            </a>
            <a className="repairTextLink" href="#process">
              Посмотреть этапы ↓
            </a>
          </div>
          <div className="repairScope">
            <span>замер</span>
            <i />
            <span>смета</span>
            <i />
            <span>ремонт</span>
            <i />
            <span>готовый интерьер</span>
          </div>
        </div>

        <figure className="repairHeroVisual">
          <img
            src="/repair-hero.webp"
            alt="Современный интерьер квартиры в тёплых натуральных оттенках"
          />
          <figcaption>
            <span>пространство</span>
            <strong>для вашей жизни</strong>
          </figcaption>
        </figure>
      </section>

      <section className="repairServices" id="services">
        <div className="repairSectionHead">
          <p className="repairOverline">Что делаем</p>
          <h2>От частных интерьеров до крупных коммерческих проектов.</h2>
        </div>
        <div className="repairServiceGrid">
          {services.map((service) => (
            <article key={service.number}>
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href="tel:+77765114796" aria-label={`Узнать подробнее: ${service.title}`}>
                Узнать подробнее ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="repairStatement">
        <p className="repairOverline">Наш принцип</p>
        <blockquote>
          Ремонт, который сочетает эстетику, функциональность и <em>комфорт.</em>
        </blockquote>
        <p>
          Сначала понимаем, как вы живёте. Затем выстраиваем пространство,
          материалы и работы вокруг этой логики.
        </p>
      </section>

      <section className="repairProcess" id="process">
        <div className="repairSectionHead">
          <p className="repairOverline">Процесс</p>
          <h2>Четыре понятных этапа вместо бесконечного ремонта.</h2>
        </div>
        <div className="repairSteps">
          {steps.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="repairContact" id="contact">
        <div>
          <p className="repairOverline">Начнём с разговора</p>
          <h2>Расскажите, какую квартиру хотите получить.</h2>
        </div>
        <div className="repairContactAside">
          <p>
            Позвоните нам — уточним исходные данные и подскажем, с чего начать
            подготовку ремонта.
          </p>
          <a className="repairPrimary light" href="tel:+77765114796">
            +7 776 511 4796 <span>↗</span>
          </a>
        </div>
      </section>

      <RepairCrmSection />

      <footer className="repairFooter">
        <a className="repairBrand" href="/repair">
          <strong>UIDOMHOME</strong>
          <span>ремонт квартир</span>
        </a>
        <p>Астана, Казахстан</p>
        <a href="/">Вернуться к недвижимости ↗</a>
      </footer>
    </main>
  );
}
