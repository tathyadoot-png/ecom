"use client";

import Link from "next/link";

import Image from "next/image";

import { Product } from "@/types/product.types";

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
    >
      
      <div className="bg-white rounded-3xl overflow-hidden border hover:shadow-xl transition-all duration-300">
        
        <div className="relative aspect-square overflow-hidden">
          
          <Image
            src={
              product.images?.[0]
            }
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-all duration-500"
          />

          {product.featured && (
            <div className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
              Featured
            </div>
          )}

        </div>

        <div className="p-5 space-y-3">
          
          <div>
            
            <p className="text-sm text-zinc-500">
              {
                product.category
                  ?.name
              }
            </p>

            <h3 className="font-semibold text-lg line-clamp-1">
              {product.title}
            </h3>

          </div>

          <div className="flex items-center gap-3">
            
            <p className="text-xl font-bold">
              ₹
              {product.salePrice ||
                product.price}
            </p>

            {product.salePrice && (
              <p className="text-zinc-400 line-through">
                ₹
                {
                  product.price
                }
              </p>
            )}

          </div>

        </div>

      </div>

    </Link>
  );
}