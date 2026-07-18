"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import AnswerFAQ from "@/components/AnswerFAQ";
import { enterpriseFaqAnswers } from "@/lib/aeo-content";

const EASE = [0.215, 0.61, 0.355, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const staggerWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: EASE },
  },
};

const labelReveal: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const panelReveal: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: EASE },
  },
};

const badgeReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

const cardSpring = { type: "spring", stiffness: 220, damping: 18 } as const;
const btnSpring  = { type: "spring", stiffness: 320, damping: 20 } as const;
const linkSpring = { type: "spring", stiffness: 340, damping: 20 } as const;

const VP = { once: false, margin: "-240px" } as const;

function FadeOutSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.45, 0.9], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0.45, 0.9], [1, 0.94]);
  const y       = useTransform(scrollYProgress, [0.45, 0.9], ["0px", "-40px"]);

  return (
    <div ref={ref}>
      <motion.div style={{ opacity, scale, y, transformOrigin: "center top" }}>
        {children}
      </motion.div>
    </div>
  );
}

const builds = [
  ["Operational Software", "Offline-first systems for billing, inventory, reconciliation, and field operations."],
  ["Enterprise SaaS", "Secure multi-tenant products designed for measurable workflows and dependable scale."],
  ["AI Automation", "Practical automation for document, support, and decision workflows with human controls."],
  ["Custom Platforms", "Purpose-built web applications for organizations with complex operational requirements."],
];
const industries = [
  ["Fuel Retail", "Billing, wet-stock, shifts, credit, and reconciliation."],
  ["Logistics", "Dispatch, fleet workflows, proof of delivery, and exceptions."],
  ["Manufacturing", "Production, traceability, inventory, and quality controls."],
  ["Enterprise SaaS", "Multi-tenant platforms, integrations, billing, and support."],
  ["Custom Software", "Purpose-built systems for differentiated business rules."],
  ["AI Automation", "Human-supervised document, support, and decision workflows."],
];
const companyFacts = [
  ["2026", "Founded", "Incorporated in India and headquartered in Mangaluru."],
  ["DPIIT", "Recognized", "Recognized as a startup by the Government of India."],
  ["100%", "In-house engineering", "Product, architecture, and delivery remain with our team."],
  ["Direct", "Founder-led", "Technical decisions and delivery accountability stay close to leadership."],
];
const engagement = [
  ["Discovery", "Map the operation, constraints, risks, users, and success measures."],
  ["Technical scope", "Define architecture, integrations, acceptance criteria, timeline, and estimate."],
  ["Agreement", "Document responsibilities, commercials, IP, and delivery terms in the MSA and SOW."],
  ["Delivery", "Design, build, review, and validate in visible increments with continuous QA."],
  ["Deployment", "Release through controlled environments with migration, rollback, and handover plans."],
  ["Maintenance", "Operate against an agreed support model, priorities, updates, and response targets."],
];
const process = ["Discovery", "Architecture", "UX", "Development", "QA", "Deployment", "Support"];
const comparison = [
  ["Engineering ownership", "Senior, founder-led", "Handoff between teams"],
  ["Architecture", "Designed before build", "Decided during build"],
  ["Quality assurance", "Continuous and documented", "End-of-cycle testing"],
  ["Post-launch", "Measured support model", "Ad-hoc maintenance"],
];
const promiseCards = [
  ["Think like owners", "Every recommendation is made as if the business, risk, and long-term system were our own."],
  ["Simplify complexity", "We do not add software for the sake of technology. We remove operational friction."],
  ["Engineer trust", "Every workflow, permission, deployment, and support decision is treated as a promise to the people who depend on it."],
] as const;
const featuredInsights = [
  ["Engineering", "Designing for unreliable connectivity", "A practical framework for local writes, conflict handling, sync observability, and recovery."],
  ["Product", "Model the operation, not the screen", "Why durable operational products start with events, invariants, permissions, and exceptions."],
  ["Research", "Exception-first dashboards", "Why operational interfaces should prioritize deviations requiring action instead of presenting every metric equally."],
] as const;

export function EnterpriseFAQSection() {
  return (
    <FadeOutSection>
      <AnswerFAQ
        id="enterprise-faq"
        eyebrow="Enterprise FAQ"
        title="Clear commercial and technical expectations."
        introduction="Answers to the questions enterprise teams commonly resolve before architecture discovery and contracting. Final terms are always recorded in the applicable agreement."
        items={enterpriseFaqAnswers}
      />
    </FadeOutSection>
  );
}

export default function HomePrioritySections() {
  return <>

    {/* ── What we build ── */}
    <FadeOutSection>
      <section id="what-we-build" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
            <motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[.45em] text-[#8BA888]">
              What we build
            </motion.p>
            <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
              <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-6xl">
                Software for work that cannot stop.
              </motion.h2>
              <motion.p variants={fadeUp} className="max-w-xl leading-relaxed text-[#121212]/55 md:justify-self-end">
                We combine product thinking, systems engineering, and operational context to deliver software that remains useful after launch.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerWrap}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {builds.map(([title, copy], i) => (
              <motion.article
                key={title}
                variants={cardReveal}
                whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                className="rounded-[2rem] border border-white/70 bg-white/45 p-7 shadow-[0_18px_60px_rgba(0,0,0,.06)] backdrop-blur-2xl"
              >
                <p className="mb-10 text-[10px] font-bold tracking-[.3em] text-[#8BA888]">0{i + 1}</p>
                <h3 className="mb-3 text-xl font-medium">{title}</h3>
                <p className="text-sm leading-relaxed text-[#121212]/55">{copy}</p>
              </motion.article>
            ))}
          </motion.div>

        </div>
      </section>
    </FadeOutSection>

    {/* ── Industries we serve ── */}
    <FadeOutSection>
      <section id="industries" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
            <div><motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[.45em] text-[#D4A373]">Industries we serve</motion.p><motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-6xl">Domain context before code.</motion.h2></div>
            <motion.p variants={fadeUp} className="max-w-xl leading-relaxed text-[#121212]/55 md:justify-self-end">We work where software coordinates real operations, financial controls, and accountable decisions.</motion.p>
          </motion.div>
          <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
            {industries.map(([title, copy], i) => <motion.article key={title} variants={cardReveal} whileHover={{ y: -12, scale: 1.018, boxShadow: "0 36px 90px rgba(18,18,18,0.18)", transition: cardSpring }} className="group rounded-[2rem] border border-white/70 bg-white/45 p-7 shadow-[0_18px_60px_rgba(0,0,0,.06)] backdrop-blur-2xl"><div className="mb-10 flex items-center justify-between"><span className="text-[10px] font-bold tracking-[.3em] text-[#D4A373]">0{i + 1}</span><span aria-hidden className="text-lg text-[#121212]/20 transition-transform group-hover:translate-x-1 group-hover:text-[#8BA888]">→</span></div><h3 className="mb-3 text-xl font-medium">{title}</h3><p className="text-sm leading-relaxed text-[#121212]/55">{copy}</p></motion.article>)}
          </motion.div>
          <motion.div variants={staggerItem} initial="hidden" whileInView="visible" viewport={VP} whileHover={{ x: 4, transition: linkSpring }} className="mt-8 w-fit"><Link href="/industries" className="inline-flex items-center gap-3 text-sm font-medium transition-colors hover:text-[#8BA888]">Explore all industry capabilities <span aria-hidden>→</span></Link></motion.div>
        </div>
      </section>
    </FadeOutSection>

    {/* ── Product showcase ── */}
    <FadeOutSection>
      <section className="px-6 py-24">
        <motion.div
          variants={panelReveal}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] bg-[#151715] p-7 md:grid-cols-2 md:p-12"
        >
          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-[1.75rem]"
          >
            <Image src="/gallery/slide1.png" alt="Fuel station operations platform" width={1600} height={900} className="h-full min-h-72 w-full object-cover" />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center"
            variants={staggerWrap}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[.45em] !text-[#9DB59A]">
              Product showcase
            </motion.p>
            <motion.h2 variants={fadeUp} className="mb-6 text-4xl font-medium tracking-tight !text-white md:text-5xl">
              One operating view, from shift opening to audit.
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 leading-relaxed !text-white/55">
              Fast billing, stock movements, credit management, shift reconciliation, and reporting—even when connectivity is unreliable.
            </motion.p>
            <motion.div
              className="mb-9 flex flex-wrap gap-2"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {["Offline billing", "Shift controls", "Inventory", "Audit trails"].map((x) => (
                <motion.span
                  key={x}
                  variants={badgeReveal}
                  className="rounded-full border border-white/15 px-4 py-2 text-xs !text-white/65"
                >
                  {x}
                </motion.span>
              ))}
            </motion.div>
            <motion.div variants={staggerItem} whileHover={{ y: -5, scale: 1.04, transition: btnSpring }} className="w-fit">
              <Link href="/products" className="block w-fit rounded-full bg-white px-6 py-3 text-sm font-medium text-[#151715]">
                Explore the platform →
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </FadeOutSection>

    {/* ── Engineering process ── */}
    <FadeOutSection>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
            <motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[.45em] text-[#D4A373]">
              Engineering process
            </motion.p>
            <motion.h2 variants={fadeUp} className="mb-12 max-w-3xl text-4xl font-medium tracking-tight md:text-6xl">
              A visible path from uncertainty to operation.
            </motion.h2>
          </motion.div>

         <motion.ol
  className="grid gap-px overflow-hidden rounded-[2rem] bg-[#121212]/10 md:grid-cols-4 lg:grid-cols-7"
  variants={staggerWrap}
  initial="hidden"
  whileInView="visible"
  viewport={VP}
>
  {process.map((step, i) => (
    <motion.li
      key={step}
      variants={cardReveal}
      whileHover={{ y: -8, scale: 1.03, boxShadow: "0 28px 70px rgba(18,18,18,0.14)", transition: cardSpring }}
      className="bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)] p-6"
    >
      <span className="text-[10px] font-bold tracking-[.3em] text-[#8BA888]">0{i + 1}</span>
      <p className="mt-8 font-medium">{step}</p>
    </motion.li>
  ))}
</motion.ol>
        </div>
      </section>
    </FadeOutSection>

    {/* ── Capability deck ── */}
    <FadeOutSection>
      <section id="company-facts" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-12">
            <motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[.45em] text-[#8BA888]">Company statistics</motion.p>
            <motion.h2 variants={fadeUp} className="max-w-4xl text-4xl font-medium tracking-tight md:text-6xl">Small by design. Accountable by default.</motion.h2>
          </motion.div>
          <motion.dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
            {companyFacts.map(([value, label, detail]) => <motion.div key={label} variants={cardReveal} whileHover={{ y: -10, scale: 1.018, boxShadow: "0 32px 80px rgba(18,18,18,0.16)", transition: cardSpring }} className="rounded-[2rem] border border-white/70 bg-white/50 p-7 shadow-[0_18px_60px_rgba(0,0,0,.06)] backdrop-blur-2xl"><dd className="mb-8 text-3xl font-medium tracking-tight text-[#121212]">{value}</dd><dt className="mb-3 text-[10px] font-bold uppercase tracking-[.28em] text-[#8BA888]">{label}</dt><dd className="text-sm leading-relaxed text-[#121212]/55">{detail}</dd></motion.div>)}
          </motion.dl>
        </div>
      </section>
    </FadeOutSection>

    <FadeOutSection>
      <section id="engagement-model" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
            <div><motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[.45em] text-[#D4A373]">Client engagement model</motion.p><motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-6xl">From first context to maintained system.</motion.h2></div>
            <motion.p variants={fadeUp} className="max-w-xl leading-relaxed text-[#121212]/55 md:justify-self-end">A defined commercial and engineering path keeps decisions visible, responsibilities explicit, and delivery measurable.</motion.p>
          </motion.div>
          <motion.ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
            {engagement.map(([title, copy], i) => <motion.li key={title} variants={cardReveal} whileHover={{ y: -10, transition: cardSpring }} className="relative overflow-hidden rounded-[2rem] border border-[#121212]/10 bg-[#151715] p-7"><span className="absolute right-6 top-4 text-5xl font-medium !text-white/20">0{i + 1}</span><p className="mb-8 text-[10px] font-bold tracking-[.3em] !text-[#9DB59A]">PHASE 0{i + 1}</p><h3 className="mb-3 text-xl font-medium !text-white">{title}</h3><p className="text-sm leading-relaxed !text-white/50">{copy}</p></motion.li>)}
          </motion.ol>
        </div>
      </section>
    </FadeOutSection>

    <FadeOutSection>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[.45em] text-[#8BA888]">
                ForgeStack Promise
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-6xl">
                We treat your business as if it were our own.
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} className="max-w-xl leading-relaxed text-[#121212]/55 md:justify-self-end">
              That promise influences every conversation, design review, architecture decision, line of code, and product we build.
            </motion.p>
          </motion.div>

          <motion.div className="grid gap-4 md:grid-cols-3" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
            {promiseCards.map(([title, copy], i) => (
              <motion.article
                key={title}
                variants={cardReveal}
                whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.18)", transition: cardSpring }}
                className="rounded-[2rem] border border-white/70 bg-white/50 p-7 shadow-[0_18px_60px_rgba(0,0,0,.06)] backdrop-blur-2xl"
              >
                <p className="mb-8 text-[10px] font-bold tracking-[.3em] text-[#D4A373]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mb-3 text-xl font-medium">{title}</h3>
                <p className="text-sm leading-relaxed text-[#121212]/55">{copy}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </FadeOutSection>

    <FadeOutSection>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[.45em] text-[#D4A373]">
                Featured Insights
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-6xl">
                Useful thinking, documented.
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} className="max-w-xl leading-relaxed text-[#121212]/55 md:justify-self-end">
              Field notes across engineering, product, research, AI, startups, and fuel operations.
            </motion.p>
          </motion.div>

          <motion.div className="grid gap-4 md:grid-cols-3" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
            {featuredInsights.map(([eyebrow, title, copy], i) => (
              <motion.article
                key={title}
                variants={cardReveal}
                whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.18)", transition: cardSpring }}
                className="rounded-[2rem] border border-white/70 bg-white/50 p-7 shadow-[0_18px_60px_rgba(0,0,0,.06)] backdrop-blur-2xl"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[.3em] text-[#8BA888]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[9px] uppercase tracking-[.25em] text-[#121212]/35">{eyebrow}</span>
                </div>
                <h3 className="mb-3 text-xl font-medium">{title}</h3>
                <p className="text-sm leading-relaxed text-[#121212]/55">{copy}</p>
              </motion.article>
            ))}
          </motion.div>

          <motion.div variants={staggerItem} initial="hidden" whileInView="visible" viewport={VP} whileHover={{ x: 4, transition: linkSpring }} className="mt-8 w-fit">
            <Link href="/insights" className="inline-flex items-center gap-3 text-sm font-medium transition-colors hover:text-[#8BA888]">
              Explore all insights <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </FadeOutSection>

    <FadeOutSection>
      <section className="px-6 py-24">
        <motion.div
          className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto] md:items-center"
          variants={staggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <div>
            <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[.45em] text-[#8BA888]">
              Featured ForgeStack Book
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-5xl">
              Read the company book, not a brochure.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-[#121212]/55">
              Our philosophy, story, products, engineering principles, research, founders, and partnership standards in one interactive reader.
            </motion.p>
          </div>
          <motion.div variants={staggerItem} whileHover={{ y: -5, scale: 1.04, transition: btnSpring }} className="w-fit">
            <Link href="/book" className="block rounded-full bg-[#121212] px-7 py-4 text-sm font-medium text-white">
              Open ForgeStack Book →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </FadeOutSection>

    {/* ── Why Forgestack ── */}
    <FadeOutSection>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
            <motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[.45em] text-[#8BA888]">
              Why Forgestack
            </motion.p>
            <motion.h2 variants={fadeUp} className="mb-12 text-4xl font-medium tracking-tight md:text-6xl">
              Built for accountable delivery.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={panelReveal}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="hidden overflow-hidden rounded-[2rem] border border-[#121212]/10 bg-white/45 md:block"
          >
            <table className="w-full table-fixed text-left">
              <thead>
                <tr className="border-b border-[#121212]/10">
                  <th className="p-6 text-xs uppercase tracking-widest">Standard</th>
                  <th className="p-6 text-xs uppercase tracking-widest text-[#8BA888]">Forgestack</th>
                  <th className="p-6 text-xs uppercase tracking-widest text-[#121212]/35">Traditional agency</th>
                </tr>
              </thead>
              <motion.tbody
                variants={staggerWrap}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
              >
                {comparison.map((row) => (
                  <motion.tr
                    key={row[0]}
                    variants={staggerItem}
                    className="border-b border-[#121212]/[.06] last:border-0"
                  >
                    {row.map((cell, i) => (
                      <td key={cell} className={`p-6 text-sm ${i === 2 ? "text-[#121212]/45" : "text-[#121212]"}`}>
                        {cell}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </motion.div>

          <motion.div className="grid gap-4 md:hidden" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
            {comparison.map(([standard, forgestack, traditional]) => (
              <motion.article key={standard} variants={cardReveal} className="rounded-[1.75rem] border border-[#121212]/10 bg-white/50 p-6">
                <h3 className="mb-5 text-base font-medium">{standard}</h3>
                <div className="grid gap-4">
                  <div><p className="mb-1 text-[9px] font-bold uppercase tracking-[.25em] text-[#8BA888]">Forgestack</p><p className="text-sm text-[#121212]">{forgestack}</p></div>
                  <div className="border-t border-[#121212]/10 pt-4"><p className="mb-1 text-[9px] font-bold uppercase tracking-[.25em] text-[#121212]/35">Traditional agency</p><p className="text-sm text-[#121212]/50">{traditional}</p></div>
                </div>
              </motion.article>
            ))}
          </motion.div>

        </div>
      </section>
    </FadeOutSection>

  </>;
}
