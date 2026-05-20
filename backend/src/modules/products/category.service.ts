import { Category } from "./category.model";

import { ApiError } from "../../utils/ApiError";

export const createCategory =
  async (data: any) => {
    const existingCategory =
      await Category.findOne({
        slug: data.slug,
      });

    if (existingCategory) {
      throw new ApiError(
        400,
        "Category already exists"
      );
    }

    const category =
      await Category.create(
        data
      );

    return category;
  };

export const getCategories =
  async () => {
    const categories =
      await Category.find({
        isActive: true,
      }).sort({
        createdAt: -1,
      });

    return categories;
  };

export const deleteCategory =
  async (
    categoryId: string
  ) => {
    const category =
      await Category.findById(
        categoryId
      );

    if (!category) {
      throw new ApiError(
        404,
        "Category not found"
      );
    }

    await Category.findByIdAndDelete(
      categoryId
    );

    return true;
  };