'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { productService } from '@/services/product.service';
import { Product, ProductsResponse, ProductFilters } from '@/types/product.types';

interface UseProductListingOptions {
  initialProducts: Product[];
  initialPagination: ProductsResponse['pagination'];
  initialFilters: ProductFilters;
  // Each consumer's URL shape differs slightly (Search always writes
  // `q`, Category never writes `search`/`category`/`limit`, ...) — the
  // caller owns exactly which params it writes; this hook owns the
  // fetch/state/pagination mechanics shared by all three.
  buildSearchParams: (filters: ProductFilters) => URLSearchParams;
  // Re-sync local state from fresh initial* props when this value
  // changes. Only Search needs this — a new query can arrive via a
  // full navigation (Header's SearchBar) from outside this hook's own
  // state updates, unlike Product/Category filter changes which always
  // originate from within the hook itself.
  resyncKey?: string | number;
}

// Shared by ProductListingClient, CategoryProductsClient, and
// SearchResults — same SSR-first / refetch-on-change / URL-synced
// pattern all three need, extracted once instead of three times.
export function useProductListing({
  initialProducts,
  initialPagination,
  initialFilters,
  buildSearchParams,
  resyncKey,
}: UseProductListingOptions) {
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  useEffect(() => {
    if (resyncKey === undefined) return;
    setProducts(initialProducts);
    setPagination(initialPagination);
    setFilters(initialFilters);
  }, [resyncKey, initialProducts, initialPagination, initialFilters]);

  const updateUrl = (newFilters: ProductFilters) => {
    const query = buildSearchParams(newFilters).toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const fetchProducts = async (newFilters: ProductFilters) => {
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

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    const updated = { ...filters, ...newFilters, page: 1 };
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

  const handleSortChange = (sort: string) => {
    handleFilterChange({ sort: sort as ProductFilters['sort'] });
  };

  return {
    products,
    pagination,
    isLoading,
    filters,
    handleFilterChange,
    handlePageChange,
    handleSortChange,
  };
}
