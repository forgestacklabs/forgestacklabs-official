import type { Metadata } from "next";
import EditorialPage from "@/components/EditorialPage";

export const metadata: Metadata = {
  title: "Engineering Capabilities",
  description:
    "Operational software engineering, enterprise platforms, product engineering, AI-powered business systems, web and mobile applications, architecture, and integrations.",
  alternates: { canonical: "/engineering-capabilities" },
  openGraph: {
    title: "Engineering Capabilities | Forgestack Labs",
    description:
      "Software engineering capabilities for operational platforms, enterprise systems, product engineering, AI workflows, and integrations.",
    url: "/engineering-capabilities",
    type: "website",
  },
};

const items = [
  {
    eyebrow: "Operational software",
    title: "Systems that connect critical workflows.",
    copy:
      "ForgeStack designs operational platforms that connect billing, inventory, reconciliation, reporting, permissions, and daily work into one dependable digital ecosystem.",
    points: ["Unified workflows", "Operational visibility", "Audit-ready records"],
  },
  {
    eyebrow: "Enterprise platforms",
    title: "Secure applications built for long-term maintainability.",
    copy:
      "We engineer enterprise software around real business rules, scalable architecture, clear access control, and maintainable delivery practices.",
    points: ["Role-based access", "Modular architecture", "Long-term support"],
  },
  {
    eyebrow: "Product engineering",
    title: "From idea to product capable of supporting real operations.",
    copy:
      "We partner with founders and organizations to turn product ideas into usable systems with clear workflows, technical foundations, and measurable business value.",
    points: ["Product strategy", "UX and architecture", "Build and iterate"],
  },
  {
    eyebrow: "AI solutions",
    title: "AI where it removes measurable work.",
    copy:
      "We integrate AI only where it improves decisions, reduces repetitive effort, or makes operational information easier to act on.",
    points: ["Human controls", "Workflow automation", "Operational intelligence"],
  },
  {
    eyebrow: "Web and mobile",
    title: "Applications engineered for real-world usage.",
    copy:
      "We build responsive web and mobile applications with performance, accessibility, security, and offline-first reliability considered from the start.",
    points: ["Responsive UX", "Offline-aware flows", "Accessible interfaces"],
  },
  {
    eyebrow: "Architecture",
    title: "Integrations and foundations that scale with the business.",
    copy:
      "Every solution emphasizes scalability, reliability, security, maintainability, observability, and clean integration with the systems a business already depends on.",
    points: ["API-first", "Secure integrations", "Observable systems"],
  },
] as const;

export default function EngineeringCapabilitiesPage() {
  return (
    <EditorialPage
      eyebrow="Engineering Capabilities"
      title="Engineering systems that power modern businesses."
      intro="Capabilities are not defined by the number of technologies a company knows. They are defined by the complexity of problems a company can solve."
      items={items}
    />
  );
}
