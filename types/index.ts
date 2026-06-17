export type UserRole = "client" | "vendor" | "admin";
export type SubscriptionPlan = "starter" | "pro" | "elite";
export type BookingStatus =
  | "draft" | "pending" | "quoted" | "accepted" | "rejected"
  | "paid" | "confirmed" | "completed" | "cancelled" | "refunded";

/** Top-level service universe a category belongs to. */
export type FamilySlug =
  | "beaute-preparation"
  | "image-souvenirs"
  | "decoration-ambiance"
  | "food-boissons"
  | "lieux-experiences"
  | "musique-animation"
  | "organisation-coordination"
  | "marques-pro";

export interface Family {
  slug: FamilySlug;
  name: string;
  shortName: string;
  description: string;
  icon: string;        // lucide icon name
  coverUrl?: string;
}

/** Real-time availability signal shown on cards & profiles. */
export type AvailabilityKey =
  | "available" | "weekend" | "on-request" | "urgent" | "full";

export interface Category {
  id: string;
  slug: string;
  name: string;          // generic, never wedding-locked ("Photographe", not "Photo mariage")
  description?: string;
  icon?: string;         // lucide icon name
  coverUrl?: string;
  vendorCount?: number;
  family?: FamilySlug;
  familyName?: string;
  popular?: boolean;
}

export interface ServiceOption {
  id: string;
  label: string;
  price: number;
  priceUnit?: string;
}

export interface VendorService {
  id: string;
  title: string;
  description?: string;
  price: number;
  priceUnit?: string;    // forfait | par personne | par heure | par jour
  duration?: string;
  isPack?: boolean;
  popular?: boolean;
  deposit?: number;      // acompte fixe (sinon 30% calculé)
}

export interface Review {
  id: string;
  author: string;
  avatarUrl?: string;
  rating: number;
  quality?: number;
  communication?: number;
  punctuality?: number;
  value?: number;
  comment: string;
  date: string;
  eventType?: string;
}

/** Score-de-confiance signals (Malt/Airbnb style trust layer). */
export interface TrustSignals {
  identityVerified?: boolean;
  portfolioValidated?: boolean;
  reviewsVerified?: boolean;
  insured?: boolean;
  completedBookings?: number;
  acceptanceRate?: number;   // %
  responseRate?: number;     // %
}

export interface Vendor {
  id: string;
  slug: string;
  businessName: string;
  tagline?: string;
  description?: string;
  category: string;          // primary category slug
  categoryName: string;      // display label (may combine, e.g. "Coiffeuse & maquilleuse")
  secondaryCategories?: string[]; // additional category slugs
  family?: FamilySlug;
  city: string;
  zones?: string[];          // intervention zones / additional cities
  serviceRadiusKm?: number;
  startingPrice?: number;
  averageRating: number;
  reviewsCount: number;
  isVerified: boolean;
  isFeatured?: boolean;
  isElite?: boolean;
  homeService?: boolean;
  studioService?: boolean;
  onSiteService?: boolean;
  bookingEnabled?: boolean;  // réservation directe
  securePayment?: boolean;
  responseTime?: string;
  responseRate?: number;
  availability?: AvailabilityKey;
  trust?: TrustSignals;
  coverUrl: string;
  photos: string[];
  services: VendorService[];
  options?: ServiceOption[];
  reviews?: Review[];
  faq?: { q: string; a: string }[];
  instagramUrl?: string;
  websiteUrl?: string;
  eventTypes?: string[];     // use-cases couverts (Mariage, Anniversaire, Shooting…)
}

/** Multi-vendor event bundle ("Pack Mariage Civil", "Pack Anniversaire"…). */
export interface EventBundle {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description?: string;
  eventType: string;
  coverUrl: string;
  fromPrice: number;
  roles: string[];           // generic roles included (Coiffeuse, Photographe…)
  vendorSlugs?: string[];
  badge?: string;
}

export interface PricingPlan {
  id: SubscriptionPlan;
  name: string;
  price: number;
  cadence: string;
  tagline: string;
  highlighted?: boolean;
  features: string[];
  cta: string;
}
