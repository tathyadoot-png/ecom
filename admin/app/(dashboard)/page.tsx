"use client";

import { useAuthStore } from "@/store/auth-store";

export default function HomePage() {
  const { user, logout } =
    useAuthStore();

  return (
    <div className="space-y-4">
      
      <h1 className="text-4xl font-bold">
        Welcome {user?.name}
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-6 py-3 rounded-lg"
      >
        Logout
      </button>

    </div>
  );
}