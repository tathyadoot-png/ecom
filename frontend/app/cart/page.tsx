"use client";

import Image from "next/image";

import Link from "next/link";

import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const {
    items,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    totalPrice,
  } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
        
        <div className="bg-white border rounded-3xl p-10 text-center max-w-md w-full">
          
          <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-6">
            
            <ShoppingBag size={36} />

          </div>

          <h1 className="text-3xl font-bold">
            Your cart is empty
          </h1>

          <p className="text-zinc-500 mt-3">
            Add products to continue shopping
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex h-14 px-8 rounded-2xl bg-black text-white items-center justify-center font-semibold"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      
      <div className="max-w-7xl mx-auto px-4 py-10">
        
        <div className="flex items-center justify-between mb-10">
          
          <div>
            
            <h1 className="text-4xl font-bold">
              Shopping Cart
            </h1>

            <p className="text-zinc-500 mt-2">
              {totalItems()} items in cart
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT */}

          <div className="lg:col-span-2 space-y-5">
            
            {items.map((item) => (
              <div
                key={item.product._id}
                className="bg-white border rounded-3xl p-5 flex flex-col md:flex-row gap-5"
              >
                
                {/* IMAGE */}

                <div className="relative w-full md:w-36 aspect-square rounded-2xl overflow-hidden border">
                  
                  <Image
                    src={
                      item.product
                        .images?.[0]
                    }
                    alt={
                      item.product
                        .title
                    }
                    fill
                    className="object-cover"
                  />

                </div>

                {/* CONTENT */}

                <div className="flex-1 flex flex-col justify-between gap-5">
                  
                  <div className="space-y-2">
                    
                    <p className="text-sm text-zinc-500">
                      {
                        item.product
                          .category
                          ?.name
                      }
                    </p>

                    <h2 className="text-2xl font-semibold">
                      {
                        item.product
                          .title
                      }
                    </h2>

                    <div className="flex items-center gap-3">
                      
                      <p className="text-2xl font-bold">
                        ₹
                        {item.product
                          .salePrice ||
                          item.product
                            .price}
                      </p>

                      {item.product
                        .salePrice && (
                        <p className="line-through text-zinc-400">
                          ₹
                          {
                            item
                              .product
                              .price
                          }
                        </p>
                      )}

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex items-center justify-between flex-wrap gap-5">
                    
                    {/* QUANTITY */}

                    <div className="flex items-center gap-3">
                      
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.product
                              ._id
                          )
                        }
                        className="w-11 h-11 rounded-xl border bg-white flex items-center justify-center"
                      >
                        <Minus size={18} />
                      </button>

                      <div className="w-10 text-center font-semibold">
                        {
                          item.quantity
                        }
                      </div>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product
                              ._id
                          )
                        }
                        className="w-11 h-11 rounded-xl border bg-white flex items-center justify-center"
                      >
                        <Plus size={18} />
                      </button>

                    </div>

                    {/* REMOVE */}

                    <button
                      onClick={() =>
                        removeItem(
                          item.product
                            ._id
                        )
                      }
                      className="flex items-center gap-2 text-red-600"
                    >
                      
                      <Trash2 size={18} />

                      Remove

                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* RIGHT */}

          <div>
            
            <div className="bg-white border rounded-3xl p-8 sticky top-10 space-y-6">
              
              <div>
                
                <h2 className="text-2xl font-bold">
                  Order Summary
                </h2>

              </div>

              <div className="space-y-4">
                
                <div className="flex items-center justify-between">
                  
                  <span className="text-zinc-600">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ₹
                    {totalPrice()}
                  </span>

                </div>

                <div className="flex items-center justify-between">
                  
                  <span className="text-zinc-600">
                    Shipping
                  </span>

                  <span className="font-semibold">
                    Free
                  </span>

                </div>

                <div className="border-t pt-4 flex items-center justify-between text-lg font-bold">
                  
                  <span>Total</span>

                  <span>
                    ₹
                    {totalPrice()}
                  </span>

                </div>

              </div>

           <Link
  href="/checkout"
  className="w-full h-14 rounded-2xl bg-black text-white text-lg font-semibold flex items-center justify-center"
>
  Proceed To Checkout
</Link>

              <Link
                href="/products"
                className="w-full h-14 rounded-2xl border flex items-center justify-center font-semibold"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}