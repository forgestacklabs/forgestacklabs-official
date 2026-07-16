import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage from "@/components/SeoLandingPage";
import { technologies } from "@/lib/seo-content";
export function generateStaticParams() { return technologies.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const entry = technologies.find(x => x.slug === params.slug); return entry ? { title: entry.title, description: entry.description, alternates: { canonical: `/technologies/${entry.slug}` }, openGraph: { title: `${entry.title} | Forgestack Labs`, description: entry.description, url: `/technologies/${entry.slug}`, type: "website" }, twitter: { card: "summary_large_image", title: `${entry.title} | Forgestack Labs`, description: entry.description } } : {}; }
export default function Page({ params }: { params: { slug: string } }) { const entry = technologies.find(x => x.slug === params.slug); if (!entry) notFound(); return <SeoLandingPage entry={entry} backHref="/technologies" backLabel="All technologies" />; }
