import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fuel Retail Architecture & Engineering Resources",
  description:
    "Explore Forgestack Labs architecture presentations, product mechanics, videos, and engineering notes for offline-first fuel retail systems.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Engineering Resources | Forgestack Labs",
    description: "Architecture presentations and engineering notes for offline-first fuel retail software.",
    url: "/resources",
    type: "website",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
