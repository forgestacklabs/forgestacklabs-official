import type { Metadata } from "next";
import EditorialPage from "@/components/EditorialPage";

type LandingItem = {
  eyebrow: string;
  title: string;
  copy: string;
  points?: readonly string[];
};

type Landing = {
  title: string;
  metadataTitle: string;
  description: string;
  canonical: string;
  eyebrow: string;
  intro: string;
  items: readonly LandingItem[];
};

export function landingMetadata(entry: Landing): Metadata {
  return {
    title: entry.metadataTitle,
    description: entry.description,
    alternates: { canonical: entry.canonical },
    openGraph: {
      title: `${entry.metadataTitle} | Forgestack Labs`,
      description: entry.description,
      url: entry.canonical,
      type: "website",
    },
  };
}

export function LandingPage({ entry }: { entry: Landing }) {
  return (
    <EditorialPage
      eyebrow={entry.eyebrow}
      title={entry.title}
      intro={entry.intro}
      items={entry.items}
    />
  );
}

export const seoLandings = {
  operationalSoftware: {
    metadataTitle: "Operational Software",
    canonical: "/operational-software",
    eyebrow: "SEO · Operational software",
    title: "Operational software for businesses that cannot run on fragments.",
    description:
      "Custom operational software for billing, inventory, reconciliation, workflow automation, reporting, and real-time business visibility.",
    intro:
      "Operational software is the digital foundation that connects people, processes, and information into one accountable ecosystem.",
    items: [
      { eyebrow: "Problem", title: "Disconnected workflows slow decisions.", copy: "Manual handoffs, spreadsheets, notebooks, and isolated tools create uncertainty exactly where businesses need clarity.", points: ["Fragmented records", "Duplicate work", "Delayed decisions"] },
      { eyebrow: "System", title: "One operational model.", copy: "We model orders, inventory, employees, payments, approvals, exceptions, and reporting as connected workflows instead of isolated screens.", points: ["Workflow mapping", "Role-based permissions", "Exception reporting"] },
      { eyebrow: "Outcome", title: "Operations become clearer.", copy: "When operations become clear, teams move faster, owners trust the numbers, and growth becomes easier to manage.", points: ["Operational visibility", "Audit trails", "Better decisions"] },
    ],
  },
  productEngineering: {
    metadataTitle: "Product Engineering",
    canonical: "/product-engineering",
    eyebrow: "SEO · Product engineering",
    title: "Product engineering for ideas that need to become dependable systems.",
    description:
      "Product engineering for founders and organizations building SaaS products, operational platforms, and scalable business software.",
    intro:
      "We help turn product ideas into usable software with strategy, architecture, UX, engineering, QA, deployment, and long-term evolution.",
    items: [
      { eyebrow: "Discovery", title: "Understand before building.", copy: "We clarify the problem, users, constraints, workflows, risks, and success measures before deciding what should be built.", points: ["Problem definition", "User workflows", "Success criteria"] },
      { eyebrow: "Architecture", title: "Build products, not projects.", copy: "Products evolve. Architecture, data models, access control, and delivery practices must support that evolution from the beginning.", points: ["Scalable foundations", "Product UX", "Maintainable code"] },
      { eyebrow: "Delivery", title: "Ship with accountability.", copy: "We deliver in visible increments with review, QA, deployment planning, and support paths that keep ownership clear.", points: ["Iterative delivery", "Continuous QA", "Post-launch support"] },
    ],
  },
  enterpriseSoftware: {
    metadataTitle: "Enterprise Software",
    canonical: "/enterprise-software",
    eyebrow: "SEO · Enterprise software",
    title: "Enterprise software built around the reality of the business.",
    description:
      "Enterprise software development for portals, workflow systems, analytics platforms, integrations, and operational management systems.",
    intro:
      "A business should never be forced to change its workflows simply because software cannot adapt.",
    items: [
      { eyebrow: "Fit", title: "Software should reflect the business.", copy: "We design around existing operations, decision paths, roles, data, integrations, and long-term business requirements.", points: ["Operational management systems", "Enterprise portals", "Workflow automation"] },
      { eyebrow: "Scale", title: "Architecture before expansion.", copy: "Enterprise systems need modular boundaries, secure integrations, observability, and maintainable data structures before scale arrives.", points: ["API-first", "Modular architecture", "Observability"] },
      { eyebrow: "Trust", title: "Reliability is part of the product.", copy: "Enterprise users need systems they can depend on every day, not only software that works during demos.", points: ["Security", "Performance", "Supportability"] },
    ],
  },
  offlineFirstApps: {
    metadataTitle: "Offline-First Apps",
    canonical: "/offline-first-apps",
    eyebrow: "SEO · Offline-first apps",
    title: "Offline-first apps for operations that cannot pause.",
    description:
      "Offline-first web and mobile apps with local persistence, synchronization, recovery, conflict handling, and reliable field workflows.",
    intro:
      "Offline-first is not a cache feature. It is an engineering model for continuity, data ownership, synchronization, and recovery.",
    items: [
      { eyebrow: "Continuity", title: "The operation stays responsive.", copy: "Field teams, counters, and managers can continue key workflows locally when connectivity becomes unreliable.", points: ["Local data", "Responsive workflows", "Outage tolerance"] },
      { eyebrow: "Sync", title: "Synchronization is designed explicitly.", copy: "Queued writes, retry rules, conflict policy, sync status, and recovery paths must be visible and supportable.", points: ["Queued sync", "Conflict handling", "Sync observability"] },
      { eyebrow: "Use case", title: "Built for real operating environments.", copy: "Offline-first is valuable anywhere work happens away from stable networks: fuel retail, field operations, logistics, and remote sites.", points: ["Fuel OS", "Field teams", "Remote operations"] },
    ],
  },
  aiAutomation: {
    metadataTitle: "AI Automation",
    canonical: "/ai-automation",
    eyebrow: "SEO · AI automation",
    title: "AI automation where it creates measurable business value.",
    description:
      "AI automation for documents, support, knowledge workflows, operational decisions, and human-supervised business processes.",
    intro:
      "We integrate AI where it reduces repetitive work, improves decisions, or makes operational information easier to act on.",
    items: [
      { eyebrow: "Boundaries", title: "Useful AI needs controlled scope.", copy: "Automation should have clear tasks, context, quality checks, permissions, and escalation paths.", points: ["Task boundaries", "Human review", "Guardrails"] },
      { eyebrow: "Workflows", title: "AI belongs inside operations.", copy: "The value comes from fitting AI into document, support, reporting, and decision workflows with traceability.", points: ["Document workflows", "Knowledge retrieval", "Decision support"] },
      { eyebrow: "Quality", title: "Automation must be measurable.", copy: "Production AI needs evaluation, logging, failure handling, and continuous improvement as inputs change.", points: ["Evaluation", "Logging", "Fallbacks"] },
    ],
  },
  digitalTransformation: {
    metadataTitle: "Digital Transformation",
    canonical: "/digital-transformation",
    eyebrow: "SEO · Digital transformation",
    title: "Digital transformation that removes operational complexity.",
    description:
      "Digital transformation services for replacing manual processes, disconnected systems, and fragmented workflows with dependable software.",
    intro:
      "Digital transformation should not mean adding more software. It should mean engineering better systems around how the business actually operates.",
    items: [
      { eyebrow: "Reality", title: "Start with the current operation.", copy: "We map existing workflows, manual bridges, data gaps, user decisions, and business constraints before proposing technology.", points: ["Workflow discovery", "System audit", "Risk mapping"] },
      { eyebrow: "Simplify", title: "Remove layers, do not add them.", copy: "The goal is to reduce uncertainty, duplicate work, and fragmented information through better software foundations.", points: ["Unified data", "Cleaner handoffs", "Operational clarity"] },
      { eyebrow: "Long term", title: "Transformation must keep evolving.", copy: "The system should continue creating value after launch through support, observability, and continuous improvement.", points: ["Maintainability", "Support model", "Future growth"] },
    ],
  },
  customWebMobile: {
    metadataTitle: "Custom Web & Mobile Apps",
    canonical: "/custom-web-mobile-apps",
    eyebrow: "SEO · Web and mobile",
    title: "Custom web and mobile apps engineered for real operations.",
    description:
      "Custom web and mobile application development for operational workflows, SaaS products, dashboards, field teams, and enterprise systems.",
    intro:
      "Web and mobile applications should feel intuitive while carrying serious operational, security, performance, and reliability responsibilities.",
    items: [
      { eyebrow: "Experience", title: "Design around people.", copy: "Every screen should make the next decision clearer and every interaction should have a purpose.", points: ["UX flows", "Accessible interfaces", "Responsive design"] },
      { eyebrow: "Engineering", title: "Performance and security are standard.", copy: "We build applications with secure access, scalable APIs, reliable data handling, and performance-aware interfaces.", points: ["Authentication", "API integration", "Performance"] },
      { eyebrow: "Operations", title: "Apps must support the business model.", copy: "The product should reflect real workflows, roles, approvals, reports, and exceptions instead of forcing workarounds.", points: ["Workflow logic", "Dashboards", "Mobile field usage"] },
    ],
  },
} as const;
