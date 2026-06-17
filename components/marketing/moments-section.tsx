import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FEATURED_EVENT_TYPES } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealStagger, RevealItem } from "@/components/marketing/reveal";

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

/**
 * "Pour chaque moment" — cards éditoriales par type d'événement.
 * Layout volontairement asymétrique (1 grande + petites) pour un rendu
 * éditorial, jamais une grille trop régulière.
 */
export function MomentsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Pour chaque moment"
          title="Un moment à sublimer ? Nous avons les talents."
          intro="Du mariage au lancement de marque, composez l'équipe idéale selon l'occasion."
        />
      </Reveal>
      <RevealStagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_EVENT_TYPES.map((m, i) => (
          <RevealItem
            key={m.slug}
            className={cn(i === 0 ? "h-full lg:col-span-2 lg:row-span-2" : "")}
          >
            <Link
              href={`/evenement/${m.slug}`}
              className="group relative block h-full overflow-hidden rounded-[1.5rem] border border-lystra-champagne/20 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className={cn("relative", i === 0 ? "aspect-[16/10] lg:h-full lg:aspect-auto" : "aspect-[5/4]")}>
                <Image
                  src={img(m.img)}
                  alt={m.label}
                  fill
                  sizes={i === 0 ? "(max-width:1024px) 100vw, 66vw" : "(max-width:1024px) 50vw, 33vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lystra-ink/80 via-lystra-ink/15 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div>
                  <h3 className={cn("font-serif text-lystra-cream", i === 0 ? "text-2xl sm:text-3xl" : "text-xl")}>
                    {m.label}
                  </h3>
                  <p className="mt-1 max-w-xs text-sm text-lystra-cream/80">{m.blurb}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lystra-cream/90 text-lystra-plum transition-transform duration-300 group-hover:rotate-12">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}
