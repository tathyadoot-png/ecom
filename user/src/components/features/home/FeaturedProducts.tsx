'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/ui/ProductCard';
import { useProductStore } from '@/store/product.store'; // ✅ Correct path
import { useCartStore } from '@/store/cart.store';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

const FeaturedProducts = () => {
  const { featuredProducts, isLoading, fetchFeaturedProducts } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  if (isLoading) {
    return (
      <section className="py-20 bg-background md:py-28">
        <Container>
          <SectionHeading
            title="Featured Treasures"
            subtitle="Handpicked pieces that tell a story"
          />
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton variant="rect" className="aspect-[4/5] w-full" />
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

  const displayProducts = featuredProducts.slice(0, 6);

  // A 3-column grid with only one or two products to show leaves the
  // rest of the row empty and reads as unfinished, not restrained —
  // this constrains the grid's width and column count to match what's
  // actually there, so a sparse result looks like a deliberately small
  // composition instead of an oversized grid missing its contents.
  const gridClass =
    displayProducts.length === 1
      ? 'mx-auto grid max-w-sm grid-cols-1'
      : displayProducts.length === 2
        ? 'mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10'
        : 'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10';

  return (
    <section className="py-20 bg-background md:py-28">
      <Container>
        <SectionHeading
          title="Featured Treasures"
          subtitle="Handpicked pieces that tell a story"
        />
        <div className={cn('mt-14', gridClass)}>
          {displayProducts.map((product) => (
            <ProductCard key={product._id} product={product} onAddToCart={() => addToCart(product)} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
