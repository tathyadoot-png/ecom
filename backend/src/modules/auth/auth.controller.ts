import { Request, Response } from "express";

import { AuthRequest } from "../../middlewares/auth.middleware";

import {
  loginUser,
  registerUser,
} from "./auth.service";

import {
  loginSchema,
  registerSchema,
} from "./auth.validation";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";
import {
  updateProfileService,
  changePasswordService,
} from "./profile.service";

export const register = asyncHandler(
  async (
    req: Request,
    res: Response
  ) => {
    const validatedData =
      registerSchema.parse(req.body);

    const user = await registerUser(
      validatedData.name,
      validatedData.email,
      validatedData.password
    );

    return successResponse(
      res,
      "User registered successfully",
      user,
      201
    );
  }
);

export const login = asyncHandler(
  async (
    req: Request,
    res: Response
  ) => {
    const validatedData =
      loginSchema.parse(req.body);

    const data = await loginUser(
      validatedData.email,
      validatedData.password
    );

    res.cookie("token", data.token, {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite:
        process.env.NODE_ENV ===
        "production"
          ? "none"
          : "lax",

      maxAge:
        7 *
        24 *
        60 *
        60 *
        1000,
    });

    return successResponse(
      res,
      "Login successful",
      data.user
    );
  }
);

export const getMe = asyncHandler(
  async (
    req: AuthRequest,
    res: Response
  ) => {
    return successResponse(
      res,
      "User fetched successfully",
      req.user
    );
  }
);

export const logout = asyncHandler(
  async (
    req: Request,
    res: Response
  ) => {
    res.clearCookie("token");

    return successResponse(
      res,
      "Logged out successfully"
    );
  }
);


export const updateProfile =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      let avatar = "";

      if (
        req.file
      ) {
        avatar =
          (
            req.file as any
          ).path;
      }

      const user =
        await updateProfileService(
          req.user._id,
         {
  ...req.body,

  avatar:
    avatar ||
    req.user.avatar,
}
        );

      return successResponse(
        res,
        "Profile updated successfully",
        user
      );
    }
  );

export const changePassword =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const {
        currentPassword,
        newPassword,
      } = req.body;

      await changePasswordService(
        req.user._id,
        currentPassword,
        newPassword
      );

      return successResponse(
        res,
        "Password changed successfully"
      );
    }
  );