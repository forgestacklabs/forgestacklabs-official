import type { Metadata } from "next";
import EditorialPage from "@/components/EditorialPage";

export const metadata: Metadata = {
  title: "Research",
  description:
    "ForgeStack Labs research into artificial intelligence, operational intelligence, offline computing, human-centred design, automation, and digital twins.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research | Forgestack Labs",
    description:
      "Research and innovation themes across AI, operational intelligence, offline computing, enterprise automation, and digital twins.",
    url: "/research",
    type: "website",
  },
};

const items = [
  {
    eyebrow: "Innovation",
    title: "Innovation begins with observation.",
    copy:
      "We do not begin with technology. We begin by studying how work happens, where complexity appears, and which problems deserve better systems.",
    points: ["Operational observation", "Problem-first thinking", "Useful patterns"],
  },
  {
    eyebrow: "Experiments",
    title: "Some ideas become products. Many stay on the whiteboard.",
    copy:
      "Research gives us a place to test ideas, internal tools, product directions, and engineering patterns before they become part of a client or product system.",
    points: ["Internal tools", "Prototype thinking", "Validated usefulness"],
  },
  {
    eyebrow: "Roadmap",
    title: "Research feeds the future ForgeStack ecosystem.",
    copy:
      "The roadmap is shaped by operational problems that become clear through research, including AI, offline computing, automation, digital twins, and decision support.",
    points: ["Future products", "Evolving platforms", "Operational clarity"],
    href: "/research-timeline",
  },
  {
    eyebrow: "Artificial intelligence",
    title: "AI that improves operational decisions.",
    copy:
      "We study AI where it can reduce repetitive work, summarize operational context, and support better decisions without removing human accountability.",
    points: ["Human-in-the-loop", "Operational context", "Measurable value"],
  },
  {
    eyebrow: "Operational intelligence",
    title: "Turning daily events into usable clarity.",
    copy:
      "Research begins with how work actually happens: handovers, exceptions, reconciliations, approvals, and decisions that deserve clearer systems.",
    points: ["Exception-first reporting", "Event models", "Decision support"],
  },
  {
    eyebrow: "Offline computing",
    title: "Local-first systems for work that cannot stop.",
    copy:
      "We explore offline-first patterns for edge workflows, conflict handling, sync observability, and recovery after unreliable connectivity.",
    points: ["Edge workflows", "Sync mechanics", "Recovery design"],
  },
  {
    eyebrow: "Human-centred design",
    title: "Interfaces that disappear into the operation.",
    copy:
      "Good software helps people stop thinking about the software and start focusing on the business outcome.",
    points: ["Clear priorities", "Reduced friction", "Purposeful interaction"],
  },
  {
    eyebrow: "Enterprise automation",
    title: "Automation with controls, traceability, and ownership.",
    copy:
      "We investigate automation patterns that preserve accountability through permissions, approvals, audit evidence, and exception handling.",
    points: ["Traceable workflows", "Approval models", "Audit evidence"],
  },
  {
    eyebrow: "Digital twins",
    title: "Physical operations represented digitally.",
    copy:
      "Digital twin thinking connects equipment, inventory, transactions, financial records, and operational events into one environment.",
    points: ["Physical-to-digital mapping", "Inventory intelligence", "Unified operations"],
  },
] as const;

export default function ResearchPage() {
  return (
    <EditorialPage
      eyebrow="Research"
      title="Every great product begins with curiosity."
      intro="Research is not a separate phase for ForgeStack Labs. It is part of the culture: observe the operation, question assumptions, test ideas, and turn useful patterns into durable systems."
      items={items}
    />
  );
}
