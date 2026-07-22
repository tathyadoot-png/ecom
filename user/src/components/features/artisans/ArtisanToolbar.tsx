'use client';

import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { ArtisanFilters, ArtisanSort } from '@/types/artisan.types';
import { cn } from '@/lib/utils';

interface ArtisanToolbarProps {
  filters: ArtisanFilters;
  resultCount: number;
  activeFilterCount: number;
  onFiltersChange: (partial: Partial<ArtisanFilters>) => void;
  onOpenFilterSheet: () => void;
}

const SORT_OPTIONS: { label: string; value: ArtisanSort }[] = [
  { label: 'Curated', value: 'displayOrder' },
  { label: 'Newest', value: 'newest' },
  { label: 'Most Experienced', value: 'experience' },
  { label: 'A–Z', value: 'alphabetical' },
];

const ArtisanToolbar = ({
  filters,
  resultCount,
  activeFilterCount,
  onFiltersChange,
  onOpenFilterSheet,
}: ArtisanToolbarProps) => {
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const debouncedSearch = useDebouncedValue(searchInput, 350);

  // Fires only when the debounced value actually changes — typing
  // quickly never triggers a request per keystroke.
  useEffect(() => {
    if (debouncedSearch !== (filters.search || '')) {
      onFiltersChange({ search: debouncedSearch || undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col gap-5 border-y border-warm-beige/40 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name, craft, city or state..."
          aria-label="Search artisans"
          leftIcon={<Search className="h-4 w-4" />}
          className="sm:max-w-sm"
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenFilterSheet}
            className="flex items-center gap-2 rounded-button border border-warm-beige px-4 py-2.5 font-body text-sm text-text/70 transition-colors hover:border-text/30 hover:text-text lg:hidden"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-cream">
                {activeFilterCount}
              </span>
            )}
          </button>

          <select
            value={filters.sort || 'displayOrder'}
            onChange={(e) => onFiltersChange({ sort: e.target.value as ArtisanSort })}
            aria-label="Sort artisans"
            className="rounded-button border border-warm-beige bg-cream px-4 py-2.5 font-body text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className={cn('font-body text-sm text-text/50')}>
        {resultCount} {resultCount === 1 ? 'Artisan' : 'Artisans'}
      </p>
    </div>
  );
};

export { ArtisanToolbar };
