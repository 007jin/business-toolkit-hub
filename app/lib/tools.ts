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

export type ToolDefinition = {
  title: string;
  description: string;
  type: ToolType;
  fields: readonly {
    name: string;
    placeholder: string;
    type?: "number" | "text";
  }[];
  quickExplanation: string;
  formula: string;
  exampleCalculation: string;
  faq: {
    question: string;
    answer: string;
  }[];
};

export const tools: Record<string, ToolDefinition> = {

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
    quickExplanation:
      "Profit margin shows how much of each dollar of revenue remains after covering cost.",
    formula: "Profit Margin = (Revenue - Cost) / Revenue × 100",
    exampleCalculation:
      "If revenue is $25,000 and cost is $18,000, profit margin = (25,000 - 18,000) / 25,000 × 100 = 28%.",
    faq: [
      {
        question: "What does profit margin tell me?",
        answer:
          "It tells you the percentage of revenue left after covering direct costs, helping you measure profitability.",
      },
      {
        question: "Is profit margin the same as markup?",
        answer:
          "No. Profit margin is based on revenue, while markup is based on cost.",
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
    quickExplanation:
      "Estimate the upfront cash you need to launch your business, including equipment and marketing.",
    formula: "Startup Cost = Equipment Cost + Marketing Cost",
    exampleCalculation:
      "If equipment costs $12,000 and marketing costs $3,500, total startup cost = $15,500.",
    faq: [
      {
        question: "What should I include in startup costs?",
        answer:
          "Include equipment, marketing, licenses, and other one-time expenses needed before launch.",
      },
      {
        question: "Can I update this estimate later?",
        answer:
          "Yes. Use it as a planning estimate and refine the values as your business plan evolves.",
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
    quickExplanation:
      "Determine how many units you must sell to cover fixed and variable costs before making profit.",
    formula: "Break-even units = Fixed Cost / (Price per Unit - Variable Cost)",
    exampleCalculation:
      "If fixed cost is $6,000, price is $60, and variable cost is $30, break-even units = 6,000 / (60 - 30) = 200 units.",
    faq: [
      {
        question: "What is the break-even point?",
        answer:
          "It is the sales volume at which total revenue equals total cost, with no profit or loss.",
      },
      {
        question: "What if the unit price is lower than variable cost?",
        answer:
          "Then each sale loses money, so you cannot break even until you raise price or lower costs.",
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
    quickExplanation:
      "Markup shows how much you increase your cost to arrive at a selling price.",
    formula: "Markup % = (Selling Price - Cost) / Cost × 100",
    exampleCalculation:
      "If cost is $40 and selling price is $60, markup = (60 - 40) / 40 × 100 = 50%.",
    faq: [
      {
        question: "Is markup the same as profit margin?",
        answer:
          "No. Markup is based on cost, while profit margin is based on revenue.",
      },
      {
        question: "Is this useful for retail pricing?",
        answer:
          "Yes, it helps you decide how much to add to cost for a profitable price.",
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
    quickExplanation:
      "ROI compares the profit you earned to the amount you invested.",
    formula: "ROI % = Profit / Investment × 100",
    exampleCalculation:
      "If you invest $18,000 and earn $4,500 profit, ROI = 4,500 / 18,000 × 100 = 25%.",
    faq: [
      {
        question: "What does ROI show?",
        answer:
          "It shows how much return you get from each dollar invested.",
      },
      {
        question: "Can ROI be negative?",
        answer:
          "Yes. Negative ROI means the investment lost money instead of earning it.",
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
    quickExplanation:
      "Estimate the hourly rate needed to meet income goals while covering expenses.",
    formula:
      "Hourly Rate = (Monthly Income + Monthly Expenses) / Billable Hours",
    exampleCalculation:
      "If you want $8,000 income, $2,000 expenses, and 120 billable hours, hourly rate = 10,000 / 120 = $83.33.",
    faq: [
      {
        question: "Should I count non-billable hours?",
        answer:
          "This tool uses billable hours only. Track non-billable time separately to adjust your rate.",
      },
      {
        question: "Is this rate enough?",
        answer:
          "Use it as a minimum target and consider market rates and profit margins.",
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
    quickExplanation:
      "Generate short, memorable hooks for ads, emails, or social posts.",
    formula: "Hook = attention + benefit + curiosity",
    exampleCalculation:
      "For product 'AI planner', try: 'This AI planner changed everything.'",
    faq: [
      {
        question: "How do I use these hooks?",
        answer:
          "Use them for headlines, captions, or opening lines in marketing content.",
      },
      {
        question: "Can I regenerate multiple versions?",
        answer:
          "Yes. Click Regenerate to see new hook variations.",
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
    quickExplanation:
      "Create brand name ideas by combining your keyword with smart prefixes and suffixes.",
    formula: "Name = prefix + keyword + suffix",
    exampleCalculation:
      "If keyword is 'studio', possible names are 'NovaStudio' or 'StudioHub'.",
    faq: [
      {
        question: "What makes a good business name?",
        answer:
          "A name should be simple, memorable, relevant, and easy to spell.",
      },
      {
        question: "Can I use these names commercially?",
        answer:
          "Yes, but check trademarks and domain availability before launch.",
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
    quickExplanation:
      "Generate simple, memorable slogans that communicate your brand promise.",
    formula: "Slogan = benefit + keyword + action",
    exampleCalculation:
      "For keyword 'growth', a slogan might be: 'Scale your growth faster.'",
    faq: [
      {
        question: "Where should I use these slogans?",
        answer:
          "Use them in taglines, landing pages, ads, and social campaigns.",
      },
      {
        question: "How many times can I regenerate?",
        answer:
          "As many times as you want to find the best phrase.",
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
    quickExplanation:
      "Generate action-focused CTA copy for buttons, banners, and promotional offers.",
    formula: "CTA = action + urgency + benefit",
    exampleCalculation:
      "For keyword 'startup guide', a CTA could be: 'Get started with startup guide.'",
    faq: [
      {
        question: "Where can I use these CTAs?",
        answer:
          "Use them in buttons, landing pages, email campaigns, and ads.",
      },
      {
        question: "What makes a CTA effective?",
        answer:
          "A clear action, a benefit, and a sense of urgency make a CTA stronger.",
      },
    ],
  },

} as const;
