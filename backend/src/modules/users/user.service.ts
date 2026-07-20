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
    requestingUser: any,
    userId: string,
    role: UserRole
  ) => {
    if (
      requestingUser._id.toString() ===
      userId
    ) {
      throw new ApiError(
        403,
        "You cannot change your own role"
      );
    }

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

    const touchesSuperAdmin =
      role === UserRole.SUPER_ADMIN ||
      user.role === UserRole.SUPER_ADMIN;

    if (
      touchesSuperAdmin &&
      requestingUser.role !==
        UserRole.SUPER_ADMIN
    ) {
      throw new ApiError(
        403,
        "Only a super admin can grant or revoke the super admin role"
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