export interface Category {
  _id: string;

  name: string;

  slug: string;

  description?: string;

  image: string;

  featured: boolean;

  displayOrder: number;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}