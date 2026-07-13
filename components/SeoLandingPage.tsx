import Link from "next/link";
import type { SeoEntry } from "@/lib/seo-content";

export default function SeoLandingPage({ entry, backHref, backLabel }: { entry: SeoEntry; backHref: string; backLabel: string }) {
  const groups = [["Operational challenges", entry.challenges], ["What we engineer", entry.capabilities], ["Intended outcomes", entry.outcomes]] as const;
  return <main className="min-h-screen bg-[#F7F7F5] px-6 pb-28 pt-40 text-[#121212]">
    <div className="mx-auto max-w-7xl">
      <Link href={backHref} className="mb-12 inline-flex text-xs font-medium text-[#121212]/45 transition hover:text-[#8BA888]">← {backLabel}</Link>
      <header className="max-w-5xl"><p className="mb-7 text-[10px] font-bold uppercase tracking-[.45em] text-[#8BA888]">{entry.eyebrow}</p><h1 className="text-5xl font-medium leading-[.96] tracking-tight md:text-7xl lg:text-8xl">{entry.title}</h1><p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#121212]/60 md:text-xl">{entry.intro}</p></header>
      <section className="mt-20 grid gap-5 md:grid-cols-3">{groups.map(([title, points], i) => <article key={title} className={`rounded-[2rem] p-8 ${i === 1 ? "bg-[#151715]" : "border border-white/70 bg-white/50 shadow-[0_18px_60px_rgba(0,0,0,.06)]"}`}><p className={`mb-8 text-[10px] font-bold uppercase tracking-[.3em] ${i === 1 ? "!text-[#9DB59A]" : "text-[#8BA888]"}`}>{title}</p><ul className="space-y-5">{points.map(point => <li key={point} className={`flex gap-3 text-sm leading-relaxed ${i === 1 ? "!text-white/65" : "text-[#121212]/60"}`}><span className={i === 1 ? "!text-[#9DB59A]" : "text-[#8BA888]"}>—</span>{point}</li>)}</ul></article>)}</section>
      <section className="mt-20 rounded-[2.5rem] border border-[#121212]/10 bg-white/45 p-8 md:flex md:items-center md:justify-between md:p-12"><div><p className="mb-3 text-[10px] font-bold uppercase tracking-[.4em] text-[#D4A373]">Technical discovery</p><h2 className="text-3xl font-medium tracking-tight md:text-5xl">Map the operation before the solution.</h2></div><Link href="/contact?mode=custom#contact-inquiry" className="mt-8 inline-flex rounded-full bg-[#121212] px-7 py-4 text-sm font-medium text-white md:mt-0">Book a free consultation →</Link></section>
    </div>
  </main>;
}
