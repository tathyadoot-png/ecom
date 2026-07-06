"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

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
        relative
        overflow-hidden
        rounded-[30px]
        bg-paper
        border
        border-border
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
        "
      >
        {/* IMAGE */}

        <div
          className="
          relative
          h-[280px]
          overflow-hidden
          bg-secondary
          "
        >
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="
            object-cover
            duration-700
            group-hover:scale-110
            "
          />

          {/* Gradient */}

          <div
            className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/45
            via-black/5
            to-transparent
            "
          />
        </div>

        {/* CONTENT */}

        <div
          className="
          absolute
          bottom-0
          left-0
          right-0
          p-6
          text-white
          "
        >
          <p
            className="
            text-xs
            uppercase
            tracking-[0.28em]
            text-marigold
            "
          >
            Explore Craft
          </p>

          <h3
            className="
            mt-2
            text-2xl
            font-heading
            font-semibold
            "
          >
            {category.name}
          </h3>

          <div
            className="
            mt-5
            flex
            items-center
            gap-2
            text-sm
            font-medium
            "
          >
            Explore

            <ArrowRight
              size={17}
              className="
              duration-300
              group-hover:translate-x-1
              "
            />
          </div>
        </div>
      </article>
    </Link>
  );
}