import "./globals.css";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-black">

        {/* NAVBAR */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

            <a
              href="/"
              className="text-2xl font-bold"
            >
            <span className="text-[var(--color-primary)] font-bold">
            Business Toolkit Hub
            </span>
            </a>

            <nav className="flex gap-6 text-lg">
              <a href="/" className="hover:text-gray-600">
                Home
              </a>

              <a href="/tools" className="hover:text-gray-600">
                Tools
              </a>
            </nav>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer className="border-t bg-white mt-20">
          <div className="text-[var(--color-subtext)]">
            © 2026 Business Toolkit Hub. All rights reserved.
          </div>
        </footer>

      </body>
    </html>
  );
}