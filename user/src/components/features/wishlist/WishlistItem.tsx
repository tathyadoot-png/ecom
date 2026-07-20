import Image from 'next/image';
import Link from 'next/link';
import { Price } from '@/components/ui/Price';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { StockStatus } from '@/components/features/products/StockStatus';
import { WishlistActions } from './WishlistActions';
import { Product } from '@/types/product.types';

interface WishlistItemProps {
  product: Product;
}

const WishlistItem = ({ product }: WishlistItemProps) => {
  const imageUrl = product.images?.[0] || null;
  const categoryName = typeof product.category === 'object' ? product.category.name : undefined;
  const hasSale = product.salePrice > 0 && product.salePrice < product.price;

  return (
    <div className="flex flex-col gap-4 rounded-card bg-cream p-4 shadow-soft sm:flex-row sm:items-center">
      <Link
        href={`/products/${product.slug}`}
        className="relative h-28 w-full flex-shrink-0 overflow-hidden rounded-card sm:h-24 sm:w-24"
      >
        {imageUrl ? (
          <Image src={imageUrl} alt={product.title} fill className="object-cover" sizes="112px" />
        ) : (
          <ImagePlaceholder className="absolute inset-0" />
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1">
        {categoryName && (
          <span className="text-xs font-medium uppercase tracking-wider text-text/40 font-body">
            {categoryName}
          </span>
        )}
        <Link
          href={`/products/${product.slug}`}
          className="font-body text-base font-medium text-text hover:text-primary line-clamp-2"
        >
          {product.title}
        </Link>
        <Price
          amount={hasSale ? product.salePrice : product.price}
          compareAt={hasSale ? product.price : undefined}
          size="sm"
        />
        <StockStatus stock={product.stock} inventoryStatus={product.inventoryStatus} />
      </div>

      <WishlistActions product={product} />
    </div>
  );
};

export { WishlistItem };
