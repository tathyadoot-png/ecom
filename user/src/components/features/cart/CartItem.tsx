'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { Price } from '@/components/ui/Price';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { useCartStore } from '@/store/cart.store';
import { CartItem as CartItemType } from '@/types/cart.types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity } = item;
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const imageUrl = product.images?.[0] || null;
  const categoryName = typeof product.category === 'object' ? product.category.name : undefined;
  const hasSale = product.salePrice > 0 && product.salePrice < product.price;
  const unitPrice = hasSale ? product.salePrice : product.price;

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
        <Price amount={unitPrice} compareAt={hasSale ? product.price : undefined} size="sm" />
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <QuantitySelector
          value={quantity}
          onChange={(value) => updateQuantity(product._id, value)}
          max={product.stock > 0 ? product.stock : undefined}
        />
        <Price amount={unitPrice * quantity} size="md" />
      </div>

      <button
        type="button"
        onClick={() => removeItem(product._id)}
        aria-label="Remove item"
        className="flex items-center gap-1.5 text-sm text-primary/80 transition-colors hover:text-primary sm:flex-col sm:text-xs"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sm:hidden">Remove</span>
      </button>
    </div>
  );
};

export { CartItem };
