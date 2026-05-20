import {
  Request,
  Response,
} from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";

import { AuthRequest } from "../../middlewares/auth.middleware";

import { createCategorySchema } from "./category.validation";

import {
  createCategory,
  deleteCategory,
  getCategories,
} from "./category.service";

export const create =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const validatedData =
        createCategorySchema.parse(
          req.body
        );

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
  