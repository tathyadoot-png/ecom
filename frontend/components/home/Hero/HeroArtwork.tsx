"use client";

import Image from "next/image";

export default function HeroArtwork() {
  return (
    <div className="relative">

      <Image
        src="/hero/artist.png"
        width={650}
        height={900}
        alt=""
        className="mx-auto drop-shadow-[0_40px_80px_rgba(0,0,0,.4)]"
      />

    </div>
  );
}