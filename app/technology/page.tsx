"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { SiPostman, SiInsomnia } from "react-icons/si";
import { FaJava } from "react-icons/fa";

/**
 * FORGESTACK LABS — PRODUCTS & STACK
 * Font & Colors: Synced exactly to root/page.tsx (homepage)
 *   Background  : #F7F7F5
 *   Text        : #222222
 *   Sage accent : #8BA888
 *   Clay accent : #D4A373
 *   Cards       : bg-white/40 backdrop-blur-md border border-white/50
 *   Radius      : rounded-[2.5rem]
 *   Shadows     : shadow-sm hover:shadow-md
 *   Animations  : fadeUp / revealProps from homepage
 */

export default function ProductsAndStackPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const heroScale   = useTransform(smoothProgress, [0, 0.12], [1, 0.98]);
  const bgY         = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => { setIsMounted(true); }, []);

  /* ── ANIMATION SYSTEM — exact homepage tokens ─────────── */
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const revealProps = {
    initial:   { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport:  { once: true, margin: "-80px" },
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
  };

  /* ── CARD CLASS — exact homepage style ────────────────── */
  const card =
    "group relative bg-white/40 backdrop-blur-md border border-white/50 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all duration-700";

  if (!isMounted) return <div className="min-h-screen bg-[#F7F7F5]" />;

  /* ── DATA ─────────────────────────────────────────────── */
  const layers = [
    {
      num:      "00",
      accent:   "text-[#8BA888]",
      dot:      "bg-[#8BA888]",
      label:    "Data & Core",
      headline: "The Foundation",
      copy:     "Every byte of operational data is anchored in a single, unambiguous source of truth. PostgreSQL's strict schema enforcement and ACID-compliant transactions guarantee zero-loss inventory management — an imperative for high-volume fuel retail where a single inconsistency has regulatory consequence.",
      chips: [
        { icon: "🐘", label: "PostgreSQL",  detail: "Source of truth · ACID compliant" },
        { icon: <FaJava />, label: "Java",  detail: "Background services" },
        { icon: "◆",  label: "Redis",       detail: "Cache & session layer" },
      ],
    },
    {
      num:      "01",
      accent:   "text-[#D4A373]",
      dot:      "bg-[#D4A373]",
      label:    "Backend",
      headline: "Computational Engine",
      copy:     "TypeScript-first Node.js provides the strict type guarantees needed for a system handling thousands of concurrent inventory transactions per minute. Business logic is domain-isolated, rigorously tested, and designed for horizontal scaling with zero state leakage between services.",
      chips: [
        { icon: "▶",  label: "Node.js",    detail: "Runtime · Event-driven I/O" },
        { icon: "TS", label: "TypeScript", detail: "Type safety · Domain isolation" },
        { icon: "◈",  label: "REST / API", detail: "Contract-first design" },
        { icon: "🔐", label: "JWT + RLS",  detail: "Row-level security" },
      ],
    },
    {
      num:      "02",
      accent:   "text-[#8BA888]",
      dot:      "bg-[#8BA888]",
      label:    "Interface & Experience",
      headline: "The Frontend",
      copy:     "Next.js with React delivers sub-second Time-to-Interactive across all station dashboards. Server-side rendering reduces bundle payload significantly. Tailwind CSS enforces declarative UI consistency — no style drift across a multi-engineer team, no runtime style computation.",
      chips: [
        { icon: "▲",  label: "Next.js",   detail: "SSR · Edge rendering" },
        { icon: "⚛",  label: "React",     detail: "Enterprise state management" },
        { icon: "◊",  label: "Flutter",   detail: "Mobile · Offline-capable" },
        { icon: "~",  label: "Tailwind",  detail: "Declarative UI consistency" },
      ],
    },
    {
      num:      "03",
      accent:   "text-[#D4A373]",
      dot:      "bg-[#D4A373]",
      label:    "Ops & Resilience",
      headline: "The Lifecycle",
      copy:     "Immutable Docker containers eliminate environment parity issues across global logistics deployments. CI/CD pipelines enforce quality gates — no commit reaches production without passing type checks, integration tests, and schema migration validation.",
      chips: [
        { icon: "🐳", label: "Docker",   detail: "Immutable deployments" },
        { icon: "⚙",  label: "CI/CD",   detail: "Automated quality gates" },
        { icon: <SiPostman  className="text-[#FF6C37]" />, label: "Postman",  detail: "API contract testing" },
        { icon: <SiInsomnia className="text-[#4000BF]" />, label: "Insomnia", detail: "API debugging" },
      ],
    },
  ];

  const principles = [
    { num: "01", color: "text-[#8BA888]", title: "Reliability over Novelty",  copy: "We choose boring, proven technology at the data layer. Excitement belongs in product design, not in database engines." },
    { num: "02", color: "text-[#D4A373]", title: "Explicit over Implicit",     copy: "Every contract is typed. Every schema is versioned. Every API response is documented. No surprises in production." },
    { num: "03", color: "text-[#222222]/60", title: "Long-Term Correctness",   copy: "We'd rather take two extra days to model a domain correctly than spend two months unwinding a schema decision under load." },
  ];

  const stats = [
    { val: "4",     lab: "Stack Layers" },
    { val: "99.9%", lab: "Uptime Target" },
    { val: "0",     lab: "Debt Policy" },
    { val: "∞",     lab: "Audit Depth" },
  ];

  const specRows = [
    { k: "Core",       v: "PostgreSQL + Node.js" },
    { k: "Mobile",     v: "Flutter (iOS & Android)" },
    { k: "Sync",       v: "Conflict-free CRDT" },
    { k: "Uptime",     v: "99.9% SLA" },
    { k: "Compliance", v: "Audit-ready exports" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative pt-16 bg-[#F7F7F5] text-[#222222] font-sans selection:bg-[#8BA888]/30 overflow-x-hidden"
    >
      {/* ── BACKGROUND — identical to homepage ───────────── */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-gradient-to-b from-[#F7F7F5] via-[#F0F0EE] to-[#F7F7F5]"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] rounded-full bg-[#8BA888]/5 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#D4A373]/5 blur-[120px]"
        />
      </div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex flex-col items-center justify-center px-6"
      >
        <div className="max-w-5xl w-full text-center">

          {/* Badge */}
          <motion.p
            custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-8"
          >
            Products &amp; Stack
          </motion.p>

          {/* Headline */}
          <motion.h1
            custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.9] mb-10"
          >
            Architected <br />
            <span className="text-[#222222]/40 italic">for</span> Precision.
          </motion.h1>

          {/* Sub */}
          <motion.p
            custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed text-[#222222]/70 mb-12"
          >
            We don't just write code — we engineer endurance. Our stack is a deliberate
            selection of industry-standard tools optimized for high-availability systems,
            where correctness is a baseline requirement, not an aspiration.
          </motion.p>

          {/* Stat strip */}
          <motion.div
            custom={3} initial="hidden" animate="visible" variants={fadeUp}
            className="flex justify-center"
          >
            <div className="inline-flex divide-x divide-[#222222]/8 bg-white/40 backdrop-blur-md border border-white/50 rounded-[2rem] shadow-sm overflow-hidden">
              {stats.map(({ val, lab }) => (
                <div key={lab} className="flex flex-col items-center px-7 py-5 gap-1">
                  <span className="text-2xl md:text-3xl font-medium text-[#222222] tracking-tight leading-none">
                    {val}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.35em] font-bold text-[#222222]/35 whitespace-nowrap">
                    {lab}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#222222]/20 to-transparent" />
        </motion.div>
      </motion.section>

      {/* ── DIVIDER ──────────────────────────────────────── */}
      <div className="w-full h-px bg-[#222222]/5" />

      {/* ── STACK LAYERS ─────────────────────────────────── */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <motion.div {...revealProps} className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-4">
              Architectural Blueprint
            </p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              The Stack, Layer by Layer.
            </h2>
          </motion.div>

          {/* Two-col: sticky rail + layer cards */}
          <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-14 items-start">

            {/* LEFT — sticky index rail */}
            <div className="hidden md:block sticky top-28">
              <motion.div {...revealProps} className={`${card} p-8`}>
                <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-6">
                  Stack Index
                </p>

                {/* Vertical rail */}
                <div className="relative pl-5">
                  <div className="absolute left-0 top-1 bottom-1 w-[1px] bg-[#222222]/8" />
                  <div className="space-y-7">
                    {layers.map((l, i) => (
                      <motion.div
                        key={l.headline}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                        className="relative"
                      >
                        {/* Rail node */}
                        <div className={`absolute -left-[21px] top-[5px] w-2 h-2 rounded-full border-2 border-white ${l.dot}`} />
                        <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#222222]/30 mb-0.5">
                          {`Layer ${l.num}`}
                        </p>
                        <p className="text-sm font-medium text-[#222222] tracking-tight">
                          {l.headline}
                        </p>
                        <p className="text-[9px] text-[#222222]/40 font-light mt-0.5 leading-relaxed">
                          {l.chips.map(c => c.label).join(" · ")}
                        </p>
                      </motion.div>
                    ))}

                    {/* Terminal */}
                    <div className="relative">
                      <div className="absolute -left-[21px] top-[5px] w-2 h-2 rounded-full bg-[#222222]/15 border-2 border-white" />
                      <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#222222]/20 mb-0.5">End</p>
                      <p className="text-xs font-medium text-[#222222]/25">Production</p>
                    </div>
                  </div>
                </div>

                {/* Watermark */}
                <div className="mt-8 pt-6 border-t border-[#222222]/5">
                  <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-[#222222]/15">
                    Forgestack · v3.0
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — layer cards with connectors */}
            <div className="flex flex-col">
              {layers.map((l, i) => (
                <LayerCard
                  key={l.headline}
                  index={i}
                  layer={l}
                  card={card}
                />
              ))}

              {/* Connector to terminal */}
              <Connector />

              {/* Terminal card */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                className={`${card} p-6 flex items-center justify-between`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#8BA888]/10 border border-[#8BA888]/20 flex items-center justify-center">
                    <span className="text-xs text-[#8BA888] font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.45em] font-bold text-[#8BA888] mb-0.5">
                      End State
                    </p>
                    <p className="text-sm font-medium text-[#222222]">
                      Production · Immutable · Audited
                    </p>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-[#222222]/25 tracking-wider hidden sm:block">
                  STATUS: DEPLOYED
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-[#222222]/5" />

      {/* ── PRINCIPLES ───────────────────────────────────── */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...revealProps} className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-4">
              Engineering Philosophy
            </p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              Non-Negotiable Criteria
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {principles.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.13, ease: [0.215, 0.61, 0.355, 1] }}
                className={`${card} p-12 flex flex-col`}
              >
                {/* Corner number */}
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity duration-700">
                  <span className="text-4xl font-light">{p.num}</span>
                </div>
                <h3 className={`text-sm uppercase tracking-widest font-bold mb-6 ${p.color}`}>
                  {p.num}
                </h3>
                <h2 className="text-2xl font-medium mb-6">{p.title}</h2>
                <div className="w-8 h-px bg-[#222222]/10 mb-6" />
                <p className="text-[#222222]/60 font-light leading-relaxed">{p.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-[#222222]/5" />

      {/* ── FLAGSHIP PRODUCT ─────────────────────────────── */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...revealProps} className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#D4A373] mb-4">
              Flagship Product
            </p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              Intelligent Fuel &amp; Inventory Infrastructure.
            </h2>
          </motion.div>

          <motion.div
            {...revealProps}
            className="relative rounded-[2.5rem] overflow-hidden p-14 md:p-20"
            style={{ background: "linear-gradient(160deg, #1a1e2a 0%, #141722 100%)" }}
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {/* Ambient orbs — match homepage CTA */}
            <div
              className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-[100px] opacity-25 pointer-events-none"
              style={{ background: "radial-gradient(circle, #8BA888 0%, transparent 70%)" }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[90px] opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #D4A373 0%, transparent 70%)" }}
            />

            {/* Blueprint grid inside dark card */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
              <defs>
                <pattern id="dark-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dark-grid)" />
            </svg>

            <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
              {/* Left — copy */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
                  <span className="w-1 h-1 rounded-full bg-[#8BA888] animate-pulse" />
                  <span className="text-[9px] uppercase tracking-[0.45em] font-bold text-[#8BA888]/80">
                    Stealth Mode · Active Development
                  </span>
                </div>
                <h3
                  className="text-3xl md:text-4xl font-medium text-white tracking-tight leading-tight mb-5"
                >
                  Full-Suite SaaS for Fuel Retail Operations.
                </h3>
                <p className="text-sm text-white/40 font-light leading-relaxed mb-8">
                  A high-availability infrastructure managing daily operations, sales, inventory
                  reconciliation, and regulatory compliance across multi-station networks.
                  Built on PostgreSQL with zero tolerance for data inconsistency.
                </p>

                {/* Feature dots — match homepage feature list style */}
                <div className="space-y-3">
                  {[
                    "Real-time inventory sync across all nozzles and tanks",
                    "Automated variance detection — sub-0.1% accuracy thresholds",
                    "Multi-station dashboard with role-based access control",
                    "Offline-capable mobile app with conflict-free sync on reconnect",
                  ].map(f => (
                    <div key={f} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8BA888]/60 flex-shrink-0" />
                      <span className="text-sm text-white/35 font-light">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — spec table */}
              <div className="flex-shrink-0">
                <div className="rounded-[1.5rem] border border-white/8 bg-white/4 backdrop-blur-xl p-7 min-w-[230px]">
                  <p className="text-[9px] uppercase tracking-[0.45em] font-bold text-[#D4A373]/70 mb-5">
                    System Specs
                  </p>
                  <div className="space-y-4">
                    {specRows.map(({ k, v }) => (
                      <div key={k} className="flex items-start justify-between gap-6">
                        <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest flex-shrink-0">
                          {k}
                        </span>
                        <span className="text-[9px] text-white/45 font-light text-right">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SIGN-OFF WATERMARK ───────────────────────────── */}
      <section className="relative py-60 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex justify-center items-center"
        >
          <h2 className="text-[7vw] font-medium tracking-tighter text-[#222222]/5 whitespace-nowrap select-none">
            Architected for Precision.
          </h2>
        </motion.div>
      </section>


    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════ */

/* ── SVG CONNECTOR BETWEEN LAYER CARDS ───────────────────── */
function Connector() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="relative flex flex-col items-center py-1">
      <motion.svg
        width="2" height="48" viewBox="0 0 2 48" fill="none"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ originY: 0 }}
        className="overflow-visible"
      >
        <line
          x1="1" y1="0" x2="1" y2="40"
          stroke="#222222" strokeOpacity="0.1"
          strokeWidth="1" strokeDasharray="3 3"
        />
        <polygon
          points="1,48 -4,38 6,38"
          fill="#222222" fillOpacity="0.1"
        />
      </motion.svg>
    </div>
  );
}

/* ── TECH CHIP ────────────────────────────────────────────── */
function TechChip({ icon, label, detail }: { icon: React.ReactNode; label: string; detail?: string }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.04, transition: { duration: 0.25, ease: [0.215, 0.61, 0.355, 1] } }}
      className="
        flex items-center gap-2.5 px-4 py-2.5 cursor-default
        bg-white/50 backdrop-blur-md
        border border-white/60
        rounded-2xl
        shadow-sm hover:shadow-md
        transition-shadow duration-500
      "
    >
      <span className="text-[#222222]/50 text-sm flex-shrink-0">{icon}</span>
      <div>
        <p className="text-xs font-medium text-[#222222] tracking-tight leading-none mb-0.5">{label}</p>
        {detail && (
          <p className="text-[9px] text-[#222222]/40 font-light leading-tight">{detail}</p>
        )}
      </div>
    </motion.div>
  );
}

/* ── LAYER CARD ───────────────────────────────────────────── */
type LayerData = {
  num: string;
  accent: string;
  dot: string;
  label: string;
  headline: string;
  copy: string;
  chips: { icon: React.ReactNode; label: string; detail?: string }[];
};

function LayerCard({ index, layer, card }: { index: number; layer: LayerData; card: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      {/* Connector above (skip first) */}
      {index > 0 && <Connector />}

      {/* Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
        whileHover={{
          y: -6,
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          transition: { duration: 0.35, ease: [0.215, 0.61, 0.355, 1] },
        }}
        className={card}
      >
        {/* Corner ghost number */}
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-25 transition-opacity duration-700 select-none">
          <span className="text-5xl font-light text-[#222222]">{layer.num}</span>
        </div>

        <div className="p-10 md:p-12">
          {/* Label row */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`text-[10px] uppercase tracking-[0.5em] font-bold ${layer.accent}`}>
              Layer {layer.num} · {layer.label}
            </span>
          </div>

          {/* Headline */}
          <h3 className="text-2xl md:text-3xl font-medium text-[#222222] tracking-tight mb-6">
            {layer.headline}
          </h3>

          {/* Hairline divider — homepage style */}
          <div className="w-full h-px bg-[#222222]/6 mb-6" />

          {/* Copy */}
          <p className="text-[#222222]/60 font-light leading-relaxed mb-8">
            {layer.copy}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2.5">
            {layer.chips.map(c => (
              <TechChip key={c.label} icon={c.icon} label={c.label} detail={c.detail} />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}