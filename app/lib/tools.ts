export type ToolType =
  | "profitMargin"
  | "startupCost"
  | "breakEven"
  | "pricingMarkup"
  | "roi"
  | "hourlyRate"
  | "hookGenerator"
  | "nameGenerator"
  | "sloganGenerator"
  | "ctaGenerator";

export const tools = {

  "profit-margin-calculator": {
    title: "Profit Margin Calculator",
    description:
      "Free profit margin calculator for pricing, revenue planning, and business profit analysis.",
    type: "profitMargin",
    fields: [
      {
        name: "revenue",
        placeholder: "Revenue",
      },
      {
        name: "cost",
        placeholder: "Cost",
      },
    ],
  },

  "startup-cost-calculator": {
    title: "Startup Cost Calculator",
    description:
      "Free startup cost calculator to estimate launch expenses, funding needs, and business setup costs.",
    type: "startupCost",
    fields: [
      {
        name: "equipment",
        placeholder: "Equipment Cost",
      },
      {
        name: "marketing",
        placeholder: "Marketing Cost",
      },
    ],
  },

  "break-even-calculator": {
    title: "Break-even Calculator",
    description:
      "Find out how many sales you need to break even.",
    type: "breakEven",
    fields: [
      {
        name: "fixedCost",
        placeholder: "Fixed Cost",
      },
      {
        name: "pricePerUnit",
        placeholder: "Price Per Unit",
      },
      {
        name: "variableCost",
        placeholder: "Variable Cost",
      },
    ],
  },

  "pricing-markup-calculator": {
    title: "Pricing Markup Calculator",
    description:
      "Calculate markup percentage for your products.",
    type: "pricingMarkup",
    fields: [
      {
        name: "cost",
        placeholder: "Cost",
      },
      {
        name: "sellingPrice",
        placeholder: "Selling Price",
      },
    ],
  },

  "roi-calculator": {
    title: "ROI Calculator",
    description:
      "ROI calculator for measuring return on investment, profit efficiency, and project performance.",
    type: "roi",
    fields: [
      {
        name: "investment",
        placeholder: "Investment",
      },
      {
        name: "profit",
        placeholder: "Profit",
      },
    ],
  },

  "freelance-hourly-rate-calculator": {
    title: "Freelance Hourly Rate Calculator",
    description:
      "Calculate your ideal freelance hourly rate.",
    type: "hourlyRate",
    fields: [
      {
        name: "monthlyIncome",
        placeholder: "Desired Monthly Income",
      },
      {
        name: "expenses",
        placeholder: "Monthly Expenses",
      },
      {
        name: "billableHours",
        placeholder: "Monthly Billable Hours",
      },
    ],
  },

  "marketing-hook-generator": {
    title: "Marketing Hook Generator",
    description:
      "Generate attention-grabbing marketing hooks.",
    type: "hookGenerator",
    fields: [
      {
        name: "product",
        placeholder: "Product or Service",
        type: "text",
      },
    ],
  },

  "business-name-generator": {
    title: "Business Name Generator",
    description:
      "Generate brandable business name ideas for startups, side hustles, and online brands.",
    type: "nameGenerator",
    fields: [
      {
        name: "keyword",
        placeholder: "Business Keyword",
        type: "text",
      },
    ],
  },

  "slogan-generator": {
    title: "Slogan Generator",
    description:
      "Generate catchy slogans for your brand.",
    type: "sloganGenerator",
    fields: [
      {
        name: "keyword",
        placeholder: "Brand Keyword",
        type: "text",
      },
    ],
  },

  "cta-generator": {
    title: "CTA Generator",
    description:
      "Generate high-converting call-to-action ideas.",
    type: "ctaGenerator",
    fields: [
      {
        name: "keyword",
        placeholder: "Offer or Product",
        type: "text",
      },
    ],
  },

} as const;