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

const store =
  await createStore(
    {
      ...validatedData,
      logo,
      banner,
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