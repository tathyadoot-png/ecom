import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api.types';
import {
  Artisan,
  ArtisanFilters,
  ArtisansResponse,
  ArtisanProductsResponse,
} from '@/types/artisan.types';

export const artisanService = {
  getHomepageArtisans: async (limit?: number) => {
    const { data } = await api.get<ApiResponse<Artisan[]>>('/artisans/homepage', {
      params: limit ? { limit } : undefined,
    });
    return data.data;
  },

  getArtisans: async (filters?: ArtisanFilters) => {
    const { data } = await api.get<ApiResponse<ArtisansResponse>>('/artisans', {
      params: filters,
    });
    return data.data;
  },

  getArtisanBySlug: async (slug: string) => {
    const { data } = await api.get<ApiResponse<Artisan>>(`/artisans/${slug}`);
    return data.data;
  },

  getArtisanProducts: async (slug: string, params?: { page?: number; limit?: number }) => {
    const { data } = await api.get<ApiResponse<ArtisanProductsResponse>>(
      `/artisans/${slug}/products`,
      { params }
    );
    return data.data;
  },
};
