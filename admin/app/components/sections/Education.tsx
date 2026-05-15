"use client";
import { useRef, useEffect, useState } from "react";
import { educationData } from "@/app/data/education";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Education() {
  const { lang } = useLanguage();
  const currentLang = (lang === 'hi' || lang === 'en') ? lang : 'en';
  const data = educationData[currentLang as keyof typeof educationData];
  
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  
  // Hydration fix: ensures Math.random() only runs on client
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    if (!data) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 20%",
          endTrigger: containerRef.current,
          end: "bottom 80%",
          pin: true,
          pinSpacing: false,
        });
      }

      // 1. ANIMATION: Pulse & Scale for Dots
      gsap.from(".edu-dot", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".edu-content-stack",
          start: "top 80%",
        }
      });

      // 2. ANIMATION: Steps reveal
      gsap.from(".edu-step", {
        x: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".edu-content-stack",
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lang, data]);

  if (!data) return null;

  return (
    <section 
      ref={containerRef} 
      id="education"
      className="relative min-h-screen bg-[#FDFCF0] py-5 md:py-40 overflow-hidden"
    >
      {/* BACKGROUND DECORATION: Hydration-safe random dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {hasMounted && [...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-[#001F3F]/10 animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${10 + i * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-12 md:gap-24 relative z-10">
        
        {/* Left Side: Title */}
        <div ref={titleRef} className="md:w-1/3">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-[#001F3F]" />
            <span className="text-[#001F3F] text-[10px] font-bold uppercase tracking-[0.4em]">
              Chronicle
            </span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-[#001F3F] leading-[0.8] uppercase tracking-tighter mb-10">
            {data.title.split(' ')[0]} <br />
            <span className="text-transparent stroke-navy italic opacity-40">
              {data.title.split(' ').slice(1).join(' ')}
            </span>
          </h2>
          <div className="p-6 border-l-2 border-[#001F3F]/10 bg-white/30 backdrop-blur-sm rounded-r-2xl">
            <p className="text-[#001F3F]/70 text-sm md:text-base font-medium leading-relaxed">
              {lang === "en" 
                ? "A meticulously built academic legacy spanning across prestigious global institutions." 
                : "प्रतिष्ठित वैश्विक संस्थानों में फैला एक सावधानीपूर्वक निर्मित शैक्षणिक विरासत।"}
            </p>
          </div>
        </div>

        {/* Right Side: Animated Dot Timeline */}
        <div className="edu-content-stack md:w-2/3 space-y-20 md:space-y-32">
          {data.items.map((item, index) => (
            <div 
              key={index} 
              className="edu-step group relative flex gap-8 md:gap-16"
            >
              {/* Animated Dot & Line */}
              <div className="relative flex flex-col items-center">
                <div className="edu-dot w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-[#001F3F] flex items-center justify-center bg-[#FDFCF0] z-10 group-hover:bg-[#001F3F] transition-all duration-500">
                   <div className="w-2 h-2 bg-[#001F3F] rounded-full group-hover:bg-white transition-colors" />
                   <div className="absolute inset-0 rounded-full bg-[#001F3F]/20 animate-ping pointer-events-none" />
                </div>
                
                {index !== data.items.length - 1 && (
                  <div className="absolute top-8 w-[2px] h-[calc(100%+80px)] md:h-[calc(100%+128px)] bg-gradient-to-b from-[#001F3F] to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-700" />
                )}
              </div>

              {/* Content Box */}
              <div className="flex-1 pb-4">
                <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6 mb-6">
                  <span className="text-4xl md:text-6xl font-black text-[#001F3F] leading-none tracking-tighter">
                    {item.year}
                  </span>
                  <div className="h-px flex-1 bg-[#001F3F]/10 hidden md:block mb-3" />
                  <span className="text-[10px] font-black text-[#001F3F]/40 uppercase tracking-[0.2em] mb-2">
                    Phase 0{index + 1}
                  </span>
                </div>

                <h3 className="text-2xl md:text-4xl font-bold text-[#001F3F] uppercase tracking-tight mb-4 group-hover:text-[#C5A059] transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-[#001F3F]/70 text-lg md:text-xl leading-relaxed font-medium max-w-2xl">
                  {item.desc}
                </p>

                {item.highlight && (
                  <div className="mt-8 inline-flex items-center gap-3 px-5 py-2 bg-[#001F3F] rounded-full shadow-lg shadow-[#001F3F]/20">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-[#FDFCF0] text-[10px] font-black uppercase tracking-widest">
                      Distinguished Alumnus
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .stroke-navy {
          -webkit-text-stroke: 1.5px #001F3F;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(20px); }
        }
        .animate-float {
          animation: float infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}