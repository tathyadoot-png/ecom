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
          "commerce-platform/avatars",

        allowed_formats: [
          "jpg",
          "jpeg",
          "png",
          "webp",
        ],

        transformation: [
          {
            width: 500,

            height: 500,

            crop: "fill",

            gravity:
              "face",

            quality:
              "auto",

            fetch_format:
              "auto",
          },
        ],
      };
    },
  });

export const avatarUpload =
  multer({
    storage,

    limits: {
      fileSize:
        2 * 1024 * 1024,
    },
  });