'use client';

import { useEffect, useState } from 'react';
import { useCategoryStore } from '@/store/category.store';
import { cn } from '@/lib/utils';
import { FilterSection } from './FilterSection';

interface ProductFilterValues {
  category?: string;
  featured?: boolean;
}

interface ProductFilterSidebarProps {
  currentFilters: ProductFilterValues;
  onFilterChange: (filters: Partial<ProductFilterValues>) => void;
  showHeading?: boolean;
  className?: string;
}

// Pure filter content — no card, no border, no positioning of its
// own — so the same markup can sit in a sticky desktop column or
// inside the mobile bottom sheet without duplicating the filter
// logic. Only Category and Featured are wired up: Price, Material,
// Availability, Rating, Discount, Handmade and Artisan aren't, since
// the backend's getProducts has no query handling for any of them
// and the Product model has no material/handmade/artisan fields —
// each FilterSection below is generic enough that adding a real
// section later doesn't require touching this layout.
const ProductFilterSidebar = ({
  currentFilters,
  onFilterChange,
  showHeading = true,
  className,
}: ProductFilterSidebarProps) => {
  const { categories, isLoading: categoriesLoading, fetchCategories } = useCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState(currentFilters.category || '');
  const [featured, setFeatured] = useState(currentFilters.featured || false);

  useEffect(() => {
    if (categories.length === 0 && !categoriesLoading) {
      fetchCategories();
    }
  }, [fetchCategories, categories.length, categoriesLoading]);

  useEffect(() => {
    setSelectedCategory(currentFilters.category || '');
    setFeatured(currentFilters.featured || false);
  }, [currentFilters.category, currentFilters.featured]);

  const handleCategoryChange = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(newCategory);
    onFilterChange({ category: newCategory || undefined });
  };

  const handleFeaturedChange = (checked: boolean) => {
    setFeatured(checked);
    onFilterChange({ featured: checked ? true : undefined });
  };

  const hasActiveFilters = Boolean(selectedCategory || featured);

  return (
    <div className={cn('flex flex-col', className)}>
      {(showHeading || hasActiveFilters) && (
        <div className="flex items-center justify-between pb-6">
          {showHeading ? (
            <h2 className="font-heading text-2xl font-light text-text">Filters</h2>
          ) : (
            <span />
          )}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('');
                setFeatured(false);
                onFilterChange({ category: undefined, featured: undefined });
              }}
              className="font-body text-xs text-text/40 underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      <FilterSection title="Category">
        {categoriesLoading ? (
          <p className="font-body text-sm text-text/40">Loading…</p>
        ) : categories.length === 0 ? (
          <p className="font-body text-sm text-text/40">No categories available</p>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat._id;
              return (
                <li key={cat._id}>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(cat._id)}
                    aria-pressed={isActive}
                    className={cn(
                      'w-full border-l-2 py-1.5 pl-3.5 text-left font-body text-sm transition-colors',
                      isActive
                        ? 'border-primary text-primary'
                        : 'border-transparent text-text/60 hover:border-warm-beige hover:text-text'
                    )}
                  >
                    {cat.name}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </FilterSection>

      <FilterSection title="Availability" className="border-b-0">
        <button
          type="button"
          role="switch"
          aria-checked={featured}
          onClick={() => handleFeaturedChange(!featured)}
          className="flex w-full items-center justify-between py-1"
        >
          <span className="font-body text-sm text-text/70">Featured only</span>
          <span
            className={cn(
              'relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors duration-300',
              featured ? 'bg-primary' : 'bg-warm-beige'
            )}
          >
            <span
              className={cn(
                'inline-block h-3.5 w-3.5 transform rounded-full bg-cream shadow-soft transition-transform duration-300',
                featured ? 'translate-x-4.5' : 'translate-x-0.75'
              )}
            />
          </span>
        </button>
      </FilterSection>
    </div>
  );
};

export { ProductFilterSidebar };
