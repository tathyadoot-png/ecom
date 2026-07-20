import { Badge, BadgeProps } from '@/components/ui/Badge';
import { PaymentStatus } from '@/types/order.types';

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

const STATUS_MAP: Record<PaymentStatus, { variant: BadgeProps['variant']; label: string }> = {
  PENDING: { variant: 'pending', label: 'Payment Pending' },
  PAID: { variant: 'approved', label: 'Paid' },
  FAILED: { variant: 'rejected', label: 'Payment Failed' },
};

const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  const { variant, label } = STATUS_MAP[status];
  return <Badge variant={variant}>{label}</Badge>;
};

export { PaymentStatusBadge };
