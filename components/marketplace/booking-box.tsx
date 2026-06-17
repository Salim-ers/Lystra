"use client";
import * as React from "react";
import { CalendarDays, MessageCircle, ShieldCheck, CheckCircle2, Zap } from "lucide-react";
import type { Vendor } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { EVENT_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AvailabilityBadge } from "@/components/shared/availability-badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";

export function BookingBox({ vendor }: { vendor: Vendor }) {
  const [serviceId, setServiceId] = React.useState(vendor.services[0]?.id ?? "");
  const [date, setDate] = React.useState("");
  const [eventType, setEventType] = React.useState(vendor.eventTypes?.[0] ?? "");
  const [guests, setGuests] = React.useState("");
  const [opts, setOpts] = React.useState<Record<string, boolean>>({});

  const service = vendor.services.find((s) => s.id === serviceId);
  const perPerson = service?.priceUnit?.includes("personne");
  const qty = perPerson ? Math.max(1, Number(guests) || 1) : 1;

  const base = (service?.price ?? vendor.startingPrice ?? 0) * qty;
  const optionsTotal = (vendor.options ?? [])
    .filter((o) => opts[o.id])
    .reduce((sum, o) => sum + (o.priceUnit?.includes("personne") ? o.price * qty : o.price), 0);
  const estimate = base + optionsTotal;
  const deposit = service?.deposit ?? Math.round(estimate * 0.3);

  return (
    <div className="rounded-3xl border border-lystra-champagne/30 bg-lystra-cream/90 p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-lystra-gray">À partir de</p>
          <p className="font-serif text-2xl text-lystra-ink">{formatPrice(vendor.startingPrice)}</p>
        </div>
        <AvailabilityBadge status={vendor.availability} size="md" />
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <Label className="mb-1.5 block text-xs uppercase tracking-wide text-lystra-gray">Prestation / pack</Label>
          <Select value={serviceId} onValueChange={setServiceId}>
            <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
            <SelectContent>
              {vendor.services.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.isPack ? "★ " : ""}{s.title} — {formatPrice(s.price)}{s.priceUnit?.includes("personne") ? "/pers." : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="mb-1.5 block text-xs uppercase tracking-wide text-lystra-gray">Date</Label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lystra-champagne" />
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="pl-9 [color-scheme:light]" />
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block text-xs uppercase tracking-wide text-lystra-gray">Invités</Label>
            <Input type="number" min={1} placeholder="50" value={guests} onChange={(e) => setGuests(e.target.value)} />
          </div>
        </div>

        <div>
          <Label className="mb-1.5 block text-xs uppercase tracking-wide text-lystra-gray">Type d&apos;événement</Label>
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {vendor.options && vendor.options.length > 0 && (
          <div>
            <Label className="mb-2 block text-xs uppercase tracking-wide text-lystra-gray">Options</Label>
            <div className="space-y-2">
              {vendor.options.map((o) => (
                <label key={o.id} className="flex cursor-pointer items-center justify-between gap-3 text-sm text-lystra-ink">
                  <span className="flex items-center gap-2.5">
                    <Checkbox checked={Boolean(opts[o.id])} onCheckedChange={(c) => setOpts((p) => ({ ...p, [o.id]: Boolean(c) }))} />
                    {o.label}
                  </span>
                  <span className="text-lystra-gray">{o.price ? `+${formatPrice(o.price)}` : "Inclus"}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 space-y-2 rounded-2xl bg-lystra-plum/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-lystra-gray">Estimation</span>
          <span className="font-serif text-lg text-lystra-ink">{formatPrice(estimate)}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-lystra-gray">
          <span>Acompte à la réservation (30%)</span>
          <span className="font-medium text-lystra-ink">{formatPrice(deposit)}</span>
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {vendor.bookingEnabled && (
          <RequestDialog vendor={vendor} kind="book" date={date} eventType={eventType} service={service?.title} estimate={estimate} deposit={deposit} />
        )}
        <RequestDialog vendor={vendor} kind="quote" date={date} eventType={eventType} service={service?.title} estimate={estimate} deposit={deposit} />
        <Button variant="ghost" className="w-full gap-2 text-lystra-plum">
          <MessageCircle className="h-4 w-4" /> Envoyer un message
        </Button>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-lystra-gray">
        <ShieldCheck className="h-3.5 w-3.5 text-lystra-champagne" />
        Paiement sécurisé · acompte 30% · sans frais cachés
      </p>
    </div>
  );
}

function RequestDialog({
  vendor, kind, date, eventType, service, estimate, deposit,
}: {
  vendor: Vendor;
  kind: "quote" | "book";
  date: string;
  eventType?: string;
  service?: string;
  estimate: number;
  deposit: number;
}) {
  const [sent, setSent] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const label = kind === "quote" ? "Demander un devis" : "Réserver";

  return (
    <Dialog onOpenChange={(o) => !o && setSent(false)}>
      <DialogTrigger asChild>
        <Button variant={kind === "book" ? "champagne" : "default"} className={cn("w-full", kind === "book" && "gap-2")}>
          {kind === "book" && <Zap className="h-4 w-4" />}{label}
        </Button>
      </DialogTrigger>
      <DialogContent>
        {sent ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-lystra-champagne" />
            <DialogTitle>Demande envoyée</DialogTitle>
            <DialogDescription>
              {vendor.businessName} a bien reçu votre demande et vous répondra {vendor.responseTime ?? "rapidement"}.
              Retrouvez l&apos;échange dans votre espace client.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{label} — {vendor.businessName}</DialogTitle>
              <DialogDescription>
                {service ? `Prestation : ${service}. ` : ""}{eventType ? `${eventType}. ` : ""}
                {date ? `Le ${date}. ` : ""}
                {kind === "book"
                  ? `Acompte de ${formatPrice(deposit)} (estimation ${formatPrice(estimate)}).`
                  : "Précisez vos besoins ci-dessous."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <Label htmlFor="msg" className="text-sm">Votre message</Label>
              <Textarea
                id="msg"
                rows={4}
                placeholder="Décrivez votre événement, vos envies, le lieu…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="champagne" className="w-full" onClick={() => setSent(true)}>
                {kind === "book" ? `Réserver · acompte ${formatPrice(deposit)}` : "Envoyer ma demande"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
