import {
  Request,
  Response,
} from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";

import { AuthRequest } from "../../middlewares/auth.middleware";

import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation";

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "./category.service";

export const create = asyncHandler(
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const file =
      req.file as Express.Multer.File;

    const validatedData =
      createCategorySchema.parse({

        ...req.body,

        image:
          file?.path || "",

        featured:
          req.body.featured ===
          "true",

       displayOrder:
Number(
req.body.displayOrder || 0
),

      });

    const category =
      await createCategory(
        validatedData
      );

    return successResponse(
      res,
      "Category created successfully",
      category,
      201
    );
  }
);
export const getAll =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const categories =
        await getCategories();

      return successResponse(
        res,
        "Categories fetched successfully",
        categories
      );
    }
  );

export const remove =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      await deleteCategory(
        req.params.id as string
      );

      return successResponse(
        res,
        "Category deleted successfully"
      );
    }
  );
  


  export const update = asyncHandler(
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const file =
      req.file as Express.Multer.File;

    const validatedData =
      updateCategorySchema.parse({

        ...req.body,

        image: file?.path,

featured:
  req.body.featured !== undefined
    ? req.body.featured === "true"
    : undefined,

        isActive:
  req.body.isActive !== undefined
    ? req.body.isActive === "true"
    : undefined,

        displayOrder: Number(
          req.body.displayOrder || 0
        ),
      });

    const category =
      await updateCategory(
        req.params.id as string,
        validatedData
      );

    return successResponse(
      res,
      "Category updated successfully",
      category
    );
  }
);