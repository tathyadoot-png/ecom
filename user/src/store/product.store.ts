import { create } from 'zustand';
import { productService } from '@/services/product.service';
import { Product } from '@/types/product.types';

interface ProductState {
  featuredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  fetchFeaturedProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  featuredProducts: [],
  isLoading: false,
  error: null,

  fetchFeaturedProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await productService.getFeaturedProducts();
      set({ featuredProducts: response.products || [], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));