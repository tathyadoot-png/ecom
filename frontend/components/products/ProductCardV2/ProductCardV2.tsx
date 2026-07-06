"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Heart,
  ShoppingBag,
} from "lucide-react";

import { Card } from "@/components/ui";
import Price from "@/components/ui/Price";
import ProductBadge from "@/components/ui/ProductBadge";

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

export default function ProductCardV2({
  product,
}: Props) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="block"
    >
      <Card
        
        padding="none"
        className="
        group
        overflow-hidden
        h-full
        rounded-[28px]
        "
      >
        {/* IMAGE */}

        <div
          className="
          relative
          h-[220px]
          md:h-[250px]
          bg-paper
          overflow-hidden
          flex
          items-center
          justify-center
          "
        >
      <Image
  src={product.image}
  alt={product.title}
  width={250}
  height={250}
  priority
  className="
    w-72
    h-72
    object-contain
    p-5
    transition-transform
    duration-500
    group-hover:scale-105
  "
/>
          {/* Wishlist */}

          <button
            onClick={(e) =>
              e.preventDefault()
            }
            className="
            absolute
            top-4
            right-4
            h-10
            w-10
            rounded-full
            bg-white/90
            backdrop-blur
            flex
            items-center
            justify-center
            shadow-md
            transition
            hover:bg-brand
            hover:text-white
            "
          >
            <Heart size={18} />
          </button>

          {/* Badges */}

          <div className="absolute left-4 top-4 flex flex-col gap-2">

            {product.handmade && (
              <ProductBadge color="green">
                Handmade
              </ProductBadge>
            )}

            {product.featured && (
              <ProductBadge color="gold">
                Featured
              </ProductBadge>
            )}

          </div>
        </div>

        {/* CONTENT */}

        <div className="p-5">

          <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold">

            {product.category}

          </p>

          <h3
            className="
            mt-2
            heading-card
            line-clamp-2
            leading-snug
            min-h-[52px]
            "
          >
            {product.title}
          </h3>

          <p className="mt-2 text-sm text-zinc-500">

            by

            <span className="ml-1 font-semibold text-brand">

              {product.artisan}

            </span>

          </p>

          <div className="mt-5">

            <Price
              price={product.price}
              salePrice={product.salePrice}
            />

          </div>

          <button
            onClick={(e) => {
              e.preventDefault();

              // Add To Cart
            }}
            className="
            mt-5
            w-full
            h-11
            rounded-full
            bg-brand
            text-white
            font-medium
            flex
            items-center
            justify-center
            gap-2
            transition
            hover:bg-brand-light
            "
          >
            <ShoppingBag size={18} />

            Add to Cart

          </button>

        </div>

      </Card>
    </Link>
  );
}