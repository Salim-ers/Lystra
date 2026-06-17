import { Suspense } from "react";
import type { Metadata } from "next";
import { MarketplaceClient } from "@/components/marketplace/marketplace-client";
import { LoadingGrid } from "@/components/shared/loading-state";

export const metadata: Metadata = {
  title: "Prestataires événementiels",
  description:
    "Parcourez les prestataires événementiels premium de Lystra : fleuristes, photographes, traiteurs, décorateurs et lieux de réception sélectionnés.",
};

export default function PrestatairesPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><LoadingGrid count={9} /></div>}>
      <MarketplaceClient />
    </Suspense>
  );
}
