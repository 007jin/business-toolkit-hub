import Link from "next/link";
import { tools } from "@/app/lib/tools";


const featuredTools = [
  "profit-margin-calculator",
  "startup-cost-calculator",
  "marketing-hook-generator",
  "business-name-generator",
];

export default function HomePage() {

  return (
    <main className="bg-[var(--color-background)] min-h-screen">

      {/* HERO */}
      <section className="py-24 px-6 text-center">

        <div className="max-w-4xl mx-auto">

          <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-text)] leading-tight mb-6">
            Free Business Calculators & Generators
          </h1>

          <p className="text-xl text-[var(--color-subtext)] leading-8 mb-10">
            Powerful tools for entrepreneurs, freelancers,
            startups, creators, and online businesses.
          </p>

          <Link
            href="/tools"
            className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-4 rounded-xl text-lg font-semibold transition"
          >
            Explore All Tools
          </Link>

        </div>

      </section>

      {/* FEATURED TOOLS */}
      <section className="px-6 pb-20">

        <div className="max-w-6xl mx-auto">

          <div className="flex items-center justify-between mb-10">

            <h2 className="text-3xl font-bold text-[var(--color-text)]">
              Featured Tools
            </h2>

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
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition p-8 border border-gray-100"
                >

                  <h3 className="text-2xl font-bold text-[var(--color-text)] mb-3">
                    {tool.title}
                  </h3>

                  <p className="text-[var(--color-subtext)] leading-7">
                    {tool.description}
                  </p>

                  <div className="mt-6">

                    <span className="inline-block bg-blue-100 text-[var(--color-primary)] px-4 py-2 rounded-full text-sm font-medium">
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
      <section className="bg-white py-20 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-bold text-[var(--color-text)] mb-12">
            How It Works
          </h2>

          <div className="grid gap-10 md:grid-cols-3">

            <div>
              <div className="text-5xl mb-4">1️⃣</div>

              <h3 className="text-xl font-semibold mb-3">
                Choose a Tool
              </h3>

              <p className="text-[var(--color-subtext)]">
                Pick from calculators and generators
                designed for business growth.
              </p>
            </div>

            <div>
              <div className="text-5xl mb-4">2️⃣</div>

              <h3 className="text-xl font-semibold mb-3">
                Enter Your Data
              </h3>

              <p className="text-[var(--color-subtext)]">
                Input your numbers, ideas, products,
                or keywords instantly.
              </p>
            </div>

            <div>
              <div className="text-5xl mb-4">3️⃣</div>

              <h3 className="text-xl font-semibold mb-3">
                Get Instant Results
              </h3>

              <p className="text-[var(--color-subtext)]">
                Receive calculations and generated
                outputs immediately.
              </p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}