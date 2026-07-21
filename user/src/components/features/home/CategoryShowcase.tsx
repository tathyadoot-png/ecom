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
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <SectionHeading
            title="Shop by Categories"
            subtitle="Discover treasures from across India"
          />
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} variant="rect" className="aspect-[4/5] w-full rounded-card" />
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
    <section className="bg-cream py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Shop by Categories"
          subtitle="Discover treasures from across India"
        />

        {/* Mobile: a horizontal snap-scroll row — swiping through a set
            of collections reads as browsing, where a tall vertical
            stack of full-width tiles reads as a list. Reverts to a
            2-column grid from sm: up — wider cards give the imagery
            more presence than a 3rd column would, and two columns
            stays graceful with any category count (at most one card
            trails alone in a half-empty row, never two-thirds of one). */}
        <div className="-mx-4 mt-14 flex gap-5 overflow-x-auto px-4 pb-2 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-10">
          {displayCategories.map((category, index) => (
            <div key={category._id} className="w-[78vw] flex-shrink-0 snap-start sm:w-auto">
              <CategoryCard category={category} index={index} />
            </div>
          ))}
        </div>

        {categories.length > 6 && (
          <div className="mt-14 text-center">
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
