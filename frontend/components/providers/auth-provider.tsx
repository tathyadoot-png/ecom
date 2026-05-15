"use client";

import { useEffect } from "react";

import api from "@/lib/axios";

import { useAuthStore } from "@/store/auth-store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } =
    useAuthStore();

  useEffect(() => {
    const fetchUser =
      async () => {
        try {
          const res =
            await api.get(
              "/auth/me"
            );

          setUser(
            res.data.user
          );
        } catch {
          setUser(null);
        }
      };

    fetchUser();
  }, []);

  return <>{children}</>;
}