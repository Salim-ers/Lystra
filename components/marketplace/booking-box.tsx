"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, ShieldCheck, CheckCircle2, Zap, Loader2 } from "lucide-react";
import type { Vendor } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { EVENT_TYPES } from "@/lib/constants";
import { requestQuote, createBookingCheckout, type BookingInput } from "@/lib/actions/booking";
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
  const router = useRouter();
  const [serviceId, setServiceId] = React.useState(vendor.services[0]?.id ?? "");
  const [date, setDate] = React.useState("");
  const [eventType, setEventType] = React.useState(vendor.eventTypes?.[0] ?? "");
  const [guests, setGuests] = React.useState("");
  const [opts, setOpts] = React.useState<Record<string, boolean>>({});
  const [booking, setBooking] = React.useState(false);
  const [bookError, setBookError] = React.useState<string | null>(null);

  const service = vendor.services.find((s) => s.id === serviceId);
  const perPerson = service?.priceUnit?.includes("personne");
  const qty = perPerson ? Math.max(1, Number(guests) || 1) : 1;

  const base = (service?.price ?? vendor.startingPrice ?? 0) * qty;
  const optionsTotal = (vendor.options ?? [])
    .filter((o) => opts[o.id])
    .reduce((sum, o) => sum + (o.priceUnit?.includes("personne") ? o.price * qty : o.price), 0);
  const estimate = base + optionsTotal;
  const deposit = service?.deposit ?? Math.round(estimate * 0.3);

  const selectedOptions = (vendor.options ?? []).filter((o) => opts[o.id]).map((o) => o.label);

  function buildInput(message?: string): BookingInput {
    return {
      vendorSlug: vendor.slug,
      serviceTitle: service?.title,
      eventType: eventType || undefined,
      eventDate: date || undefined,
      guests: guests ? Number(guests) : undefined,
      estimate,
      message,
      options: selectedOptions,
    };
  }

  function goLogin() {
    router.push(`/login?redirect=/prestataires/${vendor.slug}`);
  }

  async function handleBook() {
    setBookError(null);
    setBooking(true);
    try {
      const res = await createBookingCheckout(buildInput());
      if ("url" in res) {
        window.location.assign(res.url);
        return;
      }
      if (res.needAuth) { goLogin(); return; }
      setBookError(res.error);
    } catch {
      setBookError("Le paiement n'a pas pu être initié. Réessayez.");
    } finally {
      setBooking(false);
    }
  }

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
            <SelectTrigger aria-label="Prestation ou pack"><SelectValue placeholder="Choisir" /></SelectTrigger>
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
            <Label htmlFor="booking-date" className="mb-1.5 block text-xs uppercase tracking-wide text-lystra-gray">Date</Label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lystra-champagne" />
              <Input id="booking-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="pl-9 [color-scheme:light]" />
            </div>
          </div>
          <div>
            <Label htmlFor="booking-guests" className="mb-1.5 block text-xs uppercase tracking-wide text-lystra-gray">Invités</Label>
            <Input id="booking-guests" type="number" min={1} placeholder="50" value={guests} onChange={(e) => setGuests(e.target.value)} />
          </div>
        </div>

        <div>
          <Label className="mb-1.5 block text-xs uppercase tracking-wide text-lystra-gray">Type d&apos;événement</Label>
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger aria-label="Type d'événement"><SelectValue placeholder="Choisir" /></SelectTrigger>
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
          <Button variant="champagne" className="w-full gap-2" onClick={handleBook} disabled={booking}>
            {booking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
            {booking ? "Redirection vers le paiement…" : `Réserver · acompte ${formatPrice(deposit)}`}
          </Button>
        )}
        <QuoteDialog vendor={vendor} buildInput={buildInput} onNeedAuth={goLogin} service={service?.title} date={date} eventType={eventType} />
      </div>

      {bookError && <p className="mt-3 text-center text-xs text-destructive">{bookError}</p>}

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-lystra-gray">
        <ShieldCheck className="h-3.5 w-3.5 text-lystra-champagne" />
        Paiement sécurisé · acompte 30% · sans frais cachés
      </p>
    </div>
  );
}

function QuoteDialog({
  vendor, buildInput, onNeedAuth, service, date, eventType,
}: {
  vendor: Vendor;
  buildInput: (message?: string) => BookingInput;
  onNeedAuth: () => void;
  service?: string;
  date: string;
  eventType?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState("");

  async function send() {
    setError(null);
    setPending(true);
    try {
      const res = await requestQuote(buildInput(message));
      if (res.ok) { setSent(true); return; }
      if (res.needAuth) { setOpen(false); onNeedAuth(); return; }
      setError(res.error);
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setSent(false); setError(null); } }}>
      <DialogTrigger asChild>
        <Button id="open-quote-dialog" variant="default" className="w-full">Demander un devis</Button>
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
              <DialogTitle>Demander un devis — {vendor.businessName}</DialogTitle>
              <DialogDescription>
                {service ? `Prestation : ${service}. ` : ""}{eventType ? `${eventType}. ` : ""}
                {date ? `Le ${date}. ` : ""}Précisez vos besoins ci-dessous.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <Label htmlFor="quote-msg" className="text-sm">Votre message</Label>
              <Textarea
                id="quote-msg"
                rows={4}
                placeholder="Décrivez votre événement, vos envies, le lieu…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
            <DialogFooter>
              <Button variant="champagne" className="w-full gap-2" onClick={send} disabled={pending}>
                {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                {pending ? "Envoi…" : "Envoyer ma demande"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
