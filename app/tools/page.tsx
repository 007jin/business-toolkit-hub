import Link from "next/link";
import { tools } from "@/app/lib/tools";

export default function ToolsPage() {

  return (
    <main className="bg-gray-100 min-h-screen py-12 px-4">

      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <section className="text-center mb-12">

          <h1 className="text-5xl font-bold text-[var(--color-text)] mb-4">
            Business Tools
          </h1>

          <p className="text-lg text-[var(--color-subtext)] max-w-2xl mx-auto">
            Free calculators and generators designed for
            entrepreneurs, freelancers, startups, and creators.
          </p>

        </section>

        {/* TOOLS GRID */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {Object.entries(tools).map(([key, tool]) => (

            <Link
              key={key}
              href={`/tools/${key}`}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border border-gray-100"
            >

              <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">
                {tool.title}
              </h2>

              <p className="text-[var(--color-subtext)] leading-7">
                {tool.description}
              </p>

              <div className="mt-6">

                <span className="inline-block bg-blue-100 text-[var(--color-primary)] px-4 py-2 rounded-full text-sm font-medium">
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