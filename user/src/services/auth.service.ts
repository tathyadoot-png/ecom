import { api } from "@/lib/api";

import { ApiResponse } from "@/types/api.types";

import { User } from "@/types/auth.types";

export const authService = {
  login: (email: string, password: string) =>
    api.post<ApiResponse<User>>("/auth/login", {
      email,
      password,
    }),

  register: (
    name: string,
    email: string,
    password: string
  ) =>
    api.post<ApiResponse<User>>("/auth/register", {
      name,
      email,
      password,
    }),

  logout: () =>
    api.post("/auth/logout"),

  getCurrentUser: () =>
    api.get<ApiResponse<User>>("/auth/me"),

  // multipart/form-data, not JSON — the backend routes this through
  // multer (avatarUpload.single('avatar')) even when no file is sent.
  updateProfile: (formData: FormData) =>
    api.patch<ApiResponse<User>>("/auth/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  changePassword: (currentPassword: string, newPassword: string) =>
    api.patch<ApiResponse<null>>("/auth/change-password", {
      currentPassword,
      newPassword,
    }),
};