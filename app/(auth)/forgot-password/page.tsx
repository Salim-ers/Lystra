"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h1 className="mt-6 font-serif text-2xl text-lystra-ink">Vérifiez votre boîte mail</h1>
        <p className="mt-2 text-sm text-lystra-gray">
          Si un compte existe, vous recevrez un lien pour réinitialiser votre mot de passe.
        </p>
        <Button asChild variant="ghost" className="mt-8">
          <Link href="/login">
            <ArrowLeft className="h-4 w-4" /> Retour à la connexion
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-lystra-ink">Mot de passe oublié</h1>
      <p className="mt-2 text-sm text-lystra-gray">
        Saisissez votre email et nous vous enverrons un lien de réinitialisation.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lystra-gray" />
            <Input id="email" type="email" placeholder="vous@exemple.com" className="pl-10" required />
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full">
          Envoyer le lien
        </Button>
      </form>

      <Button asChild variant="ghost" className="mt-6 w-full">
        <Link href="/login">
          <ArrowLeft className="h-4 w-4" /> Retour à la connexion
        </Link>
      </Button>
    </div>
  );
}
