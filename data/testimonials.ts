export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  event: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "On a trouvé notre photographe, notre maquilleuse et notre traiteur en une soirée. Tout au même endroit, tout vérifié. Lystra nous a fait gagner des semaines.",
    author: "Camille & Julien",
    role: "Clients",
    event: "Mariage · Domaine en Provence",
  },
  {
    quote:
      "Pour le lancement de notre collection, Lystra a réuni le lieu, le content creator et les hôtesses en 48h. Une vraie conciergerie.",
    author: "Sarah Lemoine",
    role: "Brand Manager",
    event: "Lancement de marque · Paris",
  },
  {
    quote:
      "J'ai réservé une coiffeuse à domicile pour mon shooting en deux clics, avec un acompte sécurisé. Exactement l'expérience que j'attendais.",
    author: "Inès K.",
    role: "Créatrice de contenu",
    event: "Shooting photo · Lyon",
  },
  {
    quote:
      "Depuis Lystra, je reçois des demandes vraiment qualifiées, pour des mariages comme pour des événements pro. Mon agenda se remplit avec mon univers.",
    author: "Atelier Roselia",
    role: "Fleuriste",
    event: "Prestataire Elite · Paris",
  },
];

export const TRUST_POINTS = [
  { icon: "BadgeCheck", title: "Talents vérifiés", text: "Identité, portfolio et avis validés avant mise en avant." },
  { icon: "ShieldCheck", title: "Paiement sécurisé", text: "Acompte ou paiement complet protégé, géré par Stripe." },
  { icon: "Star", title: "Avis authentiques", text: "Les avis proviennent uniquement de réservations réalisées." },
  { icon: "ConciergeBell", title: "Conciergerie dédiée", text: "Confiez-nous votre recherche, recevez une shortlist sur mesure." },
];
