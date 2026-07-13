import type { Metadata } from "next";
import EditorialPage from "@/components/EditorialPage";
import { industries } from "@/lib/seo-content";
export const metadata: Metadata = { title: "Industries", description: "Operational software for fuel retail, logistics, manufacturing, enterprise SaaS, custom platforms, and AI automation.", alternates: { canonical: "/industries" } };
const items = industries.map(entry => ({ title: entry.title, copy: entry.description, href: `/industries/${entry.slug}` }));
export default function Page() { return <EditorialPage eyebrow="Industries" title="Domain context before code." intro="Explore how we approach operational constraints, engineering capabilities, and intended outcomes across six focused sectors." items={items} />; }
