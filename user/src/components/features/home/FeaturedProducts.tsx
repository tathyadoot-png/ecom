'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/ui/ProductCard';
import { Reveal } from '@/components/ui/Reveal';
import { useProductStore } from '@/store/product.store'; // ✅ Correct path
import { useCartStore } from '@/store/cart.store';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

// Capped at 4 (one row on desktop, two on mobile) instead of the
// previous 6 across 2 rows — the Phase 8D.1 brief was explicit about
// keeping the homepage shorter even as more sections get added, and a
// single tight row of hand-picked pieces reads more like a curated
// edit than a shop page.
const FEATURED_PRODUCT_LIMIT = 4;

const FeaturedProducts = () => {
  const { featuredProducts, isLoading, fetchFeaturedProducts } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  if (isLoading) {
    return (
      <section className="bg-cream py-14 md:py-20">
        <Container>
          <SectionHeading title="Featured Treasures" subtitle="A few pieces, chosen for the hands that made them" />
          <div className="mt-10 grid grid-cols-2 gap-5 sm:gap-32 lg:grid-cols-4 lg:gap-32">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton variant="rect" className="aspect-square w-full" />
                <Skeleton variant="text" className="h-4 w-3/4" />
                <Skeleton variant="text" className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // A homepage marketing section with nothing to feature is correctly
  // absent, not an apologetic "no featured products" message — that
  // kind of empty state belongs on a listing page, not here.
  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  const displayProducts = featuredProducts.slice(0, FEATURED_PRODUCT_LIMIT);

  // A 4-column grid with only one or two products to show leaves the
  // rest of the row empty and reads as unfinished, not restrained —
  // this constrains the grid's width and column count to match what's
  // actually there, so a sparse result looks like a deliberately small
  // composition instead of an oversized grid missing its contents.
  const gridClass =
    displayProducts.length === 1
      ? 'mx-auto grid max-w-sm grid-cols-1'
      : displayProducts.length === 2
        ? 'mx-auto grid max-w-2xl grid-cols-2 gap-5 sm:gap-32'
        : displayProducts.length === 3
          ? 'grid grid-cols-2 gap-5 sm:gap-32 md:grid-cols-3 lg:gap-32'
          : 'grid grid-cols-2 gap-5 sm:gap-32 lg:grid-cols-4 lg:gap-32';

  return (
    <section className="bg-cream py-14 md:py-20">
      <Container>
        <SectionHeading
          title="Featured Treasures"
          subtitle="A few pieces, chosen for the hands that made them"
        />
        <div className={cn('mt-10', gridClass)}>
          {displayProducts.map((product, index) => (
            <Reveal key={product._id} delay={index * 90}>
              <ProductCard product={product} onAddToCart={() => addToCart(product)} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
