import type { Metadata } from "next";
import EditorialPage from "@/components/EditorialPage";
export const metadata: Metadata = {
  title: "Case Studies",
  description: "Selected operational software workflows and engineering outcomes from Forgestack Labs.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Operational Software Case Studies | Forgestack Labs",
    description: "Selected operational software workflows and engineering outcomes from Forgestack Labs.",
    url: "/case-studies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Operational Software Case Studies | Forgestack Labs",
    description: "Selected operational software workflows and engineering outcomes from Forgestack Labs.",
  },
};
const items = [
  { eyebrow: "Fuel OS template", title: "Fuel OS case study framework", copy: "A reusable case study structure for independent fuel retailers: operational problem, disconnected workflows, offline risk, digital twin architecture, shift reconciliation, credit controls, deployment model, and measurable outcomes.", points: ["Problem context", "Digital twin solution", "Operational outcomes"] },
  { eyebrow: "Fuel retail", title: "Offline-first forecourt operations", copy: "A resilient operating workflow connecting billing, shifts, stock, credit, reconciliation, and reports without making connectivity a single point of failure.", points: ["Fast billing workflow", "Shift-level accountability", "Offline continuity"] },
  { eyebrow: "Operations", title: "From fragmented records to one audit trail", copy: "A structured data model replaces disconnected spreadsheets and manual handoffs with traceable events, permissions, and exception handling.", points: ["Role-based access", "Immutable activity history", "Exception-first reporting"] },
  { eyebrow: "Architecture", title: "Physical infrastructure meets digital intelligence", copy: "Fuel OS maps tanks, dispensers, nozzles, POS, mobile workflows, cloud sync, and analytics into one connected operating model.", points: ["Tanks and nozzles", "POS and mobile app", "Cloud sync and analytics"] },
  { eyebrow: "Custom platform", title: "Architecture before implementation", copy: "For bespoke engagements, discovery converts business rules and constraints into bounded services, acceptance criteria, and an accountable delivery plan.", points: ["Risk mapping", "Prototype validation", "Deployment planning"] },
];
export default function Page() { return <EditorialPage eyebrow="Selected work" title="Systems designed around operational reality." intro="Public summaries of the workflows, architectural decisions, and measurable operating improvements we build toward. Client-identifying details remain confidential." note="We do not publish client names, private metrics, or confidential implementation details without written approval." items={items} />; }
