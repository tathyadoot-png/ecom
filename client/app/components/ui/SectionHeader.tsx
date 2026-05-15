"use client";
import { useEffect, useRef } from "react";
import gsap from "@/app/lib/gsap";

type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ title, subtitle }: Props) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic Text Reveal
      gsap.from(".reveal-text", {
        y: "120%",
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        }
      });

      // Spacing Line Animation
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 1.8,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });

      // Premium Icon Spin Entrance
      gsap.from(".header-icon-box", {
        rotate: -270,
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full lg:w-[90%] mx-auto py-7 flex flex-col items-start gap-5 overflow-visible relative px-0 md:px-0">
      
      {/* Background Decorative Watermark (Ivory Family) */}
      <div className="absolute top-0 -left-6 opacity-[0.04] pointer-events-none select-none overflow-hidden">
        <h2 className="text-[15vw] font-black uppercase text-[#001F3F] leading-none tracking-tighter">
          {title.split(' ')[0]}
        </h2>
      </div>

      <div className="flex items-start md:items-center gap-6 md:gap-8 z-10">
        
        {/* PREMIUM ICON: Navy/Ivory Box (Fix: 'items-start' for alignment) */}
        <div className="header-icon-box mt-3 md:mt-0 w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center flex-shrink-0">
          <div className="absolute inset-0 bg-[#001F3F] rotate-45 rounded-lg shadow-lg" />
          <div className="absolute inset-2 border border-[#FDFCF0]/30 -rotate-12 rounded-lg" />
          <span className="relative z-10 text-[#FDFCF0] font-black text-2xl md:text-3xl italic tracking-tighter">V</span>
        </div>

        <div className="flex flex-col">
          <div className="overflow-hidden">
            {/* TEXT: Deep Navy Color */}
            <h2 className="reveal-text text-3xl pr-6 md:text-7xl font-black text-[#001F3F] py-5 uppercase italic leading-[0.85] tracking-tighter">
              {title}
            </h2>
          </div>
          
          {subtitle && (
            <div className="overflow-hidden mt-3 md:mt-4">
              {/* SUBTITLE: Ivory with subtle Navy tint */}
              <p className="reveal-text text-[11px] md:text-sm text-[#001F3F]/60 font-medium uppercase tracking-[0.4em] italic pl-1">
                // {subtitle}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM UI: Spacing & Line */}
      <div className="w-full flex justify-end items-center gap-6 mt-4">
        <span className="text-[10px] text-[#001F3F]/20 font-mono uppercase hidden md:block">
          Governance • Law • Policy
        </span>
        {/* LINE: Solid Navy to Transparent */}
        <div ref={lineRef} className="h-[1px] md:h-[2px] w-32 md:w-[28rem] bg-gradient-to-l from-[#001F3F] via-[#001F3F]/30 to-transparent" />
      </div>
    </div>
  );
}