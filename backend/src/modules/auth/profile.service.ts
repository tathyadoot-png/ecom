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

    // The client sends flat address fields (fullName, phone, address,
    // city, state, country, postalCode), not a pre-built address
    // object, so they're assembled here onto the existing subdocument
    // rather than replacing it wholesale.
    const addressFields = [
      "fullName",
      "phone",
      "address",
      "city",
      "state",
      "country",
      "postalCode",
    ];

    const hasAddressUpdate =
      addressFields.some(
        (field) =>
          data[field] !==
          undefined
      );

    if (hasAddressUpdate) {
      user.address = {
        fullName:
          data.fullName ??
          user.address
            ?.fullName ??
          "",

        phone:
          data.phone ??
          user.address
            ?.phone ??
          "",

        address:
          data.address ??
          user.address
            ?.address ??
          "",

        city:
          data.city ??
          user.address
            ?.city ??
          "",

        state:
          data.state ??
          user.address
            ?.state ??
          "",

        country:
          data.country ??
          user.address
            ?.country ??
          "India",

        postalCode:
          data.postalCode ??
          user.address
            ?.postalCode ??
          "",
      };
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