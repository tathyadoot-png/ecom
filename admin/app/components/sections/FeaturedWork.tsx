"use client";
import { useRef, useLayoutEffect } from "react";
import { ArrowUpRight, Briefcase, Users, Trophy, HandHeart } from "lucide-react";
import { featuredWorkData } from "@/app/data/featuredWork";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";

export default function FeaturedWork() {
  const { lang } = useLanguage();
  const currentLang = lang === 'hi' ? 'hi' : 'en';
  // Direct data access with fallback
  const content = featuredWorkData[currentLang] || featuredWorkData.en;
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Ensuring visibility first, then animating
      gsap.set(".work-card", { opacity: 0, y: 30 });
      
      gsap.to(".work-card", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [currentLang]);

  if (!content || !content.items) return null;

  const icons = [
    <Briefcase size={22} />, 
    <Users size={22} />, 
    <Trophy size={22} />, 
    <HandHeart size={22} />
  ];

  return (
    <section ref={containerRef} id="work" className="w-full bg-[#FDFCF0] py-20 px-[6vw] relative border-t border-[#001F3F]/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - Matches image_edba37.png */}
        <div className="flex flex-col gap-4 mb-16 max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-10 bg-[#001F3F]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#001F3F]/40">
              {currentLang === 'hi' ? "पोर्टफोलियो" : "Portfolio"}
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-[900] text-[#001F3F] tracking-tighter uppercase italic leading-[0.9]">
            {content.title}
          </h2>
          <p className="text-lg md:text-xl font-bold text-[#001F3F]/60 italic leading-snug">
            {content.intro}
          </p>
        </div>

        {/* Clean 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {content.items.map((item, idx) => (
            <div 
              key={idx} 
              className="work-card bg-white border border-[#001F3F]/10 rounded-[2rem] p-8 lg:p-10 flex flex-col justify-between hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="w-14 h-14 bg-[#001F3F] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  {icons[idx % icons.length]}
                </div>
                <div className="w-10 h-10 rounded-full border border-[#001F3F]/10 flex items-center justify-center text-[#001F3F]/20 group-hover:text-[#001F3F] transition-colors">
                  <ArrowUpRight size={20} />
                </div>
              </div>

              {/* Card Body */}
              <div className="relative z-10">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#001F3F]/40 mb-3 block">
                  {item.tag}
                </span>
                <h3 className="text-2xl lg:text-3xl font-[900] text-[#001F3F] tracking-tighter uppercase italic mb-4 leading-none">
                  {item.title}
                </h3>
                <p className="text-sm font-bold text-[#001F3F]/50 leading-relaxed italic">
                  "{item.desc}"
                </p>
              </div>

              {/* Subtle Decorative Number */}
              <span className="absolute bottom-6 right-8 text-8xl font-black text-[#001F3F]/[0.03] select-none pointer-events-none group-hover:text-[#001F3F]/[0.05] transition-colors">
                {idx + 1}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}