import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { VendorGrid } from "@/components/marketplace/vendor-grid";
import { getFeaturedVendors } from "@/data/vendors";

export default function ClientFavoritesPage() {
  const favorites = getFeaturedVendors(6);

  return (
    <DashboardShell
      role="client"
      title="Vos favoris"
      subtitle="Les talents que vous avez sauvegardés pour vos moments."
    >
      <VendorGrid vendors={favorites} />
    </DashboardShell>
  );
}
