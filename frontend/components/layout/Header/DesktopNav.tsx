"use client";

import Link from "next/link";

const nav = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/products" },
  { title: "Collections", href: "/collections" },
  { title: "Artisans", href: "/artisans" },
  { title: "Stories", href: "/stories" },
];

export default function DesktopNav() {
  return (
    <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
      {nav.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="
            relative
            font-medium
            text-brand
            transition
            duration-300
            py-2
            after:absolute
            after:left-0
            after:bottom-0
            after:h-[2px]
            after:w-0
            after:bg-marigold
            after:transition-all
            hover:text-marigold
            hover:after:w-full
          "
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}