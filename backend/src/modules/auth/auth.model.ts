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

  default:
    "https://res.cloudinary.com/dysizd22t/image/upload/v1781083155/VENDOR-removebg-preview_wkk30j.png",
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

isBlocked: {
  type: Boolean,

  default: false,
},

      storeId: {
  type:
    Schema.Types.ObjectId,

  ref: "Store",

  default: null,
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