import type { Metadata } from "next";
import ManifestoClient from "./ManifestoClient";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "The ForgeStack philosophy: we do not build software for its own sake; we engineer confidence, clarity, ownership, and trust.",
  alternates: { canonical: "/manifesto" },
  openGraph: {
    title: "Manifesto | Forgestack Labs",
    description:
      "The ForgeStack philosophy on confidence, trust, ownership, simplicity, design, and long-term software engineering.",
    url: "/manifesto",
    type: "website",
  },
};

const principles = [
  {
    eyebrow: "Confidence",
    title: "We do not build software. We engineer confidence.",
    copy:
      "Great software is measured by the confidence it gives people to operate, decide, serve customers, and grow without unnecessary uncertainty.",
  },
  {
    eyebrow: "Responsibility",
    title: "Engineering is accepting responsibility.",
    copy:
      "Every client places operations, ideas, investment, and trust in our hands. That responsibility shapes every architecture review and every line of code.",
  },
  {
    eyebrow: "Ownership",
    title: "We think like owners, not vendors.",
    copy:
      "The question behind every recommendation is simple: if this were our own company, would we build it this way?",
  },
  {
    eyebrow: "Simplicity",
    title: "Simplicity is sophistication.",
    copy:
      "Every workflow should feel natural, every interaction should have purpose, and every screen should remove friction instead of adding it.",
  },
  {
    eyebrow: "Design",
    title: "Design is not decoration.",
    copy:
      "Design begins before the first screen. It decides what matters, what should be noticed first, and what complexity can be hidden.",
  },
  {
    eyebrow: "Trust",
    title: "Trust is our most valuable deliverable.",
    copy:
      "Projects finish and software evolves, but trust remains. It is earned through honest conversations, thoughtful recommendations, and responsible decisions.",
  },
] as const;

export default function ManifestoPage() {
  return <ManifestoClient principles={principles} />;
}
