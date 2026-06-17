import type { Category, FamilySlug } from "@/types";
import { FAMILIES } from "./families";

export { FAMILIES, getFamily } from "./families";

/**
 * Catégories de métier GÉNÉRIQUES.
 * Règle d'or : on nomme le métier ("Photographe"), jamais l'usage ("Photo mariage").
 * Le type d'événement se précise via les filtres / pages SEO, pas dans le nom.
 *
 * Covers : Unsplash (à remplacer par Supabase Storage en prod).
 */
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1100&q=80`;

const FAMILY_NAME: Record<FamilySlug, string> = Object.fromEntries(
  FAMILIES.map((f) => [f.slug, f.name]),
) as Record<FamilySlug, string>;

// [slug, name, family, icon, coverId, vendorCount, popular?]
type Row = [string, string, FamilySlug, string, string, number, boolean?];

const ROWS: Row[] = [
  // 1 — Beauté & préparation
  ["coiffeur",          "Coiffeur / Coiffeuse",   "beaute-preparation", "Scissors",  "1560066984-138dadb4c035", 42, true],
  ["maquilleur",        "Maquilleur / Maquilleuse","beaute-preparation","Sparkles",  "1522335789203-aabd1fc54bc9", 56, true],
  ["estheticienne",     "Esthéticienne",          "beaute-preparation", "Gem",       "1596462502278-27bfdc403348", 28],
  ["barbier",           "Barbier",                "beaute-preparation", "Scissors",  "1503951914875-452162b0f3f1", 17],
  ["nail-artist",       "Nail artist",            "beaute-preparation", "Brush",     "1604654894610-df63bc536371", 21],
  ["soin-visage",       "Soin visage",            "beaute-preparation", "Droplet",   "1570172619644-dfd03ed5d881", 14],
  ["massage",           "Massage bien-être",      "beaute-preparation", "Hand",      "1600334129128-685c5582fd35", 12],
  ["coach-image",       "Coach image",            "beaute-preparation", "UserCog",   "1487412947147-5cebf100ffc2", 9],
  ["styliste",          "Styliste personnel",     "beaute-preparation", "Shirt",     "1490481651871-ab68de25d43d", 11],
  ["extensions-cheveux","Extensions cheveux",     "beaute-preparation", "Scissors",  "1562322140-8baeececf3df", 8],
  ["brow-lash",         "Brow & lash artist",     "beaute-preparation", "Eye",       "1583001931096-959e9a1a6223", 16],
  ["spray-tan",         "Spray tan",              "beaute-preparation", "SunMedium", "1556760544-74068565f05c", 6],
  ["spa-mobile",        "Spa mobile",             "beaute-preparation", "Bath",      "1600334129128-685c5582fd35", 5],

  // 2 — Image & souvenirs
  ["photographe",       "Photographe",            "image-souvenirs", "Camera",       "1452587925148-ce544e77e70d", 88, true],
  ["videaste",          "Vidéaste",               "image-souvenirs", "Video",        "1601506521793-dc748fc80b67", 41, true],
  ["drone",             "Drone",                  "image-souvenirs", "Plane",        "1473968512647-3e447244af8f", 12],
  ["content-creator",   "Content creator événementiel", "image-souvenirs", "Clapperboard", "1535016120720-40c646be5580", 19, true],
  ["photobooth",        "Photobooth",             "image-souvenirs", "Aperture",     "1500210600161-7e0e5e89e9c2", 23],
  ["retouche-photo",    "Retouche photo",         "image-souvenirs", "Image",        "1606216794074-735e91aa2c92", 7],
  ["studio-mobile",     "Studio mobile",          "image-souvenirs", "Camera",       "1581291518857-4e27b48ff24e", 9],
  ["live-streaming",    "Live streaming",         "image-souvenirs", "Radio",        "1574717024653-61fd2cf4d44d", 6],

  // 3 — Décoration & ambiance
  ["fleuriste",         "Fleuriste",              "decoration-ambiance", "Flower2",   "1478146896981-b80fe463b330", 64, true],
  ["decorateur",        "Décorateur événementiel","decoration-ambiance", "Palette",   "1519225421980-715cb0215aed", 47, true],
  ["scenographe",       "Scénographe",            "decoration-ambiance", "Frame",     "1530103862676-de8c9debad1d", 18],
  ["balloon-designer",  "Balloon designer",       "decoration-ambiance", "PartyPopper","1530103862676-de8c9debad1d", 13],
  ["location-mobilier", "Location mobilier",      "decoration-ambiance", "Armchair",  "1505691938895-1758d7feb511", 15],
  ["art-de-la-table",   "Art de la table",        "decoration-ambiance", "UtensilsCrossed", "1414235077428-338989a2e8c0", 11],
  ["decoration-lumiere","Décoration lumière",     "decoration-ambiance", "Lightbulb", "1492684223066-81342ee5ff30", 10],
  ["calligraphe",       "Calligraphe",            "decoration-ambiance", "PenTool",   "1455390582262-044cdead277a", 7],
  ["papeterie",         "Designer papeterie",     "decoration-ambiance", "Mail",      "1606229365485-93a3b8ee0385", 8],

  // 4 — Food & boissons
  ["traiteur",          "Traiteur",               "food-boissons", "UtensilsCrossed", "1555244162-803834f70033", 73, true],
  ["chef-prive",        "Chef privé",             "food-boissons", "ChefHat",         "1577219491135-ce391730fb2c", 26, true],
  ["patissier",         "Pâtissier",              "food-boissons", "CakeSlice",       "1535254973040-607b474cb50d", 34],
  ["bar-cocktails",     "Bar à cocktails",        "food-boissons", "Martini",         "1551024709-8f23befc6f87", 22],
  ["mixologue",         "Mixologue",              "food-boissons", "Martini",         "1514362545857-3bc16c4c7d1b", 14],
  ["sommelier",         "Sommelier",              "food-boissons", "Wine",            "1510812431401-41d2bd2722f3", 9],
  ["food-truck",        "Food truck",             "food-boissons", "Truck",           "1565299624946-b28f40a0ae38", 17],
  ["candy-bar",         "Candy bar",              "food-boissons", "Candy",           "1464349095431-e9a21285b5f3", 12],
  ["barista",           "Barista événementiel",   "food-boissons", "Coffee",          "1495474472287-4d71bcdd2085", 8],

  // 5 — Lieux & expériences
  ["lieu-evenementiel", "Lieu de réception",      "lieux-experiences", "Building2",   "1464366400600-7168b8af9bc3", 59, true],
  ["villa-privee",      "Villa privée",           "lieux-experiences", "Home",        "1613490493576-7fde63acd811", 21],
  ["rooftop",           "Rooftop",                "lieux-experiences", "Building",    "1517248135467-4c7edcad34c4", 14],
  ["domaine",           "Domaine",                "lieux-experiences", "Trees",       "1505236858219-8359eb29e329", 27],
  ["chateau",           "Château",                "lieux-experiences", "Castle",      "1533154683836-84ea7a0bc310", 19],
  ["restaurant-privatisable","Restaurant privatisable","lieux-experiences","UtensilsCrossed","1517248135467-4c7edcad34c4", 16],
  ["bateau",            "Bateau",                 "lieux-experiences", "Ship",        "1544551763-46a013bb70d5", 8],
  ["studio-photo",      "Studio photo",           "lieux-experiences", "Camera",      "1581291518857-4e27b48ff24e", 13],
  ["lieu-atypique",     "Lieu atypique",          "lieux-experiences", "Sparkles",    "1519671482749-fd09be7ccebf", 18],

  // 6 — Musique & animation
  ["dj",                "DJ",                     "musique-animation", "Disc3",       "1470229722913-7c0e2dbbafd3", 52, true],
  ["groupe-live",       "Groupe live",            "musique-animation", "Music",       "1429962714451-bb934ecdc4ec", 24],
  ["chanteur",          "Chanteur / Chanteuse",   "musique-animation", "Mic2",        "1493225457124-a3eb161ffa5f", 19],
  ["saxophoniste",      "Saxophoniste",           "musique-animation", "Music2",      "1415201364774-f6f0bb35f28f", 12],
  ["pianiste",          "Pianiste",               "musique-animation", "Piano",       "1520523839897-bd0b52f945a0", 10],
  ["magicien",          "Magicien",               "musique-animation", "Wand2",       "1500099817043-86d46000d58f", 11],
  ["animateur",         "Animateur",              "musique-animation", "Mic",         "1501281668745-f7f57925c3b4", 14],
  ["performers",        "Performers",             "musique-animation", "Drama",       "1516280440614-37939bbacd81", 9],
  ["officiant",         "Officiant",              "musique-animation", "Speech",      "1511795409834-ef04bbd61622", 7],
  ["son-lumiere",       "Son & lumière",          "musique-animation", "Lightbulb",   "1492684223066-81342ee5ff30", 16],

  // 7 — Organisation & coordination
  ["wedding-planner",   "Wedding planner",        "organisation-coordination", "ClipboardList", "1511795409834-ef04bbd61622", 31, true],
  ["event-planner",     "Event planner",          "organisation-coordination", "CalendarCheck", "1540575467063-178a50c2df87", 22],
  ["coordinateur",      "Coordinateur jour J",    "organisation-coordination", "ListChecks",    "1505373877841-8d25f7d46678", 15],
  ["concierge-event",   "Concierge événementiel", "organisation-coordination", "ConciergeBell", "1566073771259-6a8506099945", 8],
  ["hotesse",           "Hôtesse d'accueil",      "organisation-coordination", "Users",         "1556761175-5973dc0f32e7", 13],
  ["securite",          "Sécurité événementielle","organisation-coordination", "Shield",        "1521791136064-7986c2920216", 9],
  ["voiture-prestige",  "Voiture de prestige",    "organisation-coordination", "Car",           "1503376780353-7e6692767b70", 11],
  ["chauffeur",         "Chauffeur privé",        "organisation-coordination", "Car",           "1449965408869-eaa3f722e40d", 7],
  ["transport-invites", "Transport invités",      "organisation-coordination", "Bus",           "1544620347-c4fd4a3d5957", 6],

  // 8 — Marques & événements pro
  ["photographe-corporate","Photographe corporate","marques-pro", "Camera",          "1505373877841-8d25f7d46678", 17],
  ["videaste-corporate", "Vidéaste corporate",    "marques-pro", "Video",            "1574717024653-61fd2cf4d44d", 14],
  ["scenographie-marque","Scénographie marque",   "marques-pro", "Frame",            "1540575467063-178a50c2df87", 10],
  ["staff-evenementiel", "Staff événementiel",    "marques-pro", "Users",            "1556761175-5973dc0f32e7", 12],
  ["regie",              "Régie technique",       "marques-pro", "SlidersHorizontal","1516280440614-37939bbacd81", 8],
  ["stand-design",       "Stand design",          "marques-pro", "LayoutGrid",       "1540575467063-178a50c2df87", 7],
  ["social-media-creator","Créateur contenu social media","marques-pro","Clapperboard","1535016120720-40c646be5580", 15],
];

export const CATEGORIES: Category[] = ROWS.map(([slug, name, family, icon, cover, count, popular], i) => ({
  id: `c${i + 1}`,
  slug,
  name,
  family,
  familyName: FAMILY_NAME[family],
  icon,
  coverUrl: u(cover),
  vendorCount: count,
  popular: Boolean(popular),
  description: `${name} sélectionné·e·s pour vos moments d'exception — comparez, contactez et réservez sur Lystra.`,
}));

export const POPULAR_CATEGORY_SLUGS = CATEGORIES.filter((c) => c.popular).map((c) => c.slug);

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
export function getCategoryName(slug: string) {
  return getCategory(slug)?.name ?? slug;
}
export function categoriesByFamily(family: FamilySlug) {
  return CATEGORIES.filter((c) => c.family === family);
}
