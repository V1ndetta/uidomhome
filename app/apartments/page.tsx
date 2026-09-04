import type { Metadata } from "next";
import { PageHero, SiteFooter, SiteHeader } from "../site-ui";
import { ApartmentsCatalog } from "./apartments-catalog";

export const metadata: Metadata = {
  title: "Квартиры",
  description:
    "Карточки квартир и диапазоны планировок в проектах BAQYT и Happy Land от UIDOMHOME.",
};

export default function Apartments() {
  return (
    <>
      <SiteHeader />
      <PageHero
        over="BAQYT · Happy Land"
        title="Выберите квартиру"
        text="Сравните варианты по проекту, комнатности и площади. Точные данные конкретной квартиры подтвердит менеджер."
      />
      <ApartmentsCatalog />
      <SiteFooter />
    </>
  );
}
