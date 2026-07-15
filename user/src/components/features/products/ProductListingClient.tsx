'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductGrid } from './ProductGrid';
import { ProductFilters } from './ProductFilters';
import { ProductSort } from './ProductSort';
import { Pagination } from '@/components/ui/Pagination';
import { Product, ProductsResponse, ProductFilters as ProductFiltersType } from '@/types/product.types';
import { productService } from '@/services/product.service';
import { ProductSkeletonGrid } from './ProductSkeletonGrid';

interface ProductListingClientProps {
  initialProducts: Product[];
  initialPagination: ProductsResponse['pagination'];
  initialFilters: ProductFiltersType;
}

const ProductListingClient = ({
  initialProducts,
  initialPagination,
  initialFilters,
}: ProductListingClientProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // State
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<ProductFiltersType>(initialFilters);

  // Update URL when filters change
  const updateUrl = (newFilters: ProductFiltersType) => {
    const params = new URLSearchParams();
    if (newFilters.page && newFilters.page > 1) params.set('page', String(newFilters.page));
    if (newFilters.limit) params.set('limit', String(newFilters.limit));
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.featured) params.set('featured', 'true');
    if (newFilters.sort && newFilters.sort !== 'newest') params.set('sort', newFilters.sort);

    const url = `${pathname}?${params.toString()}`;
    router.push(url, { scroll: false });
  };

  // Fetch products when filters change
  const fetchProducts = async (newFilters: ProductFiltersType) => {
    setIsLoading(true);
    try {
      const response = await productService.getProducts(newFilters);
      setProducts(response.products);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<ProductFiltersType>) => {
    const updated = { ...filters, ...newFilters, page: 1 };
    setFilters(updated);
    updateUrl(updated);
    fetchProducts(updated);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    const updated = { ...filters, page };
    setFilters(updated);
    updateUrl(updated);
    fetchProducts(updated);
  };

  // Handle sort change
  const handleSortChange = (sort: string) => {
    handleFilterChange({ sort: sort as ProductFiltersType['sort'] });
  };

  // On mount, if initialProducts is empty, fetch
  useEffect(() => {
    if (initialProducts.length === 0 && !isLoading) {
      fetchProducts(filters);
    }
  }, []);

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
              <ProductFilters
                currentFilters={filters}
                onFilterChange={handleFilterChange}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-text/60 font-body">
                  {pagination.total} products found
                </p>
                <ProductSort
                  currentSort={filters.sort || 'newest'}
                  onSortChange={handleSortChange}
                />
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