'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ProductGrid } from '@/components/features/products/ProductGrid';
import { ProductSkeletonGrid } from '@/components/features/products/ProductSkeletonGrid';
import { Pagination } from '@/components/ui/Pagination';
import { CategoryFilters } from './CategoryFilters';
import { CategoryEmptyState } from './CategoryEmptyState';
import { productService } from '@/services/product.service';
import { Product, ProductsResponse, ProductFilters as ProductFiltersType } from '@/types/product.types';
import { Category } from '@/types/category.types';

interface CategoryProductsClientProps {
  category: Category;
  initialProducts: Product[];
  initialPagination: ProductsResponse['pagination'];
  initialFilters: ProductFiltersType;
}

// Mirrors ProductListingClient's pattern (SSR-first, refetch on
// filter/page change, URL-synced) rather than inventing a different
// one for this same job.
const CategoryProductsClient = ({
  category,
  initialProducts,
  initialPagination,
  initialFilters,
}: CategoryProductsClientProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<ProductFiltersType>(initialFilters);

  const updateUrl = (newFilters: ProductFiltersType) => {
    const params = new URLSearchParams();
    if (newFilters.page && newFilters.page > 1) params.set('page', String(newFilters.page));
    if (newFilters.featured) params.set('featured', 'true');
    if (newFilters.sort && newFilters.sort !== 'newest') params.set('sort', newFilters.sort);

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const fetchProducts = async (newFilters: ProductFiltersType) => {
    setIsLoading(true);
    try {
      const response = await productService.getProducts(newFilters);
      setProducts(response.products);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch category products', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeaturedChange = (featured: boolean) => {
    const updated = { ...filters, featured: featured || undefined, page: 1 };
    setFilters(updated);
    updateUrl(updated);
    fetchProducts(updated);
  };

  const handleSortChange = (sort: string) => {
    const updated = { ...filters, sort: sort as ProductFiltersType['sort'], page: 1 };
    setFilters(updated);
    updateUrl(updated);
    fetchProducts(updated);
  };

  const handlePageChange = (page: number) => {
    const updated = { ...filters, page };
    setFilters(updated);
    updateUrl(updated);
    fetchProducts(updated);
  };

  return (
    <div className="flex flex-col gap-6">
      <CategoryFilters
        featured={!!filters.featured}
        sort={filters.sort || 'newest'}
        totalCount={pagination.total}
        onFeaturedChange={handleFeaturedChange}
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
