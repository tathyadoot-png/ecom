import { create } from "zustand";

import { Product } from "@/types/product.types";

import {
  addToCart,
  clearCart as clearCartApi,
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/services/cart.service";

interface CartItem {
  product: Product;

  quantity: number;
}

interface CartState {
  items: CartItem[];

  loading: boolean;

  fetchCart: () => Promise<void>;

  addItem: (
    productId: string
  ) => Promise<void>;

  removeItem: (
    productId: string
  ) => Promise<void>;

  updateQuantity: (
    productId: string,
    quantity: number
  ) => Promise<void>;

  increaseQuantity: (
    productId: string,
    currentQty: number
  ) => Promise<void>;

  decreaseQuantity: (
    productId: string,
    currentQty: number
  ) => Promise<void>;

  // clearCart: () => Promise<void>;

  totalItems: () => number;

  totalPrice: () => number;
  clearItems: () => Promise<void>;
}

export const useCartStore =
  create<CartState>(
    (set, get) => ({
      items: [],

      loading: false,

      fetchCart:
        async () => {
          try {
            set({
              loading: true,
            });

            const res =
              await getCart();

            set({
              items:
                res.data.data
                  .items || [],
            });
          } catch (
            error
          ) {
            console.log(
              error
            );
          } finally {
            set({
              loading: false,
            });
          }
        },

      addItem:
        async (
          productId
        ) => {
          const res =
            await addToCart(
              productId
            );

          set({
            items:
              res.data.data
                .items,
          });
        },

      removeItem:
        async (
          productId
        ) => {
          const res =
            await removeCartItem(
              productId
            );

          set({
            items:
              res.data.data
                .items,
          });
        },

      updateQuantity:
        async (
          productId,
          quantity
        ) => {
          const res =
            await updateCartItem(
              productId,
              quantity
            );

          set({
            items:
              res.data.data
                .items,
          });
        },

      increaseQuantity:
        async (
          productId,
          currentQty
        ) => {
          const res =
            await updateCartItem(
              productId,
              currentQty + 1
            );

          set({
            items:
              res.data.data
                .items,
          });
        },

      decreaseQuantity:
        async (
          productId,
          currentQty
        ) => {
          if (
            currentQty <= 1
          ) {
            return;
          }

          const res =
            await updateCartItem(
              productId,
              currentQty - 1
            );

          set({
            items:
              res.data.data
                .items,
          });
        },

      // clearCart: async () => {},

clearItems: async () => {
  await clearCartApi();

  set({
    items: [],
  });
},

      totalItems:
        () => {
          return get().items.reduce(
            (
              total,
              item
            ) =>
              total +
              item.quantity,
            0
          );
        },

      totalPrice:
        () => {
          return get().items.reduce(
            (
              total,
              item
            ) =>
              total +
              (item.product
                .salePrice ||
                item.product
                  .price) *
                item.quantity,
            0
          );
        },
    })
  );