"use client";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search, X } from "lucide-react";
import { VENDORS } from "@/data/vendors";
import { getCategory, getFamily } from "@/data/categories";
import {
  VendorFilters, applyVendorFilters, DEFAULT_FILTERS, SORT_OPTIONS,
  type VendorFilterState, type SortKey,
} from "./vendor-filters";
import { VendorGrid } from "./vendor-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose,
} from "@/components/ui/sheet";

const QUICK: { key: keyof VendorFilterState; label: string }[] = [
  { key: "availableSoon", label: "Disponible bientôt" },
  { key: "bookingOnly", label: "Réservation directe" },
  { key: "packsOnly", label: "Packs" },
  { key: "homeServiceOnly", label: "À domicile" },
  { key: "verifiedOnly", label: "Vérifiés" },
  { key: "eliteOnly", label: "Elite" },
];

export function MarketplaceClient() {
  const params = useSearchParams();

  const initial = React.useMemo<VendorFilterState>(() => ({
    ...DEFAULT_FILTERS,
    q: params.get("q") ?? "",
    family: params.get("family") ?? "all",
    category: params.get("category") ?? "all",
    city: params.get("city") ?? "all",
    eventType: params.get("event") ?? "all",
    sort: (params.get("sort") as SortKey) ?? "recommended",
  }), [params]);

  const [filters, setFilters] = React.useState<VendorFilterState>(initial);
  React.useEffect(() => setFilters(initial), [initial]);

  const results = React.useMemo(() => applyVendorFilters(VENDORS, filters), [filters]);
  const activeCategory = filters.category !== "all" ? getCategory(filters.category) : undefined;
  const activeFamily = filters.family !== "all" ? getFamily(filters.family) : undefined;

  const title = activeCategory?.name
    ?? activeFamily?.name
    ?? (filters.q ? `« ${filters.q} »` : "Tous les talents");

  const countActive =
    (filters.q ? 1 : 0) +
    (filters.family !== "all" ? 1 : 0) +
    (filters.category !== "all" ? 1 : 0) +
    (filters.city !== "all" ? 1 : 0) +
    (filters.eventType !== "all" ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0) +
    (filters.eliteOnly ? 1 : 0) +
    (filters.homeServiceOnly ? 1 : 0) +
    (filters.bookingOnly ? 1 : 0) +
    (filters.packsOnly ? 1 : 0) +
    (filters.availableSoon ? 1 : 0) +
    (filters.maxBudget < 7000 ? 1 : 0);

  const toggle = (key: keyof VendorFilterState) =>
    setFilters((f) => ({ ...f, [key]: !f[key] }));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <header className="border-b border-lystra-champagne/20 pb-6">
        <p className="eyebrow">Marketplace</p>
        <h1 className="display mt-2 text-3xl text-lystra-ink sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-lystra-gray">
          {results.length} talent{results.length > 1 ? "s" : ""}
          {filters.city !== "all" ? ` à ${filters.city}` : " en France"} · sélectionnés par Lystra
        </p>

        {/* Keyword search */}
        <div className="mt-5 flex max-w-xl items-center gap-2 rounded-full border border-lystra-champagne/30 bg-white/70 px-4 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-lystra-champagne" />
          <input
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            aria-label="Rechercher un talent"
            placeholder="Coiffeuse, photographe, traiteur, DJ…"
            className="w-full bg-transparent text-sm text-lystra-ink outline-none placeholder:text-lystra-gray/80"
          />
          {filters.q && (
            <button onClick={() => setFilters((f) => ({ ...f, q: "" }))} aria-label="Effacer" className="text-lystra-gray hover:text-lystra-ink">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Quick toggles */}
        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK.map((c) => {
            const active = Boolean(filters[c.key]);
            return (
              <button
                key={c.key}
                onClick={() => toggle(c.key)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                  active
                    ? "border-lystra-plum bg-lystra-plum text-lystra-cream"
                    : "border-lystra-champagne/40 bg-white/60 text-lystra-ink hover:border-lystra-champagne",
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[270px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-lystra-champagne/20 bg-white/50 p-6">
            <h2 className="mb-5 font-serif text-lg text-lystra-ink">Filtres</h2>
            <VendorFilters value={filters} onChange={setFilters} />
          </div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" /> Filtres
                  {countActive > 0 && <Badge variant="champagne" className="ml-1">{countActive}</Badge>}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                </SheetHeader>
                <div className="p-6 pt-2">
                  <VendorFilters value={filters} onChange={setFilters} />
                  <SheetClose asChild>
                    <Button variant="champagne" className="mt-6 w-full">
                      Voir {results.length} talent{results.length > 1 ? "s" : ""}
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center gap-2">
              <span className="hidden text-sm text-lystra-gray sm:inline">Trier par</span>
              <Select value={filters.sort} onValueChange={(v) => setFilters({ ...filters, sort: v as SortKey })}>
                <SelectTrigger className="w-[190px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <VendorGrid vendors={results} />
        </div>
      </div>
    </div>
  );
}
