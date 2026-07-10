import { create } from "zustand";

import { Category } from "@/types/category.types";

import { categoryService } from "@/services/category.service";

interface CategoryStore {
  categories: Category[];

  loading: boolean;

  fetchCategories: () => Promise<void>;
}

export const useCategoryStore =
  create<CategoryStore>((set) => ({
    categories: [],

    loading: false,

    fetchCategories: async () => {
      try {
        set({
          loading: true,
        });

        const { data } =
          await categoryService.getAll();

        set({
          categories: data.data,
        });
      } finally {
        set({
          loading: false,
        });
      }
    },
  }));