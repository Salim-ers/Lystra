import { Users, Store, CalendarCheck, Euro, ShieldCheck, Check, X } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { AdminTable, type Column } from "@/components/admin/admin-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PendingVendor = {
  id: string;
  name: string;
  category: string;
  city: string;
  submitted: string;
};

const PENDING: PendingVendor[] = [
  { id: "p1", name: "Maison Verveine", category: "Fleuristes", city: "Lyon", submitted: "Il y a 2 h" },
  { id: "p2", name: "Studio Halo", category: "Photographes", city: "Paris", submitted: "Il y a 5 h" },
  { id: "p3", name: "Les Tables d'Or", category: "Traiteurs", city: "Nice", submitted: "Hier" },
];

const REVIEWS = [
  { id: "rv1", author: "Marie L.", vendor: "Atelier Roselia", rating: 5, flagged: false },
  { id: "rv2", author: "Anonyme", vendor: "Sonora Events", rating: 2, flagged: true },
  { id: "rv3", author: "Thomas R.", vendor: "Lumière Studio", rating: 5, flagged: false },
];

const columns: Column<PendingVendor>[] = [
  { key: "name", header: "Prestataire", render: (r) => <span className="font-medium text-lystra-ink">{r.name}</span> },
  { key: "category", header: "Catégorie" },
  { key: "city", header: "Ville" },
  { key: "submitted", header: "Soumis" },
  {
    key: "actions",
    header: "",
    align: "right",
    render: () => (
      <div className="flex justify-end gap-2">
        <Button size="sm" className="h-8">
          <Check className="h-3.5 w-3.5" /> Valider
        </Button>
        <Button size="sm" variant="outline" className="h-8">
          <X className="h-3.5 w-3.5" /> Rejeter
        </Button>
      </div>
    ),
  },
];

export default function AdminPage() {
  return (
    <DashboardShell
      role="admin"
      title="Administration"
      subtitle="Pilotez la marketplace et modérez les contenus."
      userName="Admin Lystra"
    >
      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard label="Utilisateurs" value="1 284" icon={Users} trend={{ value: "+62", positive: true }} hint="ce mois" />
        <DashboardStatCard label="Prestataires" value="218" icon={Store} trend={{ value: "+9", positive: true }} />
        <DashboardStatCard label="Réservations" value="73" icon={CalendarCheck} hint="ce mois" />
        <DashboardStatCard label="GMV" value="142 600 €" icon={Euro} trend={{ value: "+21 %", positive: true }} />
      </div>

      {/* Pending approvals */}
      <section id="prestataires" className="mt-10 scroll-mt-24">
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-lystra-plum" />
          <h2 className="font-serif text-xl text-lystra-ink">Prestataires en attente</h2>
          <Badge variant="champagne">{PENDING.length}</Badge>
        </div>
        <AdminTable columns={columns} rows={PENDING} empty="Aucun prestataire en attente." />
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Commission settings */}
        <section id="parametres" className="card-premium scroll-mt-24 rounded-2xl border-lystra-champagne/25 bg-white/70 p-6">
          <h2 className="font-serif text-xl text-lystra-ink">Paramètres de commission</h2>
          <p className="mt-1 text-sm text-lystra-gray">Appliqués aux nouvelles réservations.</p>
          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rate">Taux de commission (%)</Label>
              <Input id="rate" type="number" defaultValue={12} min={8} max={15} />
              <p className="text-xs text-lystra-gray">Recommandé : entre 8 % et 15 %.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">Acompte par défaut (%)</Label>
              <Input id="deposit" type="number" defaultValue={30} />
            </div>
            <Button>Enregistrer les paramètres</Button>
          </div>
        </section>

        {/* Reviews moderation */}
        <section id="avis" className="scroll-mt-24">
          <h2 className="font-serif text-xl text-lystra-ink">Avis &amp; signalements</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-lystra-champagne/25 bg-white/70">
            {REVIEWS.map((rv, i) => (
              <div
                key={rv.id}
                className={`flex items-center justify-between gap-3 px-5 py-4 ${
                  i > 0 ? "border-t border-lystra-champagne/15" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-lystra-ink">
                    {rv.author} <span className="font-normal text-lystra-gray">→ {rv.vendor}</span>
                  </p>
                  <p className="text-xs text-lystra-gray">Note : {rv.rating}/5</p>
                </div>
                <div className="flex items-center gap-2">
                  {rv.flagged && <Badge className="bg-rose-100 text-rose-700">Signalé</Badge>}
                  <Button variant="ghost" size="sm">Modérer</Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
