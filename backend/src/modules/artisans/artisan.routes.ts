import express from "express";

import {
  getAllArtisans,
  getArtisanBySlug,
  getArtisanProductsController,
  getFeaturedArtisansController,
  getHomepageArtisansController,
} from "./artisan.controller";

const router = express.Router();

// All routes here are public — no auth, no role check. Every query in
// artisan.service.ts is hard-filtered to APPROVED + isActive stores,
// so nothing pending/rejected/suspended is ever reachable through
// this surface regardless of what's requested.

// Static paths must come before the "/:slug" param route, otherwise
// Express would match "featured"/"homepage" as a slug value.
router.get("/featured", getFeaturedArtisansController);
router.get("/homepage", getHomepageArtisansController);

router.get("/", getAllArtisans);
router.get("/:slug", getArtisanBySlug);
router.get("/:slug/products", getArtisanProductsController);

export default router;
