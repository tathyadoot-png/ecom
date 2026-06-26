"use client";

import Image from "next/image";

import heroBgDesktop from "@/public/hero/herobg.png";
import heroBgMobile from "@/public/hero/herobgmobile.png";

export default function HeroBackground() {
  return (
    <>
      {/* Desktop Background */}
      <div className="absolute inset-0 -z-20 hidden md:block">
        <Image
          src={heroBgDesktop}
          alt="Indian Artisan Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Mobile Background */}
      <div className="absolute inset-0 -z-20 md:hidden">
        <Image
          src={heroBgMobile}
          alt="Indian Artisan Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/20" />

      {/* Desktop Gradient */}
      <div
        className="absolute inset-0 -z-10 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(55,20,8,.45) 0%, rgba(55,20,8,.20) 35%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Mobile Gradient */}
      <div
        className="absolute inset-0 -z-10 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(55,20,8,.55) 0%, rgba(55,20,8,.20) 45%, rgba(0,0,0,.15) 100%)",
        }}
      />
    </>
  );
}