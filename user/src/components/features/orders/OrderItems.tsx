import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Price } from '@/components/ui/Price';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { OrderItem } from '@/types/order.types';

interface OrderItemsProps {
  items: OrderItem[];
}

// Renders the order's own item snapshot (title/image/price captured
// at checkout) rather than the live product — correct for order
// history even if the product's price or images have since changed.
const OrderItems = ({ items }: OrderItemsProps) => {
  return (
    <Card className="space-y-4">
      <h2 className="font-heading text-xl text-text">Items</h2>

      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div key={`${item.product}-${index}`} className="flex items-center gap-3">
            <Link
              href={`/products/${item.slug}`}
              className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-card"
            >
              {item.image ? (
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
              ) : (
                <ImagePlaceholder className="absolute inset-0" />
              )}
            </Link>
            <div className="flex flex-1 flex-col gap-1">
              <Link
                href={`/products/${item.slug}`}
                className="line-clamp-1 font-body text-sm font-medium text-text hover:text-primary"
              >
                {item.title}
              </Link>
              <span className="font-body text-xs text-text/50">Qty: {item.quantity}</span>
            </div>
            <Price amount={item.price * item.quantity} size="sm" />
          </div>
        ))}
      </div>
    </Card>
  );
};

export { OrderItems };
