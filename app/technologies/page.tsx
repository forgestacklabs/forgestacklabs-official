import type { Metadata } from "next";
import TechnologiesContent from "@/components/TechnologiesContent";
import { technologies } from "@/lib/seo-content";

export const metadata: Metadata = {
  title: "Technologies",
  description:
    "Forgestack Labs engineering capabilities across Next.js, Node.js, PostgreSQL, offline-first systems, cloud delivery, and applied AI.",
  alternates: { canonical: "/technologies" },
  openGraph: {
    title: "Technologies | Forgestack Labs",
    description:
      "Forgestack Labs engineering capabilities across Next.js, Node.js, PostgreSQL, offline-first systems, cloud delivery, and applied AI.",
    url: "/technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technologies | Forgestack Labs",
    description:
      "Forgestack Labs engineering capabilities across Next.js, Node.js, PostgreSQL, offline-first systems, cloud delivery, and applied AI.",
  },
};

const items = technologies.map((entry) => ({
  title: entry.title,
  copy: entry.description,
  href: `/technologies/${entry.slug}`,
}));

export default function Page() {
  return <TechnologiesContent items={items} />;
}
