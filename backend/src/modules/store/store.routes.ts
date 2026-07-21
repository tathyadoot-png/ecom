import express from "express";

import {
  createStoreController,
  getAllStoresController,
  getMyStoreController,
  updateStoreStatusController,
  getVendorDashboardStatsController,
  updateMyStoreController,
  getStoreByIdController,
  updateStoreFlagsController
} from "./store.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { upload }
from "../../middlewares/upload.middleware";
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

  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "banner",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "portraitImage",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 10,
    },
  ]),

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

router.patch(
  "/:id/flags",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  updateStoreFlagsController
);


router.get(
  "/vendor-dashboard",
  authMiddleware,
  roleMiddleware(
    "VENDOR"
  ),
  getVendorDashboardStatsController
);


router.patch(
  "/my-store",
  authMiddleware,
  roleMiddleware(
    "VENDOR",
    "ADMIN",
    "SUPER_ADMIN"
  ),

  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "banner",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "portraitImage",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 10,
    },
  ]),

  updateMyStoreController
);


router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  getStoreByIdController
);

export default router;