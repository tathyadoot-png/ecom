'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductGrid } from './ProductGrid';
import { ProductFilterSidebar } from './ProductFilterSidebar';
import { ProductSort } from './ProductSort';
import { Pagination } from '@/components/ui/Pagination';
import { ProductSkeletonGrid } from './ProductSkeletonGrid';
import { useProductListing } from '@/hooks/useProductListing';
import { Product, ProductsResponse, ProductFilters as ProductFiltersType } from '@/types/product.types';

interface ProductListingClientProps {
  initialProducts: Product[];
  initialPagination: ProductsResponse['pagination'];
  initialFilters: ProductFiltersType;
}

const buildSearchParams = (filters: ProductFiltersType) => {
  const params = new URLSearchParams();
  if (filters.page && filters.page > 1) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.search) params.set('search', filters.search);
  if (filters.category) params.set('category', filters.category);
  if (filters.featured) params.set('featured', 'true');
  if (filters.sort && filters.sort !== 'newest') params.set('sort', filters.sort);
  return params;
};

const ProductListingClient = ({
  initialProducts,
  initialPagination,
  initialFilters,
}: ProductListingClientProps) => {
  const { products, pagination, isLoading, filters, handleFilterChange, handlePageChange, handleSortChange } =
    useProductListing({ initialProducts, initialPagination, initialFilters, buildSearchParams });

  return (
    <section className="py-12 bg-background">
      <Container>
        <div className="flex flex-col gap-6">
          <SectionHeading
            title="All Products"
            subtitle="Discover handcrafted treasures from our artisans"
            align="left"
            className="text-left"
          />

          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <ProductFilterSidebar currentFilters={filters} onFilterChange={handleFilterChange} />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-text/60 font-body">{pagination.total} products found</p>
                <ProductSort currentSort={filters.sort || 'newest'} onSortChange={handleSortChange} />
              </div>

              {isLoading ? (
                <ProductSkeletonGrid count={filters.limit || 12} />
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
      </Container>
    </section>
  );
};

export default ProductListingClient;
