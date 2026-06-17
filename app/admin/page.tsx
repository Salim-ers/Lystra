import Link from "next/link";
import {
  Users,
  Store,
  CalendarCheck,
  Euro,
  ShieldCheck,
  Check,
  X,
  Sparkles,
  Star,
  Tags,
  MapPin,
  PartyPopper,
  CreditCard,
  Flag,
  Gem,
  ConciergeBell,
  ArrowUpRight,
} from "lucide-react";
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

type EliteCandidate = {
  id: string;
  name: string;
  category: string;
  rating: string;
  bookings: number;
};

const PENDING: PendingVendor[] = [
  { id: "p1", name: "Maison Verveine", category: "Fleuristes", city: "Lyon", submitted: "Il y a 2 h" },
  { id: "p2", name: "Studio Halo", category: "Photographes", city: "Paris", submitted: "Il y a 5 h" },
  { id: "p3", name: "Les Tables d'Or", category: "Traiteurs", city: "Nice", submitted: "Hier" },
];

const ELITE: EliteCandidate[] = [
  { id: "e1", name: "Atelier Roselia", category: "Fleuristes", rating: "4,9", bookings: 87 },
  { id: "e2", name: "Lumière Studio", category: "Photographes", rating: "4,8", bookings: 64 },
];

const REVIEWS = [
  { id: "rv1", author: "Marie L.", vendor: "Atelier Roselia", rating: 5, flagged: false },
  { id: "rv2", author: "Anonyme", vendor: "Sonora Events", rating: 2, flagged: true },
  { id: "rv3", author: "Thomas R.", vendor: "Lumière Studio", rating: 5, flagged: false },
];

const REPORTS = [
  { id: "sg1", subject: "Profil « Éclat Traiteur »", reason: "Photos non conformes", time: "Il y a 1 h" },
  { id: "sg2", subject: "Avis sur « Sonora Events »", reason: "Propos déplacés", time: "Hier" },
];

const CONCIERGE = [
  { id: "cc1", client: "Camille P.", event: "Lancement de marque", city: "Paris", budget: "12 000 €", status: "Nouveau" },
  { id: "cc2", client: "Léa D.", event: "Gala d'entreprise", city: "Lyon", budget: "25 000 €", status: "En cours" },
  { id: "cc3", client: "Hugo M.", event: "EVJF", city: "Bordeaux", budget: "3 500 €", status: "Nouveau" },
];

const TAXONOMY = [
  { id: "tx-cat", icon: Tags, label: "Catégories (métiers)", value: "74 métiers", href: "#prestataires" },
  { id: "tx-city", icon: MapPin, label: "Villes couvertes", value: "10 villes", href: "#prestataires" },
  { id: "tx-event", icon: PartyPopper, label: "Types d'événements", value: "19 moments", href: "#conciergerie" },
];

const columns: Column<PendingVendor>[] = [
  { key: "name", header: "Talent", render: (r) => <span className="font-medium text-lystra-ink">{r.name}</span> },
  { key: "category", header: "Métier" },
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

const eliteColumns: Column<EliteCandidate>[] = [
  { key: "name", header: "Talent", render: (r) => <span className="font-medium text-lystra-ink">{r.name}</span> },
  { key: "category", header: "Métier" },
  { key: "rating", header: "Note", render: (r) => <span className="inline-flex items-center gap-1 text-lystra-ink"><Star className="h-3.5 w-3.5 text-lystra-champagne" />{r.rating}</span> },
  { key: "bookings", header: "Réservations", align: "right", render: (r) => <span className="text-lystra-ink">{r.bookings}</span> },
  {
    key: "actions",
    header: "",
    align: "right",
    render: () => (
      <div className="flex justify-end gap-2">
        <Button size="sm" className="h-8">
          <Gem className="h-3.5 w-3.5" /> Attribuer Elite
        </Button>
        <Button size="sm" variant="outline" className="h-8">
          <Sparkles className="h-3.5 w-3.5" /> Mettre en avant
        </Button>
      </div>
    ),
  },
];

const conciergeColumns: Column<(typeof CONCIERGE)[number]>[] = [
  { key: "client", header: "Client", render: (r) => <span className="font-medium text-lystra-ink">{r.client}</span> },
  { key: "event", header: "Moment" },
  { key: "city", header: "Ville" },
  { key: "budget", header: "Budget", align: "right", render: (r) => <span className="text-lystra-ink">{r.budget}</span> },
  {
    key: "status",
    header: "Statut",
    align: "right",
    render: (r) => (
      <Badge variant={r.status === "Nouveau" ? "champagne" : "soft"}>{r.status}</Badge>
    ),
  },
];

export default function AdminPage() {
  return (
    <DashboardShell
      role="admin"
      title="Administration"
      subtitle="Pilotez la marketplace, modérez les talents et orchestrez les moments."
      userName="Admin Lystra"
    >
      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard label="Utilisateurs" value="1 284" icon={Users} trend={{ value: "+62", positive: true }} hint="ce mois" />
        <DashboardStatCard label="Talents" value="218" icon={Store} trend={{ value: "+9", positive: true }} />
        <DashboardStatCard label="Réservations" value="73" icon={CalendarCheck} hint="ce mois" />
        <DashboardStatCard label="GMV" value="142 600 €" icon={Euro} trend={{ value: "+21 %", positive: true }} />
      </div>

      {/* Secondary KPIs */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard label="Commissions perçues" value="17 100 €" icon={CreditCard} hint="ce mois" />
        <DashboardStatCard label="Talents Elite" value="12" icon={Gem} hint="vitrine premium" />
        <DashboardStatCard label="Demandes conciergerie" value="3" icon={ConciergeBell} trend={{ value: "+2", positive: true }} />
        <DashboardStatCard label="Signalements" value="2" icon={Flag} hint="à traiter" />
      </div>

      {/* Taxonomy quick links */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {TAXONOMY.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.id}
              href={t.href}
              className="card-premium group flex items-center justify-between gap-3 rounded-2xl border-lystra-champagne/25 bg-white/70 p-5"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-lystra-champagne/15 text-lystra-plum">
                  <Icon className="h-[1.1rem] w-[1.1rem]" />
                </span>
                <span>
                  <span className="block text-sm text-lystra-gray">{t.label}</span>
                  <span className="block font-serif text-lg text-lystra-ink">{t.value}</span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-lystra-gray transition-colors group-hover:text-lystra-plum" />
            </Link>
          );
        })}
      </div>

      {/* Pending approvals */}
      <section id="prestataires" className="mt-10 scroll-mt-24">
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-lystra-plum" />
          <h2 className="font-serif text-xl text-lystra-ink">Talents en attente de validation</h2>
          <Badge variant="champagne">{PENDING.length}</Badge>
        </div>
        <AdminTable columns={columns} rows={PENDING} empty="Aucun talent en attente." />
      </section>

      {/* Elite & mise en avant */}
      <section id="elite" className="mt-10 scroll-mt-24">
        <div className="mb-4 flex items-center gap-2">
          <Gem className="h-5 w-5 text-lystra-plum" />
          <h2 className="font-serif text-xl text-lystra-ink">Badges Elite &amp; mise en avant</h2>
        </div>
        <p className="mb-4 text-sm text-lystra-gray">
          Distinguez les talents les plus performants et placez-les dans la vitrine premium.
        </p>
        <AdminTable columns={eliteColumns} rows={ELITE} empty="Aucun talent éligible." />
      </section>

      {/* Conciergerie */}
      <section id="conciergerie" className="mt-10 scroll-mt-24">
        <div className="mb-4 flex items-center gap-2">
          <ConciergeBell className="h-5 w-5 text-lystra-plum" />
          <h2 className="font-serif text-xl text-lystra-ink">Demandes de conciergerie</h2>
          <Badge variant="champagne">{CONCIERGE.length}</Badge>
        </div>
        <p className="mb-4 text-sm text-lystra-gray">
          Accompagnement sur mesure pour orchestrer les moments d'exception.
        </p>
        <AdminTable columns={conciergeColumns} rows={CONCIERGE} empty="Aucune demande de conciergerie." />
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Commission settings */}
        <section id="parametres" className="card-premium scroll-mt-24 rounded-2xl border-lystra-champagne/25 bg-white/70 p-6">
          <h2 className="font-serif text-xl text-lystra-ink">Commissions &amp; paiements</h2>
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
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-lystra-plum" />
            <h2 className="font-serif text-xl text-lystra-ink">Avis &amp; qualité des profils</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-lystra-champagne/25 bg-white/70">
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

      {/* Signalements */}
      <section id="signalements" className="mt-10 scroll-mt-24">
        <div className="mb-4 flex items-center gap-2">
          <Flag className="h-5 w-5 text-lystra-plum" />
          <h2 className="font-serif text-xl text-lystra-ink">Signalements</h2>
          <Badge variant="champagne">{REPORTS.length}</Badge>
        </div>
        <div className="overflow-hidden rounded-2xl border border-lystra-champagne/25 bg-white/70">
          {REPORTS.map((sg, i) => (
            <div
              key={sg.id}
              className={`flex items-center justify-between gap-3 px-5 py-4 ${
                i > 0 ? "border-t border-lystra-champagne/15" : ""
              }`}
            >
              <div>
                <p className="text-sm font-medium text-lystra-ink">{sg.subject}</p>
                <p className="text-xs text-lystra-gray">{sg.reason} · {sg.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">Ignorer</Button>
                <Button size="sm" variant="outline" className="h-8">
                  <X className="h-3.5 w-3.5" /> Retirer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
