export interface Category {
  _id: string;

  name: string;

  slug: string;
}

export interface Product {
  _id: string;

  title: string;

  slug: string;

  description: string;

  shortDescription?: string;

  category?: Category;

  price: number;

  salePrice?: number;

  stock: number;

  images: string[];

  featured: boolean;

  isActive: boolean;

  status: "draft" | "published";
}