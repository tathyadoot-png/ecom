'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Spinner } from '@/components/ui/Spinner';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { OrderResult } from '@/components/features/checkout/OrderResult';
import { orderService } from '@/services/order.service';
import { Order } from '@/types/order.types';

function CheckoutFailureContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    orderService
      .getOrder(orderId)
      .then(setOrder)
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [orderId]);

  return <OrderResult variant="failure" order={order} loading={loading} />;
}

export default function CheckoutFailurePage() {
  return (
    <AuthGuard
      fallback={
        <Container className="flex min-h-[50vh] items-center justify-center py-24">
          <Spinner size="lg" />
        </Container>
      }
    >
      <Suspense
        fallback={
          <Container className="flex min-h-[50vh] items-center justify-center py-24">
            <Spinner size="lg" />
          </Container>
        }
      >
        <CheckoutFailureContent />
      </Suspense>
    </AuthGuard>
  );
}
