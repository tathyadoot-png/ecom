"use client";

import HeroButtons from "./HeroButtons";

export default function HeroContent() {
  return (
    <div className="relative z-20 max-w-[560px] pt-10 lg:pt-20">

      {/* Badge */}

      <div
        className="
          inline-flex
          items-center
          gap-3
          rounded-full
          border
          border-[#D4A017]/30
          bg-[#5A1E12]/45
          backdrop-blur-md
          px-6
          py-3
          md:text-[13px]
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.35em]
          text-[#E8C15A]
        "
      >
        ✦ Made In India
        <span className="opacity-50">•</span>
        Handcrafted
      </div>

      {/* Heading */}

      <h1
        className="
          mt-16
          font-heading
          text-[68px]
          leading-[0.92]
          tracking-[-0.04em]
          text-[#FFF6E8]
        "
      >
        Crafted

        <br />

        Across

        <br />

        <span
          className="
            bg-gradient-to-r
            from-[#F7C75A]
            via-[#E6A61C]
            to-[#C88914]
            bg-clip-text
            text-transparent
          "
        >
          Generations
        </span>
      </h1>

      {/* Description */}

      <p
        className="
          mt-20
          max-w-[520px]
          text-[20px]
          leading-9
          text-[#F8EBDD]
          text-justify
        "
      >
        Discover India's finest handcrafted creations,
        preserving centuries of artistry, culture and
        heritage through timeless craftsmanship passed
        from one generation to the next.
      </p>

      {/* Decorative Line */}

      <div className="mt-8 flex items-center gap-4">

        <div className="h-px w-28 bg-[#D4A017]" />

        <div className="w-2 h-2 rounded-full bg-[#D4A017]" />

        <div className="h-px flex-1 bg-[#D4A017]/30" />

      </div>

      <div className="mt-10">

        <HeroButtons />

      </div>

    </div>
  );
}