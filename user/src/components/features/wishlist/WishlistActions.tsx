'use client';

import { useState } from 'react';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cart.store';
import { useWishlistStore } from '@/store/wishlist.store';
import { Product } from '@/types/product.types';

interface WishlistActionsProps {
  product: Product;
}

// Backend has no atomic "move to cart" endpoint, so this is Add to
// Cart followed by Remove from Wishlist, run as two real requests —
// guarded against double-clicks since it's not a single idempotent call.
const WishlistActions = ({ product }: WishlistActionsProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const isOutOfStock = product.inventoryStatus === 'out_of_stock' || product.stock <= 0;
  const [isMoving, setIsMoving] = useState(false);

  const handleMoveToCart = async () => {
    setIsMoving(true);
    try {
      await addToCart(product);
      await removeFromWishlist(product._id);
    } finally {
      setIsMoving(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="primary"
        size="small"
        disabled={isOutOfStock}
        isLoading={isMoving}
        onClick={handleMoveToCart}
        leftIcon={<ShoppingBag className="h-4 w-4" />}
      >
        Move to Cart
      </Button>
      <button
        type="button"
        onClick={() => removeFromWishlist(product._id)}
        aria-label="Remove from wishlist"
        className="flex items-center gap-1.5 text-sm text-primary/80 transition-colors hover:text-primary"
      >
        <Trash2 className="h-4 w-4" />
        Remove
      </button>
    </div>
  );
};

export { WishlistActions };
