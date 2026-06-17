import type { PricingPlan } from "@/types";

/** Vendor subscription tiers. Wire `priceId` to your Stripe dashboard prices. */
export const PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 19,
    cadence: "/ mois",
    tagline: "Pour lancer votre activité sur Lystra.",
    cta: "Commencer",
    features: [
      "Profil public premium",
      "Jusqu'à 5 demandes / mois",
      "Portfolio (6 photos)",
      "Messagerie clients",
      "Paiements sécurisés",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    cadence: "/ mois",
    tagline: "Le choix des prestataires qui veulent grandir.",
    highlighted: true,
    cta: "Choisir Pro",
    features: [
      "Demandes illimitées",
      "Portfolio complet",
      "Badge vérifié",
      "Statistiques détaillées",
      "Mise en avant légère",
      "Réponses prioritaires",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: 99,
    cadence: "/ mois",
    tagline: "Visibilité maximale et accompagnement dédié.",
    cta: "Passer Elite",
    features: [
      "Priorité dans les résultats",
      "Mise en avant page d'accueil",
      "Badge Elite",
      "Support prioritaire",
      "Outils avancés & exports",
      "Accès anticipé aux nouveautés",
    ],
  },
];

export const STRIPE_PRICE_IDS: Record<string, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro: process.env.STRIPE_PRICE_PRO,
  elite: process.env.STRIPE_PRICE_ELITE,
};
