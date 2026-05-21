import { Product } from "../products/product.model";

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
  async (orderId: string) => {
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

    return order;
  };