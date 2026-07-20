import { create } from "zustand";

import { User } from "@/types/auth.types";

import { authService } from "@/services/auth.service";

interface AuthStore {
  user: User | null;

  loading: boolean;

  initialized: boolean;

  fetchUser: () => Promise<void>;

  setUser: (user: User | null) => void;

  logout: () => Promise<void>;
}

// Module-level (not store state) so concurrent fetchUser() callers
// collapse onto the same in-flight request instead of firing twice.
let inFlightFetch: Promise<void> | null = null;

export const useAuthStore =
  create<AuthStore>((set) => ({
    user: null,

    loading: false,

    initialized: false,

    fetchUser: () => {
      if (inFlightFetch) {
        return inFlightFetch;
      }

      inFlightFetch = (async () => {
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

          inFlightFetch = null;
        }
      })();

      return inFlightFetch;
    },

    setUser: (user) => {
      set({
        user,
        initialized: true,
      });
    },

    logout: async () => {
      await authService.logout();

      set({
        user: null,
      });
    },
  }));