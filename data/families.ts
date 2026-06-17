import type { Family } from "@/types";

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1100&q=80`;

/**
 * Les 8 univers de talents Lystra. Chaque univers regroupe des métiers
 * GÉNÉRIQUES (jamais enfermés dans "mariage") — voir data/categories.ts.
 */
export const FAMILIES: Family[] = [
  { slug: "beaute-preparation",       name: "Beauté & préparation",         shortName: "Beauté",         icon: "Sparkles",      description: "Coiffure, maquillage, soins et mise en beauté pour tous vos moments d'exception.", coverUrl: u("1522335789203-aabd1fc54bc9") },
  { slug: "image-souvenirs",          name: "Image & souvenirs",            shortName: "Image",          icon: "Camera",        description: "Photographes, vidéastes et créateurs pour capturer chaque instant.", coverUrl: u("1452587925148-ce544e77e70d") },
  { slug: "decoration-ambiance",      name: "Décoration & ambiance",        shortName: "Décoration",     icon: "Flower2",       description: "Fleuristes, scénographes et décorateurs pour des univers uniques.", coverUrl: u("1469371670807-013ccf25f16a") },
  { slug: "food-boissons",            name: "Food & boissons",              shortName: "Gastronomie",    icon: "UtensilsCrossed", description: "Traiteurs, chefs privés, pâtissiers et bars d'exception.", coverUrl: u("1555244162-803834f70033") },
  { slug: "lieux-experiences",        name: "Lieux & expériences",          shortName: "Lieux",          icon: "Building2",     description: "Domaines, villas, rooftops et lieux atypiques à privatiser.", coverUrl: u("1464366400600-7168b8af9bc3") },
  { slug: "musique-animation",        name: "Musique & animation",          shortName: "Musique",        icon: "Disc3",         description: "DJ, groupes live, performers et maîtres de cérémonie.", coverUrl: u("1470229722913-7c0e2dbbafd3") },
  { slug: "organisation-coordination", name: "Organisation & coordination", shortName: "Organisation",   icon: "ClipboardList", description: "Planners, coordinateurs et conciergerie pour tout orchestrer.", coverUrl: u("1511795409834-ef04bbd61622") },
  { slug: "marques-pro",              name: "Marques & événements pro",     shortName: "Corporate",      icon: "Briefcase",     description: "Contenu, scénographie et staff pour les marques et entreprises.", coverUrl: u("1505373877841-8d25f7d46678") },
];

export function getFamily(slug: string) {
  return FAMILIES.find((f) => f.slug === slug);
}
