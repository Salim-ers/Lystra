"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Heart, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLANS } from "@/lib/stripe/plans";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { role?: string; plan?: string };
}) {
  const initialRole = searchParams.role === "vendor" ? "vendor" : "client";
  const [role, setRole] = useState<"client" | "vendor">(initialRole);
  const [submitting, setSubmitting] = useState(false);
  const plan = PLANS.find((p) => p.id === searchParams.plan);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 900);
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-lystra-ink">Créer votre compte</h1>
      <p className="mt-2 text-sm text-lystra-gray">
        {role === "vendor"
          ? "Rejoignez les talents d'exception de Lystra, réservés pour tous les moments."
          : "Trouvez et réservez les meilleurs talents pour tous vos moments."}
      </p>

      {/* Role switch */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setRole("client")}
          className={cn(
            "flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all",
            role === "client"
              ? "border-lystra-plum bg-lystra-plum/5 ring-1 ring-lystra-plum"
              : "border-lystra-champagne/30 hover:border-lystra-champagne/60",
          )}
        >
          <Heart className={cn("h-5 w-5", role === "client" ? "text-lystra-plum" : "text-lystra-gray")} />
          <span className="text-sm font-medium text-lystra-ink">Je suis client</span>
          <span className="text-xs text-lystra-gray">J'organise un événement</span>
        </button>
        <button
          type="button"
          onClick={() => setRole("vendor")}
          className={cn(
            "flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all",
            role === "vendor"
              ? "border-lystra-plum bg-lystra-plum/5 ring-1 ring-lystra-plum"
              : "border-lystra-champagne/30 hover:border-lystra-champagne/60",
          )}
        >
          <Briefcase className={cn("h-5 w-5", role === "vendor" ? "text-lystra-plum" : "text-lystra-gray")} />
          <span className="text-sm font-medium text-lystra-ink">Je suis prestataire</span>
          <span className="text-xs text-lystra-gray">Je propose mon talent</span>
        </button>
      </div>

      {role === "vendor" && plan && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-lystra-champagne/30 bg-lystra-cream/50 px-4 py-3 text-sm">
          <span className="text-lystra-gray">
            Offre sélectionnée : <span className="font-medium text-lystra-ink">{plan.name}</span>
          </span>
          <span className="font-serif text-lystra-ink">{plan.price}€{plan.cadence}</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{role === "vendor" ? "Nom de l'entreprise" : "Nom complet"}</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lystra-gray" />
            <Input id="name" placeholder={role === "vendor" ? "Atelier Roselia" : "Marie Lambert"} className="pl-10" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lystra-gray" />
            <Input id="email" type="email" placeholder="vous@exemple.com" className="pl-10" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lystra-gray" />
            <Input id="password" type="password" placeholder="8 caractères minimum" className="pl-10" required />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Création…" : role === "vendor" ? "Continuer vers l'onboarding" : "Créer mon compte"}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-lystra-gray">
        En créant un compte, vous acceptez nos{" "}
        <Link href="#" className="underline hover:text-lystra-ink">conditions</Link> et notre{" "}
        <Link href="#" className="underline hover:text-lystra-ink">politique de confidentialité</Link>.
      </p>

      <div className="my-6 flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs uppercase tracking-wider text-lystra-gray">ou</span>
        <Separator className="flex-1" />
      </div>

      <Button variant="outline" size="lg" className="w-full">
        Continuer avec Google
      </Button>

      <p className="mt-8 text-center text-sm text-lystra-gray">
        Déjà inscrit·e ?{" "}
        <Link href="/login" className="font-medium text-lystra-plum hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
