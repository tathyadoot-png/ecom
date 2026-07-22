'use client';

import { useState } from 'react';
import { AlertTriangle, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterSheet } from '@/components/features/products/FilterSheet';
import { useArtisanDirectory } from '@/hooks/useArtisanDirectory';
import { ArtisanCard } from './ArtisanCard';
import { ArtisanFilterControls } from './ArtisanFilterControls';
import { ArtisanToolbar } from './ArtisanToolbar';
import { ArtisanSkeletonGrid } from './ArtisanSkeletonGrid';
import { Artisan, ArtisanFilters, ArtisansResponse } from '@/types/artisan.types';

interface ArtisanDirectoryClientProps {
  initialArtisans: Artisan[];
  initialPagination: ArtisansResponse['pagination'];
  initialFilters: ArtisanFilters;
}

const ArtisanDirectoryClient = ({
  initialArtisans,
  initialPagination,
  initialFilters,
}: ArtisanDirectoryClientProps) => {
  const {
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
  } = useArtisanDirectory({ initialArtisans, initialPagination, initialFilters });

  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const activeFilterCount = [
    filters.craft,
    filters.state,
    filters.featured,
    filters.verified,
    filters.customOrders,
    filters.experienceMin,
  ].filter(Boolean).length;

  const hasActiveFilters = activeFilterCount > 0 || !!filters.search;

  return (
    <>
      <ArtisanToolbar
        filters={filters}
        resultCount={pagination.total}
        activeFilterCount={activeFilterCount}
        onFiltersChange={updateFilters}
        onOpenFilterSheet={() => setIsFilterSheetOpen(true)}
      />

      <div className="hidden py-5 lg:block">
        <ArtisanFilterControls filters={filters} onChange={updateFilters} layout="bar" />
      </div>

      <div className="pt-8">
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
          <ArtisanSkeletonGrid count={6} />
        ) : artisans.length === 0 ? (
          <EmptyState
            icon={<Users className="h-8 w-8" />}
            title={hasActiveFilters ? 'No artisans match these filters' : 'No artisans found'}
            description={
              hasActiveFilters
                ? 'Try adjusting or clearing your search and filters.'
                : 'Please check back soon as more artisans join the marketplace.'
            }
            action={
              hasActiveFilters ? (
                <Button
                  variant="outline"
                  size="medium"
                  onClick={() =>
                    updateFilters({
                      search: undefined,
                      craft: undefined,
                      state: undefined,
                      featured: undefined,
                      verified: undefined,
                      customOrders: undefined,
                      experienceMin: undefined,
                    })
                  }
                >
                  Clear Filters
                </Button>
              ) : undefined
            }
          />
        ) : (
          <>
            <div className="columns-1 gap-x-10 md:columns-2">
              {artisans.map((artisan) => (
                <ArtisanCard key={artisan._id} artisan={artisan} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-4 flex justify-center border-t border-warm-beige/40 pt-10">
                <Button variant="outline" size="large" onClick={loadMore} isLoading={isLoadingMore}>
                  Load More Artisans
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <FilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        resultCount={pagination.total}
      >
        <ArtisanFilterControls filters={filters} onChange={updateFilters} layout="sheet" />
      </FilterSheet>
    </>
  );
};

export default ArtisanDirectoryClient;
