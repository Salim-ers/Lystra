import { Search, Scale, CalendarCheck, PartyPopper } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealStagger, RevealItem } from "@/components/marketing/reveal";

const STEPS = [
  { icon: Search, title: "Recherchez", text: "Talent, ville, moment, date : trouvez le bon profil en quelques secondes." },
  { icon: Scale, title: "Comparez", text: "Profils, packs, tarifs et avis vérifiés pour décider en confiance." },
  { icon: CalendarCheck, title: "Réservez", text: "Devis ou réservation directe, acompte sécurisé en ligne." },
  { icon: PartyPopper, title: "Profitez", text: "Vivez votre moment l'esprit léger, entouré de talents d'exception." },
];

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="Comment ça marche"
          title="Réserver un talent, en toute simplicité"
          intro="De la recherche au paiement, Lystra simplifie chaque étape."
        />
      </Reveal>
      <RevealStagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <RevealItem key={s.title} className="h-full">
            <div className="card-premium relative h-full p-6">
              <span className="absolute right-5 top-5 font-serif text-3xl text-lystra-champagne/30">{i + 1}</span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lystra-plum/8 text-lystra-plum">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-serif text-xl text-lystra-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-lystra-gray">{s.text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}
