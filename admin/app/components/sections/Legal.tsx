"use client";
import { useRef, useEffect, useState } from "react";
import { 
  Shield, Gavel, Briefcase, FileText, ArrowUpRight, 
  Plus, Zap, Trophy, Landmark, Scale 
} from "lucide-react";
import { legalData } from "@/app/data/legal";
import { useLanguage } from "@/app/context/LanguageContext";
import SectionHeader from "../ui/SectionHeader";
import gsap from "@/app/lib/gsap";

export default function Legal() {
  const { lang } = useLanguage();
  const currentLang = lang === 'hi' ? 'hi' : 'en';
  const data = legalData[currentLang];
  
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    const ctx = gsap.context(() => {
      gsap.set(".reveal-up", { opacity: 0, y: 40 });

      gsap.to(".reveal-up", {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  if (!data || !data.sections || !data.policy) {
    return (
      <div className="py-20 flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse font-black text-[#001F3F] uppercase tracking-widest">
          Loading Jurisprudence...
        </div>
      </div>
    );
  }

  return (
    <section ref={containerRef} id="legal" className="py-20 lg:py-32 bg-[#FDFCF0] relative overflow-hidden">
         <SectionHeader title={data.title} subtitle="Jurisprudence & Strategic Counsel" />
      {/* Background Architectural Element - Adjusted for mobile scale */}
      <div className="absolute left-[-10%] top-[5%] opacity-[0.02] select-none pointer-events-none">
        <Scale className="text-[#001F3F] w-[300px] h-[300px] lg:w-[600px] lg:h-[600px]" strokeWidth={1} />
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
      

        <div className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${isReady ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* 01. LITIGATION SECTION */}
            <div className="reveal-up lg:col-span-8 bg-white border border-[#001F3F]/10 rounded-[2.5rem] lg:rounded-[3.5rem] p-8 lg:p-16 shadow-sm group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-10 lg:left-16 w-20 lg:w-32 h-1 bg-[#001F3F] rounded-full opacity-20" />
              
              <div>
                <div className="flex justify-between items-start mb-8 lg:mb-12">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#001F3F] rounded-[1.5rem] lg:rounded-[2rem] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <Gavel className="text-white" size={28} />
                  </div>
                  <span className="text-[9px] lg:text-[10px] font-black tracking-[0.4em] text-[#001F3F]/30 uppercase mt-4">Section 01</span>
                </div>

                <h3 className="text-5xl md:text-7xl lg:text-[7.5rem] font-black text-[#001F3F] uppercase leading-[0.85] lg:leading-[0.8] tracking-tighter mb-4 italic">
                  {data.sections[0]?.title || "Litigation"}
                </h3>
                <p className="text-[#001F3F]/50 text-[10px] lg:text-sm font-bold uppercase tracking-[0.2em] lg:tracking-widest ml-1 mb-8 lg:mb-12">
                  High-Stakes Representation
                </p>
              </div>

              {/* Compact Grid for Mobile Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {data.sections[0]?.items.map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-3 p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] bg-[#FDFCF0] border border-[#001F3F]/5 group/item hover:bg-[#001F3F] transition-all duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#001F3F] group-hover/item:bg-white flex-shrink-0" />
                    <span className="text-[10px] lg:text-[11px] font-black uppercase leading-tight text-[#001F3F] group-hover/item:text-white">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 02. ADVISORY SECTION */}
            <div className="reveal-up lg:col-span-4 bg-[#001F3F] text-[#FDFCF0] rounded-[2.5rem] lg:rounded-[3.5rem] p-8 lg:p-14 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
              <Briefcase size={180} className="absolute -right-12 -top-12 opacity-10 group-hover:scale-110 transition-transform duration-700 hidden lg:block" />
              
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-black uppercase italic mb-8 lg:mb-10 tracking-tight flex items-center gap-4">
                  <div className="w-6 lg:w-8 h-[2px] bg-white/30" />
                  {data.sections[1]?.title || "Advisory"}
                </h3>
                
                <div className="space-y-4 lg:space-y-6">
                  {data.sections[1]?.items.map((item, i) => (
                    <div key={i} className="group/adv">
                      <p className="text-sm lg:text-lg font-medium opacity-70 group-hover/adv:opacity-100 group-hover/adv:translate-x-2 transition-all duration-300 flex items-start gap-3">
                        <span className="text-white/20 text-xs mt-1">0{i+1}</span>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 lg:mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[9px] lg:text-[10px] font-black tracking-widest uppercase opacity-40">Consultancy Status</p>
                  <p className="text-xs font-bold text-white">Certified Lead Counsel</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#001F3F] transition-all">
                  <Landmark size={18} />
                </div>
              </div>
            </div>

            {/* 03. POLICY GRID */}
            <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-4">
              {data.policy.items.map((p, i) => (
                <div 
                  key={i} 
                  className="reveal-up group relative bg-white border border-[#001F3F]/10 rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-10 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[#001F3F] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10 lg:mb-14">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#FDFCF0] text-[#001F3F] border border-[#001F3F]/10 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-white/10 group-hover:text-white group-hover:border-transparent transition-all">
                        {i === 0 ? <Zap size={20} /> : i === 1 ? <Trophy size={20} /> : <FileText size={20} />}
                      </div>
                      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-[#001F3F]/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                        <ArrowUpRight className="text-[#001F3F] group-hover:text-white" size={18} />
                      </div>
                    </div>
                    
                    <h4 className="text-xl lg:text-2xl font-black text-[#001F3F] group-hover:text-white uppercase tracking-tighter mb-3 lg:mb-4 leading-none">
                      {p.title}
                    </h4>
                    <p className="text-[13px] lg:text-sm text-[#001F3F]/60 group-hover:text-white/70 font-medium leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}