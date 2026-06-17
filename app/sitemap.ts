import type { MetadataRoute } from "next";
import { SITE, CITIES, CITY_SLUGS, EVENT_SLUGS } from "@/lib/constants";
import { CATEGORIES } from "@/data/categories";
import { VENDORS, getVendorsByCategory, getVendorsByEvent } from "@/data/vendors";
import { BUNDLES } from "@/data/bundles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();
  const url = (path: string, priority = 0.6): MetadataRoute.Sitemap[number] => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority,
  });

  const statics = [
    url("/", 1), url("/prestataires", 0.9), url("/categories", 0.8),
    url("/packs", 0.8), url("/conciergerie", 0.7), url("/trouver", 0.7),
    url("/devenir-prestataire", 0.6), url("/pricing", 0.6),
    url("/mentions-legales", 0.3), url("/confidentialite", 0.3), url("/cgu", 0.3),
  ];

  const categoryPages = CATEGORIES.map((c) => url(`/${c.slug}`, 0.8));
  // On ne soumet QUE les combinaisons réellement peuplées (anti index bloat).
  const categoryCityPages = CATEGORIES.flatMap((c) => {
    const cv = getVendorsByCategory(c.slug);
    return CITIES.filter((city) => cv.some((v) => v.city === city))
      .map((city) => url(`/${c.slug}/${CITY_SLUGS[city]}`, 0.6));
  });
  const eventPages = EVENT_SLUGS.map((e) => url(`/evenement/${e.slug}`, 0.7));
  const eventCategoryPages = EVENT_SLUGS.flatMap((e) => {
    const ev = getVendorsByEvent(e.label);
    return CATEGORIES.filter((c) => ev.some((v) => v.category === c.slug || v.secondaryCategories?.includes(c.slug)))
      .map((c) => url(`/evenement/${e.slug}/${c.slug}`, 0.5));
  });
  const vendorPages = VENDORS.map((v) => url(`/prestataires/${v.slug}`, 0.7));
  const bundlePages = BUNDLES.map((b) => url(`/packs/${b.slug}`, 0.6));

  return [
    ...statics,
    ...categoryPages,
    ...categoryCityPages,
    ...eventPages,
    ...eventCategoryPages,
    ...vendorPages,
    ...bundlePages,
  ];
}
