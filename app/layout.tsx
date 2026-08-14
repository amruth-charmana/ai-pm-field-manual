import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

// Deliberately not using next/font/google here — it requires a live fetch to
// fonts.googleapis.com at build time, which fails in offline/sandboxed CI
// environments with a hard build error. A system font stack builds
// identically everywhere and costs nothing at runtime either.
export const metadata: Metadata = {
  title: "AI PM Field Manual",
  description:
    "An open-source field manual for AI product management, built chapter by chapter from real, shipped AI products — not generic best practices.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-[#14151a]">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
