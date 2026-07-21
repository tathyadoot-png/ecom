import type { Metadata } from 'next';
import { productService } from '@/services/product.service';
import { ProductFilters } from '@/types/product.types';
import ProductListingClient from '@/components/features/products/ProductListingClient';
import { SITE } from '@/constants/site';

// Canonical stays fixed to the base path regardless of ?category=/
// ?sort=/?page= — those are filter permutations of the same page,
// not distinct content, so they shouldn't be treated as separate URLs.
export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse our full collection of handcrafted products from Indian artisans.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Shop All Products',
    description: 'Browse our full collection of handcrafted products from Indian artisans.',
    url: `${SITE.url}/products`,
  },
};

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
    featured?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;

  // Build filter object with proper types
  const filters: ProductFilters = {
    page: resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1,
    limit: resolvedSearchParams.limit ? parseInt(resolvedSearchParams.limit) : 12,
    search: resolvedSearchParams.search || '',
    category: resolvedSearchParams.category || '',
    featured: resolvedSearchParams.featured === 'true' ? true : undefined,
    sort: (resolvedSearchParams.sort as ProductFilters['sort']) || 'newest',
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