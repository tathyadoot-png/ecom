import { create } from "zustand";

import {
  getCategories,
} from "@/services/category.service";

export interface Category {
  _id: string;

  name: string;

  slug: string;

  image: string;

  description: string;

  featured?: boolean;

  displayOrder?: number;
}

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

    const res = await getCategories();

    const categories = res.data.data;

    const sorted = [...categories].sort(
      (a, b) =>
        (a.displayOrder ?? 9999) -
        (b.displayOrder ?? 9999)
    );

    set({
      categories: sorted,
      loading: false,
    });

  } catch (error) {

    console.error(error);

    set({
      categories: [],
      loading: false,
    });

  }
}

  }));