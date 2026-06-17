import { Search, Scale, CalendarCheck, PartyPopper } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const STEPS = [
  { icon: Search, title: "Recherchez", text: "Explorez des prestataires sélectionnés par catégorie, ville et type d'événement." },
  { icon: Scale, title: "Comparez", text: "Profils détaillés, tarifs, photos et avis vérifiés pour décider en confiance." },
  { icon: CalendarCheck, title: "Réservez", text: "Demandez un devis, validez une date et payez en toute sécurité via Lystra." },
  { icon: PartyPopper, title: "Profitez", text: "Vivez votre événement l'esprit tranquille, accompagné par des talents d'exception." },
];

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        align="center"
        eyebrow="Comment ça marche"
        title="Quatre étapes vers un événement d'exception"
        intro="De la recherche à la réservation, Lystra simplifie chaque étape de l'organisation."
      />
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <div key={s.title} className="card-premium relative p-6">
            <span className="absolute right-5 top-5 font-serif text-3xl text-lystra-champagne/30">{i + 1}</span>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lystra-plum/8 text-lystra-plum">
              <s.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-serif text-xl text-lystra-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-lystra-gray">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
