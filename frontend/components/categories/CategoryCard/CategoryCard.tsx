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
        relative

        overflow-hidden

        rounded-[28px]

        aspect-[4/5]

        bg-secondary

        border

        border-border

        shadow-sm

        transition-all

        duration-500

        hover:-translate-y-2

        hover:shadow-2xl
        "
      >

        {/* IMAGE */}

        <Image
          src={category.image}
          alt={category.name}
          fill
          className="
          object-cover

          transition-transform

          duration-700

          group-hover:scale-110
          "
        />

        {/* Overlay */}

        <div
          className="
          absolute

          inset-0

          bg-gradient-to-t

          from-black/75

          via-black/10

          to-transparent
          "
        />

        {/* Content */}

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

            tracking-[0.25em]

            text-gold
            "
          >
            Explore
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

          {category.description && (

            <p
              className="
              mt-2

              text-sm

              text-white/80

              line-clamp-2
              "
            >
              {category.description}
            </p>

          )}

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

            Explore Craft

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