import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api.types';
import { Product, ProductsResponse, ProductFilters } from '@/types/product.types';

export const productService = {
  getProducts: async (filters?: ProductFilters) => {
    const { data } = await api.get<ApiResponse<ProductsResponse>>('/products', {
      params: filters,
    });
    return data.data;
  },

  getProductBySlug: async (slug: string) => {
    const { data } = await api.get<ApiResponse<Product>>(`/products/${slug}`);
    return data.data;
  },

  getProductById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Product>>(`/products/id/${id}`);
    return data.data;
  },

  getFeaturedProducts: async () => {
    const { data } = await api.get<ApiResponse<ProductsResponse>>('/products', {
      params: { featured: 'true', limit: 8 },
    });
    return data.data;
  },

  createProduct: async (formData: FormData) => {
    const { data } = await api.post<ApiResponse<Product>>('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  updateProduct: async (id: string, formData: FormData) => {
    const { data } = await api.patch<ApiResponse<Product>>(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  deleteProduct: async (id: string) => {
    await api.delete(`/products/${id}`);
  },
};