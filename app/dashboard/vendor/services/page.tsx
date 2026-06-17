"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getVendor } from "@/data/vendors";
import { formatPrice } from "@/lib/utils";

export default function VendorServicesPage() {
  const vendor = getVendor("atelier-roselia");
  const [open, setOpen] = useState(false);
  const services = vendor?.services ?? [];

  return (
    <DashboardShell
      role="vendor"
      title="Services & packs"
      subtitle="Détaillez vos prestations et leurs tarifs."
      userName="Atelier Roselia"
      actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" /> Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-serif">Nouvelle prestation</DialogTitle>
              <DialogDescription>Ajoutez un service ou un pack à votre catalogue.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input id="title" placeholder="Bouquet de mariée" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sdesc">Description</Label>
                <Textarea id="sdesc" rows={3} placeholder="Composition sur mesure, fleurs de saison…" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sprice">Prix (€)</Label>
                  <Input id="sprice" type="number" placeholder="180" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sunit">Unité</Label>
                  <Input id="sunit" placeholder="forfait / personne…" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>Annuler</Button>
              <Button onClick={() => setOpen(false)}>Ajouter la prestation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      {services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-lystra-champagne/40 bg-white/50 p-12 text-center">
          <Package className="mx-auto h-8 w-8 text-lystra-gray" />
          <p className="mt-3 font-medium text-lystra-ink">Aucune prestation pour le moment</p>
          <p className="mt-1 text-sm text-lystra-gray">Ajoutez votre première prestation pour la rendre visible.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.id} className="card-premium rounded-2xl border-lystra-champagne/25 bg-white/70 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg text-lystra-ink">{s.title}</h3>
                    {s.isPack && <Badge variant="champagne">Pack</Badge>}
                  </div>
                  {s.description && <p className="mt-1 text-sm text-lystra-gray">{s.description}</p>}
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button variant="ghost" size="icon" aria-label="Modifier">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Supprimer">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-serif text-2xl text-lystra-ink">{formatPrice(s.price)}</span>
                {s.priceUnit && <span className="text-sm text-lystra-gray">/ {s.priceUnit}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
