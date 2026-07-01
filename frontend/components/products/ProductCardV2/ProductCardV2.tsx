"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui";

interface Props {
  product: {
    id: string;
    slug: string;
    image: string;
    title: string;
    category: string;
    artisan: string;
    origin: string;
    material: string;
    price: number;
    salePrice?: number;
    rating: number;
    reviews: number;
    featured?: boolean;
    handmade?: boolean;
  };
}

export default function ProductCardV2({ product }: Props) {
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const displayPrice = product.salePrice || product.price;

  return (
    <Link href={`/products/${product.slug}`} className="block h-full group">
      {/* Background stacked paper layers effect from the design inspiration */}
      <div className="relative h-full transition-all duration-500 ease-out group-hover:-translate-y-1">
        {/* Decorative background sheet layers for the artisan feel */}
        <div className="absolute inset-0 bg-[#EFEBE4] rounded-[24px] translate-x-1.5 translate-y-1.5 scale-[0.99] opacity-70" />
        <div className="absolute inset-0 bg-[#F5F1E9] rounded-[24px] translate-x-0.5 translate-y-0.5 scale-[0.995] opacity-90" />

        <Card
   
          padding="none"
          className="relative h-full flex flex-col bg-[#FDFBF7] border border-[#EBE5DA] rounded-[24px] shadow-sm overflow-hidden"
        >
          {/* IMAGE CONTAINER: Fluid organic smooth curves on the bottom left edge */}
          <div className="relative w-full aspect-square bg-[#ECE6DC] overflow-hidden rounded-br-[4.5rem] transition-colors duration-500 group-hover:bg-[#E7E0D5]">
            <div className="absolute inset-0 p-6 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 458px) 50vw, 23vw"
                priority={product.featured}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Minimal floating actions inside image frame */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-md shadow-sm flex items-center justify-center text-zinc-700 hover:text-red-500 hover:bg-white transition-all duration-300 active:scale-95"
                aria-label="Wishlist"
              >
                <Heart size={15} className="stroke-[1.5]" />
              </button>
            </div>

            {/* Premium floating quick cart bag attached cleanly at the corner curve intersection */}
            <div className="absolute bottom-0 right-4 translate-y-1/2 z-20">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="h-10 w-10 rounded-full bg-[#1C1A17] text-[#FAF8F5] shadow-md flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95"
                aria-label="Quick shop"
              >
                <ShoppingBag size={14} className="stroke-[2]" />
              </button>
            </div>
          </div>

          {/* EDITORIAL CONTENT AREA */}
          <div className="p-6 pt-7 flex flex-col flex-grow">
            {/* Title */}
            <h3 className="font-heading text-lg font-medium text-[#1C1A17] tracking-tight leading-snug line-clamp-2 min-h-[48px]">
              {product.title}
            </h3>

            {/* Category metadata row */}
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#8A8275] tracking-wide font-medium">
              <span>Category:</span>
              <span className="text-[#5C564E]">{product.category}</span>
            </div>

            {/* Pricing Section stacked natively matching the original luxury layouts */}
            <div className="mt-5 pt-3 border-t border-[#EDE7DD] flex flex-wrap items-baseline gap-2">
              <span className="font-sans text-lg font-semibold text-[#292622]">
                ₹{displayPrice.toLocaleString()}
              </span>

              {hasDiscount && (
                <>
                  <span className="font-sans text-xs text-[#A1998C] line-through">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#EFECE6] text-[#6E6557]">
                    {Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    </Link>
  );
}