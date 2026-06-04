import {
  Request,
  Response,
} from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";

import { AuthRequest } from "../../middlewares/auth.middleware";
import {
  getVendorDashboardStats,
} from "./store.service";


import {
  createStore,
  getAllStores,
  getMyStore,
  updateStoreStatus,
} from "./store.service";

export const createStoreController =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const store =
        await createStore(
          req.body,
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