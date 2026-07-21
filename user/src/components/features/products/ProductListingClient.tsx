'use client';

import { useRef, useState } from 'react';
import { AlertTriangle, PackageSearch } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { ProductGrid } from './ProductGrid';
import { ProductFilterSidebar } from './ProductFilterSidebar';
import { ProductToolbar } from './ProductToolbar';
import { FilterSheet } from './FilterSheet';
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
  const {
    products,
    pagination,
    isLoading,
    error,
    filters,
    handleFilterChange,
    handlePageChange,
    handleSortChange,
    retry,
  } = useProductListing({ initialProducts, initialPagination, initialFilters, buildSearchParams });

  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const filterTriggerRef = useRef<HTMLButtonElement>(null);

  const activeFilterCount = (filters.category ? 1 : 0) + (filters.featured ? 1 : 0);
  const hasActiveFilters = activeFilterCount > 0;

  const closeFilterSheet = () => {
    setIsFilterSheetOpen(false);
    filterTriggerRef.current?.focus();
  };

  return (
    <section className="bg-background py-10 lg:py-14">
      <Container>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shop' }]} className="mb-8" />

        <SectionHeading
          title="The Full Collection"
          subtitle="Handcrafted pieces created by master artisans, gathered from workshops across India."
          align="left"
          className="mb-10 lg:mb-14"
        />

        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-14">
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <ProductFilterSidebar currentFilters={filters} onFilterChange={handleFilterChange} />
            </div>
          </aside>

          <div className="min-w-0">
            <ProductToolbar
              ref={filterTriggerRef}
              resultCount={pagination.total}
              currentSort={filters.sort || 'newest'}
              onSortChange={handleSortChange}
              activeFilterCount={activeFilterCount}
              onOpenFilters={() => setIsFilterSheetOpen(true)}
            />

            <div className="pt-8 lg:pt-10">
              {error ? (
                <EmptyState
                  icon={<AlertTriangle className="h-8 w-8" />}
                  title="Something went wrong"
                  description={error}
                  action={
                    <Button variant="primary" size="medium" onClick={retry}>
                      Try Again
                    </Button>
                  }
                />
              ) : isLoading ? (
                <ProductSkeletonGrid count={filters.limit || 12} />
              ) : products.length === 0 ? (
                <EmptyState
                  icon={<PackageSearch className="h-8 w-8" />}
                  title={hasActiveFilters ? 'No pieces match these filters' : 'No products found'}
                  description={
                    hasActiveFilters
                      ? 'Try adjusting or clearing your filters to see more of the collection.'
                      : 'Please check back soon as new pieces are added.'
                  }
                  action={
                    hasActiveFilters ? (
                      <Button
                        variant="outline"
                        size="medium"
                        onClick={() => handleFilterChange({ category: undefined, featured: undefined })}
                      >
                        Clear Filters
                      </Button>
                    ) : undefined
                  }
                />
              ) : (
                <ProductGrid products={products} />
              )}

              {!error && !isLoading && pagination.totalPages > 1 && (
                <div className="mt-14 flex justify-center border-t border-warm-beige/40 pt-10">
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

      <FilterSheet isOpen={isFilterSheetOpen} onClose={closeFilterSheet} resultCount={pagination.total}>
        <ProductFilterSidebar currentFilters={filters} onFilterChange={handleFilterChange} showHeading={false} />
      </FilterSheet>
    </section>
  );
};

export default ProductListingClient;
