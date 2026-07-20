import { create } from 'zustand';
import { toast } from 'sonner';
import { Product } from '@/types/product.types';
import { wishlistService } from '@/services/wishlist.service';
import { useAuthStore } from '@/store/auth.store';

interface WishlistStore {
  products: Product[];
  loading: boolean;
  initialized: boolean;

  fetchWishlist: () => Promise<void>;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  toggleWishlist: (product: Product) => Promise<void>;
  reset: () => void;

  isInWishlist: (productId: string) => boolean;
  totalItems: () => number;
}

let inFlightFetch: Promise<void> | null = null;

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message || fallback;

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  products: [],
  loading: false,
  initialized: false,

  fetchWishlist: () => {
    if (inFlightFetch) return inFlightFetch;

    inFlightFetch = (async () => {
      try {
        set({ loading: true });
        const wishlist = await wishlistService.getWishlist();
        set({ products: wishlist.products, initialized: true });
      } catch {
        set({ initialized: true });
      } finally {
        set({ loading: false });
        inFlightFetch = null;
      }
    })();

    return inFlightFetch;
  },

  addToWishlist: async (product) => {
    if (!useAuthStore.getState().user) {
      toast.info('Please login to add items to your wishlist');
      return;
    }

    if (get().isInWishlist(product._id)) return;

    const previousProducts = get().products;
    set({ products: [...previousProducts, product] });

    try {
      // Response body is unpopulated (see wishlist.service.ts) — the
      // optimistic state above is already correct, so there's
      // nothing to reconcile on success.
      await wishlistService.addToWishlist(product._id);
      toast.success('Added to wishlist');
    } catch (error) {
      set({ products: previousProducts });
      toast.error(getErrorMessage(error, 'Could not add to wishlist'));
    }
  },

  removeFromWishlist: async (productId) => {
    const previousProducts = get().products;
    set({ products: previousProducts.filter((product) => product._id !== productId) });

    try {
      await wishlistService.removeFromWishlist(productId);
    } catch (error) {
      set({ products: previousProducts });
      toast.error(getErrorMessage(error, 'Could not remove from wishlist'));
    }
  },

  toggleWishlist: async (product) => {
    if (get().isInWishlist(product._id)) {
      await get().removeFromWishlist(product._id);
    } else {
      await get().addToWishlist(product);
    }
  },

  // Local-only reset for logout (AuthProvider) — never hits the API.
  reset: () => set({ products: [], initialized: false }),

  isInWishlist: (productId) => get().products.some((product) => product._id === productId),

  totalItems: () => get().products.length,
}));
