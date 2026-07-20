'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { CartItem } from '@/components/features/cart/CartItem';
import { CartSummary } from '@/components/features/cart/CartSummary';
import { useCartStore } from '@/store/cart.store';

function CartContent() {
  const { items, loading, initialized, fetchCart, totalItems, totalPrice } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading && !initialized) {
    return (
      <Container className="flex min-h-[50vh] items-center justify-center py-24">
        <Spinner size="lg" />
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-24">
        <EmptyState
          icon={<ShoppingBag className="mx-auto h-12 w-12" />}
          title="Your cart is empty"
          description="Add products to continue shopping."
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
      <h1 className="font-heading text-3xl text-text">Shopping Cart</h1>
      <p className="mt-1 text-text/60 font-body">{totalItems()} items in cart</p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.product._id} item={item} />
          ))}
        </div>
        <div>
          <CartSummary itemCount={totalItems()} subtotal={totalPrice()} />
        </div>
      </div>
    </Container>
  );
}

export default function CartPage() {
  return (
    <AuthGuard
      fallback={
        <Container className="flex min-h-[50vh] items-center justify-center py-24">
          <Spinner size="lg" />
        </Container>
      }
    >
      <CartContent />
    </AuthGuard>
  );
}
