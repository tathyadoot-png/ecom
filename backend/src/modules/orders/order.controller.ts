import {
  Request,
  Response,
} from "express";

import { AuthRequest } from "../../middlewares/auth.middleware";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";

import { createOrderSchema } from "./order.validation";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
} from "./order.service";

import {
  getAllOrdersAdminService,
  updateOrderStatusService,
} from "./order.service";


export const create =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const validatedData =
        createOrderSchema.parse(
          req.body
        );

      const order =
        await createOrder(
          req.user._id,
          validatedData
        );

      return successResponse(
        res,
        "Order created successfully",
        order,
        201
      );
    }
  );

export const getMine =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const orders =
        await getMyOrders(
          req.user._id
        );

      return successResponse(
        res,
        "Orders fetched successfully",
        orders
      );
    }
  );

export const getOne =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const order =
        await getSingleOrder(
          req.params.id as string
        );

      return successResponse(
        res,
        "Order fetched successfully",
        order
      );
    }
  );


  export const getAllOrdersAdmin =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const orders =
        await getAllOrdersAdminService();

      return successResponse(
        res,
        "Orders fetched successfully",
        orders
      );
    }
  );

export const updateOrderStatus =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const order =
        await updateOrderStatusService(
          req.params.id as string,
          req.body.status
        );

      return successResponse(
        res,
        "Order updated successfully",
        order
      );
    }
  );