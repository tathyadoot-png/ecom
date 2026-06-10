import express from "express";

import {
  create,
  getAll,
  getOne,
  remove,
  update,
  getById,
  getVendorProductsController,
  updateProductStatusController,
} from "./product.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { roleMiddleware } from "../../middlewares/role.middleware";

import { upload } from "../../middlewares/upload.middleware";

const router =
  express.Router();

// Public
router.get("/", getAll);

router.get(
  "/id/:id",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  getById
);


router.get(
  "/slug/:slug",
  getOne
);

// Admin
router.get(
  "/admin/:id",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  getById
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(
    "VENDOR",
    "ADMIN",
    "SUPER_ADMIN"
  ),
  upload.array(
    "images",
    5
  ),
  create
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(
    "VENDOR",
    "ADMIN",
    "SUPER_ADMIN"
  ),
  upload.array(
    "images",
    5
  ),
  update
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  remove
);

router.get(
  "/vendor/my-products",
  authMiddleware,
  roleMiddleware(
    "VENDOR",
    "ADMIN",
    "SUPER_ADMIN"
  ),
  getVendorProductsController
);

router.patch(
  "/admin/:id/status",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  updateProductStatusController
);


export default router;