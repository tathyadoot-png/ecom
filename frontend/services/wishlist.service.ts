import api from "@/lib/axios";

export const getWishlist =
  async () => {
    return api.get(
      "/wishlist"
    );
  };

export const addToWishlist =
  async (
    productId: string
  ) => {
    return api.post(
      `/wishlist/${productId}`
    );
  };

export const removeFromWishlist =
  async (
    productId: string
  ) => {
    return api.delete(
      `/wishlist/${productId}`
    );
  };