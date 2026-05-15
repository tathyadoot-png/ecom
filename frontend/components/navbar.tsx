"use client";

import Link from "next/link";

import { useAuthStore } from "@/store/auth-store";

export default function Navbar() {
  const { user, logout } =
    useAuthStore();

  return (
    <header className="border-b">
      
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link
          href="/"
          className="text-2xl font-bold"
        >
          Commerce
        </Link>

        <div className="flex items-center gap-4">
          
          {user ? (
            <>
              <span>
                {user.name}
              </span>

              <button
                onClick={logout}
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                Login
              </Link>

              <Link href="/register">
                Register
              </Link>
            </>
          )}

        </div>

      </div>

    </header>
  );
}