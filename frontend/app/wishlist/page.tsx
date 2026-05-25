"use client";

import {
  useEffect,
} from "react";

import Link from "next/link";

import ProductCard from "@/components/products/product-card";

import {
  getWishlist,
} from "@/services/wishlist.service";

import { useWishlistStore } from "@/store/wishlist-store";

export default function WishlistPage() {
  const {
    products,
    setWishlist,
  } = useWishlistStore();

  const fetchWishlist =
    async () => {
      try {
        const res =
          await getWishlist();

        setWishlist(
          res.data.data
            .products || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50">

      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Wishlist
          </h1>

          <p className="text-zinc-500 mt-2">
            Your saved products
          </p>

        </div>

        {products.length ===
        0 ? (
          <div className="bg-white border rounded-3xl p-20 text-center">

            <h2 className="text-2xl font-bold">
              Wishlist is empty
            </h2>

            <p className="text-zinc-500 mt-2">
              Save products to see them here
            </p>

            <Link
              href="/products"
              className="inline-flex mt-8 h-12 px-6 rounded-2xl bg-black text-white items-center justify-center"
            >
              Browse Products
            </Link>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {products.map(
              (product) => (
                <ProductCard
                  key={
                    product._id
                  }
                  product={
                    product
                  }
                />
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}