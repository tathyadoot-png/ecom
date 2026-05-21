import type { Metadata } from "next";

import {
  Inter,
} from "next/font/google";

import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/auth-provider";
import Navbar from "@/components/layout/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata =
  {
    title: "Ecommerce Store",
    description:
      "Modern Ecommerce Store",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className
        }
      >
        <AuthProvider>
            <Navbar />
          {children}
          <Toaster
    richColors
    position="top-right"
  />
        </AuthProvider>
      </body>
    </html>
  );
}