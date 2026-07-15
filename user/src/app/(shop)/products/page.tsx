import { productService } from '@/services/product.service';
import { ProductFilters } from '@/types/product.types';
import ProductListingClient from '@/components/features/products/ProductListingClient';

interface ProductsPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
    featured?: string;
    sort?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Build filter object with proper types
  const filters: ProductFilters = {
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: searchParams.limit ? parseInt(searchParams.limit) : 12,
    search: searchParams.search || '',
    category: searchParams.category || '',
    featured: searchParams.featured === 'true' ? true : undefined,
    sort: (searchParams.sort as ProductFilters['sort']) || 'newest',
  };

  // Fetch initial data
  const initialData = await productService.getProducts(filters);

  return (
    <ProductListingClient
      initialProducts={initialData.products}
      initialPagination={initialData.pagination}
      initialFilters={filters}
    />
  );
}