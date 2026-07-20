import { Product } from "../products/product.model";
import { Store } from "../store/store.model";
import {
  Order,
  OrderStatus,
} from "./order.model";

import { ApiError } from "../../utils/ApiError";

export const createOrder =
  async (
    userId: string,
    data: any
  ) => {
    const {
      items,
      shippingAddress,
      paymentMethod,
    } = data;

    let subtotal = 0;

    const orderItems = [];

    // LOOP PRODUCTS

    for (const item of items) {
      const product =
        await Product.findById(
          item.productId
        );

      if (!product) {
        throw new ApiError(
          404,
          "Product not found"
        );
      }

      // STOCK CHECK

      if (
        product.stock <
        item.quantity
      ) {
        throw new ApiError(
          400,
          `${product.title} is out of stock`
        );
      }

      // PRICE

      const productPrice =
        product.salePrice ||
        product.price;

      subtotal +=
        productPrice *
        item.quantity;

      // SNAPSHOT SAVE

      orderItems.push({
        product:
          product._id,

        title:
          product.title,

        slug:
          product.slug,

        image:
          product.images?.[0] ||
          "",

        price:
          productPrice,

        quantity:
          item.quantity,
      });

      // STOCK REDUCE

      product.stock -=
        item.quantity;

      await product.save();
    }

    // SHIPPING

    const shippingFee =
      subtotal > 999
        ? 0
        : 99;

    const totalAmount =
      subtotal +
      shippingFee;

    // CREATE ORDER

    const order =
      await Order.create({
        user: userId,

        items: orderItems,

        shippingAddress,

        paymentMethod,

        subtotal,

        shippingFee,

        totalAmount,

        orderStatus:
          OrderStatus.PENDING,
      });

    return order;
  };

export const getMyOrders =
  async (userId: string) => {
    const orders =
      await Order.find({
        user: userId,
      }).sort({
        createdAt: -1,
      });

    return orders;
  };

export const getSingleOrder =
  async (
    orderId: string,
    requestingUser: any
  ) => {
    const order =
      await Order.findById(
        orderId
      )
        .populate(
          "user",
          "name email"
        )
        .populate(
          "items.product"
        );

    if (!order) {
      throw new ApiError(
        404,
        "Order not found"
      );
    }

    const isOwner =
      order.user._id.toString() ===
      requestingUser._id.toString();

    const isAdmin =
      requestingUser.role === "ADMIN" ||
      requestingUser.role === "SUPER_ADMIN";

    if (!isOwner && !isAdmin) {
      throw new ApiError(
        403,
        "You are not allowed to view this order"
      );
    }

    return order;
  };



  export const getAllOrdersAdminService =
  async () => {
    const orders =
      await Order.find()

        .populate(
          "user",
          "name email"
        )

        .populate(
          "items.product",
          "title images"
        )

        .sort({
          createdAt: -1,
        });

    return orders;
  };

export const updateOrderStatusService =
  async (
    orderId: string,
   status: OrderStatus
  ) => {
    const order =
      await Order.findById(
        orderId
      );

    if (!order) {
      throw new ApiError(
        404,
        "Order not found"
      );
    }

    order.orderStatus =
      status;

    if (
      status ===
      "DELIVERED"
    ) {
      order.isDelivered = true;

      order.deliveredAt =
        new Date();
    }

    await order.save();

    return order;
  };


  export const getVendorOrders =
  async (
    userId: string
  ) => {

    const store =
      await Store.findOne({
        owner: userId,
      });

    if (!store) {
      throw new ApiError(
        404,
        "Store not found"
      );
    }

    const products =
      await Product.find({
        storeId: store._id,
      });

    const productIds =
      products.map(
        (product) =>
          product._id
      );

    const orders =
      await Order.find({
        "items.product": {
          $in: productIds,
        },
      })
        .populate(
          "user",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    return orders;
  };


  export const updateVendorOrderStatusService =
  async (
    userId: string,
    orderId: string,
    status: OrderStatus
  ) => {

    const store =
      await Store.findOne({
        owner: userId,
      });

    if (!store) {
      throw new ApiError(
        404,
        "Store not found"
      );
    }

    const products =
      await Product.find({
        storeId: store._id,
      });

    const productIds =
      products.map(
        (product) =>
          product._id.toString()
      );

    const order =
      await Order.findById(
        orderId
      );

    if (!order) {
      throw new ApiError(
        404,
        "Order not found"
      );
    }

    const hasVendorProduct =
      order.items.some(
        (item: any) =>
          productIds.includes(
            item.product.toString()
          )
      );

    if (!hasVendorProduct) {
      throw new ApiError(
        403,
        "You are not allowed to update this order"
      );
    }

    order.orderStatus =
      status;

    if (
      status ===
      OrderStatus.DELIVERED
    ) {
      order.isDelivered =
        true;

      order.deliveredAt =
        new Date();
    }

    await order.save();

    return order;
  };