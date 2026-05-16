import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const host = request.headers.get("host") ?? "yourdomain.com";
  const domain = `https://${host}`;

  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\nHost: ${host}\n`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
