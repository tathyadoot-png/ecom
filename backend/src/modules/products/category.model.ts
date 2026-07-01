import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

 displayOrder: {
  type: Number,
  default: 0,
  min: 0,
},

    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    seo: {
      title: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },

      keywords: [
        {
          type: String,
        },
      ],
    },

    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({
  name: "text",
});

export const Category = mongoose.model(
  "Category",
  categorySchema
);