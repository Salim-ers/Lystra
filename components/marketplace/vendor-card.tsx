import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Vendor } from "@/types";
import { RatingStars } from "@/components/shared/rating-stars";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { VerifiedBadge, EliteBadge } from "@/components/shared/verified-badge";
import { PriceBadge } from "@/components/shared/price-badge";

export function VendorCard({ vendor, priority = false }: { vendor: Vendor; priority?: boolean }) {
  return (
    <Link
      href={`/prestataires/${vendor.slug}`}
      className="group block overflow-hidden rounded-2xl border border-lystra-champagne/25 bg-white/70 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={vendor.coverUrl}
          alt={vendor.businessName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
        <div className="absolute right-3 top-3">
          <FavoriteButton vendorSlug={vendor.slug} />
        </div>
        {vendor.isElite && (
          <div className="absolute left-3 top-3">
            <EliteBadge />
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-lystra-ink/30 to-transparent" />
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-serif text-lg text-lystra-ink">{vendor.businessName}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-sm text-lystra-gray">
              <span className="truncate">{vendor.categoryName}</span>
              <span className="text-lystra-champagne/60">·</span>
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{vendor.city}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <RatingStars rating={vendor.averageRating} count={vendor.reviewsCount} />
          {vendor.isVerified && !vendor.isElite && <VerifiedBadge />}
        </div>

        <div className="flex items-center justify-between border-t border-lystra-champagne/15 pt-3">
          <PriceBadge price={vendor.startingPrice} />
          {vendor.responseTime && (
            <span className="text-xs text-lystra-gray">Répond {vendor.responseTime}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
