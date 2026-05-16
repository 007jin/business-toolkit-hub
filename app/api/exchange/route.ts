import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const base = url.searchParams.get("base") || "USD";
    const symbols = url.searchParams.get("symbols") || "";

    // Try exchangerate.host first (free, no key)
    try {
      const erUrl = `https://api.exchangerate.host/latest?base=${encodeURIComponent(
        base
      )}${symbols ? `&symbols=${encodeURIComponent(symbols)}` : ""}`;
      const erRes = await fetch(erUrl);
      if (erRes.ok) {
        const data = await erRes.json();
        if (data && data.rates) {
          return NextResponse.json({ rates: data.rates });
        }
      }
    } catch (e) {
      // fallthrough to alternative provider
    }

    // Fallback to Frankfurter (free)
    try {
      const frUrl = `https://api.frankfurter.app/latest?from=${encodeURIComponent(
        base
      )}${symbols ? `&to=${encodeURIComponent(symbols)}` : ""}`;
      const frRes = await fetch(frUrl);
      if (frRes.ok) {
        const data = await frRes.json();
        if (data && data.rates) {
          return NextResponse.json({ rates: data.rates });
        }
      }
    } catch (e) {
      // nothing
    }

    return NextResponse.json({ error: "Exchange rate fetch failed" }, { status: 502 });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
