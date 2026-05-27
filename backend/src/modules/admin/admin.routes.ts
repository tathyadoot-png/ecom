import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { roleMiddleware } from "../../middlewares/role.middleware";
import { getDashboardStats } from "./admin.controller";

const router =
  express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(
  "ADMIN",
  "SUPER_ADMIN"
),
  getDashboardStats
);

export default router;