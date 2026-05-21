import api from "@/lib/axios";

export const getProducts =
  async (params?: any) => {
    const res = await api.get(
      "/products",
      {
        params,
      }
    );

    return res.data;
  };

export const getSingleProduct =
  async (slug: string) => {
    const res = await api.get(
      `/products/slug/${slug}`
    );

    return res.data;
  };

export const getCategories =
  async () => {
    const res = await api.get(
      "/categories"
    );

    return res.data;
  };