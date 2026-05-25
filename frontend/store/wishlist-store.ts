import { create } from "zustand";

interface WishlistState {
  products: any[];

  setWishlist: (
    products: any[]
  ) => void;

  addProduct: (
    product: any
  ) => void;

  removeProduct: (
    productId: string
  ) => void;

  isInWishlist: (
    productId: string
  ) => boolean;
}

export const useWishlistStore =
  create<WishlistState>(
    (set, get) => ({
      products: [],

      setWishlist: (
        products
      ) =>
        set({
          products,
        }),

      addProduct: (
        product
      ) =>
        set((state) => ({
          products: [
            ...state.products,
            product,
          ],
        })),

      removeProduct: (
        productId
      ) =>
        set((state) => ({
          products:
            state.products.filter(
              (
                product
              ) =>
                product._id !==
                productId
            ),
        })),

      isInWishlist: (
        productId
      ) => {
        return get().products.some(
          (product) =>
            product._id ===
            productId
        );
      },
    })
  );