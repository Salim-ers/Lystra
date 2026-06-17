import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { EventBundle } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function BundleCard({ bundle }: { bundle: EventBundle }) {
  return (
    <Link
      href={`/packs/${bundle.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-lystra-champagne/25 bg-white/70 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={bundle.coverUrl}
          alt={bundle.name}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lystra-ink/55 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="champagne">{bundle.eventType}</Badge>
          {bundle.badge && <Badge variant="elite">{bundle.badge}</Badge>}
        </div>
        <h3 className="absolute inset-x-0 bottom-0 p-4 font-serif text-xl text-lystra-cream">{bundle.name}</h3>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-relaxed text-lystra-gray">{bundle.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {bundle.roles.slice(0, 4).map((r) => (
            <span key={r} className="rounded-full bg-lystra-plum/[0.06] px-2.5 py-0.5 text-[0.7rem] text-lystra-plum">
              {r}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-lystra-champagne/15 pt-4">
          <p className="font-serif text-lg text-lystra-ink">{formatPrice(bundle.fromPrice, { from: true })}</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-lystra-plum">
            Découvrir <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
