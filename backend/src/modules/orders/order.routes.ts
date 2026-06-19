import express from "express";

import {
  create,
  getAllOrdersAdmin,
  getMine,
  getOne,
  updateOrderStatus,
  getVendorOrdersController,
  updateVendorOrderStatus,
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

router.get(
  "/vendor/my-orders",
  authMiddleware,
  roleMiddleware(
    "VENDOR"
  ),
  getVendorOrdersController
);

router.patch(
  "/vendor/:id/status",
  authMiddleware,
  roleMiddleware(
    "VENDOR"
  ),
  updateVendorOrderStatus
);


export default router;