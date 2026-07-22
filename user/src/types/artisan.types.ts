// types/artisan.types.ts
// Mirrors exactly what the public /api/artisans endpoints return (see
// backend/src/modules/artisans/artisan.service.ts's PUBLIC_STORE_SELECT).
// Every field beyond name/slug/owner is optional — a real artisan with
// none of these filled in is the normal case, not an edge case.

import { Product } from './product.types';

export interface ArtisanOwner {
  _id: string;
  name: string;
  avatar?: string;
}

export interface ArtisanSocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  website?: string;
}

export interface Artisan {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  banner?: string;
  coverImage?: string;
  portraitImage?: string;
  description?: string;
  story?: string;
  craft?: string;
  subCraft?: string;
  shortQuote?: string;
  craftPhilosophy?: string;
  yearsOfExperience?: number;
  generation?: number;
  inheritedFrom?: string;
  specialization?: string;
  state?: string;
  city?: string;
  village?: string;
  gallery?: string[];
  introVideo?: string;
  socialLinks?: ArtisanSocialLinks;
  googleMap?: string;
  customOrders?: boolean;
  leadTime?: string;
  featured?: boolean;
  verified?: boolean;
  displayOrder?: number;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  owner: ArtisanOwner;
  createdAt: string;
  productCount?: number;
}

export type ArtisanSort = 'newest' | 'experience' | 'alphabetical' | 'displayOrder';

export interface ArtisanFilters {
  page?: number;
  limit?: number;
  search?: string;
  state?: string;
  craft?: string;
  featured?: boolean;
  verified?: boolean;
  customOrders?: boolean;
  experienceMin?: number;
  sort?: ArtisanSort;
}

export interface ArtisansResponse {
  artisans: Artisan[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ArtisanProductsResponse {
  artisan: { name: string; slug: string };
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
