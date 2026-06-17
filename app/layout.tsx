import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "SQUALL Community Hub",
  description: "The official community hub for SQUALL games and players.",
  icons: {
    icon: "/SquallLogo.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
