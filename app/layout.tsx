import type { Metadata } from "next";
import { DM_Sans, Fraunces, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Rockville Legal Practitioners", template: "%s — Rockville Legal Practitioners" },
  description: "Commercially grounded legal counsel for businesses, institutions, and individuals.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable} ${geistMono.variable}`}>
      <body><SmoothScrollProvider><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:bg-brand-blue focus:p-3 focus:text-paper">Skip to content</a><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></SmoothScrollProvider></body>
    </html>
  );
}
