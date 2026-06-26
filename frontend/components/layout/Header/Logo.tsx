"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 sm:gap-4 transition-opacity duration-200 hover:opacity-90 group shrink-0"
    >
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-[70px] lg:h-[70px]">
        <Image
          src="/logo/logo.png"
          fill
          sizes="(max-width: 640px) 48px, (max-width: 1024px) 64px, 70px"
          className="object-contain"
          alt="logo"
          priority
        />
      </div>

      <div className="flex flex-col justify-center">
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-[42px] leading-none tracking-[2px] sm:tracking-[4px] text-[#241A11]">
          ARTISAN
        </h2>
        <p className="mt-0.5 text-[#C96D1F] tracking-[4px] sm:tracking-[6px] lg:tracking-[8px] uppercase text-[9px] sm:text-[11px] lg:text-[13px] font-medium">
          Marketplace
        </p>
      </div>
    </Link>
  );
}