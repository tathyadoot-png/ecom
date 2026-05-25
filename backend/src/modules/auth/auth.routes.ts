import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  getMe,
  login,
  register,
  logout,
} from "./auth.controller";
import {
  updateProfile,
  changePassword,
} from "./auth.controller";

import { avatarUpload } from "../../middlewares/avatar-upload.middleware";


const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get(
  "/me",
  authMiddleware,
  getMe
);

router.patch(
  "/profile",
  authMiddleware,
  avatarUpload.single(
    "avatar"
  ),
  updateProfile
);
router.patch(
  "/change-password",
  authMiddleware,
  changePassword
);

router.post("/logout", logout);

export default router;