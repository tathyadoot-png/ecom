import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import { roleMiddleware } from "../middlewares/role.middleware";

const router = express.Router();

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("ADMIN", "SUPER_ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

export default router;