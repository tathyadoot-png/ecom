'use client';

import { useState } from 'react';
import { ShoppingBag, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { Product } from '@/types/product.types';
import { useCartStore } from '@/store/cart.store';

interface ProductActionsProps {
  product: Product;
}

// Checkout doesn't exist yet — Buy Now stays a real, wired UI giving
// honest feedback instead of doing nothing on click.
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

  return (
    <div className="flex flex-col gap-4">
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
          size="large"
          fullWidth
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          leftIcon={<ShoppingBag className="h-4 w-4" />}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>

        <Button
          variant="outline"
          size="large"
          fullWidth
          disabled={isOutOfStock}
          onClick={handleBuyNow}
          leftIcon={<Zap className="h-4 w-4" />}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export { ProductActions };
