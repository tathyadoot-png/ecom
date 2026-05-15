"use client";

import React, { useRef, useEffect } from "react";
import { contactData } from "@/app/data/contact";
import { useLanguage } from "@/app/context/LanguageContext";
import SectionHeader from "../ui/SectionHeader";
import {
  Phone,
  Mail,
  Globe,
  Send,
  Shield,
  Users,
  Handshake,
} from "lucide-react";
import {
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa6";
import gsap from "@/app/lib/gsap";

const Contact = () => {
  const { lang } = useLanguage();
  const data = contactData[lang as keyof typeof contactData];
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll(".magnetic-item");

      cards.forEach((card: any) => {
        const moveItem = (e: any) => {
          if (window.innerWidth < 768) return;

          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(card, {
            x: x * 0.15,
            y: y * 0.15,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const resetItem = () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1,0.3)",
          });
        };

        card.addEventListener("mousemove", moveItem);
        card.addEventListener("mouseleave", resetItem);
      });

      gsap.fromTo(
        ".reveal-up",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.1,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  const socialIcons = [
    FaLinkedinIn,
    FaTwitter,
    FaInstagram,
    FaFacebookF,
  ];

  const optionIcons = [Shield, Users, Handshake];

  return (
    <section
      ref={containerRef}
      id="contact"
      className="bg-[#FDFCF0] py-16 md:py-24 lg:py-40 overflow-hidden border-t border-[#001F3F]/5 px-4 sm:px-5 md:px-6"
    >
      <SectionHeader
        title={data.title}
        subtitle="Strategic Engagement"
      />

      <div className="container mx-auto w-[98%] lg:w-[92%]">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">

          {/* LEFT INFO */}
          <div className="reveal-up lg:col-span-4 space-y-10 md:space-y-14">

            {/* CONTACT INFO */}
            <div className="space-y-6 md:space-y-8">
              {[
                {
                  label: "Call Directly",
                  val: data.phone,
                  icon: Phone,
                },
                {
                  label: "Official Email",
                  val: data.email,
                  icon: Mail,
                },
                {
                  label: "Digital Presence",
                  val: data.website,
                  icon: Globe,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 md:gap-6 group"
                >
                  <div className="mt-1 p-3 rounded-full bg-[#001F3F]/5 text-[#001F3F] group-hover:bg-[#001F3F] group-hover:text-white transition-all duration-300">
                    <item.icon size={16} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#001F3F]/30 mb-1">
                      {item.label}
                    </p>

                    <p className="text-sm sm:text-base md:text-xl font-bold text-[#001F3F] break-all">
                      {item.val}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* SOCIAL */}
            <div className="pt-8 md:pt-10 border-t border-[#001F3F]/5">
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#001F3F]/30 mb-5">
                Social Ecosystem
              </p>

              <div className="flex flex-wrap gap-3">
                {socialIcons.map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="magnetic-item w-11 h-11 md:w-14 md:h-14 rounded-full border border-[#001F3F]/10 flex items-center justify-center text-[#001F3F] hover:bg-[#001F3F] hover:text-white transition-all duration-500"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="reveal-up lg:col-span-8">
            <div className="bg-white p-5 sm:p-7 md:p-10 lg:p-12 rounded-[2rem] md:rounded-[3rem] lg:rounded-[4rem] shadow-2xl shadow-[#001F3F]/5 border border-[#001F3F]/5">

              <form className="space-y-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                  <div className="relative border-b border-[#001F3F]/10 py-3 md:py-4 focus-within:border-[#001F3F] transition-all">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#001F3F]">
                      Full Name
                    </label>

                    <input
                      type="text"
                      required
                      className="w-full bg-transparent outline-none py-2 text-lg md:text-xl font-bold text-[#001F3F]"
                    />
                  </div>

                  <div className="relative border-b border-[#001F3F]/10 py-3 md:py-4 focus-within:border-[#001F3F] transition-all">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#001F3F]">
                      Email Address
                    </label>

                    <input
                      type="email"
                      required
                      className="w-full bg-transparent outline-none py-2 text-lg md:text-xl font-bold text-[#001F3F]"
                    />
                  </div>
                </div>

                <div className="relative border-b border-[#001F3F]/10 py-3 md:py-4 focus-within:border-[#001F3F] transition-all">
                  <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#001F3F]">
                    Brief Message
                  </label>

                  <textarea
                    rows={3}
                    required
                    className="w-full bg-transparent outline-none py-2 text-lg md:text-xl font-bold text-[#001F3F] resize-none"
                  />
                </div>

                {/* BUTTON */}
                <button className="group flex items-center gap-4 md:gap-8 w-full md:w-auto pt-3">

                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#001F3F] text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-xl shadow-[#001F3F]/20">
                    <Send
                      size={20}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </div>

                  <div className="text-left">
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#001F3F]/30">
                      Finalize
                    </p>

                    <span className="text-lg md:text-2xl font-black uppercase italic tracking-tighter text-[#001F3F]">
                      Transmit
                    </span>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* HEADING */}
        <h2 className="reveal-up text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-black uppercase tracking-[-0.05em] text-[#001F3F] leading-[0.85] mt-16 md:mt-24 mb-8 md:mb-10">
          Start the{" "}
          <span className="italic font-light opacity-40">
            Dialogue.
          </span>
        </h2>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mt-4 relative z-10">

          {data.options.map((option, idx) => {
            const Icon = optionIcons[idx];

            return (
              <div
                key={idx}
                className="reveal-up group p-6 sm:p-7 md:p-10 bg-white border border-[#001F3F]/5 rounded-[2rem] md:rounded-[2.5rem] hover:bg-[#001F3F] transition-all duration-700 md:hover:-translate-y-2"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#001F3F]/5 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-white/10 transition-colors">
                  <Icon
                    size={22}
                    className="text-[#001F3F] group-hover:text-white"
                  />
                </div>

                <h4 className="text-xl md:text-2xl font-bold text-[#001F3F] group-hover:text-white mb-3 md:mb-4 leading-tight">
                  {option.title}
                </h4>

                <p className="text-sm md:text-base text-[#001F3F]/50 group-hover:text-white/60 font-medium leading-relaxed">
                  {option.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;