import type { Metadata } from "next";
import EditorialPage from "@/components/EditorialPage";
export const metadata: Metadata = {
  title: "Engineering Insights",
  description: "Weekly notes on offline-first systems, SaaS architecture, security, and operational software.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Engineering Insights | Forgestack Labs",
    description: "Weekly notes on offline-first systems, SaaS architecture, security, and operational software.",
    url: "/insights",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Insights | Forgestack Labs",
    description: "Weekly notes on offline-first systems, SaaS architecture, security, and operational software.",
  },
};
const items = [
  { eyebrow: "Engineering", title: "Designing for unreliable connectivity", copy: "A practical framework for local writes, conflict handling, sync observability, and recovery without hiding failure states." },
  { eyebrow: "Product", title: "Model the operation, not the screen", copy: "Why durable operational products start with events, invariants, permissions, and exceptions before interface components." },
  { eyebrow: "AI", title: "Where AI belongs in operational software", copy: "A pragmatic view of automation that improves decisions, reduces repetitive work, and keeps human accountability visible." },
  { eyebrow: "Startup", title: "Building before certainty exists", copy: "Lessons from the ForgeStack story on commitment, ownership, and turning a familiar operational problem into a product direction." },
  { eyebrow: "Fuel", title: "Fuel retail as an operating system problem", copy: "How billing, tanks, nozzles, shifts, inventory, credit, and reconciliation become stronger when treated as one connected system." },
  { eyebrow: "Research", title: "Exception-first dashboards", copy: "Why operational interfaces should prioritize deviations requiring action instead of presenting every metric equally." },
];
export default function Page() { return <EditorialPage eyebrow="Weekly engineering notes" title="Useful thinking, documented." intro="Concise field notes for technical leaders building dependable software and the teams who operate it." items={items} />; }
