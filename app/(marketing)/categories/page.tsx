import type { Metadata } from "next";
import { CATEGORIES } from "@/data/categories";
import { CategoryCard } from "@/components/marketplace/category-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { RibbonMark } from "@/components/shared/ribbon-mark";

export const metadata: Metadata = {
  title: "Catégories de prestataires",
  description:
    "Explorez toutes les catégories de prestataires événementiels d'exception sur Lystra : photographes, traiteurs, fleuristes, lieux de réception et bien plus.",
};

export default function CategoriesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-plum-deep py-16 text-lystra-cream lg:py-24">
        <RibbonMark
          className="pointer-events-none absolute -left-20 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 text-lystra-champagne/10"
          withDots={false}
        />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="eyebrow justify-center text-lystra-champagne">Explorer</p>
          <h1 className="display mt-4 text-balance text-4xl leading-[1.1] lg:text-5xl">
            Toutes les catégories d'exception
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-lystra-cream/75">
            Des talents sélectionnés pour chaque moment de votre événement, de la cérémonie à la
            réception.
          </p>
        </div>
      </section>

      <section className="bg-lystra-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
