import { LanguageProvider } from "./context/LanguageContext";
import LanguageToggle from "./components/ui/LanguageToggle";
import "./globals.css";
import SmoothScroll from "./components/ui/SmoothScroll";
import Navbar from "./components/ui/Navbar";
import CustomCursor from "./components/ui/CustomCursor";
import Footer from "./components/ui/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";

export const metadata = {
  title: "Vikalp Singh | Advocate, Public Leader & Policy Thinker",

  description:
    "Official portfolio of Vikalp Singh – Advocate, Public Leader, and Policy Thinker. Partner at CSK Law Firm, President of Utthan Seva Foundation, working in law, governance, youth empowerment, and nation-building initiatives.",

  keywords: [
    "Vikalp Singh",
    "Advocate India",
    "Lawyer Delhi",
    "Public Leader India",
    "Utthan Seva Foundation",
    "Youth Leader",
    "Policy Thinker",
    "Satna",
    "Madhya Pradesh",
  ],

  authors: [{ name: "Vikalp Singh" }],

  creator: "Vikalp Singh",

  metadataBase: new URL("https://www.vikalpsingh.com"),

  openGraph: {
    title: "Vikalp Singh | Advocate & Public Leader",
    description:
      "Advocate, Public Leader, and Policy Thinker working across law, governance, youth empowerment, and social impact.",
    url: "https://www.vikalpsingh.com",
    siteName: "Vikalp Singh",
    images: [
      {
        url: "/og-image.png", // 👈 optional add later
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vikalp Singh",
    description:
      "Advocate | Public Leader | Policy Thinker",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FDFCF0] text-black antialiased">
        <LanguageProvider>
            <CustomCursor /> 
          <SmoothScroll>
                <Navbar />   
            {/* <LanguageToggle /> */}
            <main>{children}</main>
             <ScrollToTop /> 
            <Footer/>
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}