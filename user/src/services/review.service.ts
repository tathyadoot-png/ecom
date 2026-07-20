import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api.types';
import { Review } from '@/types/review.types';

export const reviewService = {
  getProductReviews: async (productId: string) => {
    const { data } = await api.get<ApiResponse<Review[]>>(`/reviews/${productId}`);
    return data.data;
  },
};
