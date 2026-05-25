import { create } from "zustand";

import { User } from "@/types/auth.types";

interface AuthState {
  user: User | null;

  loading: boolean;

  hydrated: boolean;

  setUser: (
    user: User | null
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  setHydrated: (
    hydrated: boolean
  ) => void;

  logout: () => void;
}

export const useAuthStore =
  create<AuthState>((set) => ({
    user: null,

    loading: true,

    hydrated: false,

    setUser: (
      user: User | null
    ) =>
      set({ user }),

    setLoading: (
      loading
    ) =>
      set({ loading }),

    setHydrated: (
      hydrated
    ) =>
      set({ hydrated }),

    logout: () =>
      set({
        user: null,
      }),
  }));