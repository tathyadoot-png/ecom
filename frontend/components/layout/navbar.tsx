"use client";

import Link from "next/link";

import {
  ShoppingBag,
  Store,
  User,
  LogOut,
  Package,
} from "lucide-react";

import { useCartStore } from "@/store/cart-store";

import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react";
import {
  logoutUser,
} from "@/services/auth.service";

import { toast } from "sonner";
import { Heart } from "lucide-react";

import { useWishlistStore } from "@/store/wishlist-store";


export default function Navbar() {

const {
  totalItems,
  clearItems,
  fetchCart,
} = useCartStore();

const { products } =
  useWishlistStore();

const {
  user,
 logout,
  loading,
  hydrated,
} = useAuthStore();

const [mounted, setMounted] =
  useState(false);

useEffect(() => {
  setMounted(true);
}, []);

useEffect(() => {
  if (user) {
    fetchCart();
  }
}, [user]);







  const handleLogout =
    async () => {
      try {
        await logoutUser();
        await clearItems();
        logout();

        toast.success(
          "Logged out successfully"
        );

        window.location.href =
          "/";
      } catch (error) {
        console.log(error);

        toast.error(
          "Logout failed"
        );
      }
    };
  if (loading || !hydrated) {
    return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b">

        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

          <div className="w-40 h-10 bg-zinc-100 rounded-2xl animate-pulse" />

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-zinc-100 animate-pulse" />

            <div className="w-24 h-12 rounded-2xl bg-zinc-100 animate-pulse" />

          </div>

        </div>

      </header>
    );
  }
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b">

      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

        {/* LOGO */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >

          <div className="w-11 h-11 rounded-2xl bg-black text-white flex items-center justify-center">

            <Store size={22} />

          </div>

          <div>

            <h1 className="text-xl font-bold">
              Commerce
            </h1>

          </div>

        </Link>

        {/* NAV */}

        <nav className="hidden md:flex items-center gap-8 font-medium">

          <Link href="/">
            Home
          </Link>

          <Link href="/products">
            Products
          </Link>

          {hydrated &&
            user && (
              <Link href="/orders">
                My Orders
              </Link>
            )}

        </nav>

        {/* RIGHT */}

        {/* RIGHT */}

        <div className="flex items-center gap-3">

          {/* CART */}

          <Link
            href="/cart"
            className="relative w-12 h-12 rounded-2xl border flex items-center justify-center bg-white hover:bg-zinc-100 transition-all"
          >

            <ShoppingBag
              size={22}
            />

            {totalItems() > 0 && (
              <div className="absolute -top-2 -right-2 min-w-6 h-6 px-1 rounded-full bg-black text-white text-xs flex items-center justify-center font-semibold">

                {totalItems()}

              </div>
            )}

          </Link>

          {/* ONLY LOGGED IN */}

          {hydrated &&
            user && (
              <>

                {/* WISHLIST */}

                <Link
                  href="/wishlist"
                  className="relative w-11 h-11 rounded-full border flex items-center justify-center bg-white"
                >

                  <Heart className="w-5 h-5" />

                  {products.length >
                    0 && (
                      <div className="absolute -top-2 -right-2 min-w-6 h-6 px-1 rounded-full bg-black text-white text-xs flex items-center justify-center font-semibold">

                        {
                          products.length
                        }

                      </div>
                    )}

                </Link>

                {/* PROFILE */}

                <Link
                  href="/profile"
                  className="hidden md:flex items-center gap-2 px-4 h-12 rounded-2xl border bg-white hover:bg-zinc-100 transition-all"
                >

                  <User size={18} />

                  <span className="font-medium">
                    {user.name}
                  </span>

                </Link>

                {/* ORDERS */}

                <Link
                  href="/orders"
                  className="w-12 h-12 rounded-2xl border flex items-center justify-center hover:bg-zinc-100 transition-all"
                >

                  <Package
                    size={20}
                  />

                </Link>

                {/* LOGOUT */}

                <button
                  onClick={
                    handleLogout
                  }
                  className="w-12 h-12 rounded-2xl border flex items-center justify-center text-red-600 hover:bg-red-50 transition-all"
                >

                  <LogOut
                    size={20}
                  />

                </button>

              </>
            )}

          {/* GUEST USER */}

          {hydrated &&
            !loading &&
            !user && (
              <>

                <Link
                  href="/login"
                  className="h-12 px-5 rounded-2xl border flex items-center justify-center font-semibold hover:bg-zinc-100 transition-all"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="h-12 px-5 rounded-2xl bg-black text-white flex items-center justify-center font-semibold"
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