import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import { FAMILIES } from "@/data/families";
import { CATEGORIES } from "@/data/categories";
import { RibbonMark } from "@/components/shared/ribbon-mark";

type IconType = React.ComponentType<{ className?: string }>;

export const metadata: Metadata = {
  title: "Toutes les catégories de talents",
  description:
    "Explorez les 8 univers de talents Lystra : beauté, image, décoration, gastronomie, lieux, musique, organisation et événements pro. Coiffeurs, photographes, traiteurs, DJ et bien plus.",
};

export default function CategoriesPage() {
  return (
    <>
      {/* Light premium header */}
      <section className="relative overflow-hidden bg-ivory-fade">
        <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-lystra-champagne/15 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center lg:py-20">
          <p className="eyebrow justify-center">Explorer</p>
          <h1 className="display mt-4 text-balance text-4xl leading-[1.1] text-lystra-ink lg:text-5xl">
            8 univers, des centaines de talents
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-lystra-gray">
            De la mise en beauté au lieu de réception, trouvez le bon métier pour chaque moment —
            jamais enfermé dans le mariage.
          </p>
        </div>
      </section>

      <section className="bg-lystra-ivory py-16 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-16 px-6">
          {FAMILIES.map((fam) => {
            const cats = CATEGORIES.filter((c) => c.family === fam.slug);
            const Icon = ((Icons as Record<string, unknown>)[fam.icon] as IconType) ?? Icons.Sparkles;
            return (
              <div key={fam.slug} id={fam.slug} className="scroll-mt-24">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lystra-plum/[0.06] text-lystra-plum">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl text-lystra-ink">{fam.name}</h2>
                    <p className="text-sm text-lystra-gray">{fam.description}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {cats.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/${c.slug}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-lystra-champagne/30 bg-white/70 px-4 py-2 text-sm text-lystra-ink transition hover:-translate-y-0.5 hover:border-lystra-champagne hover:shadow-soft"
                    >
                      {c.name}
                      <span className="text-xs text-lystra-gray">{c.vendorCount}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer signature */}
      <div className="flex justify-center pb-10">
        <RibbonMark withDots={false} className="h-8 w-8 text-lystra-champagne/40" />
      </div>
    </>
  );
}
