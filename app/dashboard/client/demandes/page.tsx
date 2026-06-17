import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { formatDateFr, formatPrice } from "@/lib/utils";

const REQUESTS = [
  {
    id: "r1",
    vendor: "Atelier Roselia",
    slug: "atelier-roselia",
    category: "Fleuristes",
    event: "Anniversaire",
    date: "2026-09-12",
    status: "quoted",
    amount: 2400,
    message: "Bonjour, nous cherchons une scénographie florale champêtre pour 120 invités…",
  },
  {
    id: "r2",
    vendor: "Lumière Studio",
    slug: "lumiere-studio",
    category: "Photographes",
    event: "Soirée privée",
    date: "2026-09-12",
    status: "pending",
    amount: null,
    message: "Disponibilité pour un reportage photo sur la soirée complète ?",
  },
  {
    id: "r3",
    vendor: "Éclat Traiteur",
    slug: "eclat-traiteur",
    category: "Traiteurs",
    event: "Mariage",
    date: "2026-09-12",
    status: "accepted",
    amount: 6800,
    message: "Menu gastronomique en 5 services, avec option végétarienne.",
  },
];

export default function ClientRequestsPage() {
  return (
    <DashboardShell
      role="client"
      title="Mes demandes"
      subtitle="Suivez l'avancement de vos demandes de devis."
    >
      <div className="space-y-4">
        {REQUESTS.map((r) => (
          <div
            key={r.id}
            className="card-premium rounded-2xl border-lystra-champagne/25 bg-white/70 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/prestataires/${r.slug}`}
                    className="font-serif text-lg text-lystra-ink hover:text-lystra-plum"
                  >
                    {r.vendor}
                  </Link>
                  <StatusBadge status={r.status} />
                </div>
                <p className="mt-0.5 text-sm text-lystra-gray">
                  {r.category} · {r.event} · {formatDateFr(r.date)}
                </p>
              </div>
              <span className="font-serif text-lg text-lystra-ink">
                {r.amount ? formatPrice(r.amount) : "En attente de devis"}
              </span>
            </div>

            <p className="mt-3 text-pretty text-sm text-lystra-gray">“{r.message}”</p>

            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" asChild>
                <Link href="/dashboard/client/messages">
                  <MessageSquare className="h-4 w-4" /> Message
                </Link>
              </Button>
              {r.status === "quoted" && (
                <Button size="sm">
                  Accepter le devis <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
