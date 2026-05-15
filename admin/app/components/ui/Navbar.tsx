"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import logo from "@/public/VS_Logo.png";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

const navItems = [
  { id: "hero", label: { en: "Home", hi: "मुखपृष्ठ" } },
  { id: "about", label: { en: "About", hi: "परिचय" } },
  { id: "education", label: { en: "Education", hi: "शिक्षा" } },
  { id: "publicimpact", label: { en: "Public Impact", hi: "जन प्रभाव" } },
  { id: "leadership", label: { en: "Leadership", hi: "नेतृत्व" } },
  { id: "legal", label: { en: "Legal", hi: "विधिक" } },
  { id: "sports", label: { en: "Sports", hi: "खेल" } },
  { id: "media", label: { en: "Media", hi: "मीडिया" } },
  { id: "contact", label: { en: "Contact", hi: "संपर्क" } },
];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? "py-2 md:py-3" : "py-2 md:py-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div
          className={`relative flex items-center justify-between px-4 md:px-8 py-2 md:py-2 transition-all duration-500 rounded-full border shadow-lg ${
            isScrolled || mobileMenuOpen
              ? "bg-[#001F3F] border-white/10" 
              : "bg-white/40 backdrop-blur-md border-[#001F3F]/10"
          }`}
        >
          {/* LOGO */}
          <Link href="#hero" className="z-[110] relative flex items-center">
            <div className={`relative transition-all duration-500 ease-in-out ${isScrolled ? "w-10 md:w-16" : "w-12 md:w-20"}`}>
              <Image 
                src={logo} 
                alt="Vikalp Singh" 
                width={120} 
                height={40} 
                className={`object-contain transition-all duration-500 ${isScrolled || mobileMenuOpen ? "brightness-0 invert" : "brightness-100"}`}
                priority
              />
            </div>
          </Link> 

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-4 py-2 text-[11px] font-black uppercase transition-all group ${
                  isScrolled ? "text-white/70 hover:text-white" : "text-[#001F3F]/70 hover:text-[#001F3F]"
                }`}
              >
                <span className="relative z-10">{item.label[lang as "en" | "hi"]}</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C5A059] transition-all group-hover:w-6" />
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 z-[110]">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className={`flex items-center gap-2 px-3 md:px-5 py-2 border rounded-full transition-all group ${
                isScrolled || mobileMenuOpen
                  ? "bg-white/10 border-white/20 hover:bg-white/20 text-white" 
                  : "bg-[#001F3F]/5 border-[#001F3F]/10 hover:bg-[#001F3F]/20 text-[#001F3F]"
              }`}
            >
              <Globe className={`w-3 h-3 md:w-4 md:h-4 ${isScrolled || mobileMenuOpen ? "text-[#C5A059]" : "text-[#001F3F]"}`} />
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-wider">
                {lang === "en" ? "हिन्दी" : "EN"}
              </span>
            </button>

            {/* Toggle Button */}
            <button
              className={`lg:hidden p-2 rounded-full transition-colors ${
                isScrolled || mobileMenuOpen ? "bg-white/10 text-white" : "bg-[#001F3F]/5 text-[#001F3F]"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-[#001F3F] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] flex flex-col items-center justify-center ${
          mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {/* Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none w-full text-center">
           <h2 className="text-[20vw] font-black text-white uppercase leading-none italic">VIKALP</h2>
        </div>

        <nav className="relative z-10 flex flex-col items-center space-y-4 md:space-y-6">
          {navItems.map((item, idx) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="group flex flex-col items-center"
            >
              <span className="text-[10px] font-bold text-[#C5A059] mb-1 tracking-[0.3em]">0{idx + 1}</span>
              <span className="text-3xl md:text-5xl font-black uppercase text-white/40 group-hover:text-[#FDFCF0] group-hover:scale-110 transition-all duration-300">
                {item.label[lang as "en" | "hi"]}
              </span>
            </Link>
          ))}
        </nav>

      
      </div>
    </header>
  );
}