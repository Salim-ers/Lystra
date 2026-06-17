import type { Vendor } from "@/types";
import { VendorCard } from "./vendor-card";
import { EmptyState } from "@/components/shared/empty-state";

export function VendorGrid({ vendors }: { vendors: Vendor[] }) {
  if (vendors.length === 0) {
    return (
      <EmptyState
        title="Aucun prestataire trouvé"
        description="Essayez d'élargir vos filtres ou de changer de ville pour découvrir d'autres talents."
      />
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {vendors.map((v, i) => (
        <VendorCard key={v.id} vendor={v} priority={i < 3} />
      ))}
    </div>
  );
}
