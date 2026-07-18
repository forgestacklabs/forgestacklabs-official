import type { Metadata } from "next";
import ArchitectureExplorer from "@/components/ArchitectureExplorer";

export const metadata: Metadata = {
  title: "Architecture Explorer",
  description: "Explore the ForgeStack architecture model across API-first systems, offline-first apps, cloud sync, security, analytics, and digital twins.",
  alternates: { canonical: "/architecture-explorer" },
};

const items = [
  { eyebrow: "Digital twin", title: "Physical infrastructure meets digital intelligence.", copy: "Storage tanks, dispensers, nozzles, inventory, sales, financial records, and operational events can be represented in one connected digital environment." },
  { eyebrow: "Offline-first", title: "Local workflows remain responsive.", copy: "Operations continue locally and synchronize intelligently when connectivity returns." },
  { eyebrow: "API-first", title: "System boundaries stay explicit.", copy: "APIs define contracts for web apps, mobile apps, reporting, integrations, automation, and future product surfaces." },
  { eyebrow: "Security", title: "Trust is engineered into the system.", copy: "Identity, permissions, activity logging, least privilege, and recovery are part of the architecture from the beginning." },
] as const;

export default function ArchitectureExplorerPage() {
  return <ArchitectureExplorer items={items} />;
}
