import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/marketing/site-shell";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteShell>
      <main className="relative overflow-hidden bg-ivory-fade">
        <RibbonMark withDots={false} className="pointer-events-none absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 text-lystra-champagne/[0.08]" />
        <div className="relative mx-auto max-w-2xl px-6 py-28 text-center">
          <p className="eyebrow justify-center">Erreur 404</p>
          <h1 className="display mt-4 text-4xl text-lystra-ink lg:text-5xl">Cette page est introuvable</h1>
          <p className="mx-auto mt-4 max-w-md text-lystra-gray">
            Le lien que vous avez suivi n&apos;existe pas ou plus. Explorez plutôt nos talents.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="champagne" size="lg" className="gap-2">
              <Link href="/prestataires">Explorer les prestataires <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
