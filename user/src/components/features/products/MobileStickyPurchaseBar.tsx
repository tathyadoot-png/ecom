'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Price } from '@/components/ui/Price';
import { Product } from '@/types/product.types';
import { useCartStore } from '@/store/cart.store';
import { cn } from '@/lib/utils';

interface MobileStickyPurchaseBarProps {
  product: Product;
  targetId: string;
}

// Only appears once the real purchase area has scrolled out of view —
// on a long, story-first page the primary action would otherwise
// require scrolling all the way back up. Mobile-only (lg:hidden);
// adds a single unit, mirroring "add to cart" as the quick action
// rather than duplicating the full quantity control in two places.
const MobileStickyPurchaseBar = ({ product, targetId }: MobileStickyPurchaseBarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const isOutOfStock = product.inventoryStatus === 'out_of_stock' || product.stock <= 0;
  const hasSale = product.salePrice > 0 && product.salePrice < product.price;

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(!entry.isIntersecting), {
      rootMargin: '0px 0px -60% 0px',
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 border-t border-warm-beige/40 bg-cream/95 px-4 py-3 shadow-lift backdrop-blur-md transition-transform duration-300 ease-out lg:hidden',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <Price
          amount={hasSale ? product.salePrice : product.price}
          compareAt={hasSale ? product.price : undefined}
          size="sm"
        />
        <Button
          variant="primary"
          size="medium"
          disabled={isOutOfStock}
          onClick={() => addToCart(product, 1)}
          leftIcon={<ShoppingBag className="h-4 w-4" />}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

export { MobileStickyPurchaseBar };
