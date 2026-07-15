import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api.types";
import { Category } from "@/types/category.types";

export const categoryService = {
  getCategories: async () => {
    const { data } =
      await api.get<ApiResponse<Category[]>>(
        "/categories"
      );

    return data.data;
  },
};