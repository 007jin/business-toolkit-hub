export const metadata = {
  title: "Business Toolkit Hub",
  description:
    "Free business calculators, startup tools, and marketing resources for entrepreneurs and freelancers.",
};

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto w-full">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Free Business Tools for Entrepreneurs
        </h1>

        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
          Calculate profits, estimate startup costs, analyze break-even points,
          and access powerful business tools designed for startups,
          freelancers, and small businesses.
        </p>

        <a
          href="/tools"
          className="inline-block bg-black text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition"
        >
          Explore Tools
        </a>
      </section>

      {/* FEATURED TOOLS */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold mb-10">
          Featured Tools
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* TOOL CARD */}
          <a
            href="/tools/profit-margin-calculator"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-bold mb-3">
              Profit Margin Calculator
            </h3>

            <p className="text-gray-600">
              Quickly calculate your business profit margin percentage.
            </p>
          </a>

          {/* TOOL CARD */}
          <a
            href="/tools/startup-cost-calculator"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-bold mb-3">
              Startup Cost Calculator
            </h3>

            <p className="text-gray-600">
              Estimate startup expenses for your business idea.
            </p>
          </a>

          {/* TOOL CARD */}
          <a
            href="/tools/break-even-calculator"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-bold mb-3">
              Break-even Calculator
            </h3>

            <p className="text-gray-600">
              Find how many sales you need before making profit.
            </p>
          </a>

          {/* TOOL CARD */}
          <a
            href="/tools/roi-calculator"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-bold mb-3">
              ROI Calculator
            </h3>

            <p className="text-gray-600">
              Calculate your return on investment for business opportunities.
            </p>
          </a>

        </div>
      </section>

      {/* WHY USE */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-8">
            Why Use Business Toolkit Hub?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div>
              <h3 className="text-2xl font-semibold mb-3">
                Fast
              </h3>

              <p className="text-gray-600">
                Get instant results with easy-to-use online calculators.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3">
                Free
              </h3>

              <p className="text-gray-600">
                Access powerful business tools without subscriptions.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3">
                Built for Entrepreneurs
              </h3>

              <p className="text-gray-600">
                Designed specifically for startups, freelancers, and small businesses.
              </p>
            </div>

          </div>
        </div>
      </section>
      </div>
    </main>
  );
}