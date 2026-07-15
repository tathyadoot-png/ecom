'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/ui/ProductCard';
import { useProductStore } from '@/store/product.store'; // ✅ Correct path
import { Skeleton } from '@/components/ui/Skeleton';

const FeaturedProducts = () => {
  const { featuredProducts, isLoading, fetchFeaturedProducts } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <Container>
          <SectionHeading
            title="Featured Treasures"
            subtitle="Handpicked pieces that tell a story"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton variant="rect" className="h-64 w-full" />
                <Skeleton variant="text" className="h-4 w-3/4" />
                <Skeleton variant="text" className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-background">
      <Container>
        <SectionHeading
          title="Featured Treasures"
          subtitle="Handpicked pieces that tell a story"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onWishlistToggle={(id) => {
                console.log('Toggle wishlist', id);
              }}
              onAddToCart={(id) => {
                console.log('Add to cart', id);
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;