import { CheckCircle2, CreditCard, Download } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PricingCard } from "@/components/marketing/pricing-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/lib/stripe/plans";

const CURRENT = "pro";

const INVOICES = [
  { id: "INV-2026-006", date: "1 juin 2026", amount: "49,00 €", status: "Payée" },
  { id: "INV-2026-005", date: "1 mai 2026", amount: "49,00 €", status: "Payée" },
  { id: "INV-2026-004", date: "1 avril 2026", amount: "49,00 €", status: "Payée" },
];

export default function VendorSubscriptionPage() {
  const current = PLANS.find((p) => p.id === CURRENT);

  return (
    <DashboardShell
      role="vendor"
      title="Abonnement"
      subtitle="Gérez votre formule et votre facturation."
      userName="Atelier Roselia"
    >
      {/* Current plan */}
      <div className="card-premium rounded-2xl border-lystra-champagne/25 bg-lystra-plum p-6 text-lystra-cream">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs uppercase tracking-[0.2em] text-lystra-champagne">Formule actuelle</p>
              <Badge variant="champagne" className="bg-lystra-champagne text-lystra-ink">Active</Badge>
            </div>
            <h2 className="mt-2 font-serif text-3xl">{current?.name}</h2>
            <p className="mt-1 text-sm text-lystra-cream/75">{current?.tagline}</p>
          </div>
          <div className="text-right">
            <p className="font-serif text-4xl">{current?.price}€<span className="text-base text-lystra-cream/70">{current?.cadence}</span></p>
            <p className="mt-1 text-xs text-lystra-cream/60">Prochain prélèvement le 1 juillet 2026</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="outline" className="border-lystra-champagne/40 text-lystra-cream hover:bg-white/10">
            <CreditCard className="h-4 w-4" /> Gérer le paiement
          </Button>
          <Button variant="ghost" className="text-lystra-cream/80 hover:bg-white/10 hover:text-lystra-cream">
            Résilier
          </Button>
        </div>
      </div>

      {/* Plan switch */}
      <div className="mt-10">
        <h2 className="font-serif text-xl text-lystra-ink">Changer de formule</h2>
        <p className="mt-1 text-sm text-lystra-gray">Évoluez à tout moment, sans engagement.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3 md:items-stretch">
          {PLANS.map((plan) => (
            <div key={plan.id} className="relative">
              {plan.id === CURRENT && (
                <span className="absolute -top-2 right-4 z-10 inline-flex items-center gap-1 rounded-full bg-lystra-ink px-2.5 py-1 text-[0.65rem] font-medium text-lystra-cream">
                  <CheckCircle2 className="h-3 w-3" /> Formule actuelle
                </span>
              )}
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </div>

      {/* Billing history */}
      <div className="mt-10">
        <h2 className="font-serif text-xl text-lystra-ink">Historique de facturation</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-lystra-champagne/25 bg-white/70">
          {INVOICES.map((inv, i) => (
            <div
              key={inv.id}
              className={`flex items-center justify-between gap-4 px-5 py-4 ${
                i > 0 ? "border-t border-lystra-champagne/15" : ""
              }`}
            >
              <div>
                <p className="font-medium text-lystra-ink">{inv.id}</p>
                <p className="text-sm text-lystra-gray">{inv.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-lystra-ink">{inv.amount}</span>
                <Badge variant="soft" className="text-emerald-700">{inv.status}</Badge>
                <Button variant="ghost" size="icon" aria-label="Télécharger">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
