"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types/category.types";

interface CategoryCardProps {
  category: Category;
  index?: number;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { name, slug, image } = category;

  // Safe image extraction
  const imageUrl =
    typeof image === "string"
      ? image
      : (image as { asset?: { url?: string } })?.asset?.url || "/placeholder.jpg";

  // Safe slug extraction
  const slugPath =
    typeof slug === "string"
      ? slug
      : (slug as { current?: string })?.current || category._id;

  return (
    <Link
      href={`/categories/${slugPath}`}
      className="group flex flex-col items-center text-center w-[140px] sm:w-[160px] md:w-[175px] shrink-0 select-none snap-start py-1"
    >
      {/* Dynamic Gold Halo Container */}
      <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#C8A97E]/30 via-[#EFECE6] to-[#C8A97E]/60 group-hover:from-[#C8A97E] group-hover:to-[#8C6D41] transition-all duration-500 group-hover:shadow-[0_8px_20px_rgba(200,169,126,0.25)]">
        
        {/* Inner Border Spacer */}
        <div className="relative p-1 rounded-full bg-[#FAF7F2]">
          
          {/* Main Image Circle - BALANCED SIZE (128px to 160px) */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden bg-[#EFECE6] border border-[#E5DCD3]">
            <Image
              src={imageUrl}
              alt={name || "Category image"}
              fill
              sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
              className="object-cover object-center transform group-hover:scale-110 transition-transform duration-500 ease-out"
              draggable={false}
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

        </div>

        {/* Hover Action Arrow */}
        <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#2C221E] text-[#FAF7F2] flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
          <ArrowUpRight className="w-3.5 h-3.5 text-[#C8A97E]" />
        </div>
      </div>

      {/* Category Title & Underline */}
      <div className="mt-3 flex flex-col items-center gap-1 px-1 w-full">
        <h3 className="text-sm sm:text-base font-serif font-medium tracking-tight text-[#2C221E] capitalize line-clamp-1 group-hover:text-[#A68A64] transition-colors duration-300">
          {name}
        </h3>
        <div className="w-2 h-0.5 rounded-full bg-[#DCD3C9] group-hover:w-6 group-hover:bg-[#C8A97E] transition-all duration-300" />
      </div>
    </Link>
  );
};

export { CategoryCard };
export default CategoryCard;