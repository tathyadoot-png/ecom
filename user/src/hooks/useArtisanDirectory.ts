'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { artisanService } from '@/services/artisan.service';
import { Artisan, ArtisanFilters, ArtisansResponse } from '@/types/artisan.types';

interface UseArtisanDirectoryOptions {
  initialArtisans: Artisan[];
  initialPagination: ArtisansResponse['pagination'];
  initialFilters: ArtisanFilters;
}

const buildSearchParams = (filters: ArtisanFilters) => {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.state) params.set('state', filters.state);
  if (filters.craft) params.set('craft', filters.craft);
  if (filters.featured) params.set('featured', 'true');
  if (filters.verified) params.set('verified', 'true');
  if (filters.customOrders) params.set('customOrders', 'true');
  if (filters.experienceMin) params.set('experienceMin', String(filters.experienceMin));
  if (filters.sort && filters.sort !== 'displayOrder') params.set('sort', filters.sort);
  return params;
};

// Load More appends rather than replaces (unlike useProductListing's
// numbered-pagination replace behavior) — the one meaningful
// difference that justifies a separate hook rather than reusing that
// one. Page depth itself isn't pushed to the URL: a direct link
// reproduces the filtered view's first page, which is the expected
// behavior for "Load More" pagination.
export function useArtisanDirectory({
  initialArtisans,
  initialPagination,
  initialFilters,
}: UseArtisanDirectoryOptions) {
  const router = useRouter();
  const pathname = usePathname();

  const [artisans, setArtisans] = useState<Artisan[]>(initialArtisans);
  const [pagination, setPagination] = useState(initialPagination);
  const [filters, setFilters] = useState<ArtisanFilters>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArtisans = async (nextFilters: ArtisanFilters, append: boolean) => {
    append ? setIsLoadingMore(true) : setIsLoading(true);
    setError(null);
    try {
      const response = await artisanService.getArtisans(nextFilters);
      setArtisans((prev) => (append ? [...prev, ...response.artisans] : response.artisans));
      setPagination(response.pagination);
    } catch (err) {
      console.error('Failed to fetch artisans', err);
      setError('Something went wrong while loading artisans.');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const updateFilters = (partial: Partial<ArtisanFilters>) => {
    const updated: ArtisanFilters = { ...filters, ...partial, page: 1 };
    setFilters(updated);
    const query = buildSearchParams(updated).toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    fetchArtisans(updated, false);
  };

  const loadMore = () => {
    const updated: ArtisanFilters = { ...filters, page: (filters.page || 1) + 1 };
    setFilters(updated);
    fetchArtisans(updated, true);
  };

  const retry = () => fetchArtisans(filters, false);

  const hasMore = pagination.page < pagination.totalPages;

  return {
    artisans,
    pagination,
    filters,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    updateFilters,
    loadMore,
    retry,
  };
}
