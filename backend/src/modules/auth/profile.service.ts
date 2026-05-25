import bcrypt from "bcryptjs";

import { User } from "./auth.model";

import { ApiError } from "../../utils/ApiError";

export const updateProfileService =
  async (
    userId: string,
    data: any
  ) => {
    const user =
      await User.findById(
        userId
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    if (data.name) {
      user.name =
        data.name;
    }

    if (data.avatar) {
      user.avatar =
        data.avatar;
    }

    if (data.address) {
      user.address =
        data.address;
    }

    await user.save();

    return user;
  };

export const changePasswordService =
  async (
    userId: string,
    currentPassword: string,
    newPassword: string
  ) => {
    const user =
      await User.findById(
        userId
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {
      throw new ApiError(
        400,
        "Current password is incorrect"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    await user.save();

    return true;
  };