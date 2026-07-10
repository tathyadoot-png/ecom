import { create } from "zustand";

import { User } from "@/types/auth.types";

import { authService } from "@/services/auth.service";

interface AuthStore {
  user: User | null;

  loading: boolean;

  initialized: boolean;

  fetchUser: () => Promise<void>;

  logout: () => Promise<void>;
}

export const useAuthStore =
  create<AuthStore>((set) => ({
    user: null,

    loading: false,

    initialized: false,

    fetchUser: async () => {
      try {
        set({
          loading: true,
        });

        const { data } =
          await authService.getCurrentUser();

        set({
          user: data.data,
          initialized: true,
        });
      } catch {
        set({
          user: null,
          initialized: true,
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    logout: async () => {
      await authService.logout();

      set({
        user: null,
      });
    },
  }));