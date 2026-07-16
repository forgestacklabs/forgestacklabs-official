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
  { eyebrow: "Offline-first", title: "Designing for unreliable connectivity", copy: "A practical framework for local writes, conflict handling, sync observability, and recovery without hiding failure states." },
  { eyebrow: "Architecture", title: "Model the operation, not the screen", copy: "Why durable operational products start with events, invariants, permissions, and exceptions before interface components." },
  { eyebrow: "Delivery", title: "Acceptance criteria that reduce rework", copy: "Turning broad requirements into testable outcomes shared by product, engineering, and the operating team." },
  { eyebrow: "Security", title: "Least privilege for growing SaaS products", copy: "A staged approach to roles, service boundaries, audit evidence, and access reviews as teams and customers scale." },
  { eyebrow: "Product", title: "When custom software is justified", copy: "A decision framework comparing workflow differentiation, integration cost, control requirements, and long-term ownership." },
  { eyebrow: "Operations", title: "Exception-first dashboards", copy: "Why operational interfaces should prioritize deviations requiring action instead of presenting every metric equally." },
];
export default function Page() { return <EditorialPage eyebrow="Weekly engineering notes" title="Useful thinking, documented." intro="Concise field notes for technical leaders building dependable software and the teams who operate it." items={items} />; }
