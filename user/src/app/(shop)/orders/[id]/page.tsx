'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { PackageX, AlertTriangle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Card } from '@/components/ui/Card';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { OrderItems } from '@/components/features/orders/OrderItems';
import { OrderSummary } from '@/components/features/orders/OrderSummary';
import { OrderTimeline } from '@/components/features/orders/OrderTimeline';
import { OrderActions } from '@/components/features/orders/OrderActions';
import { orderService } from '@/services/order.service';
import { useAuthStore } from '@/store/auth.store';
import { Order } from '@/types/order.types';

function OrderDetailContent({ orderId }: { orderId: string }) {
  const user = useAuthStore((state) => state.user);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchOrder = useCallback(() => {
    setLoading(true);
    orderService
      .getOrder(orderId)
      .then(setOrder)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (loading) {
    return (
      <Container className="flex min-h-[50vh] items-center justify-center py-24">
        <Spinner size="lg" />
      </Container>
    );
  }

  // No route-level not-found.tsx here on purpose — this page fetches
  // client-side (order data is cookie-authenticated, same reason
  // Cart/Wishlist/Checkout are client components), so Next's notFound()
  // convention — designed for render-time Server Component calls —
  // wouldn't actually be reachable from this effect. Handled inline
  // instead, same as checkout/success and checkout/failure already do.
  if (notFound || !order) {
    return (
      <Container className="py-24">
        <EmptyState
          icon={<PackageX className="mx-auto h-12 w-12" />}
          title="Order not found"
          description="This order may not exist, or it doesn't belong to your account."
          action={
            <Link href="/orders">
              <Button variant="primary" size="medium">
                Back to My Orders
              </Button>
            </Link>
          }
        />
      </Container>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <Container className="py-10">
        <Breadcrumb
          items={[{ label: 'My Orders', href: '/orders' }, { label: `#${order._id.slice(-8).toUpperCase()}` }]}
        />

        <h1 className="mt-3 font-heading text-3xl text-text">Order Details</h1>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <OrderTimeline order={order} />
            <OrderItems items={order.items} />

            <Card className="space-y-3">
              <h2 className="font-heading text-xl text-text">Shipping Address</h2>
              <div className="font-body text-sm text-text/70">
                <p className="font-medium text-text">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.phone}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <OrderSummary order={order} />
            <OrderActions order={order} userEmail={user?.email} onPaymentSuccess={fetchOrder} />
          </div>
        </div>
      </Container>
    </>
  );
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return (
    <AuthGuard
      fallback={
        <Container className="flex min-h-[50vh] items-center justify-center py-24">
          <Spinner size="lg" />
        </Container>
      }
    >
      <OrderDetailContent orderId={params.id} />
    </AuthGuard>
  );
}
