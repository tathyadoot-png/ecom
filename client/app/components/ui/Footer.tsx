"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import sociyo from "@/public/sociyo.png";
import { useLanguage } from "@/app/context/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();

  const navLinks = [
    { name: lang === 'hi' ? "होम" : "Home", href: "#hero" },
    { name: lang === 'hi' ? "परिचय" : "About", href: "#about" },
    { name: lang === 'hi' ? "पहल" : "Initiatives", href: "#initiatives" },
    { name: lang === 'hi' ? "मीडिया" : "Media", href: "#media" },
    { name: lang === 'hi' ? "संपर्क" : "Contact", href: "#contact" },
  ];

  const socialLinks = ["Instagram", "LinkedIn", "Twitter", "Facebook"];

  return (
    <footer className="relative bg-[#FDFCF0] border-t border-[#001F3F]/10 pt-20 pb-10 overflow-hidden">
      {/* Background Subtle Text - Light Navy Opacity */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none whitespace-nowrap">
        <span className="text-[12vw] font-black uppercase italic text-[#001F3F]">
          Vikalp Singh
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* 1. Brand Section */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-3xl font-black text-[#001F3F] italic uppercase">
              Vikalp <span className="text-[#001F3F] underline decoration-1 underline-offset-8 decoration-[#001F3F]/30">Singh</span>
            </h2>
            <p className="text-[#001F3F]/60 text-sm max-w-sm leading-relaxed font-medium">
              {lang === 'hi' 
                ? "अखंडता के साथ वकालत और जुनून के साथ प्रतिस्पर्धा। कानूनी न्यायशास्त्र और नेतृत्व के बीच की दूरी को पाटना।"
                : "Advocating with integrity and competing with passion. Bridging the gap between legal jurisprudence and leadership."}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link 
                  key={social} 
                  href="#" 
                  className="text-[10px] font-black uppercase text-[#001F3F]/40 hover:text-[#001F3F] transition-colors tracking-widest"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Navigation Section */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-[#001F3F] font-black text-sm uppercase tracking-widest">
              {lang === 'hi' ? "नेविगेशन" : "Navigation"}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-[#001F3F]/50 hover:text-[#001F3F] text-sm font-bold transition-all flex items-center group"
                  >
                    <ArrowUpRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all text-[#001F3F]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Section */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-[#001F3F] font-black text-sm uppercase tracking-widest">
              {lang === 'hi' ? "संपर्क करें" : "Get In Touch"}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-white border border-[#001F3F]/10 group-hover:border-[#001F3F]/30 transition-colors shadow-sm">
                  <Mail className="w-4 h-4 text-[#001F3F]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#001F3F]/40 font-black uppercase tracking-tighter">Email</p>
                  <p className="text-sm text-[#001F3F] font-bold">office@vikalpsingh.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-white border border-[#001F3F]/10 group-hover:border-[#001F3F]/30 transition-colors shadow-sm">
                  <MapPin className="w-4 h-4 text-[#001F3F]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#001F3F]/40 font-black uppercase tracking-tighter">Location</p>
                  <p className="text-sm text-[#001F3F] font-bold">Satna, Madhya Pradesh</p>
                  <p className="text-sm text-[#001F3F] font-bold">New Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 border-t border-[#001F3F]/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-[#001F3F]/40 text-[10px] font-bold uppercase tracking-[0.2em]">
              © {currentYear} ALL RIGHTS RESERVED |
            </p>
            <Link 
              href="https://thesociyo.com" 
              target="_blank" 
              className="opacity-95 hover:opacity-100 transition-opacity flex items-center gap-2"
            >
              <span className="text-[9px] font-black uppercase text-[#001F3F]">Designed by</span>
              <Image 
                src={sociyo} 
                alt="The Sociyo" 
                width={80} 
                height={24} 
                className="object-contain rounded bg-[#001f3f]"
              />
            </Link>
          </div>
          
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;