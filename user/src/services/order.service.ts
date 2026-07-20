import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api.types';
import { Order, CreateOrderPayload } from '@/types/order.types';

export const orderService = {
  createOrder: async (payload: CreateOrderPayload) => {
    const { data } = await api.post<ApiResponse<Order>>('/orders', payload);
    return data.data;
  },

  // Used by the success/failure pages to show the authoritative
  // post-verification status — the in-memory Order from createOrder()
  // is stale (still PENDING) once payment has been confirmed.
  getOrder: async (id: string) => {
    const { data } = await api.get<ApiResponse<Order>>(`/orders/${id}`);
    return data.data;
  },

  getMyOrders: async () => {
    const { data } = await api.get<ApiResponse<Order[]>>('/orders/my-orders');
    return data.data;
  },
};
