"use client";
import * as React from "react";
import { CalendarDays, MessageCircle, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { Vendor } from "@/types";
import { formatPrice } from "@/lib/utils";
import { EVENT_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

  const service = vendor.services.find((s) => s.id === serviceId);
  const estimate = service?.price ?? vendor.startingPrice;

  return (
    <div className="rounded-3xl border border-lystra-champagne/30 bg-lystra-cream/90 p-6 shadow-card">
      <div className="flex items-baseline justify-between">
        <p className="text-sm text-lystra-gray">À partir de</p>
        <p className="font-serif text-2xl text-lystra-ink">{formatPrice(vendor.startingPrice)}</p>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <Label className="mb-1.5 block text-xs uppercase tracking-wide text-lystra-gray">Prestation</Label>
          <Select value={serviceId} onValueChange={setServiceId}>
            <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
            <SelectContent>
              {vendor.services.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.title} — {formatPrice(s.price)}</SelectItem>
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
      </div>

      <div className="mt-5 flex items-center justify-between rounded-2xl bg-lystra-plum/5 px-4 py-3">
        <span className="text-sm text-lystra-gray">Estimation</span>
        <span className="font-serif text-lg text-lystra-ink">{formatPrice(estimate)}</span>
      </div>

      <div className="mt-5 space-y-2.5">
        <RequestDialog vendor={vendor} kind="quote" date={date} eventType={eventType} service={service?.title} />
        <RequestDialog vendor={vendor} kind="book" date={date} eventType={eventType} service={service?.title} />
        <Button variant="ghost" className="w-full gap-2 text-lystra-plum">
          <MessageCircle className="h-4 w-4" /> Envoyer un message
        </Button>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-lystra-gray">
        <ShieldCheck className="h-3.5 w-3.5 text-lystra-champagne" />
        Paiement sécurisé · acompte 30% à la réservation
      </p>
    </div>
  );
}

function RequestDialog({
  vendor, kind, date, eventType, service,
}: {
  vendor: Vendor;
  kind: "quote" | "book";
  date: string;
  eventType?: string;
  service?: string;
}) {
  const [sent, setSent] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const label = kind === "quote" ? "Demander un devis" : "Réserver";

  return (
    <Dialog onOpenChange={(o) => !o && setSent(false)}>
      <DialogTrigger asChild>
        <Button variant={kind === "quote" ? "default" : "champagne"} className="w-full">{label}</Button>
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
                {date ? `Le ${date}.` : "Précisez votre date et vos besoins ci-dessous."}
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
                Envoyer ma demande
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
