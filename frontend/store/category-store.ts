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

    set({ loading: true });

    const res = await getCategories();

    console.log("CATEGORY API RESPONSE =>", res);

    console.log("CATEGORY DATA =>", res.data);

    console.log("FULL RESPONSE", JSON.stringify(res.data, null, 2));

    console.log("TYPE =>", typeof res.data);
console.log("DATA =>", res.data);
console.log("IS ARRAY =>", Array.isArray(res.data));

  } catch (error: any) {

    console.log("CATEGORY ERROR =>", error);

    console.log("CATEGORY RESPONSE =>", error?.response);

    set({

      loading: false,

    });

  }

}

  }));