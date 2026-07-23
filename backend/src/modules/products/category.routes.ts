import express from "express";
import {
  create,
  getAll,
  remove,
  update,
} from "./category.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { roleMiddleware } from "../../middlewares/role.middleware";

import { upload } from "../../middlewares/upload.middleware";

const router = express.Router();

// Public
router.get("/", getAll);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  upload.single("image"),
  create
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

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  upload.single("image"),
  update
);

export default router;