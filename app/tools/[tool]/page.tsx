import { tools } from "@/app/lib/tools";
import Calculator from "@/app/components/Calculator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool: toolKey } = await params;

  const tool = tools[toolKey as keyof typeof tools];

  if (!tool) {
    return {
      title: "Tool Not Found | Business Toolkit Hub",
      description: "This tool does not exist.",
    };
  }

  return {
    title: `${tool.title} | Business Toolkit Hub`,
    description: tool.description,
    keywords: [
      tool.title,
      "business tools",
      "calculator",
      "startup tools",
      "marketing tools",
    ],
    openGraph: {
      title: tool.title,
      description: tool.description,
      type: "article",
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
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
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        
        {/* HERO */}
        <section className="mb-10">
          <h1 className="text-4xl font-bold mb-4">
            {tool.title}
          </h1>

          <p className="text-lg text-[var(--color-subtext)]">
            {tool.description}
          </p>
        </section>

        {/* CALCULATOR */}
        <section>
          <Calculator
            title={tool.title}
            type={tool.type}
            fields={tool.fields}
          />
        </section>

        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            Explore More Tools
          </h2>

          <div className="flex flex-wrap gap-3">
            {Object.entries(tools)
              .filter(([key]) => key !== toolKey)
              .map(([key, t]) => (
                <a
                  key={key}
                  href={`/tools/${key}`}
                  className="bg-blue-100 text-[var(--color-primary)] px-4 py-2 rounded-full text-sm hover:bg-gray-300 transition"
                >
                  {t.title}
                </a>
              ))}
          </div>
        </section>

        {/* HOW TO USE */}
        <section className="mt-12 bg-white rounded-2xl p-8 shadow">
          <h2 className="text-2xl font-bold mb-4">
            How to use {tool.title}
          </h2>

          <p className="text-[var(--color-subtext)] leading-7">
            This {tool.title.toLowerCase()} helps you quickly calculate
            accurate results based on your inputs. Simply enter your values
            and generate instant insights.
          </p>
        </section>

        {/* EXAMPLE */}
        <section className="mt-8 bg-white rounded-2xl p-8 shadow">
          <h2 className="text-2xl font-bold mb-4">
            Example
          </h2>

          <p className="text-[var(--color-subtext)] leading-7">
            Using the {tool.title.toLowerCase()} helps you understand real
            business scenarios faster and make better decisions.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-8 bg-white rounded-2xl p-8 shadow">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">

            <div>
              <h3 className="font-semibold text-lg">
                What is {tool.title}?
              </h3>
              <p className="text-[var(--color-subtext)]">
                {tool.description}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Is this tool free?
              </h3>
              <p className="text-[var(--color-subtext)]">
                Yes, all tools on Business Toolkit Hub are completely free.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Who should use this?
              </h3>
              <p className="text-[var(--color-subtext)]">
                Entrepreneurs, freelancers, marketers, and startup founders
                use this tool to improve decision-making.
              </p>
            </div>

          </div>
        </section>

        {/* RELATED TOOLS (SEO LINK GRAPH) */}
        <section className="mt-8 bg-white rounded-2xl p-8 shadow">
          <h2 className="text-2xl font-bold mb-4">
            Related Tools
          </h2>

          <ul className="list-disc ml-6 text-blue-600 space-y-2">
            {Object.entries(tools)
              .filter(([key]) => key !== params.tool)
              .slice(0, 5)
              .map(([key, t]) => (
                <li key={key}>
                  <a href={`/tools/${key}`}>
                    {t.title}
                  </a>
                </li>
              ))}
          </ul>
        </section>

      </div>
    </main>
  );
}