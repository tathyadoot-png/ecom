"use client";

import { Heart } from "lucide-react";

import {
  addToWishlist,
  removeFromWishlist,
} from "@/services/wishlist.service";

import { useWishlistStore } from "@/store/wishlist-store";

import { toast } from "sonner";

interface Props {
  product: any;
}

export default function WishlistButton({
  product,
}: Props) {
  const {
    isInWishlist,
    addProduct,
    removeProduct,
  } = useWishlistStore();

  const wished =
    isInWishlist(
      product._id
    );

 const handleToggle =
  async (
    e: React.MouseEvent
  ) => {

    e.preventDefault();

    e.stopPropagation();
      try {
        if (wished) {
          await removeFromWishlist(
            product._id
          );

          removeProduct(
            product._id
          );

          toast.success(
            "Removed from wishlist"
          );
        } else {
          await addToWishlist(
            product._id
          );

          addProduct(
            product
          );

          toast.success(
            "Added to wishlist"
          );
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Something went wrong"
        );
      }
    };

  return (
    <button
      onClick={handleToggle}
      className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white border shadow-sm flex items-center justify-center"
    >

      <Heart
        className={`w-5 h-5 transition-all ${
          wished
            ? "fill-red-500 text-red-500"
            : "text-zinc-500"
        }`}
      />

    </button>
  );
}