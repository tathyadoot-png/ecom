"use client";

import { useEffect } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth-store";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const {
    user,
    loading,
  } = useAuthStore();

  useEffect(() => {
    // NOT LOGGED IN
    if (
      !loading &&
      !user
    ) {
      router.push("/login");
    }
  }, [
    user,
    loading,
    router,
  ]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-500">
          Loading...
        </p>
      </div>
    );
  }

  // NOT LOGGED IN
  if (!user) {
    return null;
  }

const allowedRoles = [
  "ADMIN",
  "SUPER_ADMIN",
  "VENDOR",
];

if (
  !allowedRoles.includes(
    user.role
  )
) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-6">
        
        <div className="bg-white border rounded-3xl p-10 max-w-md w-full text-center shadow-sm">
          
          <h1 className="text-3xl font-bold text-red-600">
            Access Denied
          </h1>

          <p className="text-zinc-500 mt-4">
            You are not authorized
            to access admin panel.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            
            <Link
              href="/"
              className="h-12 rounded-2xl bg-black text-white flex items-center justify-center font-medium"
            >
              Go To Store
            </Link>

            <button
              onClick={() => {
                router.push(
                  "/login"
                );
              }}
              className="h-12 rounded-2xl border"
            >
              Login With Admin Account
            </button>

          </div>

        </div>

      </div>
    );
  }

  return <>{children}</>;
}