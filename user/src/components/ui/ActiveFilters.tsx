'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActiveFilter {
  key: string;
  label: string;
  onRemove: () => void;
}

interface ActiveFiltersProps {
  filters: ActiveFilter[];
  className?: string;
}

// Decoupled from any specific filter shape on purpose — the products
// listing page can reuse this the same way once it wants chips too.
const ActiveFilters = ({ filters, className }: ActiveFiltersProps) => {
  if (filters.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {filters.map((filter) => (
        <button
          key={filter.key}
          type="button"
          onClick={filter.onRemove}
          className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-body text-xs font-medium text-primary transition-colors hover:bg-primary/20"
        >
          {filter.label}
          <X className="h-3 w-3" />
        </button>
      ))}
    </div>
  );
};

export { ActiveFilters };
