"use client";
import { useRef, useEffect, useMemo } from "react";
import { pillarsData } from "@/app/data/pillars";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import { Scale, Landmark, Sprout } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

export default function Pillars() {
  const { lang } = useLanguage();
  
  // Memoize data to prevent unnecessary re-renders
  const data = useMemo(() => {
    return pillarsData[lang as keyof typeof pillarsData];
  }, [lang]);

  const containerRef = useRef(null);

  const icons = [
    <Scale key="legal" size={36} strokeWidth={1.2} />,
    <Landmark key="policy" size={36} strokeWidth={1.2} />,
    <Sprout key="impact" size={36} strokeWidth={1.2} />,
  ];

  useEffect(() => {
    if (!data) return;

    const ctx = gsap.context(() => {
      gsap.from(".pillar-card", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pillars-grid",
          start: "top 85%",
          // markers: true, // Debugging ke liye isse on karke dekh sakte ho
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [data]); // Depend on data load

  // Agar data load nahi hua toh blank screen ki jagah loading ya error handle karein
  if (!data || !data.items) {
    console.log("Pillars Data not found for lang:", lang);
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <section ref={containerRef} id="pillars" className="relative bg-[#FDFCF0] py-28 md:py-40 overflow-hidden">
      <div className="mb-24 md:mb-32">
        <SectionHeader 
          title={data.title} 
          subtitle={lang === 'en' ? 'Identity Structure' : 'विरासत का निर्माण'}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="pillars-grid grid md:grid-cols-3 gap-8 lg:gap-12">
          {data.items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="pillar-card group relative p-12 lg:p-14 bg-white/50 backdrop-blur-md border border-[#001F3F]/10 rounded-[2.5rem] hover:bg-white hover:shadow-[0_50px_120px_-30px_rgba(0,31,63,0.18)] hover:-translate-y-4 transition-all duration-700 flex flex-col items-start"
            >
              <div className="mb-12 p-6 rounded-3xl bg-[#001F3F]/5 text-[#001F3F] group-hover:bg-[#001F3F] group-hover:text-[#FDFCF0] group-hover:rotate-[360deg] transition-all duration-1000 ease-in-out">
                {icons[idx]}
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-[#001F3F] uppercase mb-5 leading-none">
                {item.title}
              </h3>
              <p className="text-[#001F3F]/70 text-base font-medium leading-relaxed max-w-sm">
                {item.desc}
              </p>

              <span className="absolute bottom-12 right-12 text-7xl font-black text-[#001F3F]/5 italic group-hover:text-[#001F3F]/10 transition-colors">
                0{idx + 1}
              </span>
              
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#001F3F] transition-all duration-700 group-hover:w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}