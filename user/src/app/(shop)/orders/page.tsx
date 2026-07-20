'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PackageSearch, AlertTriangle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { OrderCard } from '@/components/features/orders/OrderCard';
import { orderService } from '@/services/order.service';
import { Order } from '@/types/order.types';

function OrdersContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    orderService
      .getMyOrders()
      .then(setOrders)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container className="flex min-h-[50vh] items-center justify-center py-24">
        <Spinner size="lg" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-24">
        <EmptyState
          icon={<AlertTriangle className="mx-auto h-12 w-12" />}
          title="Something went wrong"
          description="We couldn't load your orders. Please try again."
        />
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container className="py-24">
        <EmptyState
          icon={<PackageSearch className="mx-auto h-12 w-12" />}
          title="No orders yet"
          description="When you place an order, it will show up here."
          action={
            <Link href="/products">
              <Button variant="primary" size="medium">
                Continue Shopping
              </Button>
            </Link>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <h1 className="font-heading text-3xl text-text">My Orders</h1>
      <p className="mt-1 text-text/60 font-body">
        {orders.length} {orders.length === 1 ? 'order' : 'orders'}
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </Container>
  );
}

export default function OrdersPage() {
  return (
    <AuthGuard
      fallback={
        <Container className="flex min-h-[50vh] items-center justify-center py-24">
          <Spinner size="lg" />
        </Container>
      }
    >
      <OrdersContent />
    </AuthGuard>
  );
}
