"use client";

import { useState } from "react";

const projects = [
  {
    name: "BAQYT",
    district: "район Нура · улица Е 181",
    date: "Уточняется",
    count: 221,
    tone: "sand",
    image: "/baqyt-hero.webp",
    href: "/projects/baqyt",
    status: "Скоро",
  },
];

const past = [
  {
    year: "2024",
    name: "Happy Land",
    meta: "123 квартиры · 4 секции · дом сдан",
    href: "/projects/happy-land",
  },
];

export default function Home() {
  const [menu, setMenu] = useState(false);

  return (
    <main>
      <header>
        <a className="logo" href="/" aria-label="UIDOMHOME — на главную">
          <img className="brandLogo" src="/uidomhome-logo.webp" alt="UIDOMHOME — дом дизайна и ремонта" />
        </a>
        <a className="repairHeaderCta" href="/repair">Ремонт квартир <span>↗</span></a>
        <button className="menu" onClick={() => setMenu(!menu)}>{menu ? "×" : "☰"}</button>
        <nav className={menu ? "open" : ""}>
          <a href="/projects">Проекты</a>
          <a href="/projects/baqyt">BAQYT</a>
          <a href="/apartments">Квартиры</a>
          <a href="/about">О компании</a>
        </nav>
        <a className="phone" href="tel:+77765114796">+7 776 511 4796</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">UIDOMHOME · Астана</p>
          <h1>Пространство<br />для комфортной <em>жизни</em></h1>
          <p className="lead">Современные жилые комплексы с продуманной архитектурой, благоустройством и честными сроками.</p>
          <div className="actions"><a className="primary" href="/apartments">Выбрать квартиру ↗</a><a href="/projects">Смотреть проекты →</a></div>
          <div className="numbers"><div><b>12</b><span>лет опыта</span></div><div><b>18</b><span>домов сдано</span></div><div><b>2 400+</b><span>семей с нами</span></div></div>
        </div>
        <div className="heroShowcase" aria-label="Проекты UIDOMHOME">
          <a className="heroProjectMain" href="/projects/baqyt">
            <img src="/baqyt-hero.webp" alt="Концептуальная визуализация жилого комплекса BAQYT" />
            <span className="heroProjectTag">Новый проект</span>
            <div className="heroProjectCaption">
              <small>01 · Район Нура</small>
              <strong>BAQYT</strong>
              <span>221 квартира · 5 блоков ↗</span>
            </div>
          </a>
          <a className="heroProjectMini" href="/projects/happy-land">
            <img src="/happy-land-night.webp" alt="Жилой комплекс Happy Land в вечернем освещении" />
            <div>
              <small>Дом сдан</small>
              <strong>Happy Land</strong>
              <span>123 квартиры ↗</span>
            </div>
          </a>
          <span className="heroShowcaseNote">Два проекта · Астана</span>
        </div>
      </section>

      <section className="section" id="projects">
        <Title over="Проекты UIDOMHOME" title="Новые проекты" text="Выберите дом, который подходит вашему ритму жизни." />
        <div className="projects soloProjects">
          {projects.map((project, index) => (
            <article className={project.tone} key={project.name}>
              <div className={`visual ${project.image ? "hasImage" : ""}`} style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}><span>0{index + 1}</span><div /></div>
              <div className="info"><small>{project.status}</small><h3>{project.name}</h3><p>{project.district}</p><dl><div><dt>Старт</dt><dd>{project.date}</dd></div><div><dt>В проекте</dt><dd>{project.count} квартир</dd></div></dl><a className="detailAction" href={project.href}>О проекте <span>↗</span></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="flats homeCatalogPromo" id="flats">
        <Title over="BAQYT · Happy Land" title="Каталог квартир" text="Карточки вариантов по двум проектам — с местом для будущих изображений планировок." />
        <div className="homeProjectGrid">
          <a className="homeProjectCard baqyt" href="/projects/baqyt#apartments"><span>01</span><div><small>Новый проект</small><h3>BAQYT</h3><p>1–4 комнаты · 31,99–119,74 м²</p></div><b>Смотреть карточки ↗</b></a>
          <a className="homeProjectCard happy-land" href="/projects/happy-land#apartments"><span>02</span><div><small>Дом сдан</small><h3>Happy Land</h3><p>1–3 комнаты · 34,31–86,96 м²</p></div><b>Смотреть карточки ↗</b></a>
        </div>
        <a className="homeCatalogAll" href="/apartments">Открыть общий каталог →</a>
      </section>

      <section className="section" id="completed">
        <Title over="Наша история" title="Реализованные проекты" text="Дома, которые уже стали частью города." />
        <div className="past">{past.map((project, index) => <a href={project.href} key={project.name}><article><span>{project.year}</span><div className={`pastImage p${index}`}>U</div><h3>{project.name}</h3><p>{project.meta}</p><i>↗</i></article></a>)}</div>
      </section>

      <section className="about" id="about"><p className="eyebrow">UIDOMHOME</p><h2>Создаём дома,<br />которые <em>становятся частью города</em></h2><p>От идеи и архитектуры до ключей.</p><a className="primary" href="tel:+77765114796">Связаться с нами ↗</a></section>

      <footer>
        <a className="logo" href="/" aria-label="UIDOMHOME — на главную"><img className="brandLogo" src="/uidomhome-logo.webp" alt="UIDOMHOME — дом дизайна и ремонта" /></a>
        <div className="footerContact"><a href="tel:+77765114796">+7 776 511 4796</a><span>Астана, Казахстан</span></div>
        <div className="socials"><a href="https://www.instagram.com/uidomhome/" target="_blank" rel="noreferrer">Instagram компании ↗</a><a href="https://www.instagram.com/ali_ermagambetov/" target="_blank" rel="noreferrer">Алибек Ермагамбетов ↗</a></div>
        <p>© 2026 UIDOMHOME</p>
      </footer>
    </main>
  );
}

function Title({ over, title, text }: { over: string; title: string; text: string }) {
  return <div className="sectionHead"><div><p className="eyebrow">{over}</p><h2>{title}</h2></div><p>{text}</p></div>;
}
