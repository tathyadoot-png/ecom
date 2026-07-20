import { Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn, formatDate } from '@/lib/utils';
import { Order } from '@/types/order.types';

interface OrderTimelineProps {
  order: Order;
}

const STAGES: Order['orderStatus'][] = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

// The backend only tracks a single current orderStatus plus
// createdAt/updatedAt/deliveredAt — there's no per-stage history, so
// this shows real dates only where they exist (Order Placed,
// Delivered) and highlights the current stage without inventing
// timestamps for the ones in between.
const OrderTimeline = ({ order }: OrderTimelineProps) => {
  if (order.orderStatus === 'CANCELLED') {
    return (
      <Card className="space-y-4">
        <h2 className="font-heading text-xl text-text">Order Status</h2>
        <div className="flex items-center justify-between font-body text-sm">
          <div>
            <p className="font-medium text-text">Order Placed</p>
            <p className="text-text/50">{formatDate(order.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center justify-between font-body text-sm">
          <div>
            <p className="font-medium text-primary">Order Cancelled</p>
            <p className="text-text/50">{formatDate(order.updatedAt)}</p>
          </div>
        </div>
      </Card>
    );
  }

  const currentIndex = STAGES.indexOf(order.orderStatus);

  return (
    <Card className="space-y-6">
      <h2 className="font-heading text-xl text-text">Order Status</h2>

      <div className="flex items-start justify-between">
        {STAGES.map((stage, index) => {
          const isComplete = index <= currentIndex;
          const isDeliveredStage = stage === 'DELIVERED';

          return (
            <div key={stage} className="flex flex-1 flex-col items-center gap-2 text-center">
              <div className="flex w-full items-center">
                {index > 0 && (
                  <div className={cn('h-0.5 flex-1', index <= currentIndex ? 'bg-forest' : 'bg-warm-beige')} />
                )}
                <div
                  className={cn(
                    'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full',
                    isComplete ? 'bg-forest text-cream' : 'bg-warm-beige text-text/40'
                  )}
                >
                  {isComplete && <Check className="h-4 w-4" />}
                </div>
                {index < STAGES.length - 1 && (
                  <div className={cn('h-0.5 flex-1', index < currentIndex ? 'bg-forest' : 'bg-warm-beige')} />
                )}
              </div>
              <span className={cn('font-body text-xs', isComplete ? 'text-text' : 'text-text/40')}>
                {stage.charAt(0) + stage.slice(1).toLowerCase()}
              </span>
              {stage === 'PENDING' && (
                <span className="font-body text-[10px] text-text/40">{formatDate(order.createdAt)}</span>
              )}
              {isDeliveredStage && order.isDelivered && order.deliveredAt && (
                <span className="font-body text-[10px] text-text/40">{formatDate(order.deliveredAt)}</span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export { OrderTimeline };
