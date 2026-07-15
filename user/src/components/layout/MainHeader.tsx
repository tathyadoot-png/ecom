"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";

import {
  Heart,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[var(--primary)]">
      <Container>
        <div className="grid h-[92px] grid-cols-[260px_1fr_260px] items-center gap-8">
          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-4"
          >
            <Image
              src="/logo.png"
              alt="Indian Artisan"
              width={58}
              height={58}
              priority
            />

            <div>
              <h1 className="font-heading text-[42px] leading-none text-[#F5D08A]">
                Indian Artisan
              </h1>

              <p className="mt-1 text-[11px] uppercase tracking-[0.45em] text-[#EED8A6]">
                MARKETPLACE
              </p>
            </div>
          </Link>

          {/* SEARCH */}

          <div className="hidden xl:flex">
            <div className="flex h-14 w-full overflow-hidden rounded-2xl border-2 border-[#D7A84D] bg-white">
              <input
                placeholder="Search for handcrafted products..."
                className="flex-1 bg-transparent px-6 text-[15px] outline-none"
              />

              <button className="flex w-16 items-center justify-center bg-[#D7A84D] text-white transition hover:brightness-95">
                <Search size={22} />
              </button>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex items-center justify-end gap-8 text-white">
            <button className="group flex flex-col items-center">
              <Heart
                size={24}
                className="transition group-hover:text-[#D7A84D]"
              />

              <span className="mt-2 text-xs">
                Wishlist
              </span>
            </button>

            <button className="group flex flex-col items-center">
              <ShoppingBag
                size={24}
                className="transition group-hover:text-[#D7A84D]"
              />

              <span className="mt-2 text-xs">
                Cart
              </span>
            </button>

            <button className="group flex flex-col items-center">
              <User
                size={24}
                className="transition group-hover:text-[#D7A84D]"
              />

              <span className="mt-2 text-xs">
                Account
              </span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}