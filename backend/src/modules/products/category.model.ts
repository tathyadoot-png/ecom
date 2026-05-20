import mongoose, {
  Schema,
} from "mongoose";

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

    parentCategory: {
      type:
        Schema.Types.ObjectId,

      ref: "Category",

      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    storeId: {
      type:
        Schema.Types.ObjectId,

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

export const Category =
  mongoose.model(
    "Category",
    categorySchema
  );