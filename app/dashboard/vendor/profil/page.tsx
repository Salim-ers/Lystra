"use client";

import { Save } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ImageUploader } from "@/components/dashboard/image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/data/categories";
import { CITIES, EVENT_TYPES } from "@/lib/constants";
import { getVendor } from "@/data/vendors";

export default function VendorProfilePage() {
  const vendor = getVendor("atelier-roselia");

  return (
    <DashboardShell
      role="vendor"
      title="Mon profil"
      subtitle="Ces informations sont visibles par les clients."
      userName="Atelier Roselia"
      actions={
        <Button>
          <Save className="h-4 w-4" /> Enregistrer
        </Button>
      }
    >
      <div className="space-y-8">
        {/* Infos */}
        <section className="card-premium rounded-2xl border-lystra-champagne/25 bg-white/70 p-6">
          <h2 className="font-serif text-xl text-lystra-ink">Informations générales</h2>
          <Separator className="my-5" />
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="biz">Nom de l'entreprise</Label>
              <Input id="biz" defaultValue={vendor?.businessName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat">Catégorie</Label>
              <select
                id="cat"
                defaultValue={vendor?.category}
                className="flex h-11 w-full rounded-xl border border-lystra-champagne/30 bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-lystra-plum"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="tagline">Accroche</Label>
              <Input id="tagline" defaultValue={vendor?.tagline} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <select
                id="city"
                defaultValue={vendor?.city}
                className="flex h-11 w-full rounded-xl border border-lystra-champagne/30 bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-lystra-plum"
              >
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="radius">Rayon d'intervention (km)</Label>
              <Input id="radius" type="number" defaultValue={vendor?.serviceRadiusKm ?? 50} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" rows={5} defaultValue={vendor?.description} />
            </div>
          </div>
        </section>

        {/* Event types */}
        <section className="card-premium rounded-2xl border-lystra-champagne/25 bg-white/70 p-6">
          <h2 className="font-serif text-xl text-lystra-ink">Types d'événements</h2>
          <p className="mt-1 text-sm text-lystra-gray">Sélectionnez les événements que vous couvrez.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {EVENT_TYPES.map((ev) => {
              const active = vendor?.eventTypes?.includes(ev);
              return (
                <span
                  key={ev}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? "border-lystra-plum bg-lystra-plum/5 text-lystra-plum"
                      : "border-lystra-champagne/30 text-lystra-gray hover:border-lystra-champagne/60"
                  }`}
                >
                  {ev}
                </span>
              );
            })}
          </div>
        </section>

        {/* Portfolio */}
        <section className="card-premium rounded-2xl border-lystra-champagne/25 bg-white/70 p-6">
          <h2 className="font-serif text-xl text-lystra-ink">Portfolio</h2>
          <p className="mt-1 text-sm text-lystra-gray">La première photo sert de couverture.</p>
          <div className="mt-5">
            <ImageUploader
              initial={(vendor?.photos ?? []).slice(0, 6).map((url, i) => ({ url, name: `Photo ${i + 1}` }))}
              max={12}
            />
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
