import type { Category } from "@/types";

/**
 * Event-service categories. `icon` maps to a lucide-react icon name.
 * Covers use Unsplash; swap for Supabase Storage uploads in production.
 */
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1100&q=80`;

export const CATEGORIES: Category[] = [
  { id: "c1",  slug: "coiffure-mariage",     name: "Coiffure mariage",        icon: "Scissors",     description: "Coiffeurs spécialisés mariages et cérémonies.",          coverUrl: u("1560066984-138dadb4c035"), vendorCount: 14 },
  { id: "c2",  slug: "maquillage",           name: "Maquillage",              icon: "Sparkles",     description: "Maquilleurs professionnels pour vos évènements.",        coverUrl: u("1522335789203-aabd1fc54bc9"), vendorCount: 22 },
  { id: "c3",  slug: "fleuristes",           name: "Fleuristes",              icon: "Flower2",      description: "Compositions et scénographies florales sur mesure.",     coverUrl: u("1469371670807-013ccf25f16a"), vendorCount: 31 },
  { id: "c4",  slug: "photographes",         name: "Photographes",            icon: "Camera",       description: "Reportages photo élégants et intemporels.",              coverUrl: u("1452587925148-ce544e77e70d"), vendorCount: 48 },
  { id: "c5",  slug: "videastes",            name: "Vidéastes",               icon: "Video",        description: "Films d'évènement cinématographiques.",                  coverUrl: u("1485846234645-a62644f84728"), vendorCount: 19 },
  { id: "c6",  slug: "traiteurs",            name: "Traiteurs",               icon: "UtensilsCrossed", description: "Gastronomie et service premium.",                    coverUrl: u("1555244162-803834f70033"), vendorCount: 37 },
  { id: "c7",  slug: "wedding-planners",     name: "Wedding planners",        icon: "ClipboardList", description: "Organisation complète de A à Z.",                      coverUrl: u("1511795409834-ef04bbd61622"), vendorCount: 16 },
  { id: "c8",  slug: "decoration",           name: "Décoration",              icon: "Palette",      description: "Décorateurs et scénographes d'exception.",               coverUrl: u("1519225421980-715cb0215aed"), vendorCount: 27 },
  { id: "c9",  slug: "lieux-de-reception",   name: "Lieux de réception",      icon: "Building2",    description: "Domaines, châteaux et lieux d'exception.",               coverUrl: u("1464366400600-7168b8af9bc3"), vendorCount: 24 },
  { id: "c10", slug: "dj-musique",           name: "DJ & musique",            icon: "Disc3",        description: "DJ, groupes et ambiances sonores premium.",              coverUrl: u("1470229722913-7c0e2dbbafd3"), vendorCount: 29 },
  { id: "c11", slug: "patisserie",           name: "Pâtisserie & wedding cake", icon: "CakeSlice",  description: "Wedding cakes et créations sucrées.",                    coverUrl: u("1535254973040-607b474cb50d"), vendorCount: 18 },
  { id: "c12", slug: "son-lumiere",          name: "Son & lumière",           icon: "Lightbulb",    description: "Mise en lumière et sonorisation événementielle.",        coverUrl: u("1492684223066-81342ee5ff30"), vendorCount: 12 },
];

export const POPULAR_CATEGORY_SLUGS = ["photographes", "traiteurs", "fleuristes", "lieux-de-reception", "dj-musique", "decoration"];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
