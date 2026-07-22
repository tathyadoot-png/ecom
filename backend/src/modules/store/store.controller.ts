import {
  Request,
  Response,
} from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";

import { AuthRequest } from "../../middlewares/auth.middleware";
import {
  getVendorDashboardStats,
  updateStore,
  getStoreById,
  updateStoreFlags,
} from "./store.service";


import {
  createStore,
  getAllStores,
  getMyStore,
  updateStoreStatus,
} from "./store.service";

import {
  createStoreSchema,
  updateStoreSchema,
  updateStoreFlagsSchema,
} from "./store.validation";

// Multipart/form-data has no native nested-object representation —
// every field arrives as a flat string. socialLinks and seo are both
// validated as nested objects, so the client sends each JSON-encoded
// under one field; this unpacks them back into objects before Zod
// sees them. Left alone (and not a string) for plain JSON requests,
// where they're already objects.
const parseNestedJsonFields = (body: any) => {
  for (const field of ["socialLinks", "seo"]) {
    if (typeof body[field] === "string") {
      try {
        body[field] = JSON.parse(body[field]);
      } catch {
        delete body[field];
      }
    }
  }
  return body;
};

export const createStoreController =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
    const validatedData =
  createStoreSchema.parse(
    parseNestedJsonFields(req.body)
  );

const files =
  req.files as any;

const logo =
  files?.logo?.[0]
    ?.path || "";

const banner =
  files?.banner?.[0]
    ?.path || "";

const coverImage =
  files?.coverImage?.[0]
    ?.path || "";

const portraitImage =
  files?.portraitImage?.[0]
    ?.path || "";

const gallery =
  files?.gallery?.map(
    (file: any) => file.path
  ) || [];

const store =
  await createStore(
    {
      ...validatedData,
      logo,
      banner,
      coverImage,
      portraitImage,
      gallery,
    },
    req.user._id
  );
      return successResponse(
        res,
        "Store created successfully",
        store,
        201
      );
    }
  );

export const getMyStoreController =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const store =
        await getMyStore(
          req.user._id
        );

      return successResponse(
        res,
        "Store fetched successfully",
        store
      );
    }
  );

export const getAllStoresController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const stores =
        await getAllStores();

      return successResponse(
        res,
        "Stores fetched successfully",
        stores
      );
    }
  );

export const updateStoreStatusController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const store =
        await updateStoreStatus(
          req.params.id as string,
          req.body.status
        );

      return successResponse(
        res,
        "Store updated successfully",
        store
      );
    }
  );

  export const getVendorDashboardStatsController =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const stats =
        await getVendorDashboardStats(
          req.user._id
        );

      return successResponse(
        res,
        "Vendor dashboard fetched successfully",
        stats
      );
    }
  );

  export const updateMyStoreController =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const validatedData =
        updateStoreSchema.parse(
          parseNestedJsonFields(req.body)
        );

      const files =
        req.files as any;

      const logo =
        files?.logo?.[0]
          ?.path;

      const banner =
        files?.banner?.[0]
          ?.path;

      const coverImage =
        files?.coverImage?.[0]
          ?.path;

      const portraitImage =
        files?.portraitImage?.[0]
          ?.path;

      // The gallery is built from two channels in the same request:
      // kept/reordered EXISTING urls arrive as plain body strings
      // (validated by Zod into validatedData.gallery), and newly
      // uploaded files arrive via multer into files.gallery. Both are
      // merged — previously, new uploads silently replaced the whole
      // array, which would have wiped out any kept images the moment
      // a vendor added one new photo alongside their existing gallery.
      // `galleryTouched` is the authoritative signal that the client's
      // Gallery section was submitted at all — a plain multipart
      // request has no other way to represent "explicitly cleared to
      // zero images" versus "gallery wasn't part of this update".
      const keptGalleryUrls: string[] = Array.isArray(validatedData.gallery)
        ? validatedData.gallery
        : [];

      const uploadedGalleryPaths: string[] =
        files?.gallery?.map((file: any) => file.path) || [];

      const gallerySubmitted = req.body.galleryTouched === "true";

      const gallery = [...keptGalleryUrls, ...uploadedGalleryPaths];

      const store =
        await updateStore(
          req.user._id,
          {
            ...validatedData,

            ...(logo && {
              logo,
            }),

            ...(banner && {
              banner,
            }),

            ...(coverImage && {
              coverImage,
            }),

            ...(portraitImage && {
              portraitImage,
            }),

            ...(gallerySubmitted && {
              gallery,
            }),
          }
        );

      return successResponse(
        res,
        "Store updated successfully",
        store
      );
    }
  );


  export const getStoreByIdController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const store =
        await getStoreById(
          req.params.id as string
        );

      return successResponse(
        res,
        "Store fetched",
        store
      );
    }
  );

  // Admin-only curation — "featured" and "verified" are trust signals
  // an admin panel will manage later; kept separate from the vendor's
  // own update endpoint so they can never be self-assigned.
  export const updateStoreFlagsController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const validatedData =
        updateStoreFlagsSchema.parse(
          req.body
        );

      const store =
        await updateStoreFlags(
          req.params.id as string,
          validatedData
        );

      return successResponse(
        res,
        "Store flags updated",
        store
      );
    }
  );