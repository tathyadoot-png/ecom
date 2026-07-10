"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
} from "lucide-react";

import { Category } from "@/store/category-store";

interface Props {
  category: Category;
}

export default function CategoryCard({
  category,
}: Props) {

  return (

    <Link
      href={`/categories/${category.slug}`}
      className="group block"
    >

<article
  className="
  overflow-hidden
  rounded-[28px]
  bg-white
  border
  border-border
  shadow-sm
  transition-all
  duration-500
  hover:-translate-y-2
  hover:shadow-xl
  "
>

  {/* IMAGE */}

  <div
    className="
    h-[260px]
    bg-paper
    flex
    items-center
    justify-center
    p-6
    "
  >
    <img
      src={category.image || "/placeholder-category.png"}
      alt={category.name}
      className="
      w-full
      h-full
      object-contain
      "
    />
  </div>

  {/* BODY */}

  <div className="p-6">

    <p className="text-[11px] uppercase tracking-[0.25em] text-gold">
      Explore
    </p>

    <h3 className="mt-2 text-xl font-heading font-semibold">
      {category.name}
    </h3>

    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
      {category.description || "Discover handcrafted collections"}
    </p>

    <div
      className="
      mt-5
      inline-flex
      items-center
      gap-2
      text-brand
      font-medium
      "
    >
      Explore

      <ArrowRight
        size={16}
        className="
        transition-transform
        group-hover:translate-x-1
        "
      />
    </div>

  </div>

</article>

    </Link>

  );

}