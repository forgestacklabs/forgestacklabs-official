import { NextResponse } from "next/server";

const deckSections = [
  {
    title: "What we build",
    lines: [
      "Operational software for offline-first billing, inventory, reconciliation, and field workflows.",
      "Enterprise SaaS products for secure, measurable, multi-tenant operations.",
      "AI automation for documents, support, and decision workflows with human controls.",
      "Custom platforms for organizations with complex operational requirements.",
      "Remote software delivery for companies in India and international markets.",
    ],
  },
  {
    title: "Delivery model",
    lines: [
      "Discovery and operational mapping.",
      "Architecture and risk review.",
      "UX prototypes and acceptance criteria.",
      "Iterative development with continuous QA.",
      "Deployment, observability, and support.",
    ],
  },
  {
    title: "Flagship capability",
    lines: [
      "Fuel OS is an offline-first fuel retail platform connecting billing, stock, credit, shifts, reconciliation, and management reporting.",
    ],
  },
  {
    title: "Engage us",
    lines: ["Product deployment, custom engineering, and architecture consultation."],
  },
];

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapText(value: string, maxChars = 88) {
  const words = value.split(/\s+/).filter(Boolean);
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

function buildCapabilityDeckPdf() {
  const contentLines: Array<{ text: string; size: number; gap: number }> = [
    { text: "FORGESTACK LABS CAPABILITY DECK", size: 10, gap: 28 },
    { text: "Engineering operational software that lasts.", size: 24, gap: 36 },
    {
      text: "Forgestack Labs is a founder-led software engineering company based in Mangaluru, India, building custom software for India and international markets.",
      size: 12,
      gap: 24,
    },
  ];

  deckSections.forEach((section, index) => {
    contentLines.push({ text: `${index + 1}. ${section.title}`, size: 16, gap: 26 });
    section.lines.forEach((line) => {
      wrapText(line).forEach((wrappedLine) => contentLines.push({ text: wrappedLine, size: 11, gap: 17 }));
    });
    contentLines.push({ text: "", size: 11, gap: 12 });
  });

  contentLines.push({ text: "hello@forgestacklabs.com - forgestacklabs.com - Mangaluru, India", size: 10, gap: 14 });

  let y = 720;
  const stream = contentLines
    .map((line) => {
      if (!line.text) {
        y -= line.gap;
        return "";
      }
      const operation = `BT /F1 ${line.size} Tf 56 ${y} Td (${escapePdfText(line.text)}) Tj ET`;
      y -= line.gap;
      return operation;
    })
    .filter(Boolean)
    .join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`,
  ];

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
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, "latin1");
}

export function GET() {
  return new NextResponse(buildCapabilityDeckPdf(), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="forgestack-capability-deck.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
