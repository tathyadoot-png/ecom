'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { WishlistGrid } from '@/components/features/wishlist/WishlistGrid';
import { useWishlistStore } from '@/store/wishlist.store';

function WishlistContent() {
  const { products, loading, initialized, fetchWishlist } = useWishlistStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  if (loading && !initialized) {
    return (
      <Container className="flex min-h-[50vh] items-center justify-center py-24">
        <Spinner size="lg" />
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container className="py-24">
        <EmptyState
          icon={<Heart className="mx-auto h-12 w-12" />}
          title="Your wishlist is empty"
          description="Save products you love to find them here later."
          action={
            <Link href="/products">
              <Button variant="primary" size="medium">
                Continue Shopping
              </Button>
            </Link>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <h1 className="font-heading text-3xl text-text">My Wishlist</h1>
      <p className="mt-1 text-text/60 font-body">{products.length} items saved</p>

      <div className="mt-8">
        <WishlistGrid products={products} />
      </div>
    </Container>
  );
}

export default function WishlistPage() {
  return (
    <AuthGuard
      fallback={
        <Container className="flex min-h-[50vh] items-center justify-center py-24">
          <Spinner size="lg" />
        </Container>
      }
    >
      <WishlistContent />
    </AuthGuard>
  );
}
