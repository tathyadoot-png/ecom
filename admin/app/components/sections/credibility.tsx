"use client";

import { motion } from "framer-motion";
import {
  Scale,
  Briefcase,
  Handshake,
  Trophy,
  Landmark,
} from "lucide-react";

import { credibilityData } from "@/app/data/credibility";
import { useLanguage } from "@/app/context/LanguageContext";

export default function CredibilityStrip() {
  const { lang } = useLanguage();

  const itemsList =
    credibilityData[lang as keyof typeof credibilityData].items;

  const icons = [
    <Scale key="1" className="w-4 h-4 md:w-5 md:h-5" />,
    <Briefcase key="2" className="w-4 h-4 md:w-5 md:h-5" />,
    <Handshake key="3" className="w-4 h-4 md:w-5 md:h-5" />,
    <Trophy key="4" className="w-4 h-4 md:w-5 md:h-5" />,
    <Landmark key="5" className="w-4 h-4 md:w-5 md:h-5" />,
  ];

  const renderItems = () =>
    itemsList.map((text, idx) => (
      <div
        key={idx}
        className="flex items-center gap-6 px-8 md:px-12 flex-shrink-0"
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#001F3F] text-[#FDFCF0] shadow-xl">
          {icons[idx % icons.length]}
        </div>

        {/* Text */}
        <span className="text-[#001F3F] font-black text-xs md:text-sm uppercase tracking-[0.3em] whitespace-nowrap">
          {text}
        </span>

        {/* Divider */}
        <div className="ml-12 md:ml-20 h-8 w-[2px] bg-[#001F3F]/10 rounded-full" />
      </div>
    ));

  return (
    <div className="relative w-full overflow-hidden bg-[#FDFCF0] border-y border-[#001F3F]/20 py-8 md:py-10 z-50">

      {/* Left Fade */}
      {/* <div className="absolute left-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-r from-[#FDFCF0] to-transparent pointer-events-none" /> */}

      {/* Right Fade */}
      {/* <div className="absolute right-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-l from-[#FDFCF0] to-transparent pointer-events-none" /> */}

      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 14,
          repeat: Infinity,
        }}
      >
        {/* Copy 1 */}
        <div className="flex items-center min-w-max">
          {renderItems()}
        </div>

        {/* Copy 2 */}
        <div className="flex items-center min-w-max">
          {renderItems()}
        </div>
      </motion.div>
    </div>
  );
}