import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  getMe,
  login,
  register,
  logout,
} from "./auth.controller";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get(
  "/me",
  authMiddleware,
  getMe
);

router.post("/logout", logout);

export default router;