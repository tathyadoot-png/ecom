"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ChevronRight, X } from "lucide-react";

import { ADMIN_SIDEBAR_ITEMS, VENDOR_SIDEBAR_ITEMS } from "@/constants/sidebar";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";
import api from "@/lib/axios";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();

  const isVendor = user?.role === "VENDOR";
  const sidebarItems = isVendor ? VENDOR_SIDEBAR_ITEMS : ADMIN_SIDEBAR_ITEMS;

  // Auto-close the mobile drawer on navigation — otherwise it stays
  // open over the newly-loaded page.
  useEffect(() => {
    onClose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      logout();
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  const initial = user?.name?.charAt(0).toUpperCase() || "?";

  return (
    <>
      {/* Mobile-only backdrop, shown only while the drawer is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-card transition-transform duration-200 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            IA
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-sm font-semibold">{isVendor ? "Vendor Panel" : "Admin Panel"}</p>
            <p className="text-xs text-muted-foreground">Indian Artisan Marketplace</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary lg:hidden"
          >
            <X size={16} />
          </button>
        </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && item.href !== "/vendor" && pathname.startsWith(item.href + "/"));

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
              )}
              <Icon
                size={17}
                strokeWidth={2}
                className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground/70 group-hover:text-foreground"
                )}
              />
              <span>{item.title}</span>
              {isActive && <ChevronRight size={14} className="ml-auto text-muted-foreground" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
            {initial}
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium">{user?.name || "Account"}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            aria-label="Log out"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
      </aside>
    </>
  );
}
