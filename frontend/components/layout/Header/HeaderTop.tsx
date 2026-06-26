"use client";

import Marquee from "react-fast-marquee";
import Link from "next/link";

export default function HeaderTop() {
  return (
    <div className="hidden md:flex h-10 bg-[#083B27] text-[#F8E9C9] border-b border-[#1f5a40]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between text-[12px] lg:text-[13px]">
        <div className="flex-1 overflow-hidden">
          <Marquee gradient={false} speed={35}>
            <span className="mx-6 lg:mx-8">
              ✦ Free Shipping on Orders Above ₹1499
            </span>
            <span className="mx-6 lg:mx-8">
              ✦ Supporting 12,000+ Indian Artisans
            </span>
            <span className="mx-6 lg:mx-8">
              ✦ Easy Returns & Cash On Delivery
            </span>
            <span className="mx-6 lg:mx-8">
              ✦ Handmade • Sustainable • Authentic
            </span>
          </Marquee>
        </div>

        <div className="ml-4 lg:ml-10 flex items-center gap-4 lg:gap-6 whitespace-nowrap shrink-0 opacity-90">
          <Link href="/orders" className="hover:underline transition-all">
            Track Order
          </Link>
          <span className="opacity-30">|</span>
          <Link href="/support" className="hover:underline transition-all">
            Support
          </Link>
          <span className="opacity-30">|</span>
          <button className="hover:opacity-80 transition-opacity">
            🇮🇳 India (IN)
          </button>
        </div>
      </div>
    </div>
  );
}