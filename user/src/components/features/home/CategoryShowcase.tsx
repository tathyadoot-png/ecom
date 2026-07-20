'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { useCategoryStore } from '@/store/category.store';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';

const CategoryShowcase = () => {
  const { categories, isLoading, fetchCategories } = useCategoryStore();

  useEffect(() => {
    // Only fetch if categories are empty
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [fetchCategories, categories.length]);

  if (isLoading) {
    return (
      <section className="py-16 bg-cream">
        <Container>
          <SectionHeading
            title="Shop by Categories"
            subtitle="Discover treasures from across India"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} variant="rect" className="h-72 w-full rounded-card" />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  // Show only featured categories or top categories (limit to 4-6)
  const displayCategories = categories
    .filter((cat) => cat.isActive !== false)
    .slice(0, 6);

  return (
    <section className="py-16 bg-cream">
      <Container>
        <SectionHeading
          title="Shop by Categories"
          subtitle="Discover treasures from across India"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayCategories.map((category) => (
            <CategoryCard key={category._id} category={category} variant="default" />
          ))}
        </div>
        {categories.length > 6 && (
          <div className="mt-10 text-center">
            <Link href="/categories">
              <Button variant="outline" size="medium">
                View All Categories
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default CategoryShowcase;