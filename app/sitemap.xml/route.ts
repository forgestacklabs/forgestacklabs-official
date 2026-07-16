import { NextResponse } from "next/server";

import { industries, resources, technologies } from "@/lib/seo-content";

const baseUrl = "https://www.forgestacklabs.com";

const pages = [
  { path: "", changefreq: "weekly", priority: "1.0" },
  { path: "/products", changefreq: "weekly", priority: "0.9" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/careers", changefreq: "weekly", priority: "0.7" },
  { path: "/resources", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/case-studies", changefreq: "monthly", priority: "0.8" },
  { path: "/industries", changefreq: "monthly", priority: "0.8" },
  { path: "/technologies", changefreq: "monthly", priority: "0.8" },
  { path: "/insights", changefreq: "weekly", priority: "0.8" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/forgestack-capability-deck.html", changefreq: "monthly", priority: "0.4" },
  ...industries.map(({ slug }) => ({ path: `/industries/${slug}`, changefreq: "monthly", priority: "0.7" })),
  ...technologies.map(({ slug }) => ({ path: `/technologies/${slug}`, changefreq: "monthly", priority: "0.7" })),
  ...resources.map(({ slug }) => ({ path: `/resources/${slug}`, changefreq: "monthly", priority: "0.6" })),
];

export async function GET() {
  const urls = pages
    .map(
      ({ path, changefreq, priority }) => `  <url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
