import { Badge, BadgeProps } from '@/components/ui/Badge';
import { OrderStatus } from '@/types/order.types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

// Reuses the existing Badge variants only (no new colors) — green
// family for every stage of positive progress, gold for in-progress,
// beige for waiting, maroon for the one terminal-negative state.
const STATUS_MAP: Record<OrderStatus, { variant: BadgeProps['variant']; label: string }> = {
  PENDING: { variant: 'pending', label: 'Pending' },
  CONFIRMED: { variant: 'new', label: 'Confirmed' },
  PROCESSING: { variant: 'sale', label: 'Processing' },
  SHIPPED: { variant: 'approved', label: 'Shipped' },
  DELIVERED: { variant: 'approved', label: 'Delivered' },
  CANCELLED: { variant: 'rejected', label: 'Cancelled' },
};

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const { variant, label } = STATUS_MAP[status];
  return <Badge variant={variant}>{label}</Badge>;
};

export { OrderStatusBadge };
