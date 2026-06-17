import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "Conditions générales d'utilisation de la marketplace Lystra : réservation, paiement, commission et responsabilités.",
  alternates: { canonical: "/cgu" },
};

export default function CguPage() {
  return (
    <div className="bg-lystra-ivory">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <p className="eyebrow">Conditions</p>
        <h1 className="display mt-3 text-4xl text-lystra-ink lg:text-5xl">Conditions générales d&apos;utilisation</h1>
        <div className="mt-8 space-y-6 text-pretty leading-relaxed text-lystra-gray">
          <p>Les présentes conditions régissent l&apos;utilisation de la plateforme Lystra par les clients et les talents.</p>
          <section>
            <h2 className="font-serif text-xl text-lystra-ink">Objet</h2>
            <p className="mt-2">Lystra met en relation des clients et des talents de la beauté, de l&apos;image et de l&apos;événementiel, et permet la réservation et le paiement sécurisé des prestations. [À détailler.]</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-lystra-ink">Réservation & paiement</h2>
            <p className="mt-2">Devis, acompte, paiement sécurisé via Stripe et commission plateforme affichée avant confirmation. [À détailler.]</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-lystra-ink">Responsabilités</h2>
            <p className="mt-2">Rôle d&apos;intermédiaire de Lystra, obligations des talents et des clients, modération et résolution des litiges. [À détailler.]</p>
          </section>
          <p className="text-sm italic text-lystra-gray/80">Contenu à compléter avec vos CGU/CGV complètes avant mise en production.</p>
        </div>
      </div>
    </div>
  );
}
