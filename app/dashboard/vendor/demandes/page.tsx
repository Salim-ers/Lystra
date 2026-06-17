import { Calendar, Users, MapPin, MessageSquare } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { formatDateFr } from "@/lib/utils";

const REQUESTS = [
  {
    id: "r1",
    client: "Marie Lambert",
    event: "Mariage",
    date: "2026-09-12",
    city: "Bordeaux",
    guests: 120,
    status: "pending",
    message: "Nous cherchons une scénographie florale champêtre, tons blanc et eucalyptus, pour la cérémonie et la réception.",
  },
  {
    id: "r2",
    client: "Thomas Renaud",
    event: "Anniversaire",
    date: "2026-07-04",
    city: "Paris",
    guests: 40,
    status: "quoted",
    message: "Décoration florale pour un dîner d'anniversaire dans un loft. Budget autour de 800 €.",
  },
  {
    id: "r3",
    client: "Sophie Marchand",
    event: "Baptême",
    date: "2026-10-20",
    city: "Versailles",
    guests: 60,
    status: "accepted",
    message: "Arche florale et compositions de table pour un baptême en extérieur.",
  },
];

export default function VendorRequestsPage() {
  return (
    <DashboardShell
      role="vendor"
      title="Demandes entrantes"
      subtitle="Répondez rapidement pour maximiser vos chances de réservation."
      userName="Atelier Roselia"
    >
      <div className="space-y-4">
        {REQUESTS.map((r) => (
          <div key={r.id} className="card-premium rounded-2xl border-lystra-champagne/25 bg-white/70 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <h3 className="font-serif text-lg text-lystra-ink">{r.client}</h3>
                <StatusBadge status={r.status} />
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-lystra-gray">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-lystra-champagne" /> {formatDateFr(r.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-lystra-champagne" /> {r.city}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-lystra-champagne" /> {r.guests} invités
                </span>
              </div>
            </div>

            <p className="mt-3 text-pretty text-sm text-lystra-gray">“{r.message}”</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {r.status === "pending" ? (
                <>
                  <Button size="sm">Envoyer un devis</Button>
                  <Button size="sm" variant="outline">Refuser</Button>
                </>
              ) : (
                <Button size="sm" variant="outline">
                  <MessageSquare className="h-4 w-4" /> Discuter
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
