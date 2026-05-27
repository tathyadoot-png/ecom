import express from "express";

import {
  createStoreController,
  getAllStoresController,
  getMyStoreController,
  updateStoreStatusController,
} from "./store.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { roleMiddleware } from "../../middlewares/role.middleware";

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(
    "VENDOR",
    "ADMIN",
    "SUPER_ADMIN"
  ),
  createStoreController
);

router.get(
  "/my-store",
  authMiddleware,
  roleMiddleware(
    "VENDOR",
    "ADMIN",
    "SUPER_ADMIN"
  ),
  getMyStoreController
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  getAllStoresController
);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  updateStoreStatusController
);

export default router;