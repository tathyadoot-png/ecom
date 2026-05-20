"use client";

import { useState } from "react";

import api from "@/lib/axios";

import { useAuthStore } from "@/store/auth-store";

import { useRouter } from "next/navigation";

import { API_ROUTES } from "@/constants/api";

export default function LoginPage() {
  const router = useRouter();

  const { setUser } =
    useAuthStore();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(
        API_ROUTES.AUTH.LOGIN,
        {
          email,
          password,
        }
      );

      setUser(res.data.data);

      router.push("/");
    } catch (error: any) {
      alert(
        error.response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
<main className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">
  <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-2xl shadow-black/5">
    
    <div className="mb-8">
      <h1 className="text-4xl font-bold tracking-tight">
        Admin Login
      </h1>

      <p className="mt-2 text-sm text-zinc-500">
        Login to manage your store
      </p>
    </div>

    <form
      onSubmit={handleLogin}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700">
          Email
        </label>

        <input
          type="email"
          placeholder="admin@test.com"
          className="w-full h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition-all focus:border-black focus:bg-white"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700">
          Password
        </label>

        <input
          type="password"
          placeholder="••••••••"
          className="w-full h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none transition-all focus:border-black focus:bg-white"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />
      </div>

      <button
        className="w-full h-12 rounded-xl bg-black text-white font-semibold transition-all hover:bg-zinc-800"
      >
        Login
      </button>
    </form>
  </div>
</main>
  );
}