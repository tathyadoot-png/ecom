"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setLang(lang === "en" ? "hi" : "en")}
        className="px-4 py-2 rounded-full border border-white/20 
                   bg-white/10 backdrop-blur-md 
                   text-sm font-semibold 
                   hover:bg-white hover:text-black 
                   transition-all duration-300 shadow-lg"
      >
        {lang === "en" ? "हिंदी" : "English"}
      </button>
    </div>
  );
}