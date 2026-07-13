import { NextResponse } from "next/server";
import { resources } from "@/lib/seo-content";
export function GET(_: Request, { params }: { params: { slug: string } }) {
  const item = resources.find(x => x.slug === params.slug);
  if (!item) return new NextResponse("Not found", { status: 404 });
  const body = [`# ${item.title}`, "", item.description, "", `Type: ${item.kind}`, `Reading time: ${item.readTime}`, "", ...item.sections.flatMap((section, i) => [`## ${i + 1}. ${section}`, "", `Use this section to evaluate ${section.toLowerCase()}, including operational constraints, architecture boundaries, evidence, ownership, and failure handling.`, ""]), "---", "Forgestack Labs LLP · hello@forgestacklabs.com"].join("\n");
  return new NextResponse(body, { headers: { "Content-Type": "text/markdown; charset=utf-8", "Content-Disposition": `attachment; filename="${item.slug}.md"` } });
}
