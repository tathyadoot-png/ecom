'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cart.store';

const CartActions = () => {
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div className="flex flex-col gap-3">
      <Link href="/checkout">
        <Button variant="primary" size="medium" fullWidth>
          Proceed to Checkout
        </Button>
      </Link>
      <Link href="/products">
        <Button variant="outline" size="medium" fullWidth>
          Continue Shopping
        </Button>
      </Link>
      <button
        type="button"
        onClick={() => clearCart()}
        className="text-center text-sm text-text/50 transition-colors hover:text-primary"
      >
        Clear Cart
      </button>
    </div>
  );
};

export { CartActions };
