import type {Metadata} from "next";
import {SiteFooter,SiteHeader} from "../../site-ui";
import {ApartmentsCatalog} from "../../apartments/apartments-catalog";

export const metadata:Metadata={
  title:"ЖК BAQYT",
  description:"BAQYT от UIDOMHOME в районе Нура: 5 блоков, 221 квартира, двор на крыше паркинга и планировки от 31,99 до 119,74 м².",
  openGraph:{
    title:"ЖК BAQYT — UIDOMHOME",
    description:"Пять 9-этажных блоков, 221 квартира и благоустроенный двор в районе Нура.",
    images:["/baqyt-hero.webp"]
  },
  twitter:{
    card:"summary_large_image",
    title:"ЖК BAQYT — UIDOMHOME",
    description:"Новый жилой проект UIDOMHOME в районе Нура.",
    images:["/baqyt-hero.webp"]
  }
};

const blocks=[
  {name:"Блок 1",apartments:53,note:"Отдельная планировочная схема"},
  {name:"Блок 2",apartments:40,note:"Единая типология с блоком 4"},
  {name:"Блок 3",apartments:33,note:"Отдельная планировочная схема"},
  {name:"Блок 4",apartments:40,note:"Единая типология с блоком 2"},
  {name:"Блок 5",apartments:55,note:"Отдельная планировочная схема"}
];

const features=[
  {value:"78",title:"машиномест",text:"71 место в надземном паркинге и 7 открытых мест."},
  {value:"2 408 м²",title:"озеленения",text:"Деревья, кустарники и благоустроенные прогулочные зоны."},
  {value:"317 м²",title:"детская площадка",text:"Игровая зона размещена на эксплуатируемой кровле паркинга."},
  {value:"59 м²",title:"тихий отдых",text:"Отдельная зона отдыха для взрослых во внутреннем дворе."},
  {value:"3 м",title:"высота потолков",text:"Высота потолков в жилых помещениях."},
  {value:"1 этаж",title:"коммерция",text:"Встроенные помещения на первом этаже для повседневных сервисов."}
];

const roomTypes=[
  {rooms:"1-комнатные",count:66,area:"31,99–46,19 м²",price:"от 19,2 млн ₸"},
  {rooms:"2-комнатные",count:98,area:"39,08–73,25 м²",price:"от 20,4 млн ₸"},
  {rooms:"3-комнатные",count:41,area:"63,10–87,09 м²",price:"от 28,4 млн ₸"},
  {rooms:"4-комнатные",count:16,area:"119,74 м²",price:"от 47,5 млн ₸"}
];

const gallery=[
  {src:"/baqyt-aerial.webp",alt:"Эскизная визуализация BAQYT с высоты",caption:"Архитектура комплекса"},
  {src:"/baqyt-courtyard.webp",alt:"Двор BAQYT на крыше паркинга",caption:"Благоустроенный двор"},
  {src:"/baqyt-street.webp",alt:"Уличный фасад жилого комплекса BAQYT",caption:"Фасады и озеленение"},
  {src:"/baqyt-commercial.webp",alt:"Коммерческие помещения на первом этаже BAQYT",caption:"Коммерция на первом этаже"}
];

export default function Baqyt(){return <>
  <SiteHeader/>
  <section className="baqytHero">
    <div>
      <p className="eyebrow">Новый проект UIDOMHOME · район Нура</p>
      <h1>BAQYT</h1>
      <p>Пять жилых блоков, приватный двор над паркингом и планировки для разных сценариев жизни.</p>
      <p className="baqytAddress">Астана, район Нура, улица Е 181, участок 3/1</p>
      <div className="baqytActions"><a className="primary" href="tel:+77765114796">Получить консультацию ↗</a><span>Старт строительства уточняется</span></div>
    </div>
    <figure><img src="/baqyt-hero.webp" alt="Эскизная визуализация фасада жилого комплекса BAQYT"/><figcaption>Эскизная визуализация проекта</figcaption></figure>
  </section>

  <section className="facts baqytFacts">
    <div><small>Жилых блоков</small><b>5</b></div>
    <div><small>Этажность</small><b>9 этажей</b></div>
    <div><small>Квартир</small><b>221</b></div>
    <div><small>Площадь квартир</small><b>31,99–119,74 м²</b></div>
  </section>

  <section className="baqytIntro">
    <div><p className="eyebrow">О проекте</p><h2>Один комплекс.<br/>Пять жилых блоков.</h2></div>
    <div><p>BAQYT состоит из пяти 9-этажных блоков, объединённых с одноэтажным надземным паркингом. На его эксплуатируемой кровле расположен внутренний двор с детской площадкой, зонами отдыха и озеленением.</p><p>В проекте предусмотрены квартиры от одной до четырёх комнат общей площадью около 12 888 м². На первых этажах запроектированы коммерческие помещения.</p><p className="notice">Дата начала строительства, срок ввода и финальные условия продаж будут опубликованы после официального утверждения.</p></div>
  </section>

  <section className="baqytBlocks">
    <div className="baqytSectionHead"><div><p className="eyebrow">Состав комплекса</p><h2>Все 5 блоков BAQYT</h2></div><p>В альбоме каждый блок выделен отдельно. Количество квартир указано по текущей проектной таблице.</p></div>
    <div className="blockGrid">{blocks.map((block,index)=><article key={block.name}><span>0{index+1}</span><h3>{block.name}</h3><b>{block.apartments} квартир</b><p>9 этажей</p><small>{block.note}</small></article>)}</div>
    <p className="blockTotal"><span>Итого</span><b>221 квартира</b><span>в пяти блоках</span></p>
  </section>

  <section className="baqytFeatures">
    <div className="baqytSectionHead"><div><p className="eyebrow">Среда для жизни</p><h2>Что предусмотрено</h2></div><p>Ключевые характеристики из актуального эскизного альбома проекта.</p></div>
    <div className="featureGrid">{features.map(feature=><article key={feature.title}><strong>{feature.value}</strong><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div>
  </section>

  <section className="baqytGallery">
    <div className="baqytSectionHead"><div><p className="eyebrow">Архитектура</p><h2>BAQYT в деталях</h2></div><p>Визуализации из актуального эскизного альбома. Внешний вид может уточняться в ходе проектирования.</p></div>
    <div className="baqytGalleryGrid">{gallery.map((image,index)=><figure className={index===0?"wide":""} key={image.src}><img src={image.src} alt={image.alt}/><figcaption>{image.caption}</figcaption></figure>)}</div>
  </section>

  <section className="baqytLayouts">
    <div className="baqytSectionHead"><div><p className="eyebrow">Предварительный квартирный фонд</p><h2>Планировки BAQYT</h2></div><p>Цены рассчитаны по текущей проектной таблице и могут измениться к официальному старту продаж.</p></div>
    <div className="roomTypeGrid">{roomTypes.map((x,i)=><article key={x.rooms}><span>0{i+1}</span><h3>{x.rooms}</h3><dl><div><dt>Количество</dt><dd>{x.count}</dd></div><div><dt>Площадь</dt><dd>{x.area}</dd></div><div><dt>Стоимость</dt><dd>{x.price}</dd></div></dl><a className="detailAction" href="tel:+77765114796">Узнать подробнее <span>↗</span></a></article>)}</div>
  </section>

  <ApartmentsCatalog project="baqyt" embedded/>

  <section className="baqytCta"><p className="eyebrow">Будьте в числе первых</p><h2>Узнайте о старте BAQYT</h2><p>Позвоните нам — менеджер расскажет о проекте и сообщит, когда появятся подтверждённые сроки и условия продаж.</p><a className="primary" href="tel:+77765114796">+7 776 511 4796 ↗</a></section>
  <SiteFooter/>
</>}
