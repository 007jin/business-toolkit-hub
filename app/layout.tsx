import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

export const metadataBase = new URL("https://yourdomain.com");

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
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
      <body className={ inter.className + " bg-[var(--color-bg)] text-[var(--color-text)]" }>

        {/* NAVBAR */}
        <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">

  <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">

    {/* LOGO */}
    <Link href="/" className="flex items-center gap-3">
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
    <nav className="flex flex-wrap items-center gap-3 text-[var(--color-text)] font-medium">
      <Link
        href="/"
        className="rounded-full px-3 py-2 text-sm text-slate-700 transition hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
      >
        Home
      </Link>

      <Link
        href="/tools"
        className="rounded-full px-4 py-2 text-sm text-slate-700 transition hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
      >
        Tools
      </Link>

      <Link
        href="/login"
        className="rounded-full px-4 py-2 text-sm text-slate-700 transition hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
      >
        Login
      </Link>

      <Link
        href="/signup"
        className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-hover)]"
      >
        Sign Up
      </Link>
    </nav>
  </div>
</header>

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer className="mt-20 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white shadow-xl shadow-slate-900/10">
          <div className="max-w-7xl mx-auto px-6 py-10 grid gap-6 md:grid-cols-[1.5fr_1fr] items-center">
            <div>
              <p className="text-lg font-semibold">
                Business Toolkit Hub
              </p>
              <p className="mt-2 text-sm text-slate-300 max-w-xl">
                Smart, easy-to-use business calculators and marketing tools for founders, freelancers, and creators.
              </p>
            </div>

            <div className="flex flex-col gap-3 items-start md:items-end">
              <div className="text-sm text-slate-400">
                © 2026 Business Toolkit Hub
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/" className="text-slate-200 hover:text-white transition">
                  Home
                </Link>
                <Link href="/tools" className="text-slate-200 hover:text-white transition">
                  Tools
                </Link>
                <a
                  href="mailto:hello@example.com"
                  className="text-slate-200 hover:text-white transition"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}