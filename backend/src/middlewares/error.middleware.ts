import {
  NextFunction,
  Request,
  Response,
} from "express";

import { ZodError } from "zod";

import { ApiError } from "../utils/ApiError";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  // Zod Validation Errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: err.issues[0].message,
    });
  }

  // Custom API Errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  // Default Errors
  return res.status(500).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
};