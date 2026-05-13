"use client";

import { useState } from "react";

export type Field = {
  name: string;
  placeholder: string;
  type?: "number" | "text";
};

export type CalculatorType =
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

type Props = {
  title: string;
  fields: readonly Field[];
  type: CalculatorType;
};

export default function Calculator({ title, fields, type }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const pushToHistory = (value: string) => {
    setHistory((prev) => {
      const updated = [value, ...prev];
      return updated.slice(0, 5);
    });
  };

  const calculate = () => {
    const v: Record<string, number> = {};

    for (const key in values) {
      const num = Number(values[key]);
      v[key] = isNaN(num) ? 0 : num;
    }

    let res: number | string = 0;

    // =========================
    // CALCULATORS
    // =========================

    if (type === "profitMargin") {
      const profit = v.revenue - v.cost;
      res = (profit / v.revenue) * 100;
    }

    if (type === "startupCost") {
      res = v.equipment + v.marketing;
    }

    if (type === "breakEven") {
      const contribution = v.pricePerUnit - v.variableCost;
      if (contribution <= 0) {
        setResult(0);
        return;
      }
      res = v.fixedCost / contribution;
    }

    if (type === "pricingMarkup") {
      res = ((v.sellingPrice - v.cost) / v.cost) * 100;
    }

    if (type === "roi") {
      res = (v.profit / v.investment) * 100;
    }

    if (type === "hourlyRate") {
      const income = v.monthlyIncome;
      const expenses = v.expenses;
      const hours = v.billableHours;

      if (hours <= 0) {
        setResult(0);
        return;
      }

      res = (income + expenses) / hours;
    }

    // =========================
    // HOOK GENERATOR
    // =========================

    if (type === "hookGenerator") {
      const product = values.product || "your product";

      const hooks = [
        `This ${product} changed everything.`,
        `Why everyone is switching to ${product}.`,
        `I wish I found ${product} sooner.`,
        `${product} is quietly disrupting the industry.`,
        `The truth about ${product} no one talks about.`,
      ];

      const output =
        hooks[Math.floor(Math.random() * hooks.length)];

      setResult(output);
      pushToHistory(output);
      return;
    }

    // =========================
    // NAME GENERATOR (UPGRADED)
    // =========================

    if (type === "nameGenerator") {
      const keyword = values.keyword || "idea";
      const tone = (values.tone || "modern").toLowerCase();

      const prefixes: Record<string, string[]> = {
        modern: ["Neo", "Next", "Nova", "Smart", "Urban", "Flow", "Bright", "Fresh", "Core", "Alpha"],
        luxury: ["Elite", "Prime", "Royal", "Lux", "Gold", "Velvet", "Noble", "Crown", "Opal", "Aurea"],
        fun: ["Go", "Hey", "Zippy", "Happy", "Fun", "Buzz", "Jolly", "Witty", "Pop", "Sprout"],
        tech: ["Tech", "AI", "Cyber", "Data", "Logic", "Byte", "Quantum", "Nano", "Neuro", "Code"],
        minimal: ["Simple", "Pure", "Clear", "Core", "Mono", "Zen", "Flat", "Light", "Soft", "True"],
      };
      

      const suffixes: Record<string, string[]> = {
        modern: ["Hub", "Lab", "Works", "Flow", "Space", "Studio", "Base", "Zone", "Stack", "Forge"],
        luxury: ["Club", "House", "Estate", "Studio", "Vault", "Luxe", "Palace", "Atelier", "Reserve", "Hall"],
        fun: ["ify", "ly", "oo", "pop", "spark", "topia", "ville", "jam", "boo", "ster"],
        tech: ["AI", "X", "IO", "Tech", "Systems", "Cloud", "Net", "Matrix", "Engine", "Core"],
        minimal: ["Co", "Lab", "HQ", "Base", "One", "Unit", "Dot", "Index", "Form", "Root"],
      };

      const p = prefixes[tone] || prefixes.modern;
      const s = suffixes[tone] || suffixes.modern;

      const formats = [
        () => `${keyword}${s[Math.floor(Math.random() * s.length)]}`,
        () => `${p[Math.floor(Math.random() * p.length)]}${keyword}`,
        () =>
          `${p[Math.floor(Math.random() * p.length)]}${keyword}${
            s[Math.floor(Math.random() * s.length)]
          }`,
      ];

      const output = formats[Math.floor(Math.random() * formats.length)]();

      setResult(output);
      pushToHistory(output);
      return;
    }

    if (type === "sloganGenerator") {
      const keyword = values.keyword || "your brand";

      const slogans = [
        `Smarter growth for ${keyword}.`,
        `Built for better ${keyword}.`,
        `Unlock your ${keyword} potential.`,
        `The future of ${keyword}.`,
        `Make ${keyword} simpler.`,
        `Where ${keyword} meets innovation.`,
        `Elevate your ${keyword} game.`,
        `Designed for modern ${keyword}.`,
        `Powering next-gen ${keyword}.`,
        `Better tools for better ${keyword}.`,

        `Reimagine what ${keyword} can be.`,
        `Take your ${keyword} further.`,
        `Less effort, more ${keyword}.`,
        `Upgrade your ${keyword} today.`,
        `Simple. Fast. Effective ${keyword}.`,
        `Your journey to better ${keyword} starts here.`,
        `Built to transform ${keyword}.`,
        `The smarter way to do ${keyword}.`,
        `Unlock growth in ${keyword}.`,
        `Performance meets ${keyword}.`,

        `Scale your ${keyword} faster.`,
        `Make every ${keyword} count.`,
        `Next-level ${keyword} solutions.`,
        `Your ${keyword}, redefined.`,
        `Future-ready ${keyword} tools.`,
        `Create. Improve. Master ${keyword}.`,
        `Innovation for ${keyword} leaders.`,
        `Breakthrough ideas for ${keyword}.`,
        `All-in-one ${keyword} solution.`,
        `The edge your ${keyword} needs.`,

        `Where ideas turn into ${keyword}.`,
        `Smart solutions for ${keyword} builders.`,
        `Grow beyond limits in ${keyword}.`,
        `Simplifying complex ${keyword}.`,
        `The ultimate ${keyword} upgrade.`,
        `Transforming the way you do ${keyword}.`,
        `Effortless excellence in ${keyword}.`,
        `Built for creators of ${keyword}.`,
        `From idea to impact in ${keyword}.`,
        `Accelerate your ${keyword} journey.`,

        `The modern standard for ${keyword}.`,
        `Turn your ${keyword} into success.`,
        `Optimize every part of your ${keyword}.`,
        `Stronger ${keyword} starts here.`,
        `Fuel your ${keyword} growth.`,
        `Make ${keyword} work smarter.`,
        `Next-gen thinking for ${keyword}.`,
        `Your shortcut to better ${keyword}.`,
        `Revolutionize your ${keyword} workflow.`,
        `Built for results in ${keyword}.`,

        `The power behind great ${keyword}.`,
        `Everything your ${keyword} needs.`,
        `Create impact with ${keyword}.`,
        `Grow smarter, not harder in ${keyword}.`,
        `Turn potential into ${keyword}.`,
        `The future belongs to ${keyword}.`,
        `Engineered for peak ${keyword}.`,
        `Your ${keyword} advantage.`,
      ];

      const resultSlogan =
        slogans[Math.floor(Math.random() * slogans.length)];

      setResult(resultSlogan);
      return;
    }

    if (type === "ctaGenerator") {
      const keyword = values.keyword || "your product";

      const ctas = [
        `Get started with ${keyword}.`,
        `Try ${keyword} free today.`,
        `Unlock ${keyword} now.`,
        `Start your journey with ${keyword}.`,
        `Boost your results with ${keyword}.`,
        `Get instant access to ${keyword}.`,
        `Transform your workflow with ${keyword}.`,
        `Join thousands using ${keyword}.`,
        `Start improving your ${keyword} today.`,
        `Experience ${keyword} now.`,
        `Take action with ${keyword}.`,
        `Upgrade to ${keyword} instantly.`,

        `Get started free with ${keyword}.`,
        `Start using ${keyword} today.`,
        `Discover what ${keyword} can do.`,
        `Activate ${keyword} in seconds.`,
        `Claim your ${keyword} access.`,
        `Begin your ${keyword} journey.`,
        `Launch ${keyword} now.`,
        `Improve your results with ${keyword}.`,
        `Unlock full potential with ${keyword}.`,
        `Get better results using ${keyword}.`,

        `Try ${keyword} without risk.`,
        `See how ${keyword} works.`,
        `Start winning with ${keyword}.`,
        `Take your ${keyword} to the next level.`,
        `Make ${keyword} work for you.`,
        `Get results with ${keyword} today.`,
        `Boost performance with ${keyword}.`,
        `Start growing with ${keyword}.`,
        `Get more from ${keyword}.`,
        `Use ${keyword} to scale faster.`,

        `Don’t wait — start ${keyword} now.`,
        `Join the ${keyword} revolution.`,
        `Get ahead with ${keyword}.`,
        `Make the switch to ${keyword}.`,
        `Start smart with ${keyword}.`,
        `Get instant results from ${keyword}.`,
        `Try the best of ${keyword}.`,
        `Unlock growth with ${keyword}.`,
        `Start your upgrade with ${keyword}.`,
        `Power your success with ${keyword}.`,

        `Get serious about ${keyword}.`,
        `Start achieving more with ${keyword}.`,
        `Make progress with ${keyword}.`,
        `See instant improvement with ${keyword}.`,
        `Get more done with ${keyword}.`,
        `Take control with ${keyword}.`,
        `Start building with ${keyword}.`,
        `Achieve more using ${keyword}.`,
        `Upgrade your experience with ${keyword}.`,
        `Start transforming your ${keyword}.`,
      ];

      const resultCTA =
        ctas[Math.floor(Math.random() * ctas.length)];

      setResult(resultCTA);
      return;
    }

    setResult(res);

    if (typeof res === "number") {
      pushToHistory(res.toFixed(2));
    }
  };

  const regenerate = () => {
    if (type !== "hookGenerator" && type !== "nameGenerator") return;
    calculate();
  };

  const copyToClipboard = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(String(result));
    alert("Copied to clipboard!");
  };

  return (
    <div className="w-full">
      <div className="bg-[var(--color-card)] rounded-2xl shadow-lg border border-gray-100 p-8 w-full">
      
     

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          {title}
        </h1>

        {/* INPUTS */}
        {fields.map((field) => (
          <div key={field.name} className="relative mb-6">

            <input
              id={field.name}
              type={field.type || "number"}
              placeholder=" "
              onChange={(e) =>
                handleChange(field.name, e.target.value)
              }
              className="peer w-full border border-gray-200 focus:border-[var(--color-primary)] rounded-lg px-4 pt-6 pb-2 text-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            <label
              htmlFor={field.name}
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg
              peer-focus:top-2 peer-focus:text-sm"
            >
              {field.placeholder}
            </label>

          </div>
        ))}

        {/* BUTTON */}
        <button
          onClick={calculate}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
        >
          {type === "hookGenerator" || type === "nameGenerator" || type === "sloganGenerator"
            ? "Generate"
            : "Calculate"}
        </button>

        {/* RESULT */}
        {result !== null && (
          <div className="mt-8 text-center whitespace-pre-line">

            <p className="text-gray-500 mb-2">Result</p>

            <div className="text-4xl font-bold text-[var(--color-text)] mb-4">
              {typeof result === "number"
                ? type === "hourlyRate"
                  ? `${result.toFixed(2)} hour(s)`
                  : `${result.toFixed(2)}`
                : result}
            </div>

            {/* ACTIONS */}
            {(type === "hookGenerator" || type === "nameGenerator") && (
              <div className="flex gap-3 justify-center mb-6">

                <button
                  onClick={regenerate}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:opacity-90"
                >
                  Regenerate
                </button>

                <button
                  onClick={copyToClipboard}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
                >
                  Copy
                </button>

              </div>
            )}

            {/* HISTORY */}
            {(type === "hookGenerator" || type === "nameGenerator") &&
              history.length > 0 && (
                <div className="text-left mt-6 border-t pt-4">

                  <p className="text-sm text-gray-500 mb-2">
                    History
                  </p>

                  <ul className="space-y-2 text-sm">
                    {history.map((item, index) => (
                      <li
                        key={index}
                        className="bg-gray-100 p-2 rounded"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                </div>
              )}

          </div>
        )}
      </div>
    </div>
  );
}