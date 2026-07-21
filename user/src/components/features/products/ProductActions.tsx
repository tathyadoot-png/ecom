'use client';

import { useState } from 'react';
import { ShoppingBag, Zap, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { WishlistButton } from '@/components/ui/WishlistButton';
import { Product } from '@/types/product.types';
import { useCartStore } from '@/store/cart.store';

interface ProductActionsProps {
  product: Product;
}

// Checkout doesn't exist yet — Buy Now stays a real, wired UI giving
// honest feedback instead of doing nothing on click. Wishlist and
// Share sit alongside Add to Cart / Buy Now as one purchase block,
// rather than Wishlist floating near the title — both are quiet icon
// buttons, never competing with the primary action for attention.
const ProductActions = ({ product }: ProductActionsProps) => {
  const isOutOfStock = product.inventoryStatus === 'out_of_stock' || product.stock <= 0;
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    toast.info('Checkout is coming soon — check back shortly!');
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: product.title, url });
      } catch {
        // User cancelled the share sheet — not an error worth surfacing.
      }
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <span className="font-body text-sm text-text/70">Quantity</span>
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          max={product.stock > 0 ? product.stock : undefined}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="primary"
          size="medium"
          fullWidth
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          leftIcon={<ShoppingBag className="h-4 w-4" />}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>

        <Button
          variant="outline"
          size="medium"
          fullWidth
          disabled={isOutOfStock}
          onClick={handleBuyNow}
          leftIcon={<Zap className="h-4 w-4" />}
        >
          Buy Now
        </Button>

        <div className="flex justify-center gap-3 sm:flex-shrink-0 sm:justify-start">
          <WishlistButton product={product} variant="detail" />
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share this product"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-warm-beige bg-cream text-text/60 transition-colors duration-300 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProductActions };
