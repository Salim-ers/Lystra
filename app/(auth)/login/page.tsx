"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 900);
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-lystra-ink">Bon retour sur Lystra</h1>
      <p className="mt-2 text-sm text-lystra-gray">
        Connectez-vous pour retrouver vos prestataires et vos réservations.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lystra-gray" />
            <Input id="email" type="email" placeholder="vous@exemple.com" className="pl-10" required />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <Link href="/forgot-password" className="text-xs text-lystra-plum hover:underline">
              Oublié ?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lystra-gray" />
            <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Connexion…" : "Se connecter"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs uppercase tracking-wider text-lystra-gray">ou</span>
        <Separator className="flex-1" />
      </div>

      <Button variant="outline" size="lg" className="w-full">
        Continuer avec Google
      </Button>

      <p className="mt-8 text-center text-sm text-lystra-gray">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-medium text-lystra-plum hover:underline">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}
