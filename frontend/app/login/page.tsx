"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import api from "@/lib/axios";

import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const router = useRouter();

  const { setUser } =
    useAuthStore();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      setUser(
        res.data.user
      );

      router.push("/");
    } catch (error: any) {
      alert(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-100 p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl"
      >
        <div className="mb-6">
          <h1 className="text-4xl font-bold">
            Login
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Welcome back
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-4"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-4"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button className="w-full h-12 rounded-xl bg-black text-white font-semibold hover:bg-zinc-800">
            Login
          </button>
        </div>
      </form>
    </main>
  );
}