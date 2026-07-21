import slugify from "slugify";

import { ApiError } from "../../utils/ApiError";
  import { Product } from "../products/product.model";

import { Order } from "../orders/order.model";


import {
  Store,
  StoreStatus,
} from "./store.model";

export const createStore =
  async (
    data: any,
    userId: string
  ) => {
    const existingStore =
      await Store.findOne({
        owner: userId,
      });

    if (existingStore) {
      throw new ApiError(
        400,
        "You already have a store"
      );
    }

    const slug = slugify(
      data.name,
      {
        lower: true,
        strict: true,
      }
    );

    const slugExists =
      await Store.findOne({
        slug,
      });

    if (slugExists) {
      throw new ApiError(
        400,
        "Store slug already exists"
      );
    }

    const store =
      await Store.create({
        ...data,

        slug,

        owner: userId,
      });

    return store;
  };

export const getMyStore =
  async (userId: string) => {
    return Store.findOne({
      owner: userId,
    }).populate(
      "owner",
      "name email"
    );
  };

export const getAllStores =
  async () => {
    return Store.find()
      .populate(
        "owner",
        "name email"
      )
      .sort({
        createdAt: -1,
      });
  };

export const updateStoreStatus =
  async (
    storeId: string,
    status: StoreStatus
  ) => {
    const store =
      await Store.findById(
        storeId
      );

    if (!store) {
      throw new ApiError(
        404,
        "Store not found"
      );
    }

    store.status = status;

    await store.save();

    return store;
  };

export const updateStoreFlags =
  async (
    storeId: string,
    flags: { featured?: boolean; verified?: boolean }
  ) => {
    const store =
      await Store.findById(
        storeId
      );

    if (!store) {
      throw new ApiError(
        404,
        "Store not found"
      );
    }

    Object.assign(store, flags);

    await store.save();

    return store;
  };






export const getVendorDashboardStats =
  async (userId: string) => {
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

    const totalRevenue =
      orders
        .filter(
          (order) =>
            order.paymentStatus ===
            "PAID"
        )
        .reduce(
          (
            total,
            order
          ) =>
            total +
            order.totalAmount,
          0
        );

    return {
      totalProducts:
        products.length,

      totalOrders:
        orders.length,

      pendingOrders:
        orders.filter(
          (order) =>
            order.orderStatus ===
            "PENDING"
        ).length,

      totalRevenue,

      recentOrders:
        orders.slice(0, 5),

      lowStockProducts:
        products
          .filter(
            (product) =>
              product.stock < 5
          )
          .slice(0, 5),
    };
  };


  export const updateStore =
  async (
    userId: string,
    data: any
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

    Object.assign(
      store,
      data
    );

    await store.save();

    return store;
  };


export const getStoreById =
  async (
    storeId: string
  ) => {

    const store =
      await Store.findById(
        storeId
      )
      .populate(
        "owner",
        "name email role"
      );

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
      });

    const revenue =
      orders
        .filter(
          (order) =>
            order.paymentStatus ===
            "PAID"
        )
        .reduce(
          (
            total,
            order
          ) =>
            total +
            order.totalAmount,
          0
        );

    return {
      store,

      stats: {
        totalProducts:
          products.length,

        totalOrders:
          orders.length,

        revenue,
      },
    };
  };

  