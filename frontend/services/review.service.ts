import api from "@/lib/axios";

export const createReview =
  async (data: any) => {
    return api.post(
      "/reviews",
      data
    );
  };

export const getProductReviews =
  async (
    productId: string
  ) => {
    return api.get(
      `/reviews/${productId}`
    );
  };