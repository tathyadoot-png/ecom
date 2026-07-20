'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { toast } from 'sonner';
import { ShoppingBag } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { CheckoutLayout } from '@/components/features/checkout/CheckoutLayout';
import { AddressSection } from '@/components/features/checkout/AddressSection';
import { PaymentSection } from '@/components/features/checkout/PaymentSection';
import { OrderSummary } from '@/components/features/checkout/OrderSummary';
import { useCartStore } from '@/store/cart.store';
import { useAuthStore } from '@/store/auth.store';
import { orderService } from '@/services/order.service';
import { paymentService } from '@/services/payment.service';
import { validateShippingAddress, ShippingAddressErrors } from '@/lib/validation';
import { PaymentMethod, ShippingAddress } from '@/types/order.types';
import { CONFIG } from '@/constants/config';
import { SITE } from '@/constants/site';

// Mirrors the backend's exact rule (order.service.ts) — there's no
// quote endpoint, so this is a display estimate only. The order
// response from createOrder() is what's actually authoritative.
const estimateShippingFee = (subtotal: number) => (subtotal > 999 ? 0 : 99);

function CheckoutContent() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { items, updateQuantity, clearCart, totalPrice } = useCartStore();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: user?.address?.fullName || user?.name || '',
    phone: user?.address?.phone || '',
    address: user?.address?.address || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    country: user?.address?.country || '',
    postalCode: user?.address?.postalCode || '',
  });
  const [errors, setErrors] = useState<ShippingAddressErrors>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('RAZORPAY');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = totalPrice();
  const shippingFee = useMemo(() => estimateShippingFee(subtotal), [subtotal]);

  const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePlaceOrder = async () => {
    const validationErrors = validateShippingAddress(address);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please check your shipping address');
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await orderService.createOrder({
        items: items.map((item) => ({ productId: item.product._id, quantity: item.quantity })),
        shippingAddress: address,
        paymentMethod,
      });

      if (paymentMethod === 'COD') {
        await clearCart();
        router.push(`/checkout/success?orderId=${order._id}`);
        return;
      }

      const razorpayOrder = await paymentService.createRazorpayOrder(order.totalAmount, order._id);

      if (!window.Razorpay) {
        toast.error('Payment gateway failed to load. Please try again.');
        setIsSubmitting(false);
        return;
      }

      const razorpay = new window.Razorpay({
        key: CONFIG.RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: SITE.name,
        description: `Order ${order._id}`,
        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: address.phone,
        },
        theme: { color: '#8B2C1D' },
        handler: async (response) => {
          try {
            await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            });
            await clearCart();
            router.push(`/checkout/success?orderId=${order._id}`);
          } catch {
            toast.error('Payment verification failed');
            router.push(`/checkout/failure?orderId=${order._id}`);
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            router.push(`/checkout/failure?orderId=${order._id}`);
          },
        },
      });

      razorpay.open();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Could not place order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Container className="py-24">
        <EmptyState
          icon={<ShoppingBag className="mx-auto h-12 w-12" />}
          title="Your cart is empty"
          description="Add products to your cart before checking out."
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
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <Container className="py-10">
        <h1 className="font-heading text-3xl text-text">Checkout</h1>

        <div className="mt-8">
          <CheckoutLayout
            summary={
              <OrderSummary
                items={items}
                itemCount={items.reduce((total, item) => total + item.quantity, 0)}
                subtotal={subtotal}
                shippingFee={shippingFee}
                isSubmitting={isSubmitting}
                onQuantityChange={updateQuantity}
                onSubmit={handlePlaceOrder}
              />
            }
          >
            <AddressSection
              value={address}
              errors={errors}
              onChange={handleAddressChange}
              email={user?.email}
            />
            <PaymentSection value={paymentMethod} onChange={setPaymentMethod} />
          </CheckoutLayout>
        </div>
      </Container>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <AuthGuard
      fallback={
        <Container className="flex min-h-[50vh] items-center justify-center py-24">
          <Spinner size="lg" />
        </Container>
      }
    >
      <CheckoutContent />
    </AuthGuard>
  );
}
