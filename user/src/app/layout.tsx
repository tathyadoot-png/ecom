import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { SITE } from "@/constants/site";
import "./globals.css";

const heading = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Indian Artisan Marketplace",
    template: "%s | Indian Artisan Marketplace",
  },
  description:
    "Premium reusable ecommerce platform built for handcrafted Indian products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${heading.variable} ${body.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}