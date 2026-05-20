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
  } = useAuthStore();

  useEffect(() => {
    const fetchUser =
      async () => {
        try {
          setLoading(true);

          const res =
            await api.get(
              "/auth/me"
            );

          setUser(
            res.data.data
          );
        } catch {
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

    fetchUser();
  }, []);

  return <>{children}</>;
}