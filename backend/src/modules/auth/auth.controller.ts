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

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUser(
      validatedData.name,
      validatedData.email,
      validatedData.password
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData =
      loginSchema.parse(req.body);

    const data = await loginUser(
      validatedData.email,
      validatedData.password
    );

    res.cookie("token", data.token, {
      httpOnly: true,

      secure: false,

      sameSite: "lax",

      maxAge:
        7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,

      message: "Login successful",

      user: data.user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};


export const getMe = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed",
    });
  }
};

export const logout = async (
  req: Request,
  res: Response
) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};