"use client";

export default function HeroPatterns() {
  return (
    <>
      {/* Grid */}

      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        pointer-events-none
      "
        style={{
          backgroundImage: `
          linear-gradient(#1E2A5E 1px, transparent 1px),
          linear-gradient(90deg,#1E2A5E 1px,transparent 1px)
        `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Left Circle */}

      <div
        className="
        absolute
        left-16
        bottom-24
        w-40
        h-40
        rounded-full
        border
        border-brand/10
      "
      />

      {/* Right Circle */}

      <div
        className="
        absolute
        right-20
        top-28
        w-52
        h-52
        rounded-full
        border
        border-marigold/20
      "
      />
    </>
  );
}