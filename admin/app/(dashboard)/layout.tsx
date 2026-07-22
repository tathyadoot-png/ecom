"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import ProtectedRoute from "@/components/protected-route";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">

        <Sidebar isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

        {/* Mobile-only top bar — the sidebar is off-canvas by default
            below lg, opened via this hamburger button. */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-card px-4 lg:hidden">
          <button
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-secondary"
          >
            <Menu size={18} />
          </button>
          <span className="text-sm font-semibold">Indian Artisan Marketplace</span>
        </header>

        {/* Sidebar is `fixed`, so it's out of normal flow — lg:ml-64
            reserves its width instead of relying on flex layout. Below
            lg the sidebar is off-canvas, so no margin is needed.
            No overflow-x-hidden here: per spec, setting overflow-x to
            anything but `visible` forces overflow-y to compute as
            `auto` (even if written as `visible`), which would make
            this non-scrolling element the sticky containing block
            instead of the real document viewport, breaking every
            sticky descendant (the sidebar, section navs, etc). */}
        <main className="px-4 py-6 sm:px-6 sm:py-8 lg:ml-64 lg:px-10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>

      </div>
    </ProtectedRoute>
  );
}
