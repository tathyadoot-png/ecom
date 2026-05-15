"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { SIDEBAR_ITEMS } from "@/constants/sidebar";

import { useAuthStore } from "@/store/auth-store";
import { LogOut } from "lucide-react";
import api from "@/lib/axios";
export default function Sidebar() {
  const pathname = usePathname();

  const { logout } = useAuthStore();

  return (
    <aside className="w-64 min-h-screen bg-black text-white flex flex-col justify-between p-6">
      
      <div>
        
        <h2 className="text-3xl font-bold mb-10">
          Admin
        </h2>

        <nav className="space-y-2">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-white text-black"
                    : "hover:bg-zinc-900"
                }`}
              >
                <Icon size={20} />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

      </div>

    <button
  onClick={async () => {
    try {
      await api.post(
        "/auth/logout"
      );

      logout();

      window.location.href =
        "/login";
    } catch (error) {
      console.log(error);
    }
  }}
  className="flex items-center gap-3 bg-red-500 hover:bg-red-600 transition-all p-3 rounded-xl"
>
  <LogOut size={20} />

  Logout
</button>

    </aside>
  );
}