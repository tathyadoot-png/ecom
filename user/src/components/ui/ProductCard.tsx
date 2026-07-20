'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Price } from '@/components/ui/Price';
import { Button } from '@/components/ui/Button';
import { StarRating } from '@/components/ui/StarRating';
import { WishlistButton } from '@/components/ui/WishlistButton';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product.types';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'featured';
  onAddToCart?: (productId: string) => void;
  className?: string;
}

const ProductCard = ({
  product,
  variant = 'default',
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
  const imageUrl = images && images.length > 0 ? images[0] : null;
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
      <Link href={`/products/${slug}`} className="relative block overflow-hidden rounded-lg">
        <div className={`relative w-full ${imageSize}`}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <ImagePlaceholder className="absolute inset-0" />
          )}
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {featured && <Badge variant="featured">Featured</Badge>}
          {hasSale && <Badge variant="sale">Sale</Badge>}
          {isOutOfStock && <Badge variant="out-of-stock">Out of Stock</Badge>}
        </div>

        {/* Wishlist Button */}
        <WishlistButton product={product} variant="card" className="absolute right-3 top-3" />
      </Link>

      {/* Content */}
      <div className="mt-4 flex flex-1 flex-col space-y-2">
        {/* Category */}
        <span className="text-xs font-medium uppercase tracking-wider text-text/40 font-body">
          {categoryName}
        </span>

        {/* Title */}
        <Link href={`/products/${slug}`} className="block">
          <h3 className="font-body text-base font-medium leading-snug text-text transition-colors hover:text-primary line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <StarRating rating={averageRating} />
          {numReviews > 0 && (
            <span className="text-xs text-text/50 font-body">({numReviews})</span>
          )}
        </div>

        {/* Price */}
        <Price
          amount={hasSale ? salePrice : price}
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