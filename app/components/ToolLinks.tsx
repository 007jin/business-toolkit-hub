import Link from "next/link";

const links = [
  { label: "Profit Margin", href: "/tools/profit-margin-calculator" },
  { label: "Startup Cost", href: "/tools/startup-cost-calculator" },
  { label: "Break-even", href: "/tools/break-even-calculator" },
  { label: "Pricing Markup", href: "/tools/pricing-markup-calculator" },
  { label: "ROI", href: "/tools/roi-calculator" },
  { label: "Hourly Rate", href: "/tools/hourly-rate-calculator" },
  { label: "Hook Generator", href: "/tools/marketing-hook-generator" },
  { label: "Name Generator", href: "/tools/business-name-generator" },
  { label: "Slogan Generator", href: "/tools/slogan-generator" },
  { label: "CTA Generator", href: "/tools/cta-generator" },
];

export default function ToolLinks() {
  return (
    <div className="mt-10 border-t pt-6">
      <p className="text-sm text-gray-500 mb-3">
        Explore more tools:
      </p>

      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}