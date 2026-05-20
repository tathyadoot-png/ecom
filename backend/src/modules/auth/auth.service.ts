import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "./auth.model";

import { ApiError } from "../../utils/ApiError";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser =
    await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(
      400,
      "User already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const isPasswordCorrect =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordCorrect) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user,
  };
};  