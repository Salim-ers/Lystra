import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import { SITE } from "@/lib/constants";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-lystra-ivory">
      {/* Brand panel */}
      <div className="relative hidden w-[44%] flex-col justify-between overflow-hidden bg-plum-deep p-12 text-lystra-cream lg:flex">
        <RibbonMark
          className="pointer-events-none absolute -bottom-20 -right-20 h-[30rem] w-[30rem] text-lystra-champagne/10"
          withDots={false}
        />
        <Logo href="/" tone="light" />
        <div className="relative max-w-md">
          <RibbonMark className="mb-8 h-10 w-10 text-lystra-champagne" />
          <p className="display text-3xl leading-snug">
            « Lystra nous a permis de réserver des prestataires d'exception sans le moindre stress. »
          </p>
          <p className="mt-6 text-sm text-lystra-cream/70">
            Camille &amp; Antoine — Mariage à Bordeaux
          </p>
        </div>
        <p className="relative text-xs text-lystra-cream/50">
          {SITE.tagline} · {SITE.name}
        </p>
      </div>

      {/* Form area */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between px-6 py-6 lg:hidden">
          <Logo href="/" />
          <Link href="/" className="text-sm text-lystra-gray hover:text-lystra-ink">
            Retour
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
