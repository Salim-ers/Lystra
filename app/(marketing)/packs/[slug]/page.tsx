import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Check, Sparkles } from "lucide-react";
import { BUNDLES, getBundle } from "@/data/bundles";
import { getVendor } from "@/data/vendors";
import { BundleCard } from "@/components/marketplace/bundle-card";
import { VendorCard } from "@/components/marketplace/vendor-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return BUNDLES.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const bundle = getBundle(params.slug);
  if (!bundle) return { title: "Pack introuvable" };
  return {
    title: `${bundle.name} — pack ${bundle.eventType} à réserver`,
    description:
      bundle.description ??
      `${bundle.tagline} Une équipe complète coordonnée par Lystra, ${formatPrice(bundle.fromPrice, { from: true }).toLowerCase()}.`,
  };
}

export default function PackDetailPage({ params }: { params: { slug: string } }) {
  const bundle = getBundle(params.slug);
  if (!bundle) notFound();

  const vendors = (bundle.vendorSlugs ?? [])
    .map((slug) => getVendor(slug))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  const otherBundles = BUNDLES.filter((b) => b.slug !== bundle.slug);
  const composeHref = `/prestataires?event=${encodeURIComponent(bundle.eventType)}`;

  return (
    <div className="bg-lystra-ivory">
      {/* En-tête + image */}
      <section className="border-b border-lystra-champagne/20 bg-lystra-cream/50">
        <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
          <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2 text-lystra-gray">
            <Link href="/packs">
              <ChevronLeft className="h-4 w-4" /> Tous les packs
            </Link>
          </Button>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-lystra-champagne/30 shadow-lift">
              <Image
                src={bundle.coverUrl}
                alt={bundle.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lystra-ink/30 to-transparent" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="champagne">{bundle.eventType}</Badge>
                {bundle.badge && <Badge variant="elite">{bundle.badge}</Badge>}
              </div>
              <h1 className="display mt-4 text-4xl text-lystra-ink lg:text-5xl">{bundle.name}</h1>
              <p className="mt-4 text-pretty text-lg text-lystra-gray">{bundle.tagline}</p>
              {bundle.description && (
                <p className="mt-3 text-pretty leading-relaxed text-lystra-gray">{bundle.description}</p>
              )}

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-3xl text-lystra-ink">
                  {formatPrice(bundle.fromPrice, { from: true })}
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="champagne" size="lg">
                  <Link href="/conciergerie">
                    <Sparkles className="h-4 w-4" /> Demander ce pack
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={composeHref}>Composer ma sélection</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que comprend ce pack */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Inclus"
            title="Ce que comprend ce pack"
            intro="Chaque rôle est tenu par un talent sélectionné et vérifié par Lystra, coordonné pour votre événement."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {bundle.roles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center gap-2 rounded-full border border-lystra-champagne/30 bg-white/70 px-4 py-2 text-sm text-lystra-ink shadow-soft"
              >
                <Check className="h-4 w-4 text-lystra-champagne" />
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Talents inclus */}
      {vendors.length > 0 && (
        <section className="bg-lystra-cream/40 py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="L'équipe"
              title="Talents inclus dans ce pack"
              intro="Découvrez en avant-première une partie de l'équipe que nous réunissons pour vous."
            />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vendors.map((vendor) => (
                <VendorCard key={vendor.slug} vendor={vendor} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Autres packs */}
      {otherBundles.length > 0 && (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading eyebrow="À explorer" title="Autres packs" />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherBundles.map((b) => (
                <BundleCard key={b.slug} bundle={b} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
