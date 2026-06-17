import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/${category.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-lystra-champagne/20 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      {category.coverUrl && (
        <Image
          src={category.coverUrl}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-lystra-ink/85 via-lystra-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        {category.familyName && (
          <p className="text-[0.62rem] uppercase tracking-[0.18em] text-lystra-champagne/90">{category.familyName}</p>
        )}
        <h3 className="mt-0.5 font-serif text-lg leading-tight text-lystra-cream">{category.name}</h3>
        {category.vendorCount != null && (
          <p className="mt-0.5 text-xs text-lystra-cream/75">{category.vendorCount} talents</p>
        )}
      </div>
    </Link>
  );
}
