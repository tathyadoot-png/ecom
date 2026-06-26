"use client";

import HeaderTop from "./HeaderTop";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import HeaderActions from "./HeaderActions";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <>
      {/* Green Bar */}
      <HeaderTop />

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-[#F8EEDC]/95 backdrop-blur-md border-b border-[#E7D7B8]">
        {/* Removed overflow restrictions to let mobile navigation drawer expand correctly */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 lg:h-24 flex items-center justify-between gap-4">
          <Logo />
          <DesktopNav />
          <div className="flex items-center gap-2 sm:gap-3 ml-auto lg:ml-0">
            <HeaderActions />
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}