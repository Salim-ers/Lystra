import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealStagger, RevealItem } from "@/components/marketing/reveal";

export function Testimonials() {
  return (
    <section id="temoignages" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="Témoignages"
          title="Ils ont organisé leur événement avec Lystra"
        />
      </Reveal>
      <RevealStagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <RevealItem key={t.author} className="h-full">
            <figure className="card-premium flex h-full flex-col p-7">
              <Quote className="h-7 w-7 text-lystra-champagne/50" />
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-lystra-ink/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-lystra-champagne/15 pt-4">
                <p className="font-serif text-base text-lystra-ink">{t.author}</p>
                <p className="text-xs text-lystra-gray">{t.role} · {t.event}</p>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}
