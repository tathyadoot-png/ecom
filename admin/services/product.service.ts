import api from "@/lib/axios";

export const createProduct = async (
  data: FormData
) => {
  const res = await api.post(
    "/products",
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const getProducts =
  async () => {
    const res = await api.get(
      "/products"
    );

    return res.data;
  };

export const deleteProduct =
  async (id: string) => {
    const res = await api.delete(
      `/products/${id}`
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

export const getProductById =
  async (id: string) => {
    const res = await api.get(
      `/products/id/${id}`
    );

    return res.data;
  };

export const updateProduct =
  async (
    id: string,
    data: FormData
  ) => {
    const res = await api.patch(
      `/products/${id}`,
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return res.data;
  };

  export const getVendorProducts =
  async () => {
    const res =
      await api.get(
        "/products/vendor/my-products"
      );

    return res.data;
  };


  export const updateProductStatus =
  async (
    id: string,
    status: string
  ) => {

    const res =
      await api.patch(
        `/products/admin/${id}/status`,
        {
          status,
        }
      );

    return res.data;
  };