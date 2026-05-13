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
    type: "profitMargin",
    title: "Profit Margin Calculator",
    description: "Calculate your business profit margin instantly.",
    fields: [
      { name: "revenue", placeholder: "Revenue" },
      { name: "cost", placeholder: "Cost" },
    ],
  },
  "startup-cost-calculator": {
    type: "startupCost",
    title: "Startup Cost Calculator",
    description: "Estimate startup costs for your business.",
    fields: [
      { name: "equipment", placeholder: "Equipment Cost" },
      { name: "marketing", placeholder: "Marketing Cost" },
    ],
  },
  "break-even-calculator": {
    type: "breakEven",
    title: "Break-even Calculator",
    description: "Find your business break-even point.",
    fields: [
      { name: "fixedCost", placeholder: "Fixed Costs" },
      { name: "pricePerUnit", placeholder: "Price per Unit" },
      {
        name: "variableCost",
        placeholder: "Variable Cost per Unit",
      },
    ],
  },
  "pricing-markup-calculator": {
    type: "pricingMarkup",
    title: "Pricing Markup Calculator",
    description: "Calculate product markup percentage easily.",
    fields: [
      { name: "cost", placeholder: "Product Cost" },
      {
        name: "sellingPrice",
        placeholder: "Selling Price",
      },
    ],
  },
  "roi-calculator": {
    type: "roi",
    title: "ROI Calculator",
    description: "Measure return on investment instantly.",
    fields: [
      { name: "investment", placeholder: "Investment" },
      { name: "profit", placeholder: "Profit" },
    ],
  },
  "hourly-rate-calculator": {
    type: "hourlyRate",
    title: "Freelance Hourly Rate Calculator",
    description: "Calculate your ideal freelance hourly rate.",
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
        placeholder: "Billable Hours per Month",
      },
    ],
  },
  "marketing-hook-generator": {
    type: "hookGenerator",
    title: "Marketing Hook Generator",
    description: "Generate attention-grabbing marketing hooks.",
    fields: [
      {
        name: "product",
        placeholder: "Product or Service",
        type: "text",
      },
    ],
  },
  "business-name-generator": {
    type: "nameGenerator",
    title: "Business Name Generator",
    description: "Generate creative business name ideas.",
    fields: [
      {
        name: "keyword",
        placeholder: "Business Keyword",
        type: "text",
      },
    ],
  },
  "slogan-generator": {
    type: "sloganGenerator",
    title: "Slogan Generator",
    description: "Generate catchy slogans and taglines.",
    fields: [
      {
        name: "keyword",
        placeholder: "Business or Brand",
        type: "text",
      },
    ],
  },
  "cta-generator": {
    type: "ctaGenerator",
    title: "CTA Generator",
    description: "Generate high-converting call-to-actions.",
    fields: [
      {
        name: "keyword",
        placeholder: "Product or Offer",
        type: "text",
      },
    ],
  },
} as const;