import mongoose, {
  Schema,
} from "mongoose";

export enum ProductStatus {
  DRAFT = "draft",

  PUBLISHED = "published",
}

export enum InventoryStatus {
  IN_STOCK = "in_stock",

  OUT_OF_STOCK = "out_of_stock",
}

const productSchema = new Schema(
  {
    title: {
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

    description: {
      type: String,

      required: true,
    },

    shortDescription: {
      type: String,

      default: "",
    },

    category: {
      type:
        Schema.Types.ObjectId,

      ref: "Category",

      required: true,
    },

    price: {
      type: Number,

      required: true,

      min: 0,
    },

    salePrice: {
      type: Number,

      default: 0,

      min: 0,
    },

    stock: {
      type: Number,

      required: true,

      min: 0,
    },

    inventoryStatus: {
      type: String,

      enum:
        Object.values(
          InventoryStatus
        ),

      default:
        InventoryStatus.IN_STOCK,
    },

    images: [
      {
        type: String,
      },
    ],

    // REVIEWS

    averageRating: {
      type: Number,

      default: 0,
    },

    numReviews: {
      type: Number,

      default: 0,
    },

    featured: {
      type: Boolean,

      default: false,
    },

    isActive: {
      type: Boolean,

      default: true,
    },

    status: {
      type: String,

      enum:
        Object.values(
          ProductStatus
        ),

      default:
        ProductStatus.DRAFT,
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

    createdBy: {
      type:
        Schema.Types.ObjectId,

      ref: "User",
    },

    // FUTURE MULTI VENDOR SUPPORT

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

productSchema.index({
  title: "text",

  description: "text",
});

export const Product =
  mongoose.model(
    "Product",
    productSchema
  );