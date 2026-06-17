import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Target,
  Inbox,
  ShieldCheck,
  CalendarCheck,
  Star,
} from "lucide-react";
import { PLANS } from "@/lib/stripe/plans";
import { PricingCard } from "@/components/marketing/pricing-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Devenir prestataire",
  description:
    "Développez votre activité auprès de clients qui préparent tous leurs moments d'exception : mariage, anniversaire, événement d'entreprise, shooting, soirée privée. Rejoignez Lystra.",
};

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Profil premium",
    text: "Une vitrine élégante qui met en valeur votre travail, vos prestations et vos avis.",
  },
  {
    icon: Target,
    title: "Visibilité qualifiée",
    text: "Soyez visible auprès de clients qui réservent des talents pour tous leurs moments d'exception, du mariage à l'événement d'entreprise.",
  },
  {
    icon: Inbox,
    title: "Réservation directe",
    text: "Recevez des demandes détaillées et des réservations directes dans votre espace prestataire, sans intermédiaire.",
  },
  {
    icon: ShieldCheck,
    title: "Paiements sécurisés",
    text: "Encaissez vos prestations en toute confiance grâce au paiement sécurisé Stripe.",
  },
  {
    icon: CalendarCheck,
    title: "Packs & conciergerie",
    text: "Apparaissez dans des packs par type d'événement et bénéficiez de l'accompagnement de notre conciergerie premium.",
  },
  {
    icon: Star,
    title: "Score de profil",
    text: "Suivez votre score de profil et vos avis vérifiés pour gagner en visibilité après chaque prestation réussie.",
  },
];

const FAQ = [
  {
    q: "Comment fonctionne l'inscription ?",
    a: "Créez votre compte prestataire, choisissez votre métier (photographe, traiteur, fleuriste, DJ…), complétez votre profil (description, photos, tarifs, types d'événements couverts) et sélectionnez votre abonnement. Votre profil est ensuite vérifié par notre équipe avant publication.",
  },
  {
    q: "Combien de temps pour être validé ?",
    a: "La validation prend généralement 24 à 48 heures. Nous vérifions la cohérence de votre profil pour garantir la qualité de la marketplace.",
  },
  {
    q: "Puis-je tester avant de m'engager ?",
    a: "L'offre Starter à 19 €/mois vous permet de démarrer sans engagement. Vous pouvez évoluer vers Pro ou Elite à tout moment.",
  },
];

export default function BecomeVendorPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ivory-fade py-20 lg:py-28">
        <div className="pointer-events-none absolute -right-32 -top-24 h-[32rem] w-[32rem] rounded-full bg-lystra-champagne/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-lystra-rose/10 blur-3xl" />
        <RibbonMark
          className="pointer-events-none absolute -right-24 top-0 hidden h-[34rem] w-[34rem] text-lystra-champagne/[0.07] lg:block"
          withDots={false}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="eyebrow justify-center text-[#8a6a2f]">Espace prestataires</p>
          <h1 className="display mt-4 text-balance text-4xl leading-[1.1] text-lystra-ink lg:text-6xl">
            Vos talents, pour tous les moments d'exception.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-lystra-gray">
            Rejoignez une sélection de talents premium et recevez des demandes qualifiées de clients
            qui réservent pour leurs plus beaux moments : mariage, anniversaire, événement
            d'entreprise, shooting, soirée privée et bien plus.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/register?role=vendor">
                Créer mon profil <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">Voir les tarifs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-lystra-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Pourquoi Lystra"
            title="Tout ce qu'il vous faut pour rayonner"
            intro="Une plateforme pensée pour les talents exigeants, quel que soit votre métier."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="card-premium rounded-2xl border-lystra-champagne/25 bg-white/70 p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-lystra-champagne/15 text-lystra-plum">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-serif text-xl text-lystra-ink">{b.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-lystra-gray">{b.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="bg-lystra-cream py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Abonnements"
            title="Une offre pour chaque ambition"
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-stretch">
            {PLANS.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-lystra-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading eyebrow="Questions fréquentes" title="Vous hésitez encore ?" align="center" />
          <div className="mt-10 divide-y divide-lystra-champagne/20 rounded-2xl border border-lystra-champagne/25 bg-white/70">
            {FAQ.map((item) => (
              <div key={item.q} className="p-6">
                <h3 className="font-serif text-lg text-lystra-ink">{item.q}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-lystra-gray">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link href="/register?role=vendor">
                Rejoindre Lystra <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
