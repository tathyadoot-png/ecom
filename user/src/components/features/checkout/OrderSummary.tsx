import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Price } from '@/components/ui/Price';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { CartTotals } from '@/components/features/cart/CartTotals';
import { CheckoutActions } from './CheckoutActions';
import { CartItem } from '@/types/cart.types';

interface OrderSummaryProps {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  isSubmitting: boolean;
  onQuantityChange: (productId: string, quantity: number) => void;
  onSubmit: () => void;
}

const OrderSummary = ({
  items,
  itemCount,
  subtotal,
  shippingFee,
  isSubmitting,
  onQuantityChange,
  onSubmit,
}: OrderSummaryProps) => {
  return (
    <Card className="sticky top-24 space-y-6">
      <h2 className="font-heading text-xl text-text">Order Summary</h2>

      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const { product, quantity } = item;
          const imageUrl = product.images?.[0] || null;
          const unitPrice = product.salePrice > 0 ? product.salePrice : product.price;

          return (
            <div key={product._id} className="flex items-center gap-3">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-card">
                {imageUrl ? (
                  <Image src={imageUrl} alt={product.title} fill className="object-cover" sizes="64px" />
                ) : (
                  <ImagePlaceholder className="absolute inset-0" />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p className="line-clamp-1 font-body text-sm font-medium text-text">{product.title}</p>
                <QuantitySelector
                  value={quantity}
                  onChange={(value) => onQuantityChange(product._id, value)}
                  max={product.stock > 0 ? product.stock : undefined}
                  className="scale-90 origin-left"
                />
              </div>
              <Price amount={unitPrice * quantity} size="sm" />
            </div>
          );
        })}
      </div>

      <CartTotals itemCount={itemCount} subtotal={subtotal} shippingFee={shippingFee} />

      <CheckoutActions total={subtotal + shippingFee} isSubmitting={isSubmitting} onSubmit={onSubmit} />
    </Card>
  );
};

export { OrderSummary };
