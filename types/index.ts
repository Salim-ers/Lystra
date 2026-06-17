export type UserRole = "client" | "vendor" | "admin";
export type SubscriptionPlan = "starter" | "pro" | "elite";
export type BookingStatus =
  | "draft" | "pending" | "quoted" | "accepted" | "rejected"
  | "paid" | "confirmed" | "completed" | "cancelled" | "refunded";

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;       // lucide icon name
  coverUrl?: string;
  vendorCount?: number;
}

export interface VendorService {
  id: string;
  title: string;
  description?: string;
  price: number;
  priceUnit?: string;   // forfait | par personne | par heure | par jour
  duration?: string;
  isPack?: boolean;
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

export interface Vendor {
  id: string;
  slug: string;
  businessName: string;
  tagline?: string;
  description?: string;
  category: string;       // category slug
  categoryName: string;
  city: string;
  serviceRadiusKm?: number;
  startingPrice?: number;
  averageRating: number;
  reviewsCount: number;
  isVerified: boolean;
  isFeatured?: boolean;
  isElite?: boolean;
  homeService?: boolean;
  responseTime?: string;
  responseRate?: number;
  coverUrl: string;
  photos: string[];
  services: VendorService[];
  reviews?: Review[];
  instagramUrl?: string;
  websiteUrl?: string;
  eventTypes?: string[];
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
