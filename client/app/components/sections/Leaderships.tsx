"use client";
import { ShieldCheck, Flag, Users, GraduationCap, Network, Globe } from "lucide-react";
import { leadershipData } from "@/app/data/leadership";
import { useLanguage } from "@/app/context/LanguageContext";
import SectionHeader from "@/app/components/ui/SectionHeader"; // Path check kar lena bhai

export default function LeadershipSection() {
  const { lang } = useLanguage();
  const currentLang = lang === 'hi' ? 'hi' : 'en';
  const content = leadershipData[currentLang];

  if (!content) return null;

  const icons = [
    <ShieldCheck size={24} />, <Flag size={24} />, 
    <Users size={24} />, <GraduationCap size={24} />, 
    <Network size={24} />, <Globe size={24} />
  ];

  return (
    <section id="leadership" className="w-full bg-[#FDFCF0] py-20 px-[5vw] border-t border-[#001F3F]/5 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto">
        
        {/* Your Premium SectionHeader Component */}
        <SectionHeader 
          title={content.title} 
          subtitle="Leadership & Development" 
        />

        {/* Intro Description directly below header */}
        <div className="mt-10 mb-16 max-w-4xl">
           <p className="text-xl md:text-3xl font-bold text-justify text-[#001F3F]/70 leading-[1.2] italic border-l-4 border-[#001F3F]/10 pl-8">
             {content.intro}
           </p>
        </div>

        {/* Full Width Grid - 3 Columns on Large Screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((item, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col justify-between p-8 bg-white border border-[#001F3F]/5 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="space-y-8">
                {/* Icon Box matches your V-Box style */}
                <div className="w-14 h-14 relative flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-[#001F3F] rotate-45 rounded-lg opacity-10 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 text-[#001F3F] group-hover:text-white transition-colors">
                    {icons[idx % icons.length]}
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-[#001F3F]  uppercase italic ">
                  {item}
                </h3>
              </div>
              
              <div className="mt-10 flex items-center gap-4">
                <span className="text-[10px] font-black text-[#001F3F]/20 uppercase tracking-[0.4em]">
                  Item 0{idx + 1}
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#001F3F]/10 to-transparent" />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}