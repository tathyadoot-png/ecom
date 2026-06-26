import type { Metadata } from "next";

import {
  Inter,
  Cormorant_Garamond,
} from "next/font/google";

import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/auth-provider";
import Header from "@/components/layout/Header/Header";
import Script from "next/script";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const cormorant =
  Cormorant_Garamond({
    subsets: ["latin"],
    variable: "--font-heading",
    weight: [
      "300",
      "400",
      "500",
      "600",
      "700",
    ],
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
        className={`
    ${inter.variable}
    ${cormorant.variable}
    ${inter.className}
  `}
      >
        <AuthProvider>
          <Header />
         
          {children}
          <Toaster
            richColors
            position="top-right"
          />
        </AuthProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </body>
    </html>
  );
}