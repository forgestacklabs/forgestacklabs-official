import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resources } from "@/lib/seo-content";
export function generateStaticParams() { return resources.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const item = resources.find(x => x.slug === params.slug); return item ? { title: item.title, description: item.description, alternates: { canonical: `/resources/${item.slug}` } } : {}; }
export default function Page({ params }: { params: { slug: string } }) {
  const item = resources.find(x => x.slug === params.slug); if (!item) notFound();
  return <main className="min-h-screen bg-[#F7F7F5] px-6 pb-28 pt-40 text-[#121212]"><article className="mx-auto max-w-4xl">
    <Link href="/resources" className="mb-12 inline-flex text-xs font-medium text-[#121212]/45 hover:text-[#8BA888]">← Resource center</Link>
    <header className="border-b border-[#121212]/10 pb-12"><div className="mb-7 flex items-center gap-4"><span className="rounded-full bg-[#8BA888]/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[.3em] text-[#71876f]">{item.kind}</span><span className="text-xs text-[#121212]/40">{item.readTime} read</span></div><h1 className="text-5xl font-medium leading-[.98] tracking-tight md:text-7xl">{item.title}</h1><p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#121212]/60">{item.description}</p><a href={`/resources/${item.slug}/download`} className="mt-8 inline-flex rounded-full bg-[#121212] px-6 py-3 text-sm font-medium text-white">Download Markdown ↓</a></header>
    <div className="py-12">{item.sections.map((section, i) => <section key={section} className="grid gap-5 border-b border-[#121212]/10 py-10 md:grid-cols-[5rem_1fr]"><span className="text-sm font-bold text-[#8BA888]">0{i + 1}</span><div><h2 className="text-2xl font-medium tracking-tight">{section}</h2><p className="mt-4 leading-relaxed text-[#121212]/60">This section provides a practical decision framework for {section.toLowerCase()}. It identifies the operational questions, architecture boundaries, evidence, and failure handling that should be resolved before implementation.</p></div></section>)}</div>
    <aside className="rounded-[2rem] bg-[#151715] p-8 md:flex md:items-center md:justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.35em] !text-[#9DB59A]">Apply this to your system</p><h2 className="mt-3 text-2xl font-medium !text-white">Review the architecture with an engineer.</h2></div><Link href="/contact?mode=custom#contact-inquiry" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm text-[#151715] md:mt-0">Book consultation →</Link></aside>
  </article></main>;
}
