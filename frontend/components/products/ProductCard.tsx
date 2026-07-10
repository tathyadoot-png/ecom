"use client";

import { useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Heart,
  ShoppingBag,
  Star,
  PackageCheck,
} from "lucide-react";

import { toast } from "sonner";

import { Product } from "@/types/product.types";

import { Card } from "@/components/ui";
import Price from "@/components/ui/Price";
import ProductBadge from "@/components/ui/ProductBadge";

import { useCartStore } from "@/store/cart-store";

import {
  addToWishlist,
} from "@/services/wishlist.service";

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {

  const { addItem } =
    useCartStore();

  const [
    cartLoading,
    setCartLoading,
  ] = useState(false);

  const [
    wishlistLoading,
    setWishlistLoading,
  ] = useState(false);

  const image = useMemo(() => {

    if (
      product.images &&
      product.images.length > 0 &&
      product.images[0]
    ) {

      return product.images[0];

    }

    return "/placeholder.png";

  }, [product.images]);

  const discount = useMemo(() => {

    if (
      !product.salePrice ||
      product.salePrice >= product.price
    ) {

      return 0;

    }

    return Math.round(

      ((product.price - product.salePrice) /
        product.price) *
        100

    );

  }, [
    product.price,
    product.salePrice,
  ]);

  async function handleCart(
    e: React.MouseEvent
  ) {

    e.preventDefault();

    try {

      setCartLoading(true);

      await addItem(
        product._id
      );

      toast.success(
        `${product.title} added to cart`
      );

    }

    catch {

      toast.error(
        "Unable to add product"
      );

    }

    finally {

      setCartLoading(false);

    }

  }

  async function handleWishlist(
    e: React.MouseEvent
  ) {

    e.preventDefault();

    try {

      setWishlistLoading(true);

      await addToWishlist(
        product._id
      );

      toast.success(
        "Added to wishlist"
      );

    }

    catch {

      toast.error(
        "Unable to add wishlist"
      );

    }

    finally {

      setWishlistLoading(false);

    }

  }

  return (

    <Link
      href={`/products/${product.slug}`}
      className="block h-full"
    >

      <Card

        padding="none"

        className="
        group

        h-full

        overflow-hidden

        rounded-[30px]

        border

        border-border

        bg-white

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

          bg-paper

          flex

          items-center

          justify-center

          p-6

          overflow-hidden
          "
        >

          <Image

            src={image}

            alt={product.title}

            width={260}

            height={260}

            unoptimized

            className="
            w-[220px]

            h-[220px]

            object-contain

            transition-transform

            duration-500

            group-hover:scale-105
            "

          />

          <button

            onClick={handleWishlist}

            disabled={wishlistLoading}

            className="
            absolute

            right-5

            top-5

            h-11

            w-11

            rounded-full

            bg-white

            shadow-lg

            flex

            items-center

            justify-center

            transition

            hover:bg-brand

            hover:text-white
            "

          >

            <Heart size={18} />

          </button>

          <div
            className="
            absolute

            left-5

            top-5

            flex

            flex-col

            gap-2
            "
          >

            {product.featured && (

              <ProductBadge color="gold">

                Featured

              </ProductBadge>

            )}

            {discount > 0 && (

              <ProductBadge color="green">

                {discount}% OFF

              </ProductBadge>

            )}

          </div>
                  </div>

        {/* BODY */}

        <div className="flex flex-1 flex-col p-6">

          {/* Category */}

          <p
            className="
            text-[11px]
            uppercase
            tracking-[0.24em]
            text-gold
            font-semibold
            "
          >
            {product.category?.name}
          </p>

          {/* Title */}

          <h3
            className="
            mt-3
            heading-card
            line-clamp-2
            min-h-[56px]
            "
          >
            {product.title}
          </h3>

          {/* Rating */}

          <div
            className="
            mt-3
            flex
            items-center
            gap-2
            "
          >

            {product.numReviews > 0 ? (

              <>

                <Star
                  size={15}
                  className="
                  fill-yellow-400
                  text-yellow-400
                  "
                />

                <span className="text-sm font-medium">

                  {product.averageRating.toFixed(1)}

                </span>

                <span className="text-sm text-zinc-500">

                  ({product.numReviews})

                </span>

              </>

            ) : (

              <span className="text-sm text-zinc-400">

                No Reviews Yet

              </span>

            )}

          </div>

          {/* Stock */}

          <div className="mt-4">

            {(product.stock ?? 0) > 0 ? (

              <div
                className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-green-50
                px-3
                py-1
                text-xs
                font-medium
                text-green-700
                "
              >

                <PackageCheck size={14} />

                {product.stock <= 5

                  ? `Only ${product.stock} Left`

                  : "In Stock"}

              </div>

            ) : (

              <div
                className="
                inline-flex
                rounded-full
                bg-red-50
                px-3
                py-1
                text-xs
                font-medium
                text-red-600
                "
              >

                Out of Stock

              </div>

            )}

          </div>

          {/* Price */}

          <div className="mt-6">

            <Price
              price={product.price}
              salePrice={product.salePrice}
            />

          </div>

          {/* Button */}

          <button

            disabled={
              cartLoading ||
              (product.stock ?? 0) === 0
            }

            onClick={handleCart}

            className="
            mt-auto
            flex
            h-12
            w-full
            items-center
            justify-center
            gap-2
            rounded-full
            bg-brand
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-brand-light
            disabled:cursor-not-allowed
            disabled:opacity-60
            "

          >

            <ShoppingBag size={18} />

            {cartLoading
              ? "Adding..."
              : (product.stock ?? 0) === 0
              ? "Out of Stock"
              : "Add To Cart"}

          </button>

        </div>

      </Card>

    </Link>

  );

}