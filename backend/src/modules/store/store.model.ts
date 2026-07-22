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

      // ---- Artisan public profile fields (Phase 7) ----
      // All optional — an existing store with none of these set must
      // keep working exactly as before. The public API only ever
      // shows what's actually present; nothing here is ever defaulted
      // to placeholder copy.
      coverImage: {
        type: String,

        default: "",
      },

      // The artisan's own portrait — distinct from `logo` (a brand
      // mark), `banner`/`coverImage` (wide-format), and the User's
      // `avatar` (a private account setting with a generic default).
      // This is the one field every "Portrait" requirement across the
      // Homepage/Directory/Profile/PDP phases can rely on.
      portraitImage: {
        type: String,

        default: "",
      },

      craft: {
        type: String,

        default: "",
      },

      subCraft: {
        type: String,

        default: "",
      },

      shortQuote: {
        type: String,

        default: "",
      },

      story: {
        type: String,

        default: "",
      },

      craftPhilosophy: {
        type: String,

        default: "",
      },

      yearsOfExperience: {
        type: Number,
      },

      generation: {
        type: Number,
      },

      inheritedFrom: {
        type: String,

        default: "",
      },

      specialization: {
        type: String,

        default: "",
      },

      state: {
        type: String,

        default: "",
      },

      city: {
        type: String,

        default: "",
      },

      village: {
        type: String,

        default: "",
      },

      gallery: {
        type: [String],

        default: [],
      },

      introVideo: {
        type: String,

        default: "",
      },

      socialLinks: {
        instagram: { type: String, default: "" },
        facebook: { type: String, default: "" },
        youtube: { type: String, default: "" },
        website: { type: String, default: "" },
      },

      googleMap: {
        type: String,

        default: "",
      },

      customOrders: {
        type: Boolean,

        default: false,
      },

      leadTime: {
        type: String,

        default: "",
      },

      // Admin-controlled curation flags — never settable through the
      // vendor-facing create/update endpoints (see store.validation.ts).
      featured: {
        type: Boolean,

        default: false,
      },

      verified: {
        type: Boolean,

        default: false,
      },

      // Admin-controlled curation order for the Homepage/Directory —
      // mirrors Category.displayOrder exactly. A vendor never sets
      // their own display priority relative to other artisans.
      displayOrder: {
        type: Number,
        default: 0,
        min: 0,
      },

      // Same schema-only-for-now pattern already used by Product.seo
      // and Category.seo — defined so profile pages can get proper
      // metadata later without another schema change.
      seo: {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        keywords: { type: [String], default: [] },
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