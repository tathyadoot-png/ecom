// types/product.types.ts
export type ProductStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'published';
export type InventoryStatus = 'in_stock' | 'out_of_stock';

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  } | string;
  price: number;
  salePrice: number;
  stock: number;
  inventoryStatus: InventoryStatus;
  images: string[];
  averageRating: number;
  numReviews: number;
  featured: boolean;
  isActive: boolean;
  status: ProductStatus;
  createdBy: string;
  storeId: {
    _id: string;
    name: string;
    slug: string;
    owner: {
      _id: string;
      name: string;
      avatar?: string;
    };
  } | string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: string;
  updatedAt: string;
}


export interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProductFilters {
  search?: string;
  category?: string;
  featured?: boolean;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'popular' | 'rating';
  page?: number;
  limit?: number;
}
