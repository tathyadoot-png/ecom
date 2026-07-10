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
    api.post("/auth/register", {
      name,
      email,
      password,
    }),

  logout: () =>
    api.post("/auth/logout"),

  getCurrentUser: () =>
    api.get<ApiResponse<User>>("/auth/me"),
};