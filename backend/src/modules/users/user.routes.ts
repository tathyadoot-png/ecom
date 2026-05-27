import express from "express";

import {
  getAllUsers,
  getUserById,
  toggleBlockUser,
  updateUserRole,
} from "./user.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { roleMiddleware } from "../../middlewares/role.middleware";



const router =
  express.Router();

router.use(
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  )
);

router.get(
  "/",
  getAllUsers
);

router.get(
  "/:id",
  getUserById
);

router.patch(
  "/:id/role",
  updateUserRole
);

router.patch(   
  "/:id/block",
  toggleBlockUser
);

export default router;