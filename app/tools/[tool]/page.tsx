import { tools } from "@/app/lib/tools";
import Calculator from "@/app/components/Calculator";
import type { Metadata } from "next";

type Props = {
  params: Promise<{
    tool: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {

  const { tool: toolKey } = await params;

  const tool =
    tools[toolKey as keyof typeof tools];

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: `${tool.title} | Business Toolkit Hub`,
    description: tool.description,
  };
}

export default async function ToolPage({
  params,
}: Props) {

  const { tool: toolKey } = await params;

  const tool =
    tools[toolKey as keyof typeof tools];

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
        <section>
          <h1 className="text-4xl font-bold text-[var(--color-text)] mb-4">
            {tool.title}
          </h1>

          <p className="text-[var(--color-subtext)] text-lg">
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

        {/* RELATED TOOLS */}
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