import {
  Request,
  Response,
} from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";

import {
  getAllUsersService,
  getUserByIdService,
  toggleBlockUserService,
  updateUserRoleService,
} from "./user.service";

export const getAllUsers =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const users =
        await getAllUsersService();

      return successResponse(
        res,
        "Users fetched successfully",
        users
      );
    }
  );

export const getUserById =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const user =
        await getUserByIdService(
          req.params.id as string
        );

      return successResponse(
        res,
        "User fetched successfully",
        user
      );
    }
  );

export const updateUserRole =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const user =
        await updateUserRoleService(
          req.params.id as string,
          req.body.role
        );

      return successResponse(
        res,
        "Role updated successfully",
        user
      );
    }
  );

export const toggleBlockUser =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const user =
        await toggleBlockUserService(
          req.params.id as string
        );

      return successResponse(
        res,
        user.isBlocked
          ? "User blocked"
          : "User unblocked",
        user
      );
    }
  );