"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, MousePointer2 } from "lucide-react";
import gsap from "@/app/lib/gsap";
import { useLanguage } from "@/app/context/LanguageContext";
import { heroData } from "@/app/data/hero";
import vs14 from "@/public/vs.png";

export default function Hero() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const ringRef = useRef(null);
  const { lang } = useLanguage();
  const data = heroData[lang as keyof typeof heroData] || heroData.en;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content Entrance
      gsap.from(".reveal-text", {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
      });

      // Image & Glow Entrance
      gsap.from(".image-reveal", {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
      });

      // Infinite Rotation for background ring
      gsap.to(ringRef.current, {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });

      // Floating Effect for the image
      gsap.to(imageRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center bg-[#FDFCF0] pt-24 pb-12 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] text-[25vw] font-black text-[#001F3F]/5 select-none leading-none z-0 uppercase">
        Vikalp
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT CONTENT: TYPOGRAPHY */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
            <div className="reveal-text inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#001F3F]/10 bg-white shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#001F3F] animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#001F3F]">
                {data.headline}
              </p>
            </div>

            <div className="space-y-0">
              <h1 className="reveal-text text-6xl md:text-8xl md:pb-8 pb-3 pt-1.5 lg:text-[10rem] font-black text-[#001F3F] uppercase leading-[0.8] tracking-tighter">
                {data.name.split(' ')[0]}
              </h1>
              <h1 className="reveal-text text-6xl  md:text-8xl lg:text-[10rem] font-black text-[#001F3F] uppercase leading-[0.8] tracking-tighter outline-text italic">
                {data.name.split(' ')[1]}
              </h1>
            </div>

            <p className="reveal-text text-base md:text-xl text-[#001F3F]/70 font-medium max-w-xl leading-relaxed italic border-l-4 border-[#001F3F]/20 pl-6">
              {data.subheading}
            </p>

           <div className="reveal-text flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
  <button
    onClick={() => {
      document.getElementById("legal")?.scrollIntoView({
        behavior: "smooth",
      });
    }}
    className="group px-8 py-5 bg-[#001F3F] text-[#FDFCF0] rounded-2xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 hover:scale-[1.05] transition-transform shadow-xl"
  >
    {data.ctaPrimary}
    <ArrowRight
      size={18}
      className="group-hover:translate-x-1 transition-transform"
    />
  </button>

  <button
    onClick={() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    }}
    className="px-8 py-5 bg-white border border-[#001F3F]/10 text-[#001F3F] rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#001F3F]/5 transition-colors shadow-sm"
  >
    {data.ctaSecondary}
  </button>
</div>
          </div>

          {/* RIGHT CONTENT: THE IMAGE HERO */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[500px] md:h-[700px]">
            
            {/* Animated Highlight Backgrounds */}
            <div ref={ringRef} className="absolute w-[120%] h-[120%] opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="#001F3F" strokeWidth="0.2" strokeDasharray="4 4" />
                </svg>
            </div>
            
            <div className="absolute w-80 h-80 bg-[#001F3F]/10 rounded-full blur-[100px] animate-pulse" />
            
            {/* The Image */}
            <div ref={imageRef} className="image-reveal relative z-10 w-full h-full">
              <Image 
                src={vs14} 
                alt="Vikalp Singh" 
                fill 
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,31,63,0.3)]"
                priority
              />
            </div>

            {/* Floating Tag */}
            <div className="reveal-text absolute bottom-20 -left-10 md:-left-20 bg-white p-4 rounded-2xl shadow-2xl border border-[#001F3F]/5 hidden md:flex items-center gap-4 z-20">
                <div className="w-10 h-10 bg-[#001F3F] rounded-xl flex items-center justify-center text-white">
                    <MousePointer2 size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black text-[#001F3F]/40 uppercase tracking-tighter">Advocate</p>
                    <p className="text-xs font-black text-[#001F3F] uppercase">High Court</p>
                </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1.5px #001F3F;
          color: transparent;
        }
        @media (min-width: 1024px) {
          .outline-text {
            -webkit-text-stroke: 2.5px #001F3F;
          }
        }
      `}</style>
    </section>
  );
}