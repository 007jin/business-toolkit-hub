import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Toolkit Hub - Free Online Business Tools",
  description:
    "Free business calculators and marketing tools including profit margin, ROI, startup cost, and AI generators for entrepreneurs.",
  keywords: [
    "business tools",
    "calculator",
    "startup cost calculator",
    "profit margin calculator",
    "marketing tools",
    "AI generator tools",
  ],
  openGraph: {
    title: "Business Toolkit Hub",
    description:
      "Free tools for entrepreneurs: calculators, generators, and business utilities.",
    url: "https://yourdomain.com",
    siteName: "Business Toolkit Hub",
    type: "website",
  },
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ inter.className + " bg-gray-100 text-black" }>

        {/* NAVBAR */}
        <header className="bg-white border-b border-gray-200">

  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    {/* LOGO */}
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.png"
        alt="Business Toolkit Hub"
        width={220}
        height={66}
        priority
        className="h-auto w-auto max-h-16"
      />
    </Link>

    {/* NAV */}
    <nav className="flex gap-6 text-[var(--color-text)] font-medium">

      <Link
        href="/"
        className="hover:text-[var(--color-primary)] transition"
      >
        Home
      </Link>

      <Link
        href="/tools"
        className="hover:text-[var(--color-primary)] transition"
      >
        Tools
      </Link>

    </nav>

  </div>

</header>

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer className="border-t bg-white mt-20">
          <div className="text-[var(--color-subtext)] flex items-center justify-center text-center py-4">
            © 2026 Business Toolkit Hub. All rights reserved.
          </div>
        </footer>

      </body>
    </html>
  );
}