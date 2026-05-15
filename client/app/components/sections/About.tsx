"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { aboutData } from "@/app/data/about";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import vs from "@/public/vs13.png";

export default function About() {
  const { lang } = useLanguage();
  const data = aboutData[lang as keyof typeof aboutData];
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bgShapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth entrance for content
      gsap.from(".reveal-item", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      // Subtle float animation for the background shape
      gsap.to(bgShapeRef.current, {
        y: 20,
        x: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  if (!data) return null;

  return (
    <section 
    id="about"
      ref={containerRef} 
      className="relative bg-[#FDFCF0] py-12 lg:py-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-7 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* LEFT: Image Section with Background Styling */}
          <div className="w-full lg:w-5/12 relative flex justify-center items-end min-h-[400px] lg:min-h-[550px]">
            
            {/* Background Decorative Shape for Transparent Image */}
            <div 
              ref={bgShapeRef}
              className="absolute w-[80%] aspect-square bg-gradient-to-tr from-[#001F3F]/10 to-[#00D1FF]/5 rounded-full blur-2xl -z-10 bottom-10"
            />
            <div className="absolute w-[70%] aspect-square border border-[#001F3F]/5 rounded-full -z-10 bottom-16 animate-pulse" />

            {/* Image Container - No Clipping */}
            <div 
              ref={imageRef} 
              className="relative w-full h-[450px] lg:h-[550px] flex items-end justify-center will-change-transform"
            >
              <Image 
                src={vs} 
                alt={data.name} 
                className="object-contain object-bottom transition-all duration-700 filter drop-shadow-[0_20px_50px_rgba(0,31,63,0.2)]"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority 
              />
            </div>

            {/* Float Label / Badge */}
            <div className="absolute top-1/4 -right-4 lg:-right-8 bg-white/80 backdrop-blur-md border border-[#001F3F]/10 p-4 rounded-2xl shadow-xl reveal-item">
              <p className="text-[#001F3F] font-black text-[10px] uppercase tracking-widest leading-none">
                Verified Advocate
              </p>
              <p className="text-[#001F3F]/60 text-[9px] font-medium mt-1">High Court of MP</p>
            </div>
          </div>

          {/* RIGHT: Compact Content */}
          <div className="w-full lg:w-7/12 space-y-6">
            <div className="reveal-item flex items-center gap-3">
              <span className="text-[#001F3F] font-bold text-xs uppercase tracking-[0.3em] opacity-60">
                {data.title}
              </span>
              <div className="h-[1px] flex-grow bg-[#001F3F]/10" />
            </div>

            <h2 className="reveal-item text-5xl md:text-7xl font-black text-[#001F3F] leading-[0.95] tracking-tighter">
              {lang === 'en' ? (
                <>LEGACY <span className="text-transparent stroke-navy italic">IN MOTION</span></>
              ) : (
                <>विरासत <span className="text-transparent stroke-navy italic">गतिमान</span></>
              )}
            </h2>

            <p className="reveal-item text-lg md:text-2xl text-[#001F3F]/80 leading-relaxed font-light text-justify">
              {data.intro}
            </p>

            <div className="reveal-item p-8 bg-white/40 border border-white/60 rounded-[2rem] shadow-sm backdrop-blur-sm relative overflow-hidden">
               {/* Accent decoration for the quote */}
               <div className="absolute top-0 left-0 w-2 h-full bg-[#001F3F]/10" />
              <p className="text-xl italic font-serif text-[#001F3F]/90 leading-relaxed text-justify">
                "{data.vision}"
              </p>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .stroke-navy {
          -webkit-text-stroke: 1px #001F3F;
        }
        @media (min-width: 1024px) {
          .stroke-navy { -webkit-text-stroke: 2px #001F3F; }
        }
        .will-change-transform { will-change: transform; }
      `}</style>
    </section>
  );
}