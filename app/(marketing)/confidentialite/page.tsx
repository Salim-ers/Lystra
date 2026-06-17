import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données personnelles (RGPD) de Lystra.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <div className="bg-lystra-ivory">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <p className="eyebrow">Vos données</p>
        <h1 className="display mt-3 text-4xl text-lystra-ink lg:text-5xl">Politique de confidentialité</h1>
        <div className="mt-8 space-y-6 text-pretty leading-relaxed text-lystra-gray">
          <p>Lystra accorde une importance particulière à la protection de vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD).</p>
          <section>
            <h2 className="font-serif text-xl text-lystra-ink">Données collectées</h2>
            <p className="mt-2">Identité, coordonnées, informations de réservation et de paiement, échanges avec les talents. [À détailler.]</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-lystra-ink">Finalités</h2>
            <p className="mt-2">Mise en relation, gestion des réservations et paiements, support et amélioration du service. [À détailler.]</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-lystra-ink">Vos droits</h2>
            <p className="mt-2">Accès, rectification, effacement, portabilité et opposition. Pour exercer vos droits : [adresse e-mail].</p>
          </section>
          <p className="text-sm italic text-lystra-gray/80">Contenu à compléter avec votre politique RGPD complète avant mise en production.</p>
        </div>
      </div>
    </div>
  );
}
