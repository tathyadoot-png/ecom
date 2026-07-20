'use client';

import { FilterGroup } from '@/components/ui/FilterGroup';
import { ActiveFilters } from '@/components/ui/ActiveFilters';
import { ProductSort } from '@/components/features/products/ProductSort';

interface CategoryFiltersProps {
  featured: boolean;
  sort: string;
  totalCount: number;
  onFeaturedChange: (featured: boolean) => void;
  onSortChange: (sort: string) => void;
}

// Only Featured and Sort are wired up — Price Range, Availability,
// Discount and Rating are not implemented because the backend's
// getProducts has no query handling for any of them (see the
// architecture review for what each would require).
const CategoryFilters = ({
  featured,
  sort,
  totalCount,
  onFeaturedChange,
  onSortChange,
}: CategoryFiltersProps) => {
  const activeFilters = featured
    ? [{ key: 'featured', label: 'Featured only', onRemove: () => onFeaturedChange(false) }]
    : [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-body text-sm text-text/60">
          {totalCount} {totalCount === 1 ? 'product' : 'products'} found
        </p>

        <div className="flex items-center gap-6">
          <FilterGroup>
            <label className="flex cursor-pointer items-center gap-2 font-body text-sm text-text/70">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => onFeaturedChange(e.target.checked)}
                className="h-4 w-4 rounded border-warm-beige text-primary focus:ring-2 focus:ring-accent"
              />
              Featured only
            </label>
          </FilterGroup>

          <ProductSort currentSort={sort} onSortChange={onSortChange} />
        </div>
      </div>

      <ActiveFilters filters={activeFilters} />
    </div>
  );
};

export { CategoryFilters };
