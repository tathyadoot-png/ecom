"use client";

import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap gap-5 mt-10">

      <Link
        href="/products"
        className="
        btn-primary
        px-8
        py-4
        font-semibold
      "
      >
        Explore Collection
      </Link>

      <Link
        href="/artisans"
        className="
        px-8
        py-4
        rounded-full
        border
        border-brand/15
        text-brand
        hover:bg-secondary
        transition
      "
      >
        Meet Artisans
      </Link>

    </div>
  );
}