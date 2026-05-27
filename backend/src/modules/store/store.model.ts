import mongoose, {
  Schema,
} from "mongoose";

export enum StoreStatus {
  PENDING = "PENDING",

  APPROVED = "APPROVED",

  REJECTED = "REJECTED",

  SUSPENDED = "SUSPENDED",
}

const storeSchema =
  new Schema(
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

      logo: {
        type: String,

        default: "",
      },

      banner: {
        type: String,

        default: "",
      },

      description: {
        type: String,

        default: "",
      },

      owner: {
        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      status: {
        type: String,

        enum:
          Object.values(
            StoreStatus
          ),

        default:
          StoreStatus.PENDING,
      },

      isActive: {
        type: Boolean,

        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const Store =
  mongoose.model(
    "Store",
    storeSchema
  );