'use client';

import { forwardRef } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { ProductSort } from './ProductSort';
import { cn } from '@/lib/utils';

interface ProductToolbarProps {
  resultCount: number;
  currentSort: string;
  onSortChange: (sort: string) => void;
  activeFilterCount: number;
  onOpenFilters: () => void;
  className?: string;
}

// The filter trigger only renders below `lg` — on desktop the sidebar
// is already visible in the layout, so a second "open filters" button
// beside it would be redundant. ProductSort is reused unmodified since
// it's shared with the Category and Search pages.
const ProductToolbar = forwardRef<HTMLButtonElement, ProductToolbarProps>(
  ({ resultCount, currentSort, onSortChange, activeFilterCount, onOpenFilters, className }, ref) => {
    return (
      <div
        className={cn(
          'sticky top-20 z-30 flex items-center justify-between gap-4 border-y border-warm-beige/40 bg-background py-4 lg:static lg:top-auto',
          className
        )}
      >
        <p className="font-body text-sm text-text/50">
          {resultCount} {resultCount === 1 ? 'piece' : 'pieces'}
        </p>

        <div className="flex items-center gap-3">
          <button
            ref={ref}
            type="button"
            onClick={onOpenFilters}
            className="flex items-center gap-2 rounded-button border border-warm-beige px-4 py-2 font-body text-sm text-text/70 transition-colors hover:border-text/30 hover:text-text lg:hidden"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-cream">
                {activeFilterCount}
              </span>
            )}
          </button>

          <ProductSort currentSort={currentSort} onSortChange={onSortChange} />
        </div>
      </div>
    );
  }
);

ProductToolbar.displayName = 'ProductToolbar';

export { ProductToolbar };
