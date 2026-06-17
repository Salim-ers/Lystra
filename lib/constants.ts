import type { AvailabilityKey } from "@/types";

export const SITE = {
  name: "Lystra",
  promise: "Find and book exceptional talents for every moment.",
  tagline: "Trouvez et réservez les meilleurs prestataires pour tous vos moments d'exception.",
  taglineEn: "Find and book exceptional talents for every moment.",
  baseline:
    "Beauté, image, décoration, lieux, gastronomie et talents événementiels sélectionnés — réunis sur une seule plateforme.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  description:
    "Lystra est la plateforme premium pour trouver, comparer et réserver les meilleurs talents beauté, image, décoration, lieux, gastronomie, musique et événementiel — pour vos mariages, anniversaires, shootings, événements pro et tous vos moments d'exception.",
} as const;

export const CITIES = [
  "Paris", "Lyon", "Marseille", "Bordeaux", "Nice",
  "Toulouse", "Lille", "Nantes", "Cannes", "Aix-en-Provence",
] as const;

/** Slugs SEO pour les villes (utilisés par les pages programmatiques). */
export const CITY_SLUGS: Record<string, string> = {
  Paris: "paris", Lyon: "lyon", Marseille: "marseille", Bordeaux: "bordeaux",
  Nice: "nice", Toulouse: "toulouse", Lille: "lille", Nantes: "nantes",
  Cannes: "cannes", "Aix-en-Provence": "aix-en-provence",
};

/** Retourne le nom d'affichage d'une ville à partir de son slug SEO. */
export function cityFromSlug(slug: string): string | undefined {
  return Object.keys(CITY_SLUGS).find((name) => CITY_SLUGS[name] === slug);
}

/**
 * Types d'événement (use-cases) — DISTINCTS des catégories de métier.
 * On précise le moment, jamais on enferme le métier dans "mariage".
 */
export const EVENT_TYPES = [
  "Mariage", "Anniversaire", "Baby shower", "Baptême",
  "EVJF / EVG", "Soirée privée", "Dîner privé", "Événement d'entreprise",
  "Lancement de marque", "Shooting photo", "Cérémonie", "Gala",
  "Cocktail", "Demande en mariage", "Gender reveal", "Séminaire",
  "Soirée influenceurs", "Événement luxe", "Événement familial",
] as const;

/** Sous-ensemble mis en avant en page d'accueil ("Pour chaque moment"). */
export const FEATURED_EVENT_TYPES = [
  { label: "Mariage", slug: "mariage", img: "1519225421980-715cb0215aed", blurb: "De la préparation au dîner, une équipe complète." },
  { label: "Anniversaire", slug: "anniversaire", img: "1530103862676-de8c9debad1d", blurb: "Lieu, déco, image et musique réunis." },
  { label: "Événement pro", slug: "evenement-entreprise", img: "1511795409834-ef04bbd61622", blurb: "Séminaires, lancements, soirées de marque." },
  { label: "Shooting photo", slug: "shooting-photo", img: "1452587925148-ce544e77e70d", blurb: "Maquillage, coiffure, studio et photographe." },
  { label: "Baby shower", slug: "baby-shower", img: "1464349095431-e9a21285b5f3", blurb: "Décoration, pâtisserie et souvenirs." },
  { label: "Cérémonie", slug: "ceremonie", img: "1469371670807-013ccf25f16a", blurb: "Officiant, fleurs, son & lumière." },
] as const;

/** Mapping slug d'événement -> libellé canonique (pour les pages SEO). */
export const EVENT_SLUGS: { slug: string; label: string }[] = [
  { slug: "mariage", label: "Mariage" },
  { slug: "anniversaire", label: "Anniversaire" },
  { slug: "baby-shower", label: "Baby shower" },
  { slug: "bapteme", label: "Baptême" },
  { slug: "evjf", label: "EVJF / EVG" },
  { slug: "soiree-privee", label: "Soirée privée" },
  { slug: "evenement-entreprise", label: "Événement d'entreprise" },
  { slug: "shooting-photo", label: "Shooting photo" },
  { slug: "ceremonie", label: "Cérémonie" },
  { slug: "gala", label: "Gala" },
  { slug: "cocktail", label: "Cocktail" },
  { slug: "gender-reveal", label: "Gender reveal" },
  { slug: "seminaire", label: "Séminaire" },
];

export function getEventBySlug(slug: string) {
  return EVENT_SLUGS.find((e) => e.slug === slug);
}

/** Libellés + ton des statuts de disponibilité. */
export const AVAILABILITY: Record<AvailabilityKey, { label: string; tone: "emerald" | "champagne" | "amber" | "muted" | "rose" }> = {
  available:  { label: "Disponible",          tone: "emerald" },
  weekend:    { label: "Dispo ce week-end",   tone: "emerald" },
  "on-request": { label: "Sur demande",       tone: "champagne" },
  urgent:     { label: "Disponible en urgence", tone: "amber" },
  full:       { label: "Complet",             tone: "muted" },
};

export const BOOKING_STATUS_LABELS: Record<string, { label: string; tone: string }> = {
  draft:     { label: "Brouillon",  tone: "muted" },
  pending:   { label: "En attente", tone: "amber" },
  quoted:    { label: "Devis reçu", tone: "champagne" },
  accepted:  { label: "Acceptée",   tone: "plum" },
  rejected:  { label: "Refusée",    tone: "rose" },
  paid:      { label: "Payée",      tone: "plum" },
  confirmed: { label: "Confirmée",  tone: "plum" },
  completed: { label: "Terminée",   tone: "muted" },
  cancelled: { label: "Annulée",    tone: "rose" },
  refunded:  { label: "Remboursée", tone: "muted" },
};

/** Commission marketplace par défaut (configurable côté admin : 8 % – 15 %). */
export const DEFAULT_COMMISSION_RATE = 12;
export const CONCIERGE_PRICE = 49;
