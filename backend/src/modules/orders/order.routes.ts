import express from "express";

import {
  create,
  getAllOrdersAdmin,
  getMine,
  getOne,
  updateOrderStatus,
} from "./order.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  create
);

router.get(
  "/my-orders",
  authMiddleware,
  getMine
);

router.get(
  "/:id",
  authMiddleware,
  getOne
);


router.get(
  "/admin/all",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  getAllOrdersAdmin
);

router.patch(
  "/admin/:id/status",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  updateOrderStatus
);

export default router;