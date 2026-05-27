import slugify from "slugify";

import { ApiError } from "../../utils/ApiError";

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