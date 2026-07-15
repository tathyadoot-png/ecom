'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Price } from '@/components/ui/Price';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product.types';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'featured';
  onWishlistToggle?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  className?: string;
}

const ProductCard = ({
  product,
  variant = 'default',
  onWishlistToggle,
  onAddToCart,
  className,
}: ProductCardProps) => {
  const {
    _id,
    slug,
    title,
    images,
    category,
    price,
    salePrice,
    averageRating,
    numReviews,
    featured,
    inventoryStatus,
    stock,
  } = product;

  const isOutOfStock = inventoryStatus === 'out_of_stock' || stock === 0;
  const hasSale = salePrice && salePrice > 0 && salePrice < price;

  // Determine image
  const imageUrl = images && images.length > 0 ? images[0] : '/images/fallback-product.jpg';
  const categoryName = typeof category === 'object' ? category.name : 'Category';

  // Responsive sizing based on variant
  const cardPadding = variant === 'compact' ? 'sm' : 'md';
  const imageSize = variant === 'compact' ? 'h-48' : 'h-64';

  return (
    <Card
      hoverable
      padding={cardPadding}
      className={cn(
        'group relative flex flex-col transition-all duration-300',
        className
      )}
    >
      {/* Image Container */}
      <Link href={`/product/${slug}`} className="relative block overflow-hidden rounded-lg">
        <div className={`relative w-full ${imageSize}`}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {featured && <Badge variant="featured">Featured</Badge>}
          {hasSale && <Badge variant="sale">Sale</Badge>}
          {isOutOfStock && <Badge variant="out-of-stock">Out of Stock</Badge>}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onWishlistToggle?.(_id);
          }}
          className="absolute right-3 top-3 rounded-full bg-cream/80 p-2 text-text/50 backdrop-blur-sm transition-all hover:bg-cream hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4" />
        </button>
      </Link>

      {/* Content */}
      <div className="mt-4 flex flex-1 flex-col space-y-2">
        {/* Category */}
        <span className="text-xs font-medium uppercase tracking-wider text-text/40 font-body">
          {categoryName}
        </span>

        {/* Title */}
        <Link href={`/product/${slug}`} className="block">
          <h3 className="font-body text-base font-medium leading-snug text-text transition-colors hover:text-primary line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-3.5 w-3.5',
                  i < Math.floor(averageRating || 0)
                    ? 'fill-accent text-accent'
                    : 'text-warm-beige'
                )}
              />
            ))}
          </div>
          {numReviews > 0 && (
            <span className="text-xs text-text/50 font-body">({numReviews})</span>
          )}
        </div>

        {/* Price */}
        <Price
          amount={price}
          compareAt={hasSale ? price : undefined}
          currency="₹"
          size={variant === 'compact' ? 'sm' : 'md'}
        />

        {/* Add to Cart Button (visible on hover or always) */}
        <div className="mt-2">
          <Button
            variant={isOutOfStock ? 'ghost' : 'primary'}
            size="small"
            fullWidth
            disabled={isOutOfStock}
            onClick={() => onAddToCart?.(_id)}
            leftIcon={<ShoppingBag className="h-4 w-4" />}
            className={cn(
              'transition-opacity duration-300',
              'opacity-100 md:opacity-0 md:group-hover:opacity-100'
            )}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export { ProductCard };