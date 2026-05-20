import express from "express";

import {
  create,
  getAll,
  remove,
} from "./category.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { roleMiddleware } from "../../middlewares/role.middleware";

const router = express.Router();

// Public
router.get("/", getAll);

// Admin
router.post(
  "/",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
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

export default router;