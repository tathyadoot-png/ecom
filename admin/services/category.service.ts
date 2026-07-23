import api from "@/lib/axios";

export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

export const createCategory = async (
  data: FormData
) => {
  return api.post(
    "/categories",
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};

export const deleteCategory = async (
  id: string
) => {
  return api.delete(
    `/categories/${id}`
  );
};

export const updateCategory = (
  id: string,
  data: FormData
) => {

  return api.put(
    `/categories/${id}`,
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

};