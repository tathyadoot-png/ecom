"use client";

import Link from "next/link";

import {
  Heart,
  ShoppingBag,
  Search,
  User,
} from "lucide-react";

const icons = [
  {
    icon: Search,
    href: "/search",
  },
  {
    icon: Heart,
    href: "/wishlist",
  },
  {
    icon: ShoppingBag,
    href: "/cart",
  },
  {
    icon: User,
    href: "/login",
  },
];

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-3">
      {icons.map((item, i) => {
        const Icon = item.icon;

        return (
          <Link
            key={i}
            href={item.href}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition hover:border-primary hover:bg-primary hover:text-white"
          >
            <Icon size={19} />
          </Link>
        );
      })}
    </div>
  );
}