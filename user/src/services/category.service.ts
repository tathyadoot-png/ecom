import { api } from "@/lib/api";

import { ApiResponse } from "@/types/api.types";

import { Category } from "@/types/category.types";

export const categoryService = {
  getAll: () =>
    api.get<ApiResponse<Category[]>>(
      "/categories"
    ),
};