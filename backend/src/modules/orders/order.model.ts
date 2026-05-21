import mongoose, {
  Schema,
  Document,
} from "mongoose";

export enum OrderStatus {
  PENDING = "PENDING",

  CONFIRMED = "CONFIRMED",

  PROCESSING = "PROCESSING",

  SHIPPED = "SHIPPED",

  DELIVERED = "DELIVERED",

  CANCELLED = "CANCELLED",
}

export enum PaymentMethod {
  COD = "COD",

  RAZORPAY = "RAZORPAY",
}

export interface IOrderItem {
  product: mongoose.Types.ObjectId;

  title: string;

  slug: string;

  image: string;

  price: number;

  quantity: number;
}

export interface IShippingAddress {
  fullName: string;

  phone: string;

  address: string;

  city: string;

  state: string;

  country: string;

  postalCode: string;
}

export interface IOrder
  extends Document {
  user: mongoose.Types.ObjectId;

  items: IOrderItem[];

  shippingAddress: IShippingAddress;

  paymentMethod: PaymentMethod;

  paymentStatus: string;

  subtotal: number;

  shippingFee: number;

  totalAmount: number;

  orderStatus: OrderStatus;
}

const orderItemSchema =
  new Schema<IOrderItem>(
    {
      product: {
        type:
          Schema.Types.ObjectId,

        ref: "Product",

        required: true,
      },

      title: {
        type: String,

        required: true,
      },

      slug: {
        type: String,

        required: true,
      },

      image: {
        type: String,

        required: true,
      },

      price: {
        type: Number,

        required: true,
      },

      quantity: {
        type: Number,

        required: true,
      },
    },
    {
      _id: false,
    }
  );

const shippingAddressSchema =
  new Schema<IShippingAddress>(
    {
      fullName: String,

      phone: String,

      address: String,

      city: String,

      state: String,

      country: String,

      postalCode: String,
    },
    {
      _id: false,
    }
  );

const orderSchema =
  new Schema<IOrder>(
    {
      user: {
        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      items: [
        orderItemSchema,
      ],

      shippingAddress:
        shippingAddressSchema,

      paymentMethod: {
        type: String,

        enum:
          Object.values(
            PaymentMethod
          ),

        default:
          PaymentMethod.COD,
      },

      paymentStatus: {
        type: String,

        default: "PENDING",
      },

      subtotal: {
        type: Number,

        required: true,
      },

      shippingFee: {
        type: Number,

        default: 0,
      },

      totalAmount: {
        type: Number,

        required: true,
      },

      orderStatus: {
        type: String,

        enum:
          Object.values(
            OrderStatus
          ),

        default:
          OrderStatus.PENDING,
      },
    },
    {
      timestamps: true,
    }
  );

export const Order =
  mongoose.model<IOrder>(
    "Order",
    orderSchema
  );