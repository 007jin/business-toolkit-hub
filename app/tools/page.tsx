import Link from "next/link";
import { tools } from "@/app/lib/tools";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Business Toolkit Hub</h1>
        <p className="text-gray-600 mb-10">
          Free business calculators and marketing tools to help you grow faster.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(tools).map(([slug, tool]) => (
            <Link
              key={slug}
              href={`/tools/${slug}`}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
              <p className="text-gray-500">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}