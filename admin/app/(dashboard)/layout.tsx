"use client";

import ProtectedRoute from "@/components/protected-route";

import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex bg-zinc-100">
        
        <Sidebar />

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </ProtectedRoute>
  );
}