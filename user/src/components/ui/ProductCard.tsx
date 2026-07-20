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
import { SHIMMER_DATA_URL } from '@/lib/imagePlaceholder';
import { Product } from '@/types/product.types';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'featured';
  onAddToCart?: (productId: string) => void;
  className?: string;
}

// The one ProductCard used everywhere — product listing, category
// pages, search, related products, featured/home sections. A single
// implementation, styled once, rather than a per-context variant.
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
  const isLowStock = !isOutOfStock && stock > 0 && stock <= 5;
  const hasSale = salePrice && salePrice > 0 && salePrice < price;
  const discountPercent = hasSale ? Math.round(((price - salePrice) / price) * 100) : 0;

  const imageUrl = images && images.length > 0 ? images[0] : null;
  const categoryName = typeof category === 'object' ? category.name : 'Category';

  return (
    <Card
      hoverable
      padding="none"
      className={cn('group relative flex flex-col overflow-hidden', className)}
    >
      {/* Image — the Link wraps only the image itself; badges/buttons
          below are positioned siblings, not nested inside the anchor
          (a <button> inside an <a> is invalid HTML and a real a11y
          issue for assistive tech, even though browsers render it). */}
      <div className="relative aspect-[4/5] overflow-hidden bg-warm-beige/15">
        <Link href={`/products/${slug}`} className="absolute inset-0 block" tabIndex={-1} aria-hidden>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              placeholder="blur"
              blurDataURL={SHIMMER_DATA_URL}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <ImagePlaceholder className="absolute inset-0" />
          )}
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-4 top-4 flex flex-col items-start gap-1.5">
          {featured && <Badge variant="featured">Featured</Badge>}
          {hasSale && <Badge variant="sale">-{discountPercent}%</Badge>}
          {isOutOfStock && <Badge variant="out-of-stock">Out of Stock</Badge>}
        </div>

        {/* Wishlist */}
        <WishlistButton product={product} variant="card" className="absolute right-4 top-4 z-10" />

        {/* Quick add — revealed on hover for desktop, always present on
            touch devices since there's no hover state to reveal it. */}
        <div className="absolute inset-x-4 bottom-4 z-10 translate-y-2 opacity-100 transition-all duration-300 ease-out md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <Button
            variant={isOutOfStock ? 'ghost' : 'secondary'}
            size="small"
            fullWidth
            disabled={isOutOfStock}
            onClick={() => onAddToCart?.(_id)}
            leftIcon={<ShoppingBag className="h-3.5 w-3.5" />}
            className="shadow-medium backdrop-blur-sm"
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-text/40">
          {categoryName}
        </span>

        <Link href={`/products/${slug}`} className="block">
          <h3 className="font-body text-[15px] font-medium leading-snug text-text transition-colors line-clamp-2 group-hover:text-primary">
            {title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5">
          <StarRating rating={averageRating} />
          {numReviews > 0 && (
            <span className="font-body text-xs text-text/40">({numReviews})</span>
          )}
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <Price
            amount={hasSale ? salePrice : price}
            compareAt={hasSale ? price : undefined}
            currency="₹"
            size={variant === 'compact' ? 'sm' : 'md'}
          />
          {isLowStock && (
            <span className="font-body text-[11px] font-medium text-terracotta">
              Only {stock} left
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export { ProductCard };
