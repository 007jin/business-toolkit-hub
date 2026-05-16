import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/app/lib/tools";

export const metadata: Metadata = {
  title: "Business Tools | Business Toolkit Hub",
  description:
    "Free calculators and generators for entrepreneurs, freelancers, startups, and online businesses.",
  openGraph: {
    title: "Business Tools | Business Toolkit Hub",
    description:
      "Free calculators and generators for entrepreneurs, freelancers, startups, and online businesses.",
    url: "https://yourdomain.com/tools",
    siteName: "Business Toolkit Hub",
    type: "website",
  },
};

export default function ToolsPage() {

  return (
    <main className="bg-[var(--color-bg)] min-h-screen py-12 px-4">

      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <section className="text-center mb-12">

          <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_40px_120px_-70px_rgba(37,99,235,0.35)] p-14">
            <h1 className="text-5xl font-bold text-[var(--color-text)] mb-4">
              Business Tools
            </h1>

            <p className="text-lg text-[var(--color-subtext)] max-w-2xl mx-auto">
              Free calculators and generators designed for entrepreneurs, freelancers, startups, and creators.
            </p>
          </div>

        </section>

        {/* TOOLS GRID */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {Object.entries(tools).map(([key, tool]) => (

            <Link
              key={key}
              href={`/tools/${key}`}
              className="bg-white rounded-[2rem] border border-slate-200 shadow-xl transition-transform p-6 hover:-translate-y-1 hover:shadow-2xl"
            >

              <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">
                {tool.title}
              </h2>

              <p className="text-[var(--color-subtext)] leading-7">
                {tool.description}
              </p>

              <div className="mt-6">

                <span className="inline-block bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-4 py-2 rounded-full text-sm font-medium">
                  Open Tool →
                </span>

              </div>

            </Link>

          ))}

        </section>

      </div>

    </main>
  );
}