import { create } from 'zustand';
import { toast } from 'sonner';
import { Cart, CartItem } from '@/types/cart.types';
import { Product } from '@/types/product.types';
import { cartService } from '@/services/cart.service';
import { useAuthStore } from '@/store/auth.store';

interface CartStore {
  items: CartItem[];
  loading: boolean;
  initialized: boolean;

  fetchCart: () => Promise<void>;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  reset: () => void;

  totalItems: () => number;
  totalPrice: () => number;
}

let inFlightFetch: Promise<void> | null = null;

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message || fallback;

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  loading: false,
  initialized: false,

  // Concurrent callers (Header, AuthProvider, cart page) collapse onto
  // one in-flight request — same dedupe pattern as auth.store.
  fetchCart: () => {
    if (inFlightFetch) return inFlightFetch;

    inFlightFetch = (async () => {
      try {
        set({ loading: true });
        const cart = await cartService.getCart();
        set({ items: cart.items, initialized: true });
      } catch {
        set({ initialized: true });
      } finally {
        set({ loading: false });
        inFlightFetch = null;
      }
    })();

    return inFlightFetch;
  },

  addToCart: async (product, quantity = 1) => {
    if (!useAuthStore.getState().user) {
      toast.info('Please login to add items to your cart');
      return;
    }

    const previousItems = get().items;
    const existing = previousItems.find((item) => item.product._id === product._id);

    // Optimistic: we already have the full product object from the
    // caller (ProductCard/ProductActions), so we can update the
    // header badge instantly instead of waiting on the round trip.
    const optimisticItems = existing
      ? previousItems.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...previousItems, { product, quantity }];

    set({ items: optimisticItems });

    try {
      const cart = await cartService.addToCart(product._id, quantity);
      set({ items: cart.items });
      toast.success('Added to cart');
    } catch (error) {
      set({ items: previousItems });
      toast.error(getErrorMessage(error, 'Could not add item to cart'));
    }
  },

  updateQuantity: async (productId, quantity) => {
    const previousItems = get().items;

    set({
      items: previousItems.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      ),
    });

    try {
      const cart = await cartService.updateQuantity(productId, quantity);
      set({ items: cart.items });
    } catch (error) {
      set({ items: previousItems });
      toast.error(getErrorMessage(error, 'Could not update quantity'));
    }
  },

  removeItem: async (productId) => {
    const previousItems = get().items;

    set({ items: previousItems.filter((item) => item.product._id !== productId) });

    try {
      const cart = await cartService.removeItem(productId);
      set({ items: cart.items });
    } catch (error) {
      set({ items: previousItems });
      toast.error(getErrorMessage(error, 'Could not remove item'));
    }
  },

  clearCart: async () => {
    const previousItems = get().items;

    set({ items: [] });

    try {
      await cartService.clearCart();
    } catch (error) {
      set({ items: previousItems });
      toast.error(getErrorMessage(error, 'Could not clear cart'));
    }
  },

  // Local-only reset for logout (AuthProvider) — never hits the API,
  // since the server-side cart must survive the session ending.
  reset: () => set({ items: [], initialized: false }),

  totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),

  totalPrice: () =>
    get().items.reduce((total, item) => {
      const price = item.product.salePrice > 0 ? item.product.salePrice : item.product.price;
      return total + price * item.quantity;
    }, 0),
}));
