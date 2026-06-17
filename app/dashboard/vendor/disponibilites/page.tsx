import { Save, Info } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { CalendarPicker } from "@/components/dashboard/calendar-picker";
import { Button } from "@/components/ui/button";

export default function VendorAvailabilityPage() {
  const booked = ["2026-06-28", "2026-07-04", "2026-10-20"];

  return (
    <DashboardShell
      role="vendor"
      title="Disponibilités"
      subtitle="Gérez votre calendrier pour éviter les conflits de réservation."
      userName="Atelier Roselia"
      actions={
        <Button>
          <Save className="h-4 w-4" /> Enregistrer
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
        <CalendarPicker initialBooked={booked} />

        <div className="card-premium rounded-2xl border-lystra-champagne/25 bg-white/70 p-6">
          <div className="flex items-center gap-2 text-lystra-plum">
            <Info className="h-4 w-4" />
            <h3 className="font-serif text-lg text-lystra-ink">Comment ça marche</h3>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-lystra-gray">
            <li>Les dates <span className="text-emerald-700">disponibles</span> sont visibles par les clients lors d'une demande.</li>
            <li>Bloquez les dates où vous êtes indisponible pour ne plus recevoir de demandes.</li>
            <li>Les dates <span className="text-lystra-plum">réservées</span> sont verrouillées automatiquement après confirmation.</li>
          </ul>

          <div className="mt-6 rounded-xl bg-lystra-cream/60 p-4">
            <p className="text-sm font-medium text-lystra-ink">Délai de réservation</p>
            <p className="mt-1 text-xs text-lystra-gray">
              Les clients peuvent réserver jusqu'à 48 h avant l'événement.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
