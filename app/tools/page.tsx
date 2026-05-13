import Link from "next/link";


const tools = [
  {
    name: "Profit Margin Calculator",
    slug: "profit-margin-calculator",
    desc: "Calculate your profit margin instantly.",
  },
  {
    name: "Startup Cost Calculator",
    slug: "startup-cost-calculator",
    desc: "Estimate your business startup costs.",
  },
  {
    name: "Break-even Calculator",
    slug: "break-even-calculator",
    desc: "Find your break-even point fast.",
  },
  {
    name: "Pricing Markup Calculator",
    slug: "pricing-markup-calculator",
    desc: "Calculate optimal product markup.",
  },
  {
    name: "ROI Calculator",
    slug: "roi-calculator",
    desc: "Measure return on investment.",
  },
  {
    name: "Freelance Hourly Rate Calculator",
    slug: "hourly-rate-calculator",
    desc: "Find your ideal hourly rate.",
  },
  {
    name: "Marketing Hook Generator",
    slug: "marketing-hook-generator",
    desc: "Generate viral marketing hooks.",
  },
  {
    name: "Business Name Generator",
    slug: "business-name-generator",
    desc: "Generate brandable business names.",
  },
  {
    name: "Slogan Generator",
    slug: "slogan-generator",
    desc: "Create catchy brand slogans.",
  },
  {
    name: "Call-To-Action Generator",
    slug: "cta-generator",
    desc: "Generate high-converting CTAs.",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-4">
          Business Toolkit Hub
        </h1>

        <p className="text-gray-600 mb-10">
          Free business calculators and marketing tools to help you grow faster.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {tool.name}
              </h2>
              <p className="text-gray-500">
                {tool.desc}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}