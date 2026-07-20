'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { paymentService } from '@/services/payment.service';
import { CONFIG } from '@/constants/config';
import { SITE } from '@/constants/site';
import { Order } from '@/types/order.types';

interface OrderActionsProps {
  order: Order;
  userEmail?: string;
  onPaymentSuccess: () => void;
}

// Retry Payment reuses exactly the same create-order/verify flow
// Checkout already built — the backend genuinely supports re-linking
// a Razorpay order to an existing one. Cancel Order and Download
// Invoice are deliberately not here: neither has a backend endpoint.
const OrderActions = ({ order, userEmail, onPaymentSuccess }: OrderActionsProps) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const canRetryPayment =
    order.paymentMethod === 'RAZORPAY' &&
    order.paymentStatus !== 'PAID' &&
    order.orderStatus !== 'CANCELLED';

  if (!canRetryPayment) return null;

  const handleRetryPayment = async () => {
    setIsRetrying(true);
    try {
      const razorpayOrder = await paymentService.createRazorpayOrder(order.totalAmount, order._id);

      if (!window.Razorpay) {
        toast.error('Payment gateway failed to load. Please try again.');
        setIsRetrying(false);
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
          name: order.shippingAddress.fullName,
          email: userEmail,
          contact: order.shippingAddress.phone,
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
            toast.success('Payment successful');
            onPaymentSuccess();
          } catch {
            toast.error('Payment verification failed');
          } finally {
            setIsRetrying(false);
          }
        },
        modal: {
          ondismiss: () => setIsRetrying(false),
        },
      });

      razorpay.open();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Could not start payment. Please try again.');
      setIsRetrying(false);
    }
  };

  return (
    <Button variant="primary" size="medium" fullWidth isLoading={isRetrying} onClick={handleRetryPayment}>
      {isRetrying ? 'Processing...' : 'Retry Payment'}
    </Button>
  );
};

export { OrderActions };
