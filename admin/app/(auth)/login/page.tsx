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

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await api.post(
       API_ROUTES.AUTH.LOGIN,
        {
          email,
          password,
        }
      );

    setUser(res.data.user);
    
      router.push("/");
    } catch (error: any) {
      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md border rounded-xl p-6 space-y-4"
      >
        <h1 className="text-3xl font-bold">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button className="w-full bg-black text-white p-3 rounded-lg">
          Login
        </button>
      </form>
    </main>
  );
}