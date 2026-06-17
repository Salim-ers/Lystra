import { Suspense } from "react";
import type { Metadata } from "next";
import { MarketplaceClient } from "@/components/marketplace/marketplace-client";
import { LoadingGrid } from "@/components/shared/loading-state";

export const metadata: Metadata = {
  title: "Tous les talents — beauté, image, déco, lieux & événementiel",
  description:
    "Parcourez, comparez et réservez les meilleurs talents premium de Lystra : coiffeurs, maquilleurs, photographes, vidéastes, fleuristes, traiteurs, DJ, lieux et bien plus — pour tous vos moments d'exception.",
};

export default function PrestatairesPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><LoadingGrid count={9} /></div>}>
      <MarketplaceClient />
    </Suspense>
  );
}
