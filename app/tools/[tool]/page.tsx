import { tools } from "@/app/lib/tools";
import Calculator from "@/app/components/Calculator";
import type { Metadata } from "next";

type Props = {
  params: {
    tool: string;
  };
};

export async function generateStaticParams() {
  return Object.keys(tools).map((tool) => ({
    tool,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {

  const { tool: toolKey } = await params;

  const tool =
    tools[toolKey as keyof typeof tools];

  if (!tool) {
    return {
      title: "Tool Not Found | Business Toolkit Hub",
      description: "The requested business tool was not found.",
    };
  }

  return {
    title: `${tool.title} | Business Toolkit Hub`,
    description: tool.description,
    openGraph: {
      title: `${tool.title} | Business Toolkit Hub`,
      description: tool.description,
      url: `https://yourdomain.com/tools/${toolKey}`,
      siteName: "Business Toolkit Hub",
      type: "website",
    },
    alternates: {
      canonical: `https://yourdomain.com/tools/${toolKey}`,
    },
  };
}

export default async function ToolPage({
  params,
}: Props) {
  const { tool: toolKey } = await params;

  const tool = tools[toolKey as keyof typeof tools];

  if (!tool) {
    return (
      <div className="p-10 text-center text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen py-10 px-4">

      <div className="max-w-4xl mx-auto flex flex-col gap-8">

        <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-xl">
          <h1 className="text-4xl font-bold text-[var(--color-text)] mb-4">
            {tool.title}
          </h1>
          <p className="text-[var(--color-subtext)] text-lg max-w-3xl">
            {tool.description}
          </p>
        </section>

        <section>
          <Calculator
            title={tool.title}
            type={tool.type}
            fields={tool.fields}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">Quick explanation</h2>
            <p className="text-[var(--color-subtext)] leading-7">
              {tool.quickExplanation}
            </p>
          </article>

          <article className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">Formula explanation</h2>
            <p className="text-[var(--color-subtext)] leading-7 mb-4">
              This formula shows the core math behind this tool.
            </p>
            <pre className="rounded-2xl bg-slate-950 p-4 text-sm text-white overflow-x-auto">
              {tool.formula}
            </pre>
          </article>
        </section>

        <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Example calculation</h2>
          <p className="text-[var(--color-subtext)] leading-7">
            {tool.exampleCalculation}
          </p>
        </section>

        {tool.faq.length > 0 && (
          <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
            <div className="space-y-4">
              {tool.faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-[var(--color-text)] list-none">
                    <span>{item.question}</span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-[var(--color-subtext)] leading-7">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-4">
            Explore More Tools
          </h2>

          <div className="flex flex-wrap gap-3">

            {Object.entries(tools)
              .filter(([key]) => key !== toolKey)
              .map(([key, t]) => (
                <a
                  key={key}
                  href={`/tools/${key}`}
                  className="bg-blue-100 text-[var(--color-primary)] px-4 py-2 rounded-full text-sm hover:bg-blue-200 transition"
                >
                  {t.title}
                </a>
              ))}

          </div>
        </section>

      </div>

    </main>
  );
}