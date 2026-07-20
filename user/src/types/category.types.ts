export interface Category {
  _id: string;

  name: string;

  slug: string;

  description?: string;

  image: string;

  featured: boolean;

  displayOrder: number;

  isActive: boolean;

  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };

  createdAt: string;

  updatedAt: string;
}