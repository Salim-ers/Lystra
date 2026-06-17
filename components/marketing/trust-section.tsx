import * as Icons from "lucide-react";
import { TRUST_POINTS } from "@/data/testimonials";
import { SectionHeading } from "@/components/shared/section-heading";

export function TrustSection() {
  return (
    <section id="confiance" className="bg-lystra-cream/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Confiance"
          title="Une plateforme pensée pour votre sérénité"
          intro="Chaque détail est conçu pour que vous réserviez l'esprit léger."
        />
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((p) => {
            const Icon = (Icons[p.icon as keyof typeof Icons] ?? Icons.Check) as React.ComponentType<{ className?: string }>;
            return (
              <div key={p.title} className="flex flex-col items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-lystra-champagne/40 text-lystra-champagne">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-serif text-lg text-lystra-ink">{p.title}</h3>
                <p className="text-sm leading-relaxed text-lystra-gray">{p.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
