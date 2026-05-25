"use client";

import { useEffect } from "react";

import api from "@/lib/axios";

import { useAuthStore } from "@/store/auth-store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
const {
  setUser,
  setLoading,
  setHydrated,
} = useAuthStore();

  useEffect(() => {
    const fetchUser =
      async () => {
        try {
          const res =
            await api.get(
              "/auth/me"
            );

setUser(
  res.data.data
);
        } catch {
          setUser(null);
        }finally {
  setLoading(false);

  setHydrated(true);
}
      };

    fetchUser();
  }, []);

  return <>{children}</>;
}