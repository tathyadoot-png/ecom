"use client";
import { useRef, useLayoutEffect } from "react"; // useLayoutEffect is better for GSAP
import { sportsData } from "@/app/data/sports";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../ui/SectionHeader";
import { Trophy, Target, Activity, Rocket, Medal } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const icons = [Trophy, Target, Activity, Rocket, Medal];

export default function Sports() {
  const { lang } = useLanguage();
  const data = sportsData[lang as keyof typeof sportsData];
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current || !data) return;

    const section = sectionRef.current;
    const container = containerRef.current;

    const ctx = gsap.context(() => {
      // 1. Force calculating width properly
      const scrollWidth = container.scrollWidth;
      
      gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${container.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          // 2. Refresh logic on redirection
          onRefresh: (self) => {
             // Ensures alignment stays perfect after jump
             if (self.progress > 0) self.scroll(self.start + self.progress * (self.end - self.start));
          }
        }
      });
    }, sectionRef);

    // 3. THE FIX: Double refresh after page jump
    const refreshUI = () => {
        ScrollTrigger.refresh();
    };

    window.addEventListener('load', refreshUI);
    const timer1 = setTimeout(refreshUI, 100); 
    const timer2 = setTimeout(refreshUI, 1000); // Back-up refresh

    return () => {
      ctx.revert();
      window.removeEventListener('load', refreshUI);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [lang, data]);

  if (!data) return null;

  return (
    <section 
      id="sports"
      ref={sectionRef} 
      className="relative min-h-screen bg-[#fcfcf0] overflow-hidden flex flex-col"
    >
      <div className="pt-24 px-8 relative z-30">
        <SectionHeader title={data.title} subtitle="Athletic Prowess & Leadership" />
      </div>

      <div className="flex-grow flex items-center relative z-20">
        <div 
          ref={containerRef} 
          className="flex flex-nowrap gap-12 px-10 md:px-32 items-center"
          style={{ width: "max-content" }} // Force container to respect children width
        >
          {data.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div 
                key={index}
                className="sports-card-inner relative w-[350px] md:w-[500px] flex-shrink-0"
              >
                {/* Image #6 inspired Premium Bento Card */}
                <div className="bg-white border-l-[8px] border-[#001F3F] rounded-r-[3rem] rounded-l-[1rem] p-12 md:h-[400px] h-[300px] flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                  
                  {/* Number Background */}
                  <span className="absolute -top-10 right-5 text-[9rem] font-black text-[#001F3F]/[0.14] italic">
                    0{index + 1}
                  </span>

                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-[#001F3F] rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-[#001F3F]/20 group-hover:rotate-[10deg] transition-transform">
                      <Icon className="text-white w-10 h-10" />
                    </div>
                    <h3 className="text-xl md:text-3xl  font-black text-[#001F3F] uppercase italic leading-[1] tracking-tighter">
                      {item}
                    </h3>
                  </div>

                  <div className="mt-auto relative z-10">
                    <div className="h-1 w-full bg-[#001F3F]/5 overflow-hidden rounded-full">
                      <div className="h-full bg-[#001F3F] w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                    </div>
                    <p className="text-[11px] font-black text-[#001F3F]/40 uppercase mt-4 tracking-[0.3em]">
                      Achievement Detail
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="w-[20vw] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}