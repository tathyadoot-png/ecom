// services/cart.service.ts
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api.types';
import { Cart } from '@/types/cart.types';

export const cartService = {
  getCart: async () => {
    const { data } = await api.get<ApiResponse<Cart>>('/cart');
    return data.data;
  },

  addToCart: async (productId: string, quantity: number = 1) => {
    const { data } = await api.post<ApiResponse<Cart>>('/cart', { productId, quantity });
    return data.data;
  },

  updateQuantity: async (productId: string, quantity: number) => {
    const { data } = await api.patch<ApiResponse<Cart>>(`/cart/${productId}`, { quantity });
    return data.data;
  },

  removeItem: async (productId: string) => {
    const { data } = await api.delete<ApiResponse<Cart>>(`/cart/${productId}`);
    return data.data;
  },

  clearCart: async () => {
    const { data } = await api.delete<ApiResponse<Cart>>('/cart');
    return data.data;
  },
};