import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import { successResponse } from "../../utils/response";

import {
  getPublicArtisans,
  getPublicArtisanBySlug,
  getArtisanProducts,
  getFeaturedArtisans,
  getHomepageArtisans,
} from "./artisan.service";

export const getAllArtisans = asyncHandler(async (req: Request, res: Response) => {
  const result = await getPublicArtisans(req.query);

  return successResponse(res, "Artisans fetched successfully", result);
});

export const getArtisanBySlug = asyncHandler(async (req: Request, res: Response) => {
  const artisan = await getPublicArtisanBySlug(req.params.slug as string);

  return successResponse(res, "Artisan fetched successfully", artisan);
});

export const getArtisanProductsController = asyncHandler(async (req: Request, res: Response) => {
  const result = await getArtisanProducts(req.params.slug as string, req.query);

  return successResponse(res, "Artisan products fetched successfully", result);
});

export const getFeaturedArtisansController = asyncHandler(async (req: Request, res: Response) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const artisans = await getFeaturedArtisans(limit);

  return successResponse(res, "Featured artisans fetched successfully", artisans);
});

export const getHomepageArtisansController = asyncHandler(async (req: Request, res: Response) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const artisans = await getHomepageArtisans(limit);

  return successResponse(res, "Homepage artisans fetched successfully", artisans);
});
