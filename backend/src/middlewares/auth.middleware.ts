import {
  NextFunction,
  Request,
  Response,
} from "express";

import jwt from "jsonwebtoken";

import { User } from "../modules/auth/auth.model";

import { asyncHandler } from "../utils/asyncHandler";

import { ApiError } from "../utils/ApiError";

export interface AuthRequest
  extends Request {
  user?: any;
}

interface JwtPayload {
  userId: string;
  role: string;
}

export const authMiddleware =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response,
      next: NextFunction
    ) => {
      const token =
        req.cookies.token;

      if (!token) {
        throw new ApiError(
          401,
          "Unauthorized"
        );
      }

      const decoded =
        jwt.verify(
          token,
          process.env
            .JWT_SECRET as string
        ) as JwtPayload;

      const user =
        await User.findById(
          decoded.userId
        ).select("-password");

      if (!user) {
        throw new ApiError(
          401,
          "User not found"
        );
      }

      req.user = user;

      next();
    }
  );