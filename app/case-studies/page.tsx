import type { Metadata } from "next";
import EditorialPage from "@/components/EditorialPage";
export const metadata: Metadata = { title: "Case Studies", description: "Selected operational software workflows and engineering outcomes from Forgestack Labs." };
const items = [
  { eyebrow: "Fuel retail", title: "Offline-first forecourt operations", copy: "A resilient operating workflow connecting billing, shifts, stock, credit, reconciliation, and reports without making connectivity a single point of failure.", points: ["Fast billing workflow", "Shift-level accountability", "Offline continuity"] },
  { eyebrow: "Operations", title: "From fragmented records to one audit trail", copy: "A structured data model replaces disconnected spreadsheets and manual handoffs with traceable events, permissions, and exception handling.", points: ["Role-based access", "Immutable activity history", "Exception-first reporting"] },
  { eyebrow: "Custom platform", title: "Architecture before implementation", copy: "For bespoke engagements, discovery converts business rules and constraints into bounded services, acceptance criteria, and an accountable delivery plan.", points: ["Risk mapping", "Prototype validation", "Deployment planning"] },
];
export default function Page() { return <EditorialPage eyebrow="Selected work" title="Systems designed around operational reality." intro="Public summaries of the workflows, architectural decisions, and measurable operating improvements we build toward. Client-identifying details remain confidential." note="We do not publish client names, private metrics, or confidential implementation details without written approval." items={items} />; }
