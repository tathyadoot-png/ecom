import api from "@/lib/axios";

export const getCart =
  async () => {
    return api.get("/cart");
  };

export const addToCart =
  async (
    productId: string,
    quantity = 1
  ) => {
    return api.post("/cart", {
      productId,
      quantity,
    });
  };

export const updateCartItem =
  async (
    productId: string,
    quantity: number
  ) => {
    return api.patch(
      `/cart/${productId}`,
      {
        quantity,
      }
    );
  };

export const removeCartItem =
  async (
    productId: string
  ) => {
    return api.delete(
      `/cart/${productId}`
    );
  };

export const clearCart =
  async () => {
    return api.delete("/cart");
  };