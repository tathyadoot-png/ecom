import multer from "multer";

import {
  CloudinaryStorage,
} from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary";

const storage =
  new CloudinaryStorage({
    cloudinary,

    params: async (
      req,
      file
    ) => {
      return {
        folder:
          "commerce-platform/products",

        allowed_formats: [
          "jpg",
          "jpeg",
          "png",
          "webp",
        ],

        transformation: [
          {
            width: 1200,
            crop: "limit",
            quality: "auto",
            fetch_format:
              "auto",
          },
        ],
      };
    },
  });

export const upload = multer({
  storage,

  limits: {
    fileSize:
      5 * 1024 * 1024,
  },
});