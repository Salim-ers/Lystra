import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CATEGORIES, getCategory } from "@/data/categories";
import { getVendorsByCategory } from "@/data/vendors";
import { VendorGrid } from "@/components/marketplace/vendor-grid";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategory(params.slug);
  if (!category) return { title: "Catégorie introuvable" };
  return {
    title: `${category.name} événementiels`,
    description: `Trouvez et réservez les meilleurs ${category.name.toLowerCase()} pour vos événements d'exception sur Lystra. ${category.description}`,
  };
}

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const vendors = getVendorsByCategory(params.slug);

  return (
    <div className="bg-lystra-ivory">
      <section className="border-b border-lystra-champagne/20 bg-lystra-cream/50">
        <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
          <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2 text-lystra-gray">
            <Link href="/categories">
              <ChevronLeft className="h-4 w-4" /> Toutes les catégories
            </Link>
          </Button>
          <p className="eyebrow text-lystra-champagne/90">Catégorie</p>
          <h1 className="display mt-3 text-4xl text-lystra-ink lg:text-5xl">{category.name}</h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-lystra-gray">
            {category.description} Comparez les profils, consultez les avis vérifiés et réservez en
            toute sérénité sur Lystra.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-lystra-gray">
              {vendors.length} prestataire{vendors.length > 1 ? "s" : ""} disponible
              {vendors.length > 1 ? "s" : ""}
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href={`/prestataires?category=${category.slug}`}>Affiner la recherche</Link>
            </Button>
          </div>
          <VendorGrid vendors={vendors} />
        </div>
      </section>
    </div>
  );
}
