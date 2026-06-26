"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const nav = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/products" },
  { title: "Collections", href: "/collections" },
  { title: "Artisans", href: "/artisans" },
  { title: "Stories", href: "/stories" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Trigger Button */}
      <button
        onClick={toggleMenu}
        className="
          lg:hidden
          w-10
          h-10
          sm:w-11
          sm:h-11
          rounded-full
          border
          border-[#D8C5A4]
          bg-[#FFF7EB]
          flex
          items-center
          justify-center
          text-[#1E2A5E]
          hover:bg-[#F8E9C9]
          active:scale-95
          transition-all
          duration-200
          z-[101]
          relative
        "
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] lg:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`
          fixed top-0 right-0 h-screen w-[280px] sm:w-[320px] 
          bg-[#F8EEDC] border-l border-[#E7D7B8] p-6 pt-24
          shadow-2xl z-[100] lg:hidden transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <nav className="flex flex-col gap-6">
          {nav.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={toggleMenu}
              className="text-lg font-semibold text-[#241A11] hover:text-[#C96D1F] transition-colors duration-200"
            >
              {item.title}
            </Link>
          ))}
          
          <hr className="border-[#E7D7B8] my-2" />
          
          {/* Mobile Auth Actions */}
          <div className="flex flex-col gap-3 md:hidden">
            <Link
              href="/login"
              onClick={toggleMenu}
              className="flex h-11 items-center justify-center rounded-full border border-[#241A11]/20 font-medium text-[#241A11] hover:bg-[#FFF7EB] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={toggleMenu}
              className="flex h-11 items-center justify-center rounded-full bg-[#083B27] text-[#F8E9C9] font-medium hover:opacity-90 transition-opacity"
            >
              Register
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}