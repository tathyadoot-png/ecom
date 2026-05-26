export type PaymentMethod =
  | "COD"
  | "RAZORPAY";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface ShippingAddress {
  fullName: string;

  phone: string;

  address: string;

  city: string;

  state: string;

  country: string;

  postalCode: string;
}

export interface OrderItemPayload {
  productId: string;

  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderItemPayload[];

  shippingAddress: ShippingAddress;

  paymentMethod: PaymentMethod;
}

export interface OrderItem {
  product: string;

  title: string;

  slug: string;

  image: string;

  price: number;

  quantity: number;
}

export interface Order {
  _id: string;

  user: string;

  items: OrderItem[];

  shippingAddress: ShippingAddress;

  paymentMethod: PaymentMethod;

  paymentStatus: string;

  isDelivered: boolean;

  deliveredAt?: string;

  subtotal: number;

  shippingFee: number;

  totalAmount: number;

  orderStatus: OrderStatus;

  razorpayOrderId?: string;

  razorpayPaymentId?: string;

  razorpaySignature?: string;

  createdAt: string;

  updatedAt: string;
}