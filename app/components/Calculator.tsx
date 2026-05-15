"use client";

import { useEffect, useState } from "react";

const currencyData: Record<string, { symbol: string; rateToUSD: number }> = {
  USD: { symbol: "$", rateToUSD: 1 },
  EUR: { symbol: "€", rateToUSD: 1.09 },
  GBP: { symbol: "£", rateToUSD: 1.25 },
  AUD: { symbol: "A$", rateToUSD: 0.65 },
  CAD: { symbol: "C$", rateToUSD: 0.74 },
  JPY: { symbol: "¥", rateToUSD: 0.0067 },
  CHF: { symbol: "CHF", rateToUSD: 1.09 },
  PHP: { symbol: "₱", rateToUSD: 0.0178 },
  THB: { symbol: "฿", rateToUSD: 0.028 },
  IDR: { symbol: "Rp", rateToUSD: 0.000064 },
};

const currencyOptions = Object.entries(currencyData).map(
  ([value, info]) => ({
    value,
    label: value,
    symbol: info.symbol,
    rateToUSD: info.rateToUSD,
  })
);

const majorCurrencyPairs = [
  "USD/EUR",
  "USD/GBP",
  "USD/PHP",
  "USD/THB",
  "USD/IDR",
  "USD/AUD",
  "USD/CAD",
  "USD/JPY",
  "USD/CHF",
];

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

export default function Calculator({
  title,
  fields,
  type,
}: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [inputCurrency, setInputCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [exchangeRateStatus, setExchangeRateStatus] = useState<"idle" | "loading" | "error">("idle");

  const isProfitMargin = type === "profitMargin";
  const isBreakEven = type === "breakEven";
  const isHourlyRate = type === "hourlyRate";
  const isPricingMarkup = type === "pricingMarkup";
  const isROI = type === "roi";

  const guidanceMessage: Record<CalculatorType, string | null> = {
    profitMargin:
      "Profit margin shows what share of revenue remains after cost, expressed as a percentage.",
    startupCost:
      "Startup cost is the total of equipment and marketing expenses needed to launch your business.",
    breakEven:
      "Price per unit must be greater than variable cost per unit to reach break-even.",
    pricingMarkup:
      "Markup shows how much above cost you’re selling your product, expressed as a percentage.",
    roi:
      "ROI compares profit to investment and is displayed as a percentage.",
    hourlyRate:
      "Hourly rate uses income plus expenses divided by billable hours, then converts to your selected currency.",
    hookGenerator: null,
    nameGenerator: null,
    sloganGenerator: null,
    ctaGenerator: null,
  };

  const selectedTargetCurrencyInfo =
    currencyData[targetCurrency] ?? currencyData.USD;
  const selectedTargetSymbol = selectedTargetCurrencyInfo.symbol;
  const selectedInputCurrencyInfo =
    currencyData[inputCurrency] ?? currencyData.USD;
  const selectedInputSymbol = selectedInputCurrencyInfo.symbol;
  const staticConversionRate =
    selectedInputCurrencyInfo.rateToUSD / selectedTargetCurrencyInfo.rateToUSD;
  const effectiveConversionRate =
    exchangeRate ?? staticConversionRate;
  const conversionLabel = `1 ${inputCurrency} = ${effectiveConversionRate.toFixed(6)} ${targetCurrency}`;
  const conversionNote =
    isHourlyRate && inputCurrency !== targetCurrency
      ? exchangeRateStatus === "loading"
        ? "Fetching live exchange rate..."
        : exchangeRateStatus === "error"
        ? "Live rate unavailable, using static fallback estimates."
        : "Live market exchange rate applied."
      : null;

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchLiveExchangeRate = async (from: string, to: string) => {
    if (from === to) {
      setExchangeRate(1);
      setExchangeRateStatus("idle");
      return;
    }

    setExchangeRateStatus("loading");

    try {
      const response = await fetch(
        `https://api.exchangerate.host/latest?base=${from}&symbols=${to}`
      );
      const data = await response.json();

      if (!data || !data.rates || typeof data.rates[to] !== "number") {
        throw new Error("Invalid exchange rate response");
      }

      setExchangeRate(data.rates[to]);
      setExchangeRateStatus("idle");
    } catch (error) {
      console.error("Exchange rate fetch failed:", error);
      setExchangeRate(null);
      setExchangeRateStatus("error");
    }
  };

  useEffect(() => {
    if (!isHourlyRate) {
      return;
    }

    fetchLiveExchangeRate(inputCurrency, targetCurrency);
  }, [inputCurrency, targetCurrency, isHourlyRate]);

  const parseNumber = (value: string) => {
    const cleaned = String(value).trim().replace(/,/g, "");
    return Number(cleaned);
  };

  const pushToHistory = (value: string) => {
    setHistory((prev) => {
      const updated = [value, ...prev];
      return updated.slice(0, 5);
    });
  };

  const calculate = () => {
    const v: Record<string, number> = {};
    const isProfitMargin = type === "profitMargin";
    const isHourlyRate = type === "hourlyRate";
    const isPricingMarkup = type === "pricingMarkup";
    const isROI = type === "roi";

    for (const key in values) {
      const num = parseNumber(values[key]);
      v[key] = isNaN(num) ? 0 : num;
    }

    let res: number | string = 0;

    // ======================
    // CALCULATORS
    // ======================

    if (type === "profitMargin") {
      const revenue = v.revenue ?? 0;
      const cost = v.cost ?? 0;

      if (!Number.isFinite(revenue) || !Number.isFinite(cost) || revenue <= 0) {
        setResult(0); // number, not string
        return;
      }   

    const profit = revenue - cost;
    const marginPercent = (profit / revenue) * 100;

    setResult(marginPercent); // e.g. 20 for 20%
    return;
    }

    if (type === "breakEven") {
      const contribution =
        v.pricePerUnit - v.variableCost;

      if (contribution <= 0) {
        setResult(0);
        return;
      }

      res = Math.ceil(v.fixedCost / contribution);
    }

    if (type === "startupCost") {
      const equipment = v.equipment || 0;
      const marketing = v.marketing || 0;
      res = equipment + marketing;
    }

    if (type === "pricingMarkup") {
      if (v.cost <= 0) {
        setResult(0);
        return;
      }

      res =
        ((v.sellingPrice - v.cost) / v.cost) * 100;
    }

    if (type === "roi") {
      if (v.investment <= 0) {
        setResult(0);
        return;
      }

      res = (v.profit / v.investment) * 100;
    }

    if (type === "hourlyRate") {
      const income = v.monthlyIncome || 0;
      const expenses = v.expenses || 0;
      const hours = v.billableHours || 1;

      if (hours <= 0) {
        setResult(0);
        return;
      }

      const rawRate = (income + expenses) / hours;
      res = rawRate * effectiveConversionRate;
    }

    // ======================
    // HOOK GENERATOR
    // ======================

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

    // ======================
    // NAME GENERATOR
    // ======================

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

    // ======================
    // SLOGAN GENERATOR
    // ======================

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

      const output =
        slogans[Math.floor(Math.random() * slogans.length)];

      setResult(output);
      pushToHistory(output);
      return;
    }

    // ======================
    // CTA GENERATOR
    // ======================

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

      const output =
        ctas[Math.floor(Math.random() * ctas.length)];

      setResult(output);
      pushToHistory(output);
      return;
    }

    setResult(res);

    if (typeof res === "number") {
      const formattedNumber = res.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      const formattedResult =
        isProfitMargin || isPricingMarkup || isROI
          ? `${formattedNumber}%`
          : isBreakEven
          ? `${formattedNumber} units`
          : isHourlyRate
          ? `${selectedTargetSymbol}${formattedNumber} ${targetCurrency} / hour`
          : formattedNumber;

      pushToHistory(formattedResult);
    }
  };

  const regenerate = () => {
    calculate();
  };

  const copyToClipboard = async () => {
    if (!result && displayResult === null) return;

    try {
      await navigator.clipboard.writeText(
        displayResult ?? String(result)
      );

      alert("Copied to clipboard!");
    } catch {
      alert("Copy failed.");
    }
  };

  let displayResult: string | null = null;

  if (result === null) {
    displayResult = null;
  } else if (typeof result === "string") {
    displayResult = result;
  } else if (isProfitMargin || isPricingMarkup || isROI) {
    displayResult = `${result.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}%`;
  } else if (isBreakEven) {
    displayResult = `${result.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} units`;
  } else if (isHourlyRate) {
    displayResult = `${selectedTargetSymbol}${result.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ${targetCurrency} / hour`;
  } else {
    displayResult = result.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-[2rem] shadow-[0_30px_70px_-40px_rgba(37,99,235,0.35)] border border-slate-200 p-8 w-full">

        <h1 className="text-3xl font-bold text-center mb-6 text-[var(--color-text)]">
          {title}
        </h1>

        {fields.map((field) => (
          <div
            key={field.name}
            className="relative mb-6"
          >
            <input
              id={field.name}
              type={field.type || "number"}
              placeholder=" "
              onChange={(e) =>
                handleChange(field.name, e.target.value)
              }
              className="peer w-full border border-slate-200 rounded-xl px-4 pt-6 pb-2 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />

            <label
              htmlFor={field.name}
              className="absolute left-4 top-2 text-sm text-slate-500 transition-all
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-lg
              peer-focus:top-2
              peer-focus:text-sm"
            >
              {field.placeholder}
            </label>
          </div>
        ))}

        {guidanceMessage[type] && (
          <div
            className={`mb-6 rounded-2xl p-4 text-sm ${
              isBreakEven
                ? "border border-[#10B981]/50 bg-[#D1FAE5] text-[#064E3B]"
                : "border border-[#10B981]/30 bg-[#ECFDF5] text-[#065F46]"
            }`}
          >
            {guidanceMessage[type]}
          </div>
        )}

        {isHourlyRate && (
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="inputCurrency"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Input currency
              </label>

              <select
                id="inputCurrency"
                value={inputCurrency}
                onChange={(e) => setInputCurrency(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <p className="text-sm text-gray-500 mt-3">
                Enter income and expenses in the selected currency.
              </p>
            </div>

            <div>
              <label
                htmlFor="targetCurrency"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Convert to currency
              </label>

              <select
                id="targetCurrency"
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <p className="text-sm text-gray-500 mt-3">
                Major pairs: {majorCurrencyPairs.join(" · ")}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                * After changing input or target currency, click Calculate again to refresh the converted rate.
              </p>
            </div>
          </div>
        )}

        <button
          onClick={calculate}
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-lg text-lg font-semibold transition"
        >
          {type === "hookGenerator" ||
          type === "nameGenerator" ||
          type === "sloganGenerator" ||
          type === "ctaGenerator"
            ? "Generate"
            : "Calculate"}
        </button>

        {result !== null && (
          <div className="mt-8 text-center whitespace-pre-line">

            <p className="text-gray-500 mb-2">
              Result
            </p>

            <div className="text-4xl font-bold text-[var(--color-text)] mb-4">
              {displayResult ?? "—"}
            </div>

            {isHourlyRate && (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  {conversionLabel}
                </p>
                {conversionNote && (
                  <p className="text-sm text-slate-500">
                    {conversionNote}
                  </p>
                )}
              </>
            )}

            {(type === "hookGenerator" ||
              type === "nameGenerator" ||
              type === "sloganGenerator" ||
              type === "ctaGenerator") && (
              <div className="flex gap-3 justify-center mb-6">

                <button
                  onClick={regenerate}
                  className="bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition"
                >
                  Regenerate
                </button>

                <button
                  onClick={copyToClipboard}
                  className="bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition"
                >
                  Copy
                </button>

              </div>
            )}

            {history.length > 0 && (
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