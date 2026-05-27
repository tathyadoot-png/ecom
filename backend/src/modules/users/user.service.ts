import {
  User,
  UserRole,
} from "../auth/auth.model";
import { ApiError } from "../../utils/ApiError";

export const getAllUsersService =
  async () => {
    return User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });
  };

export const getUserByIdService =
  async (userId: string) => {
    const user =
      await User.findById(
        userId
      ).select("-password");

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    return user;
  };

export const updateUserRoleService =
  async (
    userId: string,
role: UserRole
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

    user.role = role;

    await user.save();

    return user;
  };

export const toggleBlockUserService =
  async (userId: string) => {
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

    user.isBlocked =
      !user.isBlocked;

    await user.save();

    return user;
  };