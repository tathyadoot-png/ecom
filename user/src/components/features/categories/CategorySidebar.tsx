'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { useCategoryStore } from '@/store/category.store';
import { cn } from '@/lib/utils';

interface CategorySidebarProps {
  activeSlug: string;
}

const CategorySidebar = ({ activeSlug }: CategorySidebarProps) => {
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  return (
    <Card padding="md" className="sticky top-8">
      <nav aria-label="Categories" className="space-y-1">
        <h3 className="mb-3 font-heading text-lg text-text">Categories</h3>
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category.slug}`}
            className={cn(
              'block rounded-input px-3 py-2 font-body text-sm transition-colors',
              category.slug === activeSlug
                ? 'bg-primary text-cream'
                : 'text-text/70 hover:bg-warm-beige/30'
            )}
          >
            {category.name}
          </Link>
        ))}
      </nav>
    </Card>
  );
};

export { CategorySidebar };
