"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { registerUser } from "@/services/auth.service";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(
        formData.name,
        formData.email,
        formData.password
      );

      toast.success(
        "Account created successfully"
      );

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-100 p-6">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl"
      >
        
        <div className="mb-6">
          
          <h1 className="text-4xl font-bold">
            Register
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Create your account
          </p>

        </div>

        <div className="space-y-4">
          
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-4"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-4"
          />

          <button
            disabled={loading}
            className="w-full h-12 rounded-xl bg-black text-white font-semibold hover:bg-zinc-800 transition-all"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>

        </div>

        <p className="text-sm text-zinc-500 mt-6 text-center">
          Already have an account?{" "}
          
          <Link
            href="/login"
            className="text-black font-semibold"
          >
            Login
          </Link>
        </p>

      </form>

    </main>
  );
}