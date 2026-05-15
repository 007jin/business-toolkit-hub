import Link from "next/link";
import { tools } from "@/app/lib/tools";


const featuredTools = [
  "business-name-generator",
  "profit-margin-calculator",
  "roi-calculator",
  "startup-cost-calculator",
];

export default function HomePage() {

  return (
    <main className="bg-[var(--color-bg)] min-h-screen">

      {/* HERO */}
      <section className="py-24 px-6">

        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_40px_120px_-70px_rgba(37,99,235,0.45)] p-14 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-text)] leading-tight mb-6">
              Free Business Calculators & Generators
            </h1>

            <p className="text-xl text-[var(--color-subtext)] leading-8 mb-10 max-w-3xl mx-auto">
              Powerful tools for entrepreneurs, freelancers, startups, creators, and online businesses.
            </p>

            <Link
              href="/tools"
              className="inline-flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-4 rounded-full text-lg font-semibold transition shadow-lg hover:shadow-xl"
            >
              Explore All Tools
            </Link>
          </div>
        </div>

      </section>

      {/* FEATURED TOOLS */}
      <section className="px-6 pb-20">

        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">

            <div>
              <h2 className="text-3xl font-bold text-[var(--color-text)]">
                Top business tools trending now
              </h2>
              <p className="mt-2 text-[var(--color-subtext)] max-w-2xl">
                High-demand calculators and generators for pricing, profitability, startup planning, and brand naming.
              </p>
            </div>

            <Link
              href="/tools"
              className="text-[var(--color-primary)] font-medium hover:underline"
            >
              Explore More Tools →
            </Link>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {featuredTools.map((key) => {
              const tool =
                tools[key as keyof typeof tools];

              return (
                <Link
                  key={key}
                  href={`/tools/${key}`}
                  className="bg-white rounded-[2rem] border border-slate-200 shadow-xl transition-transform p-8 hover:-translate-y-1 hover:shadow-2xl"
                >

                  <h3 className="text-2xl font-bold text-[var(--color-text)] mb-3">
                    {tool.title}
                  </h3>

                  <p className="text-[var(--color-subtext)] leading-7">
                    {tool.description}
                  </p>

                  <div className="mt-6">

                    <span className="inline-block bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-4 py-2 rounded-full text-sm font-medium">
                      Open Tool →
                    </span>

                  </div>

                </Link>
              );
            })}

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6">

        <div className="max-w-5xl mx-auto text-center bg-white rounded-[2rem] border border-slate-200 shadow-xl p-14">

          <h2 className="text-4xl font-bold text-[var(--color-text)] mb-12">
            How It Works
          </h2>

          <div className="grid gap-10 md:grid-cols-3">

            <div className="space-y-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7" aria-hidden="true">
                  <path d="M4 7h16" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 12h16" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="4" y="4" width="16" height="16" rx="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Choose a Tool
              </h3>

              <p className="text-[var(--color-subtext)]">
                Pick from calculators and generators designed for business growth.
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7" aria-hidden="true">
                  <path d="M6 7h12" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 12h12" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 17h8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 5v14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Enter Your Data
              </h3>

              <p className="text-[var(--color-subtext)]">
                Input your numbers, ideas, products, or keywords instantly.
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7" aria-hidden="true">
                  <path d="M4 16h16" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 12l5-5 4 4 5-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Get Instant Results
              </h3>

              <p className="text-[var(--color-subtext)]">
                Receive calculations and generated outputs immediately.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* FAQ */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)] mb-3">
              FAQs
            </p>
            <h2 className="text-4xl font-bold text-[var(--color-text)]">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-[var(--color-subtext)] max-w-3xl mx-auto">
              Get quick answers about how the tools work, what’s free, and how to use them for your business.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {[
              {
                question: "Are these tools completely free?",
                answer:
                  "Yes — all calculators and generators are free to use with no hidden fees. You can run as many calculations as you need.",
              },
              {
                question: "Do I need an account or sign up?",
                answer:
                  "No account is required to use the tools. Just pick a tool, enter your details, and get results right away.",
              },
              {
                question: "Can I use these tools for business planning?",
                answer:
                  "Absolutely. These tools are built to help freelancers, entrepreneurs, and startups evaluate pricing, profit margin, ROI, and more.",
              },
              {
                question: "How accurate are the currency conversions?",
                answer:
                  "Currency conversions use live market rates for hourly rate conversion. For exact settlement prices, please verify with your bank or currency provider.",
              },
              {
                question: "Will premium tools be available later?",
                answer:
                  "Yes. We’re preparing premium features for advanced users, and signing up will let you access those tools as soon as they launch.",
              },
            ].map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-[var(--color-text)] list-none">
                  <span>{faq.question}</span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[var(--color-subtext)] leading-7">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}