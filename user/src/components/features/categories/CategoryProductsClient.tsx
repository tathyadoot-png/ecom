'use client';

import { ProductGrid } from '@/components/features/products/ProductGrid';
import { ProductSkeletonGrid } from '@/components/features/products/ProductSkeletonGrid';
import { Pagination } from '@/components/ui/Pagination';
import { CategoryFilters } from './CategoryFilters';
import { CategoryEmptyState } from './CategoryEmptyState';
import { useProductListing } from '@/hooks/useProductListing';
import { Product, ProductsResponse, ProductFilters as ProductFiltersType } from '@/types/product.types';
import { Category } from '@/types/category.types';

interface CategoryProductsClientProps {
  category: Category;
  initialProducts: Product[];
  initialPagination: ProductsResponse['pagination'];
  initialFilters: ProductFiltersType;
}

const buildSearchParams = (filters: ProductFiltersType) => {
  const params = new URLSearchParams();
  if (filters.page && filters.page > 1) params.set('page', String(filters.page));
  if (filters.featured) params.set('featured', 'true');
  if (filters.sort && filters.sort !== 'newest') params.set('sort', filters.sort);
  return params;
};

// Mirrors ProductListingClient/SearchResults via the shared
// useProductListing hook (SSR-first, refetch on filter/page change,
// URL-synced) rather than a parallel implementation of the same job.
const CategoryProductsClient = ({
  category,
  initialProducts,
  initialPagination,
  initialFilters,
}: CategoryProductsClientProps) => {
  const { products, pagination, isLoading, filters, handleFilterChange, handlePageChange, handleSortChange } =
    useProductListing({ initialProducts, initialPagination, initialFilters, buildSearchParams });

  return (
    <div className="flex flex-col gap-6">
      <CategoryFilters
        featured={!!filters.featured}
        sort={filters.sort || 'newest'}
        totalCount={pagination.total}
        onFeaturedChange={(featured) => handleFilterChange({ featured: featured || undefined })}
        onSortChange={handleSortChange}
      />

      {isLoading ? (
        <ProductSkeletonGrid count={filters.limit || 12} />
      ) : products.length === 0 ? (
        <CategoryEmptyState categoryName={category.name} />
      ) : (
        <ProductGrid products={products} />
      )}

      {!isLoading && pagination.totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export { CategoryProductsClient };
