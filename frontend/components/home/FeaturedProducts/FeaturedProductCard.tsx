"use client";

import Image from "next/image";
import Link from "next/link";

import {

Heart,

ShoppingBag,

ArrowRight,

} from "lucide-react";

import { Product } from "@/types/product.types";

import Price from "@/components/ui/Price";

interface Props {

product: Product;

}

export default function FeaturedProductCard({

product,

}: Props) {

const image =

product.images?.[0] ||

"/placeholder.png";
console.log("IMAGE URL =>", image);
return (

<Link

href={`/products/${product.slug}`}

className="group block"

>

<article
  className="
  group

  overflow-hidden

  rounded-[28px]

  border

  border-stone-200

  bg-white

  shadow-sm

  hover:shadow-xl

  transition-all

  duration-500
  "
>


{/* IMAGE */}

<div
  className="
  relative
  h-[260px]
  bg-paper
  flex
  items-center
  justify-center
  overflow-hidden
  "
>
  <img
    src={image}
    alt={product.title}
    className="
    w-[72%]
    h-[72%]
    object-contain
    transition-all
    duration-500
    group-hover:scale-105
    "
  />

  <button
    onClick={(e) => e.preventDefault()}
    className="
    absolute
    top-4
    right-4

    w-10
    h-10

    rounded-full

    bg-white

    shadow-lg

    flex
    items-center
    justify-center

    hover:bg-brand
    hover:text-white

    transition
    "
  >
    <Heart size={18} />
  </button>

  {product.featured && (
    <div
      className="
      absolute
      left-4
      top-4
      rounded-full
      bg-brand
      text-white
      text-[10px]
      font-semibold
      px-3
      py-1
      "
    >
      Featured
    </div>
  )}
</div>

{/* BODY */}

<div className="p-5">

  <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">

    {product.category?.name}

  </p>

  <h3
    className="
    mt-2
    text-xl
    font-heading
    font-semibold
    text-brand
    line-clamp-2
    "
  >
    {product.title}
  </h3>

  <div className="mt-4">

    <Price
      price={product.price}
      salePrice={product.salePrice}
    />

  </div>

  <div
    className="
    mt-5

    flex

    items-center

    gap-3
    "
  >

    <button
      onClick={(e) => e.preventDefault()}
      className="
      flex-1

      h-11

      rounded-full

      bg-brand

      text-white

      font-medium

      transition

      hover:bg-brand-light

      flex

      items-center

      justify-center

      gap-2
      "
    >
      <ShoppingBag size={18} />

      Add to Cart

    </button>

    <div
      className="
      w-11

      h-11

      rounded-full

      border

      flex

      items-center

      justify-center

      transition

      group-hover:bg-brand

      group-hover:text-white
      "
    >
      <ArrowRight size={18} />
    </div>

  </div>

</div>

</article>

</Link>

);

}