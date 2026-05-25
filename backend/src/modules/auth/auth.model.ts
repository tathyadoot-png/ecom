import mongoose, {
  Schema,
} from "mongoose";

export enum UserRole {
  CUSTOMER = "CUSTOMER",

  ADMIN = "ADMIN",

  VENDOR = "VENDOR",

  SUPER_ADMIN = "SUPER_ADMIN",
}

const addressSchema =
  new Schema(
    {
      fullName: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },

      address: {
        type: String,
        default: "",
      },

      city: {
        type: String,
        default: "",
      },

      state: {
        type: String,
        default: "",
      },

      country: {
        type: String,
        default: "India",
      },

      postalCode: {
        type: String,
        default: "",
      },
    },
    {
      _id: false,
    }
  );

const userSchema = new Schema(
  {
    name: {
      type: String,

      required: true,

      trim: true,
    },

    email: {
      type: String,

      required: true,

      unique: true,

      lowercase: true,

      trim: true,
    },

    password: {
      type: String,

      required: true,

      minlength: 6,
    },

    avatar: {
      type: String,

      default: "",
    },

    role: {
      type: String,

      enum:
        Object.values(
          UserRole
        ),

      default:
        UserRole.CUSTOMER,
    },

    address:
      addressSchema,
  },
  {
    timestamps: true,
  }
);

export const User =
  mongoose.model(
    "User",
    userSchema
  );