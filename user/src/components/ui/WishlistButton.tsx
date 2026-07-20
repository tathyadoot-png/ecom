'use client';

import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product.types';
import { useWishlistStore } from '@/store/wishlist.store';

interface WishlistButtonProps {
  product: Product;
  variant?: 'card' | 'detail';
  className?: string;
}

// Single toggle used everywhere a heart icon appears (ProductCard —
// which covers listing/featured/related/category pages — and the PDP)
// so wishlist state never has to be synchronized by hand.
const WishlistButton = ({ product, variant = 'card', className }: WishlistButtonProps) => {
  const isWishlisted = useWishlistStore((state) => state.isInWishlist(product._id));
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={isWishlisted}
      className={cn(
        'flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95',
        variant === 'card'
          ? 'h-9 w-9 bg-cream/85 text-text/50 shadow-soft hover:bg-cream hover:text-primary'
          : 'h-12 w-12 border border-warm-beige bg-cream text-text/60 hover:border-primary hover:text-primary',
        className
      )}
    >
      <Heart
        className={cn(
          variant === 'card' ? 'h-4 w-4' : 'h-5 w-5',
          isWishlisted && 'fill-primary text-primary'
        )}
      />
    </button>
  );
};

export { WishlistButton };
