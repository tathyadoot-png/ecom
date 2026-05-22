import api from "@/lib/axios";

export const getAllReviews =
  async () => {
    return api.get(
      "/reviews/admin/all"
    );
  };

export const deleteReview =
  async (id: string) => {
    return api.delete(
      `/reviews/admin/${id}`
    );
  };