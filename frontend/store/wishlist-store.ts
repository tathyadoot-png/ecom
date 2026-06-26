import { create } from "zustand";
import { getWishlist } from "@/services/wishlist.service";
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

  fetchWishlist: () => Promise<void>;
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

        fetchWishlist: async () => {
  try {
    const res = await getWishlist();

    set({
      products: res.data.data || [],
    });
  } catch (error) {
    console.log(error);
  }
},

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