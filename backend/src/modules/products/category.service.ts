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
if (
  data.displayOrder > 0
) {

  const existingDisplayOrder =
    await Category.findOne({

      displayOrder:
        data.displayOrder,

    });

  if (
    existingDisplayOrder
  ) {

    throw new ApiError(
      400,
      "Display Order already exists."
    );

  }

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

  




  export const updateCategory = async (
  categoryId: string,
  data: any
) => {

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // Slug duplicate check
  if (data.slug && data.slug !== category.slug) {

    const existingSlug = await Category.findOne({
      slug: data.slug,
      _id: { $ne: categoryId },
    });

    if (existingSlug) {
      throw new ApiError(
        400,
        "Category with this slug already exists."
      );
    }
  }

  // Display Order duplicate check
  if (
    data.displayOrder &&
    data.displayOrder !== category.displayOrder
  ) {

    const existingOrder =
      await Category.findOne({
        displayOrder: data.displayOrder,
        _id: { $ne: categoryId },
      });

    if (existingOrder) {
      throw new ApiError(
        400,
        "Display Order already exists."
      );
    }
  }

  category.name =
    data.name ?? category.name;

  category.slug =
    data.slug ?? category.slug;

  category.description =
    data.description ?? category.description;

  category.featured =
    data.featured ?? category.featured;

  category.displayOrder =
    data.displayOrder ??
    category.displayOrder;

  category.parentCategory =
    data.parentCategory ??
    category.parentCategory;

  category.isActive =
    data.isActive ??
    category.isActive;

  // Image update (only if new image uploaded)
  if (data.image) {
    category.image = data.image;
  }

  await category.save();

  return category;
};