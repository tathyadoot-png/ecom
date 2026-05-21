"use client";

import Link from "next/link";

import {
  CheckCircle2,
} from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      
      <div className="bg-white border rounded-3xl p-10 max-w-lg w-full text-center">
        
        <div className="flex justify-center mb-6">
          
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            
            <CheckCircle2
              size={50}
              className="text-green-600"
            />

          </div>

        </div>

        <h1 className="text-4xl font-bold">
          Order Placed 🎉
        </h1>

        <p className="text-zinc-500 mt-4 leading-relaxed">
          Your order has been placed successfully.
          We’ll notify you once it gets confirmed.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          
          <Link
            href="/products"
            className="flex-1 h-14 rounded-2xl border flex items-center justify-center font-semibold"
          >
            Continue Shopping
          </Link>

          <Link
            href="/orders"
            className="flex-1 h-14 rounded-2xl bg-black text-white flex items-center justify-center font-semibold"
          >
            My Orders
          </Link>

        </div>

      </div>

    </div>
  );
}