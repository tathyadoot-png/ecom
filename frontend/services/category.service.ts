import api from "@/lib/axios";

export const getCategories = () => {

  return api.get("/categories");

};

export const getFeaturedCategories = () => {

  return api.get("/categories?featured=true");

};

export const createCategory = (
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

export const deleteCategory = (
  id: string
) => {

  return api.delete(
    `/categories/${id}`
  );

};