import api from "@/lib/axios";

export const getProducts =
  async (params?: any) => {
    return api.get(
      "/products",
      {
        params,
      }
    );
  };

export const getSingleProduct =
  async (slug: string) => {
    const res = await api.get(
      `/products/slug/${slug}`
    );

    return res.data.data;
  };

export const getCategories =
  async () => {
    return api.get(
      "/categories"
    );
  };

export const createProduct =
  async (data: FormData) => {
    return api.post(
      "/products",
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };

export const updateProduct =
  async (
    id: string,
    data: FormData
  ) => {
    return api.patch(
      `/products/${id}`,
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };

export const deleteProduct =
  async (id: string) => {
    return api.delete(
      `/products/${id}`
    );
  };