"use client";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroArtwork from "./HeroArtwork";
import HeroFloatingCards from "./HeroFloatingCards";

export default function Hero() {
  return (
<section className="relative min-h-screen overflow-hidden">

  <HeroBackground />

  <div className="container-max relative z-20 min-h-screen">

      <HeroContent />

      <HeroFloatingCards />

  </div>

</section>
  );
}