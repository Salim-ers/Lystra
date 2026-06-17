import type { EventBundle } from "@/types";

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

/**
 * Bundles événementiels — packs multi-prestataires prêts à réserver.
 * Différenciant fort vs. un annuaire : on vend une équipe, pas un contact.
 */
export const BUNDLES: EventBundle[] = [
  {
    id: "b1",
    slug: "pack-mariage-civil",
    name: "Pack Mariage Civil",
    tagline: "Coiffure, maquillage & photographe pour un oui inoubliable.",
    description: "L'essentiel beauté et image pour votre mariage civil, coordonné par Lystra.",
    eventType: "Mariage",
    coverUrl: img("1519225421980-715cb0215aed"),
    fromPrice: 980,
    roles: ["Coiffeur / Coiffeuse", "Maquilleur / Maquilleuse", "Photographe"],
    vendorSlugs: ["aura-beauty", "lumiere-studio"],
    badge: "Le plus demandé",
  },
  {
    id: "b2",
    slug: "pack-anniversaire-premium",
    name: "Pack Anniversaire Premium",
    tagline: "Lieu, photographe, DJ & décoration pour une soirée mémorable.",
    description: "Une soirée d'anniversaire clé en main, du lieu à l'ambiance.",
    eventType: "Anniversaire",
    coverUrl: img("1530103862676-de8c9debad1d"),
    fromPrice: 2400,
    roles: ["Lieu de réception", "Photographe", "DJ", "Décorateur événementiel"],
    vendorSlugs: ["ciel-rooftop", "sonora-events", "lueur-deco"],
  },
  {
    id: "b3",
    slug: "pack-baby-shower",
    name: "Pack Baby Shower",
    tagline: "Décoratrice, pâtissier & photographe pour fêter l'arrivée.",
    description: "Une baby shower douce et soignée, souvenirs inclus.",
    eventType: "Baby shower",
    coverUrl: img("1464349095431-e9a21285b5f3"),
    fromPrice: 690,
    roles: ["Décorateur événementiel", "Pâtissier", "Photographe"],
    vendorSlugs: ["maison-opaline", "sucre-confetti"],
  },
  {
    id: "b4",
    slug: "pack-corporate",
    name: "Pack Corporate",
    tagline: "Lieu, traiteur, photographe & hôtesses pour vos événements pro.",
    description: "Séminaires, lancements et soirées de marque, gérés de bout en bout.",
    eventType: "Événement d'entreprise",
    coverUrl: img("1511795409834-ef04bbd61622"),
    fromPrice: 3500,
    roles: ["Lieu de réception", "Traiteur", "Photographe corporate", "Hôtesse d'accueil"],
    vendorSlugs: ["eclat-traiteur", "hostess-club"],
    badge: "Marques & entreprises",
  },
  {
    id: "b5",
    slug: "pack-shooting",
    name: "Pack Shooting",
    tagline: "Maquilleuse, coiffeuse, photographe & studio réunis.",
    description: "Un shooting éditorial complet, équipe et lieu coordonnés.",
    eventType: "Shooting photo",
    coverUrl: img("1487412947147-5cebf100ffc2"),
    fromPrice: 760,
    roles: ["Maquilleur / Maquilleuse", "Coiffeur / Coiffeuse", "Photographe", "Studio photo"],
    vendorSlugs: ["aura-beauty", "lumiere-studio"],
  },
  {
    id: "b6",
    slug: "pack-evjf",
    name: "Pack EVJF",
    tagline: "Spa mobile, maquillage & photographe pour un dernier tour.",
    description: "Un enterrement de vie de jeune fille beauté et souvenirs.",
    eventType: "EVJF / EVG",
    coverUrl: img("1600334129128-685c5582fd35"),
    fromPrice: 540,
    roles: ["Spa mobile", "Maquilleur / Maquilleuse", "Photographe"],
    vendorSlugs: ["oasis-mobile", "aura-beauty"],
  },
];

export function getBundle(slug: string) {
  return BUNDLES.find((b) => b.slug === slug);
}
