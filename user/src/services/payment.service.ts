import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api.types';
import { Order, RazorpayOrder, VerifyPaymentPayload } from '@/types/order.types';

export const paymentService = {
  createRazorpayOrder: async (amount: number, orderId: string) => {
    const { data } = await api.post<ApiResponse<RazorpayOrder>>('/payments/create-order', {
      amount,
      orderId,
    });
    return data.data;
  },

  verifyPayment: async (payload: VerifyPaymentPayload) => {
    const { data } = await api.post<ApiResponse<Order>>('/payments/verify', payload);
    return data.data;
  },
};
