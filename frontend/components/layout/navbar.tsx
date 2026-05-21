"use client";

import Link from "next/link";

import {
  ShoppingBag,
  Store,
} from "lucide-react";

import { useCartStore } from "@/store/cart-store";

export default function Navbar() {
  const totalItems =
    useCartStore(
      (state) =>
        state.totalItems
    );

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

          <Link href="/cart">
            Cart
          </Link>

        </nav>

        {/* CART */}

        <Link
          href="/cart"
          className="relative w-12 h-12 rounded-2xl border flex items-center justify-center bg-white hover:bg-zinc-100 transition-all"
        >
          
          <ShoppingBag size={22} />

          {totalItems() >
            0 && (
            <div className="absolute -top-2 -right-2 min-w-6 h-6 px-1 rounded-full bg-black text-white text-xs flex items-center justify-center font-semibold">
              
              {totalItems()}

            </div>
          )}

        </Link>

      </div>

    </header>
  );
}