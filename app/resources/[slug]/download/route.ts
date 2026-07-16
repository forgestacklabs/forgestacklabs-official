import { NextResponse } from "next/server";
import { resources } from "@/lib/seo-content";

const pageWidth = 612;
const pageHeight = 792;
const marginX = 56;
const startY = 720;
const lineHeight = 17;
const maxLineChars = 86;

type PdfLine = {
  text: string;
  size?: number;
  leading?: number;
};

function cleanText(value: string) {
  return value
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/·/g, "-")
    .replace(/[^\x20-\x7E]/g, "");
}

function escapePdfText(value: string) {
  return cleanText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapText(value: string, maxChars = maxLineChars) {
  const words = cleanText(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function buildPdf(lines: PdfLine[]) {
  const pages: PdfLine[][] = [];
  let currentPage: PdfLine[] = [];
  let currentY = startY;

  for (const line of lines) {
    const leading = line.leading ?? lineHeight;
    if (currentY < 72) {
      pages.push(currentPage);
      currentPage = [];
      currentY = startY;
    }
    currentPage.push(line);
    currentY -= leading;
  }

  if (currentPage.length) pages.push(currentPage);

  const objects: string[] = [];
  const addObject = (body: string) => {
    objects.push(body);
    return objects.length;
  };

  const catalogId = addObject("");
  const pagesId = addObject("");
  const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pageIds: number[] = [];

  pages.forEach((pageLines, pageIndex) => {
    let y = startY;
    const textOps = pageLines
      .map((line) => {
        const size = line.size ?? 11;
        const op = `BT /F1 ${size} Tf ${marginX} ${y} Td (${escapePdfText(line.text)}) Tj ET`;
        y -= line.leading ?? lineHeight;
        return op;
      })
      .join("\n");

    const footer = `BT /F1 9 Tf ${marginX} 42 Td (${escapePdfText(
      `Forgestack Labs LLP - Page ${pageIndex + 1} of ${pages.length}`,
    )}) Tj ET`;
    const stream = `${textOps}\n${footer}`;
    const contentId = addObject(`<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`);
    const pageId = addObject(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`,
    );
    pageIds.push(pageId);
  });

  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((body, index) => {
    offsets[index + 1] = Buffer.byteLength(pdf, "latin1");
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, "latin1");
}

export function GET(_: Request, { params }: { params: { slug: string } }) {
  const item = resources.find((resource) => resource.slug === params.slug);
  if (!item) return new NextResponse("Not found", { status: 404 });

  const lines: PdfLine[] = [
    { text: "FORGESTACK LABS", size: 10, leading: 24 },
    { text: item.title, size: 24, leading: 34 },
    { text: `${item.kind} - ${item.readTime} read`, size: 11, leading: 24 },
    ...wrapText(item.description, 78).map((text) => ({ text, size: 12, leading: 18 })),
    { text: "", leading: 16 },
  ];

  item.sections.forEach((section, index) => {
    lines.push({ text: `${index + 1}. ${section}`, size: 16, leading: 26 });
    wrapText(
      `Use this section to evaluate ${section.toLowerCase()}, including operational constraints, architecture boundaries, evidence, ownership, and failure handling.`,
      88,
    ).forEach((text) => lines.push({ text, size: 11, leading: 17 }));
    lines.push({ text: "", leading: 12 });
  });

  lines.push({ text: "Forgestack Labs LLP - hello@forgestacklabs.com", size: 10, leading: 16 });

  const pdf = buildPdf(lines);

  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${item.slug}.pdf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
