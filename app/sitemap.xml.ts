import { tools } from "@/app/lib/tools";

export async function GET() {
  const baseUrl = "https://yourdomain.com";
  const staticPages = ["/", "/tools", "/login", "/signup"];
  const toolPages = Object.keys(tools).map((tool) => `/tools/${tool}`);
  const urls = [...staticPages, ...toolPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (url) =>
        `  <url>\n    <loc>${baseUrl}${url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
    )
    .join("\n")}\n</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
