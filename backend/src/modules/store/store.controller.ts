import {
  Request,
  Response,
} from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";

import { AuthRequest } from "../../middlewares/auth.middleware";
import {
  getVendorDashboardStats,
  updateStore,
  getStoreById,
  updateStoreFlags,
} from "./store.service";


import {
  createStore,
  getAllStores,
  getMyStore,
  updateStoreStatus,
} from "./store.service";

import {
  createStoreSchema,
  updateStoreSchema,
  updateStoreFlagsSchema,
} from "./store.validation";

export const createStoreController =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
    const validatedData =
  createStoreSchema.parse(
    req.body
  );

const files =
  req.files as any;

const logo =
  files?.logo?.[0]
    ?.path || "";

const banner =
  files?.banner?.[0]
    ?.path || "";

const coverImage =
  files?.coverImage?.[0]
    ?.path || "";

const portraitImage =
  files?.portraitImage?.[0]
    ?.path || "";

const gallery =
  files?.gallery?.map(
    (file: any) => file.path
  ) || [];

const store =
  await createStore(
    {
      ...validatedData,
      logo,
      banner,
      coverImage,
      portraitImage,
      gallery,
    },
    req.user._id
  );
      return successResponse(
        res,
        "Store created successfully",
        store,
        201
      );
    }
  );

export const getMyStoreController =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const store =
        await getMyStore(
          req.user._id
        );

      return successResponse(
        res,
        "Store fetched successfully",
        store
      );
    }
  );

export const getAllStoresController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const stores =
        await getAllStores();

      return successResponse(
        res,
        "Stores fetched successfully",
        stores
      );
    }
  );

export const updateStoreStatusController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const store =
        await updateStoreStatus(
          req.params.id as string,
          req.body.status
        );

      return successResponse(
        res,
        "Store updated successfully",
        store
      );
    }
  );

  export const getVendorDashboardStatsController =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const stats =
        await getVendorDashboardStats(
          req.user._id
        );

      return successResponse(
        res,
        "Vendor dashboard fetched successfully",
        stats
      );
    }
  );

  export const updateMyStoreController =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const validatedData =
        updateStoreSchema.parse(
          req.body
        );

      const files =
        req.files as any;

      const logo =
        files?.logo?.[0]
          ?.path;

      const banner =
        files?.banner?.[0]
          ?.path;

      const coverImage =
        files?.coverImage?.[0]
          ?.path;

      const portraitImage =
        files?.portraitImage?.[0]
          ?.path;

      // Only replaces the gallery when new files are actually
      // uploaded — an unrelated profile edit (e.g. just the story
      // text) must never silently wipe existing gallery images.
      const gallery =
        files?.gallery?.map(
          (file: any) => file.path
        );

      const store =
        await updateStore(
          req.user._id,
          {
            ...validatedData,

            ...(logo && {
              logo,
            }),

            ...(banner && {
              banner,
            }),

            ...(coverImage && {
              coverImage,
            }),

            ...(portraitImage && {
              portraitImage,
            }),

            ...(gallery && {
              gallery,
            }),
          }
        );

      return successResponse(
        res,
        "Store updated successfully",
        store
      );
    }
  );


  export const getStoreByIdController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const store =
        await getStoreById(
          req.params.id as string
        );

      return successResponse(
        res,
        "Store fetched",
        store
      );
    }
  );

  // Admin-only curation — "featured" and "verified" are trust signals
  // an admin panel will manage later; kept separate from the vendor's
  // own update endpoint so they can never be self-assigned.
  export const updateStoreFlagsController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const validatedData =
        updateStoreFlagsSchema.parse(
          req.body
        );

      const store =
        await updateStoreFlags(
          req.params.id as string,
          validatedData
        );

      return successResponse(
        res,
        "Store flags updated",
        store
      );
    }
  );