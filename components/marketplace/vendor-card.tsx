import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Home, Zap } from "lucide-react";
import type { Vendor } from "@/types";
import { formatPrice } from "@/lib/utils";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { VerifiedBadge, EliteBadge } from "@/components/shared/verified-badge";
import { AvailabilityBadge } from "@/components/shared/availability-badge";

export function VendorCard({ vendor, priority = false }: { vendor: Vendor; priority?: boolean }) {
  const zone = vendor.homeService ? "À domicile" : vendor.studioService ? "En studio" : "Sur lieu";
  const events = (vendor.eventTypes ?? []).slice(0, 3).join(" · ");

  return (
    <Link
      href={`/prestataires/${vendor.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-lystra-champagne/25 bg-white/70 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
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
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {vendor.isElite ? <EliteBadge /> : vendor.isVerified && <VerifiedBadge />}
        </div>
        <div className="absolute bottom-3 left-3">
          <AvailabilityBadge status={vendor.availability} className="bg-white/90 backdrop-blur-sm" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-serif text-lg text-lystra-ink">{vendor.businessName}</h3>
            <p className="truncate text-sm text-lystra-gray">{vendor.categoryName}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-lystra-champagne text-lystra-champagne" />
            <strong className="font-medium text-lystra-ink">{vendor.averageRating.toFixed(1)}</strong>
            <span className="text-lystra-gray">({vendor.reviewsCount})</span>
          </span>
        </div>

        <p className="flex items-center gap-1.5 text-sm text-lystra-gray">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-lystra-champagne" />
          <span className="truncate">{vendor.city}</span>
          <span className="text-lystra-champagne/50">·</span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            {vendor.homeService && <Home className="h-3 w-3" />}{zone}
          </span>
        </p>

        {events && <p className="truncate text-xs text-lystra-gray/90">{events}</p>}

        <div className="mt-auto flex items-center justify-between border-t border-lystra-champagne/15 pt-3">
          <p className="text-sm">
            <span className="text-lystra-gray">À partir de </span>
            <strong className="font-serif text-base text-lystra-ink">{formatPrice(vendor.startingPrice)}</strong>
          </p>
          {vendor.bookingEnabled ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-lystra-plum">
              <Zap className="h-3 w-3 text-lystra-champagne" /> Réservation directe
            </span>
          ) : (
            <span className="text-xs font-medium text-lystra-plum">Voir le profil →</span>
          )}
        </div>
      </div>
    </Link>
  );
}
