"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / height) * 100;

      setProgress(scrolled);
      setShow(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG parameters for responsiveness
  const radius = 28;
  const circumference = 2 * Math.PI * radius; // Approx 176

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          // Mobile responsive positioning and size
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] cursor-pointer touch-none"
        >
          <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center group">
            
            {/* 1. Outer Glow */}
            <div className="absolute inset-0 bg-[#001F3F]/5 rounded-full blur-lg md:blur-xl group-hover:bg-[#001F3F]/10 transition-all duration-500" />

            {/* 2. Responsive SVG Progress Ring */}
            <svg 
              viewBox="0 0 64 64" // ViewBox ensures the SVG scales perfectly
              className="w-full h-full rotate-[-90deg] drop-shadow-lg"
            >
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="#001F3F"
                strokeWidth="2"
                fill="transparent"
                className="opacity-10"
              />
              <motion.circle
                cx="32"
                cy="32"
                r={radius}
                stroke="#001F3F" 
                strokeWidth="3"
                fill="transparent"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                strokeLinecap="round"
              />
            </svg>

            {/* 3. Central Icon & Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Progress Text - Hidden on mobile unless hovered, show small on desktop */}
              <span className="hidden md:block text-[8px] font-black text-[#001F3F]/40 mb-[-2px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                {Math.round(progress)}%
              </span>
              
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowUp className="w-4 h-4 md:w-5 md:h-5 text-[#001F3F] transition-transform duration-300 group-hover:scale-110" />
              </motion.div>
            </div>

            {/* 4. Glassmorphism Background */}
            <div className="absolute inset-1.5 md:inset-2 bg-white/90 backdrop-blur-md rounded-full -z-10 border border-[#001F3F]/10 group-hover:bg-[#FDFCF0] transition-all shadow-sm" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}