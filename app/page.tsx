"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import InfiniteBackground from "@/components/Servergridbackground";

/**
 * FORGESTACK LABS
 * Design System: Calm Tech / Obsidian Contrast
 * Typography: #000000 headings · #121212 body · font-normal (400) throughout
 */

export default function HomePage() {
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
  const heroScale  = useTransform(smoothProgress, [0, 0.12], [1, 0.98]);
  const bgY        = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => { setIsMounted(true); }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    }),
  };

  const revealProps = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
  };

  if (!isMounted) return <div className="min-h-screen bg-[#F7F7F5]" />;

  /* ── DATA ──────────────────────────────────────────────── */
  const principles = [
    {
      num: "01",
      color: "text-[#8BA888]",
      title: "Precision Engineering",
      copy: "Every system we build is engineered to feel deliberate. Architecture decisions are treated as permanent — nothing rushed, nothing accidental. Explicit over implicit, always.",
    },
    {
      num: "02",
      color: "text-[#D4A373]",
      title: "Continuity by Design",
      copy: "We engineer for longevity. Systems must survive team changes, scale pivots, and five years of evolution. Resilience is not a feature — it is the foundation.",
    },
    {
      num: "03",
      color: "text-[#121212]/50",   /* ← was text-[#222222]/60 */
      title: "Disciplined Restraint",
      copy: "We say no to complexity that doesn't earn its place. Our process favors measured decisions, narrow scope, and long-term correctness over velocity theater.",
    },
  ];

  const workCols = [
    {
      color: "text-[#8BA888]",
      title: "What We Build",
      items: [
        "Full-stack web & mobile applications",
        "Internal tooling & operational SaaS",
        "API design and architecture audits",
        "Database modeling & performance engineering",
        "Greenfield MVPs to production-grade systems",
      ],
    },
    {
      color: "text-[#D4A373]",
      title: "How We Work",
      items: [
        "4-person agile core — no subcontracting ever",
        "Weekly async updates with full source visibility",
        "Fixed-scope or monthly retainer engagements",
        "Direct founder communication at every stage",
        "Documentation-first, handoff-ready delivery",
      ],
    },
  ];

  return (
    <div
      ref={containerRef}
      /* ↓ removed hardcoded text-[#222222] — body color now comes from globals.css */
      className="relative pt-16 bg-[#F7F7F5] font-sans selection:bg-[#8BA888]/30 overflow-x-hidden"
    >
      {/* ── BACKGROUND ─────────────────────────────────────── */}
      <InfiniteBackground />

      {/* Soft ambient orbs — complement the tunnel, stay subtle */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-gradient-to-b from-[#F7F7F5]/60 via-transparent to-[#F7F7F5]/60"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] rounded-full bg-[#8BA888]/4 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#D4A373]/4 blur-[140px]"
        />
      </div>

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex flex-col items-center justify-center px-6"
      >
        <div className="max-w-5xl w-full text-center">
          <motion.p
            custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-8"
          >
            Founder-Led Technology Lab
          </motion.p>

          <motion.h1
            custom={1} initial="hidden" animate="visible" variants={fadeUp}
            /* ↓ color now #000000 from globals h1 rule — no override needed */
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.9] mb-10"
          >
            Engineering Calm <br />
            {/* ↓ was text-[#222222]/40 → now slightly deeper for Obsidian contrast */}
            <span className="text-[#121212]/35 italic">out of</span> Complexity.
          </motion.h1>

          <motion.p
            custom={2} initial="hidden" animate="visible" variants={fadeUp}
            /* ↓ font-light → font-normal · text-[#222222]/70 → text-[#121212]/60 */
            className="max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed text-[#121212]/60 mb-12"
          >
            We are an elite, product-driven technology lab. We architect our own operational platforms
            and engineer bespoke, high-performance software for a select group of global partners.
          </motion.p>

          <motion.div
            custom={3} initial="hidden" animate="visible" variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/technology"
              className="px-10 py-4 bg-[#8BA888] text-white rounded-full hover:bg-[#7A9777] transition-all duration-500 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] hover:-translate-y-1"
            >
              Explore Our Products
            </Link>
            <Link
              href="/contact"
              /* ↓ border now slightly darker to match Obsidian contrast */
              className="px-10 py-4 border border-[#121212]/15 rounded-full hover:bg-white/80 transition-all duration-500 group"
            >
              <span className="text-[#121212] group-hover:text-[#D4A373] transition-colors font-normal">
                Propose a Partnership
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          {/* ↓ was [#222222]/20 → now [#121212]/25 — just slightly more visible */}
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#121212]/25 to-transparent" />
        </motion.div>
      </motion.section>

      {/* ── 2. PRINCIPLES ───────────────────────────────────── */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...revealProps} className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-4">Core Philosophy</p>
            {/* ↓ h2 color is now #000000 from globals — no class needed */}
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">Built on Principles</h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {principles.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.13, ease: [0.215, 0.61, 0.355, 1] }}
                /* ↓ shadow upgraded to match Obsidian system */
                className="group relative bg-white/40 backdrop-blur-md border border-white/50 p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_28px_70px_rgba(0,0,0,0.13)] transition-all duration-700"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                  {/* ↓ was font-light → font-normal */}
                  <span className="text-4xl font-normal text-[#121212]">{p.num}</span>
                </div>
                <h3 className={`text-sm uppercase tracking-widest font-bold mb-6 ${p.color}`}>{p.num}</h3>
                {/* ↓ h2 inherits #000000 from globals */}
                <h2 className="text-2xl font-medium mb-6">{p.title}</h2>
                {/* ↓ was text-[#222222]/60 font-light → text-[#121212]/55 font-normal */}
                <p className="text-[#121212]/55 font-normal leading-relaxed">{p.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PARTNERSHIPS ─────────────────────────────────── */}
      <section id="partnerships" className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...revealProps} className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-4">Custom Engineering</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">Venture-Grade Solutions. Zero Bloat.</h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 mb-8">
            {workCols.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
                className="bg-white/40 backdrop-blur-md border border-white/50 p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_28px_70px_rgba(0,0,0,0.13)] transition-all duration-700"
              >
                <h3 className={`text-sm uppercase tracking-widest font-bold mb-6 ${col.color}`}>{col.title}</h3>
                <ul className="space-y-3">
                  {col.items.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      {/* ↓ dot: was [#222222]/20 → [#121212]/25 */}
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#121212]/25 flex-shrink-0" />
                      {/* ↓ was text-[#222222]/60 font-light → text-[#121212]/55 font-normal */}
                      <span className="text-sm text-[#121212]/55 font-normal">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Dark CTA Banner */}
          <motion.div
            {...revealProps}
            className="relative rounded-[2.5rem] overflow-hidden p-14 text-center"
            style={{ background: "linear-gradient(135deg, #1a1e2a 0%, #141722 100%)" }}
          >
            <div
              className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-[100px] opacity-25 pointer-events-none"
              style={{ background: "radial-gradient(circle, #8BA888 0%, transparent 70%)" }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[90px] opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #D4A373 0%, transparent 70%)" }}
            />
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.45em] font-bold text-[#8BA888] mb-4">
                Ready to build something serious?
              </p>
              <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
                Let's talk about your project.
              </h3>
              {/* ↓ font-light → font-normal inside dark banner */}
              <p className="text-sm text-white/50 max-w-lg mx-auto mb-10 leading-relaxed font-normal">
                We respond to every serious inquiry within 48 hours. Send us your project scope, timeline,
                and what success looks like — we'll tell you plainly if we're the right fit.
              </p>
              <a
                href="mailto:forgestacklabs@forgestacklabs.com"
                className="inline-block px-10 py-4 bg-white/10 text-white border border-white/20 rounded-full hover:bg-white/20 transition-all duration-500 backdrop-blur-md text-sm"
              >
                forgestacklabs@forgestacklabs.com →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. TYPOGRAPHIC PRE-FOOTER ───────────────────────── */}
      <section className="relative py-60 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex justify-center items-center"
        >
          {/* ↓ was [#222222]/5 — same ratio but against deeper base = more visible */}
          <h2 className="text-[7vw] font-medium tracking-tighter text-[#121212]/5 whitespace-nowrap select-none">
            When Vision Meets Precision.
          </h2>
        </motion.div>
      </section>
    </div>
  );
}