"use client";
import { useRef, useLayoutEffect } from "react";
import { Users, GraduationCap, Trophy, Heart, ArrowUpRight, Zap, Globe } from "lucide-react";
import { publicImpactData } from "@/app/data/publicImpact";
import { useLanguage } from "@/app/context/LanguageContext";
import gsap from "@/app/lib/gsap";
import SectionHeader from "../ui/SectionHeader";

export default function PublicImpact() {
  const { lang } = useLanguage();
  const currentLang = lang === 'hi' ? 'hi' : 'en';
  const data = publicImpactData[currentLang];
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".impact-node", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  if (!data) return null;

  const icons = [<Zap size={18} />, <Users size={18} />, <Trophy size={18} />, <Heart size={18} />, <Globe size={18} />];

  return (
    <section  id="publicimpact" className="w-full bg-[#FDFCF0] py-24 px-[6vw]">
            <SectionHeader title={data.title} subtitle="Social Metrics" />
      <div className="max-w-full mx-auto flex flex-col gap-10">
        
        {/* Clean Editorial Header */}
        

        {/* The Corrected Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Main Card - Takes 7/12 width */}
          <div className="impact-node md:col-span-7 bg-[#001F3F] rounded-[2.5rem] p-10 text-white flex flex-col justify-between min-h-[420px] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 mb-8">
                {icons[4]}
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">{data.items[3].title}</h3>
              <p className="text-3xl md:text-4xl font-black tracking-tighter leading-none">{data.items[3].numbers}</p>
            </div>
            <div className="relative z-10 mt-10">
              <p className="text-xl font-medium leading-snug italic opacity-90 max-w-md">"{data.items[3].impact}"</p>
              <div className="mt-6 flex gap-2">
                <span className="text-[9px] px-3 py-1 bg-white/5 rounded-full border border-white/10 uppercase font-black tracking-tighter">Community</span>
                <span className="text-[9px] px-3 py-1 bg-white/5 rounded-full border border-white/10 uppercase font-black tracking-tighter">Impact</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.03] rounded-full -mr-32 -mt-32 group-hover:bg-white/[0.05] transition-all duration-700" />
          </div>

          {/* Right Column Stack - Takes 5/12 width */}
          <div className="md:col-span-5 grid grid-cols-1 gap-5">
            {[0, 1].map((idx) => (
              <div key={idx} className="impact-node bg-white border border-[#001F3F]/5 rounded-[2rem] p-8 flex flex-col justify-between hover:shadow-xl hover:border-[#001F3F]/10 transition-all duration-500 group">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-[#FDFCF0] rounded-xl text-[#001F3F] group-hover:bg-[#001F3F] group-hover:text-white transition-colors">
                    {icons[idx]}
                  </div>
                  <p className="text-3xl font-black text-[#001F3F] tracking-tighter leading-none">{data.items[idx].numbers}</p>
                </div>
                <div className="mt-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#001F3F] mb-1">{data.items[idx].title}</h4>
                  <p className="text-[11px] text-[#001F3F]/40 font-bold italic line-clamp-1">"{data.items[idx].impact}"</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row - Dynamic Split */}
          <div className="impact-node md:col-span-5 bg-white border border-[#001F3F]/5 rounded-[2.5rem] p-8 flex items-center gap-6 group hover:shadow-lg transition-all">
            <div className="w-14 h-14 bg-[#001F3F] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
              <Trophy size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-black text-[#001F3F] uppercase tracking-tighter leading-none mb-1">{data.items[2].title}</h4>
              <p className="text-[10px] text-[#001F3F]/40 font-bold tracking-widest uppercase">{data.items[2].numbers}</p>
            </div>
            <ArrowUpRight size={18} className="text-[#001F3F]/20 group-hover:text-[#001F3F] transition-colors" />
          </div>

          <div className="impact-node md:col-span-7 bg-white/40 border border-dashed border-[#001F3F]/10 rounded-[2.5rem] p-8 flex items-center justify-between group hover:bg-white transition-all">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#001F3F] shrink-0 shadow-sm">
                <Heart size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#001F3F]/70 uppercase tracking-widest italic mb-1">"{data.items[4].impact}"</p>
                <p className="text-[10px] font-black text-[#001F3F] opacity-30 uppercase tracking-[0.2em]">{data.items[4].numbers}</p>
              </div>
            </div>
            <div className="hidden lg:flex px-6 py-3 bg-[#001F3F] text-white rounded-full items-center gap-2 scale-90 hover:scale-100 transition-transform cursor-pointer">
              <span className="text-[10px] font-black uppercase tracking-widest">Full Report</span>
              <ArrowUpRight size={14} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}