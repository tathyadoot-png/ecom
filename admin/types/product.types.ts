export interface Category {
  _id: string;

  name: string;

  slug: string;
}

export interface StoreOwner {
  _id: string;

  name: string;

  email: string;

  role: string;
}

export interface Store {
  _id: string;

  name: string;

  status: string;

  owner?: StoreOwner;
}

export interface Product {
  _id: string;

  title: string;

  slug: string;

  description: string;

  shortDescription?: string;

  category?: Category;

  storeId?: Store;

  price: number;

  salePrice?: number;

  stock: number;

  images: string[];

  featured: boolean;

  isActive: boolean;

  status:
    | "draft"
    | "pending"
    | "approved"
    | "rejected"
    | "published";

  createdAt: string;

  updatedAt: string;
}