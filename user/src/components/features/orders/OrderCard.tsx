import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Price } from '@/components/ui/Price';
import { OrderStatusBadge } from './OrderStatusBadge';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { formatDate } from '@/lib/utils';
import { Order } from '@/types/order.types';

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const itemCount = order.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-text/50">#{order._id.slice(-8).toUpperCase()}</span>
          <OrderStatusBadge status={order.orderStatus} />
          <PaymentStatusBadge status={order.paymentStatus} />
        </div>
        <p className="font-body text-sm text-text/60">
          Placed on {formatDate(order.createdAt)} · {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className="flex items-center justify-between gap-6 sm:justify-end">
        <Price amount={order.totalAmount} size="md" />
        <Link href={`/orders/${order._id}`}>
          <Button variant="outline" size="small">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export { OrderCard };
