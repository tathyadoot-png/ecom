'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Price } from '@/components/ui/Price';
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
//
// This is the platform's visual identity card: the image is the hero,
// every interactive affordance (wishlist, quick-add) is small, quiet,
// and hidden until hover/focus, and there is no "Add to Cart" button —
// only a tiny icon-sized one, mirrored against the wishlist heart, so
// nothing on the image competes with the photograph itself.
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
  const secondImageUrl = images && images.length > 1 ? images[1] : null;
  const categoryName = typeof category === 'object' ? category.name : 'Category';

  // Availability trumps promotional badges — a sold-out item showing
  // "Featured" and "-20%" alongside "Out of Stock" is just noise. At
  // most two badges are ever shown, and they're only ever the two
  // that reflect something real about this specific product (there's
  // no "New"/"Best Seller"/"Handmade" field on the product model to
  // back badges like that, so none are fabricated here).
  const badges = isOutOfStock
    ? [{ key: 'out-of-stock', variant: 'out-of-stock' as const, label: 'Out of Stock' }]
    : [
        ...(featured ? [{ key: 'featured', variant: 'featured' as const, label: 'Featured' }] : []),
        ...(hasSale ? [{ key: 'sale', variant: 'sale' as const, label: `-${discountPercent}%` }] : []),
      ];

  return (
    <Card
      hoverable
      padding="none"
      className={cn(
        'group relative flex flex-col overflow-hidden hover:-translate-y-0.5 hover:shadow-medium',
        className
      )}
    >
      {/* Image — the Link wraps only the image itself; badges/buttons
          below are positioned siblings, not nested inside the anchor
          (a <button> inside an <a> is invalid HTML and a real a11y
          issue for assistive tech, even though browsers render it).
          Square rather than 4/5 — Phase 8D.3: the tall portrait crop
          made the card feel like it was mostly whitespace once a real
          grid of them sat side by side; square is still an editorial
          proportion (COS/Muji product photography), just not one that
          eats the whole card's height doing it. */}
      <div className="relative aspect-square overflow-hidden bg-warm-beige/15">
        <Link href={`/products/${slug}`} className="absolute inset-0 block" tabIndex={-1} aria-hidden>
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={title}
                fill
                placeholder="blur"
                blurDataURL={SHIMMER_DATA_URL}
                className={cn(
                  'object-cover',
                  // A second product photo crossfading in on hover reads
                  // as a considered "detail shot" reveal, closer to a
                  // magazine spread than a shopping widget — used only
                  // when the product actually has a second image, never
                  // fabricated. Falls back to a slow, barely-there zoom
                  // when there's just the one photo.
                  !secondImageUrl &&
                    'transition-transform duration-1400 ease-out group-hover:scale-[1.04]'
                )}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {secondImageUrl && (
                <Image
                  src={secondImageUrl}
                  alt=""
                  fill
                  className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
            </>
          ) : (
            <ImagePlaceholder className="absolute inset-0" />
          )}
        </Link>

        {/* Badges — max two, always in the same reading position */}
        {badges.length > 0 && (
          <div className="pointer-events-none absolute left-4 top-4 flex flex-col items-start gap-1.5">
            {badges.map((badge) => (
              <Badge key={badge.key} variant={badge.variant}>
                {badge.label}
              </Badge>
            ))}
          </div>
        )}

        {/* Wishlist — top right, hidden until hover/focus (WishlistButton
            keeps it visible always once the product is actually saved,
            so "you've already saved this" stays a glanceable signal
            rather than disappearing along with the plain invitation to
            save it). Always visible on touch, where there's no hover. */}
        <WishlistButton product={product} variant="card" className="absolute right-4 top-4 z-10" />

        {/* Quick add — a small icon, not a labeled button, mirroring the
            wishlist heart's position/treatment on the opposite corner.
            Hidden entirely (not just disabled) when unavailable, since
            the "Out of Stock" badge already explains why. */}
        {!isOutOfStock && (
          <button
            type="button"
            onClick={() => onAddToCart?.(_id)}
            aria-label="Add to cart"
            className="absolute bottom-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream/85 text-text/50 opacity-100 shadow-soft backdrop-blur-md transition-all duration-300 hover:bg-cream hover:text-primary focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95 md:opacity-0 md:group-hover:opacity-100"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Content — pure typography, no buttons here at all; every
          interactive affordance lives on the image above. Two-sided
          rows (category ↔ rating, price ↔ discover cue) so the block
          reads left-right balanced rather than a single left-hugging
          stack, and mt-auto on the price row keeps it bottom-anchored
          across a grid row even when a sibling card's title wraps to
          two lines. */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-text/40">
            {categoryName}
          </span>
          <div className="flex items-center gap-1">
            <StarRating rating={averageRating} />
            {numReviews > 0 && (
              <span className="font-body text-[11px] text-text/35">({numReviews})</span>
            )}
          </div>
        </div>

        <Link href={`/products/${slug}`} className="block">
          <h3 className="font-heading text-xl font-light leading-snug text-text transition-colors line-clamp-2 group-hover:text-primary">
            {title}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <Price
            amount={hasSale ? salePrice : price}
            compareAt={hasSale ? price : undefined}
            currency="₹"
            size={variant === 'compact' ? 'sm' : 'md'}
          />
          {isLowStock ? (
            <span className="pb-0.5 font-body text-[11px] font-medium text-terracotta">
              Only {stock} left
            </span>
          ) : (
            /* Discover cue — opacity-gated like the image-overlay
               buttons but reserved in layout at all times, so revealing
               it on hover never shifts the card's height. Shares the
               price row's slot rather than owning a row of its own. */
            <Link
              href={`/products/${slug}`}
              className="flex items-center gap-1 pb-0.5 font-body text-xs text-text/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
            >
              View Details
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
};

export { ProductCard };
