import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api.types';
import { Wishlist } from '@/types/wishlist.types';

export const wishlistService = {
  getWishlist: async () => {
    const { data } = await api.get<ApiResponse<Wishlist>>('/wishlist');
    return data.data;
  },

  // POST/DELETE responses return the wishlist without populating
  // `products` (backend limitation — populate() is only called on
  // GET), so the response body is unusable here and intentionally
  // discarded. The store trusts its own optimistic state instead.
  addToWishlist: async (productId: string) => {
    await api.post(`/wishlist/${productId}`);
  },

  removeFromWishlist: async (productId: string) => {
    await api.delete(`/wishlist/${productId}`);
  },
};
