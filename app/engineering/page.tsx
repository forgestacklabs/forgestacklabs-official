import type { Metadata } from "next";
import EditorialPage from "@/components/EditorialPage";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "ForgeStack Labs engineering principles across architecture, API-first systems, offline-first reliability, CI/CD, security, testing, and performance.",
  alternates: { canonical: "/engineering" },
  openGraph: {
    title: "Engineering | Forgestack Labs",
    description:
      "Architecture, API-first engineering, offline-first reliability, CI/CD, security, testing, and performance standards.",
    url: "/engineering",
    type: "website",
  },
};

const items = [
  {
    eyebrow: "Architecture",
    title: "Architecture is a business decision.",
    copy:
      "We model operations, data, permissions, events, and failure paths before implementation so systems can evolve without becoming fragile.",
    points: ["Modular boundaries", "Data ownership", "Scalable foundations"],
    href: "/architecture-explorer",
  },
  {
    eyebrow: "API-first",
    title: "Interfaces are designed before screens depend on them.",
    copy:
      "API-first thinking makes integrations, mobile clients, dashboards, automation, and future product surfaces easier to support.",
    points: ["Clear contracts", "Integration-ready", "Version-aware design"],
  },
  {
    eyebrow: "Offline-first",
    title: "Operations cannot pause because the internet does.",
    copy:
      "Offline-first systems keep local workflows responsive and synchronize intelligently when connectivity returns.",
    points: ["Local continuity", "Sync strategy", "Recovery paths"],
  },
  {
    eyebrow: "CI/CD",
    title: "Delivery is controlled, reviewed, and repeatable.",
    copy:
      "We use disciplined branching, review, test, and deployment practices to reduce operational risk before software reaches production.",
    points: ["Peer review", "Deployment gates", "Rollback planning"],
  },
  {
    eyebrow: "Security",
    title: "Trust is engineered, not promised.",
    copy:
      "Security is embedded into identity, access, logging, privacy, least privilege, and recovery practices from the beginning.",
    points: ["RBAC", "Audit trails", "Least privilege"],
  },
  {
    eyebrow: "Testing",
    title: "Quality is validated continuously.",
    copy:
      "Testing is not an end-of-cycle activity. We turn business rules, edge cases, permissions, and failure paths into evidence before release.",
    points: ["Acceptance criteria", "Regression checks", "Edge-case validation"],
  },
  {
    eyebrow: "Performance",
    title: "Performance is part of product quality.",
    copy:
      "Fast systems reduce friction, improve trust, and keep everyday operations moving when users depend on the product under pressure.",
    points: ["Load-aware design", "Responsive interfaces", "Operational observability"],
  },
] as const;

export default function EngineeringPage() {
  return (
    <EditorialPage
      eyebrow="Engineering"
      title="Every great product is built long before the first line of code."
      intro="Software development begins with observation, understanding, curiosity, and the willingness to ask better questions before building."
      items={items}
    />
  );
}
