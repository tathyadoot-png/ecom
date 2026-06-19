import { Request, Response } from "express";

import { AuthRequest } from "../../middlewares/auth.middleware";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";

import { createProductSchema } from "./product.validation";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getSingleProduct,
  updateProduct,
  getVendorProducts,
  updateProductStatus,
  getAllProductsAdmin
} from "./product.service";

export const create = asyncHandler(async (req: AuthRequest, res: Response) => {
  const files = req.files as Express.Multer.File[];

  const imageUrls = files?.map((file: any) => file.path) || [];

  const validatedData = createProductSchema.parse({
    ...req.body,

    images: imageUrls,
  });

  const product = await createProduct(validatedData, req.user._id);

  return successResponse(res, "Product created successfully", product, 201);
});

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const products = await getProducts(req.query);

  return successResponse(res, "Products fetched successfully", products);
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const product = await getSingleProduct(req.params.slug as string);

  return successResponse(res, "Product fetched successfully", product);
});

export const update =
asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  
  const files = req.files as Express.Multer.File[];

  const imageUrls = files?.map((file: any) => file.path) || [];

  const validatedData = createProductSchema.parse({
    ...req.body,

    images: imageUrls.length > 0 ? imageUrls : undefined,
  });

const product =
  await updateProduct(
    req.params.id as string,
    validatedData,
    req.user._id,
    req.user.role
  );

  return successResponse(res, "Product updated successfully", product);
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await deleteProduct(req.params.id as string);

  return successResponse(res, "Product deleted successfully");
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const product = 
  await getProductById(
    req.params.id as string,
    (req as any).user?._id,
    (req as any).user?.role
  );

  return successResponse(res, "Product fetched successfully", product);
});

export const getVendorProductsController =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const products =
        await getVendorProducts(
          req.user._id
        );

      return successResponse(
        res,
        "Vendor products fetched",
        products
      );
    }
  );

  export const updateProductStatusController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const product =
        await updateProductStatus(
          req.params.id as string,
          req.body.status
        );

      return successResponse(
        res,
        "Product status updated",
        product
      );
    }
  );




  export const getAllProductsAdminController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const products =
        await getAllProductsAdmin();

      return successResponse(
        res,
        "Products fetched",
        products
      );
    }
  );