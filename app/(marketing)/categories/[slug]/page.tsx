import { permanentRedirect } from "next/navigation";
import { CATEGORIES } from "@/data/categories";

/**
 * Ancienne route catégorie. La page canonique est désormais /[category]
 * (URL propre, optimisée SEO). Redirection 308 permanente pour consolider
 * le référencement et transférer le link equity.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default function LegacyCategoryRedirect({ params }: { params: { slug: string } }) {
  permanentRedirect(`/${params.slug}`);
}
