'use client';

import { useEffect, useState } from 'react';
import { useCategoryStore } from '@/store/category.store';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface ProductFilterValues {
  category?: string;
  featured?: boolean;
}

interface ProductFilterSidebarProps {
  currentFilters: ProductFilterValues;
  onFilterChange: (filters: Partial<ProductFilterValues>) => void;
}

const ProductFilterSidebar = ({ currentFilters, onFilterChange }: ProductFilterSidebarProps) => {
  const { categories, isLoading: categoriesLoading, fetchCategories } = useCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState(currentFilters.category || '');
  const [featured, setFeatured] = useState(currentFilters.featured || false);

  useEffect(() => {
    if (categories.length === 0 && !categoriesLoading) {
      fetchCategories();
    }
  }, [fetchCategories, categories.length, categoriesLoading]);

  const handleCategoryChange = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(newCategory);
    onFilterChange({ category: newCategory });
  };

  const handleFeaturedChange = (checked: boolean) => {
    setFeatured(checked);
    onFilterChange({ featured: checked ? true : undefined });
  };

  return (
    <Card padding="md" className="sticky top-8">
      <div className="space-y-6">
        <h3 className="font-heading text-lg font-medium text-text">Filters</h3>

        {/* Categories */}
        <div>
          <h4 className="text-sm font-medium text-text/80 mb-2">Categories</h4>
          <div className="flex flex-wrap gap-1.5">
            {categoriesLoading ? (
              <div className="text-sm text-text/40">Loading...</div>
            ) : categories.length === 0 ? (
              <div className="text-sm text-text/40">No categories</div>
            ) : (
              categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryChange(cat._id)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-full border transition-colors',
                    selectedCategory === cat._id
                      ? 'border-primary bg-primary text-cream'
                      : 'border-warm-beige text-text/60 hover:border-text/20 hover:bg-warm-beige/30'
                  )}
                >
                  {cat.name}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Featured */}
        <div>
          <h4 className="text-sm font-medium text-text/80 mb-2">Featured</h4>
          <label className="flex items-center gap-2 text-sm text-text/60 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => handleFeaturedChange(e.target.checked)}
              className="h-4 w-4 rounded border-warm-beige text-primary focus:ring-2 focus:ring-accent"
            />
            Show only featured products
          </label>
        </div>

        {/* Clear filters */}
        {(selectedCategory || featured) && (
          <button
            onClick={() => {
              setSelectedCategory('');
              setFeatured(false);
              onFilterChange({ category: undefined, featured: undefined });
            }}
            className="text-sm text-accent hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    </Card>
  );
};

export { ProductFilterSidebar };
