"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import api from "@/lib/axios";

import { useAuthStore } from "@/store/auth-store";

export default function Navbar() {
  const router = useRouter();

  const { user, logout } =
    useAuthStore();

  const handleLogout =
    async () => {
      try {
        await api.post(
          "/auth/logout"
        );

        logout();

        router.push("/");
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          Commerce
        </Link>

        <div className="flex items-center gap-4">
          
          {user ? (
            <>
              <span className="text-sm font-medium text-zinc-700">
                Hi, {user.name}
              </span>

              <button
                onClick={
                  handleLogout
                }
                className="h-10 px-5 rounded-xl bg-black text-white text-sm font-semibold transition-all hover:bg-zinc-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-700 hover:text-black transition-all"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="h-10 px-5 rounded-xl bg-black text-white text-sm font-semibold flex items-center justify-center transition-all hover:bg-zinc-800"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>

    </header>
  );
}