'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Order } from '@/types/order.types';

interface OrderResultProps {
  variant: 'success' | 'failure';
  order: Order | null;
  loading: boolean;
}

const STATUS_BADGE: Record<Order['paymentStatus'], 'approved' | 'pending' | 'rejected'> = {
  PAID: 'approved',
  PENDING: 'pending',
  FAILED: 'rejected',
};

// Shared shell for /checkout/success and /checkout/failure — same
// Order ID + Payment Status + actions layout, only the icon/heading
// and copy differ between the two.
const OrderResult = ({ variant, order, loading }: OrderResultProps) => {
  const isSuccess = variant === 'success';

  if (loading) {
    return (
      <Container className="flex min-h-[50vh] items-center justify-center py-24">
        <Spinner size="lg" />
      </Container>
    );
  }

  return (
    <Container className="flex justify-center py-24">
      <Card className="w-full max-w-md space-y-6 text-center">
        {isSuccess ? (
          <CheckCircle2 className="mx-auto h-14 w-14 text-forest" />
        ) : (
          <XCircle className="mx-auto h-14 w-14 text-primary" />
        )}

        <div>
          <h1 className="font-heading text-2xl text-text">
            {isSuccess ? 'Order Placed Successfully' : 'Payment Was Not Completed'}
          </h1>
          <p className="mt-2 text-sm text-text/60 font-body">
            {isSuccess
              ? 'Thank you for your order — we’ll notify you as it ships.'
              : 'Your order was created but the payment didn’t go through. No amount was captured.'}
          </p>
        </div>

        {order && (
          <div className="space-y-3 rounded-input bg-warm-beige/20 p-4 text-left">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text/60 font-body">Order ID</span>
              <span className="font-mono text-xs text-text">{order._id}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text/60 font-body">Payment Status</span>
              <Badge variant={STATUS_BADGE[order.paymentStatus]}>{order.paymentStatus}</Badge>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link href="/products">
            <Button variant="primary" size="medium" fullWidth>
              Continue Shopping
            </Button>
          </Link>
          {/* Orders history page is a later phase — honest placeholder, not a dead link. */}
          <Button
            variant="outline"
            size="medium"
            fullWidth
            onClick={() => toast.info('Order history is coming soon — check back shortly!')}
          >
            View Orders
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export { OrderResult };
