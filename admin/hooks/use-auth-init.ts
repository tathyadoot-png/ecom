"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/store/auth-store";

export const useAuthInit = () => {
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    const user =
      localStorage.getItem("user");

    if (token && user) {
      setAuth(
        JSON.parse(user),
        token
      );
    }
  }, []);
};