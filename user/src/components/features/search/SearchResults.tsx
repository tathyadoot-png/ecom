'use client';

import { ProductGrid } from '@/components/features/products/ProductGrid';
import { ProductFilterSidebar } from '@/components/features/products/ProductFilterSidebar';
import { ProductSort } from '@/components/features/products/ProductSort';
import { ProductSkeletonGrid } from '@/components/features/products/ProductSkeletonGrid';
import { Pagination } from '@/components/ui/Pagination';
import { SearchHeader } from './SearchHeader';
import { SearchEmptyState } from './SearchEmptyState';
import { useProductListing } from '@/hooks/useProductListing';
import { Product, ProductsResponse, ProductFilters } from '@/types/product.types';

interface SearchResultsProps {
  query: string;
  initialProducts: Product[];
  initialPagination: ProductsResponse['pagination'];
  initialFilters: ProductFilters;
}

const buildSearchParams = (query: string) => (filters: ProductFilters) => {
  const params = new URLSearchParams();
  params.set('q', query);
  if (filters.page && filters.page > 1) params.set('page', String(filters.page));
  if (filters.category) params.set('category', filters.category);
  if (filters.featured) params.set('featured', 'true');
  if (filters.sort && filters.sort !== 'newest') params.set('sort', filters.sort);
  return params;
};

// Mirrors ProductListingClient/CategoryProductsClient via the shared
// useProductListing hook — same product data path (getProducts with a
// `search` param), same grid/filters/pagination, not a parallel
// implementation of any of them.
const SearchResults = ({ query, initialProducts, initialPagination, initialFilters }: SearchResultsProps) => {
  const { products, pagination, isLoading, filters, handleFilterChange, handlePageChange, handleSortChange } =
    useProductListing({
      initialProducts,
      initialPagination,
      initialFilters,
      buildSearchParams: buildSearchParams(query),
      resyncKey: query,
    });

  return (
    <div className="flex flex-col gap-6">
      <SearchHeader query={query} total={pagination.total} />

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full flex-shrink-0 lg:w-64">
          <ProductFilterSidebar
            currentFilters={{ category: filters.category, featured: filters.featured }}
            onFilterChange={handleFilterChange}
          />
        </aside>

        <div className="flex-1">
          {!isLoading && products.length > 0 && (
            <div className="mb-4 flex justify-end">
              <ProductSort currentSort={filters.sort || 'newest'} onSortChange={handleSortChange} />
            </div>
          )}

          {isLoading ? (
            <ProductSkeletonGrid count={filters.limit || 12} />
          ) : products.length === 0 ? (
            <SearchEmptyState query={query} />
          ) : (
            <ProductGrid products={products} />
          )}

          {!isLoading && pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { SearchResults };
