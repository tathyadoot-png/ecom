"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";

interface Props {
  product: {
    id: string;
    slug: string;
    image: string;
    title: string;
    category: string;
    artisan?: string;
    origin?: string;
    material?: string;
    price: number;
    salePrice?: number;
    rating?: number;
    reviews?: number;
    featured?: boolean;
    handmade?: boolean;
  };
}

export default function ProductCardV2({ product }: Props) {
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const displayPrice = product.salePrice || product.price;

  return (
    <Link href={`/products/${product.slug}`} className="block h-full group">
      <div className="relative h-full bg-[#FAF9F5] rounded-[32px] p-4 border border-[#EAE6DF] transition-all duration-500 ease-out hover:shadow-xl hover:shadow-[#1c1a17]/5 hover:-translate-y-1 flex flex-col justify-between gap-4">
        
        {/* IMAGE CONTAINER AREA - Hardcoded height class fallback added for layout safety */}
        <div className="relative w-full h-[260px] sm:h-[280px] bg-[#E2DACF] rounded-[24px] overflow-hidden transition-colors duration-500 group-hover:bg-[#DBD2C5] z-0">
          
          {/* Real Next.js Image Element */}
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 458px) 100vw, 33vw"
            priority={product.featured}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 z-10"
          />

          {/* FLOATING PRICE BADGE */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full font-sans font-semibold text-sm text-[#1C1A17] shadow-sm flex items-center gap-1 z-20">
            <span>₹{displayPrice.toLocaleString()}</span>
            {hasDiscount && (
              <span className="text-[10px] text-[#A1998C] line-through font-normal">
                ₹{product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* MINIMAL INTERACTION BUTTONS */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="h-8 w-8 rounded-full bg-white text-zinc-700 hover:text-red-500 shadow-sm flex items-center justify-center transition-transform active:scale-95"
              aria-label="Wishlist"
            >
              <Heart size={14} className="stroke-[1.5]" />
            </button>
          </div>

        
        </div>

        {/* BOTTOM METADATA CONTENT AREA */}
        <div className="px-1 pb-1 flex flex-col flex-grow justify-between gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium text-[16px] text-[#1C1A17] tracking-tight leading-tight line-clamp-1 group-hover:text-[#5C6546] transition-colors">
                {product.title}
              </h3>
              {product.origin && (
                <p className="text-[11px] text-[#A1998C] mt-0.5">{product.origin}</p>
              )}
            </div>

            {/* ACTION POINTER */}
            <div className="flex items-center gap-0.5 text-[11px] font-medium text-[#1C1A17] border-b border-[#1C1A17] pb-0.5 uppercase tracking-wider shrink-0 transition-all group-hover:gap-1.5">
              <span>Order</span>
              <ArrowUpRight size={12} className="stroke-[2]" />
            </div>
          </div>

          {/* DYNAMIC PILL SPECIFICATIONS */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#EFECE6] text-[#6E6557]">
              {product.category}
            </span>
            {product.material && (
              <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#EFECE6] text-[#6E6557]">
                {product.material}
              </span>
            )}
            {product.handmade && (
              <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#E5EAD8] text-[#55633A]">
                Handmade
              </span>
            )}
          </div>
        </div>

      </div>
    </Link>
  );
}