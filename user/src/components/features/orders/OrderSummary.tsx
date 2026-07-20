import { Card } from '@/components/ui/Card';
import { CartTotals } from '@/components/features/cart/CartTotals';
import { OrderStatusBadge } from './OrderStatusBadge';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { Order } from '@/types/order.types';

interface OrderSummaryProps {
  order: Order;
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const itemCount = order.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Card className="space-y-6">
      <h2 className="font-heading text-xl text-text">Order Summary</h2>

      <div className="flex flex-wrap items-center gap-2">
        <OrderStatusBadge status={order.orderStatus} />
        <PaymentStatusBadge status={order.paymentStatus} />
      </div>

      <CartTotals itemCount={itemCount} subtotal={order.subtotal} shippingFee={order.shippingFee} />

      <div className="flex items-center justify-between border-t border-warm-beige/40 pt-4 text-sm">
        <span className="text-text/60 font-body">Payment Method</span>
        <span className="font-medium text-text">
          {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Razorpay'}
        </span>
      </div>
    </Card>
  );
};

export { OrderSummary };
