"use client";

/**
 * FORGESTACK LABS — ABOUT PAGE
 * FounderCard update: Static Command logic
 * - Decrypt on hover (System Logic + The Roast)
 * - 3D cursor-tracking tilt
 * - Triad dimming: hovering Sriharsha dims the other two
 * - No pulse / status dots / "Vibe" language
 */

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import SoftwareBlueprint3D from "@/components/SoftwareBlueprint3D";
import FounderCard, { type Founder } from "@/components/FounderCard";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

/* ── FOUNDER DATA ─────────────────────────────────────────── */
const FOUNDERS: Founder[] = [
  {
    initial:   "S",
    name:      "Sriharsha",
    title:     "CEO · Systems Architect",
    function_: "Logic & Strategy",
    logic:
      "Sriharsha maps the industrial blueprints. He authors the venture-vision and the system architecture in the same breath — strategy and schema, inseparably linked.",
    roast:
      "Holds twelve opinions about database normalisation before breakfast. Will rewrite the roadmap if the whiteboard marker runs out.",
    footer:    "// git blame leads here. always.",
    color:     "text-[#8BA888]",
    accentHex: "#8BA888",
  },
  {
    initial:   "H",
    name:      "Hardhik",
    title:     "CTO · Infrastructure Lead",
    function_: "Operations & Data",
    logic:
      "Hardhik builds the indestructible foundations. PostgreSQL integrity, Dockerised environments, and uptime requirements are not aspirations — they are constraints he designs around.",
    roast:
      "Treats a 99.8% uptime report as a personal failure. His staging environment is more stable than most production deployments.",
    footer:    "// if it's not in the schema, it doesn't exist.",
    color:     "text-[#D4A373]",
    accentHex: "#D4A373",
  },
  {
    initial:   "P",
    name:      "Pulavarason",
    title:     "COO · Interface Lead",
    function_: "Interaction & UI Systems",
    logic:
      "Pulavarason engineers the layer between complex data and human intuition. Every pixel in the interface has a reason; every interaction has a contract.",
    roast:
      "Will spend forty minutes debating whether 0.5px or 1px border is correct, then be right. Considers 'it looks fine' a critical severity bug.",
    footer:    "// border-radius is not a personality, yet here we are.",
    color:     "text-[#121212]/50",
    accentHex: "#121212",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredFounder, setHoveredFounder] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroOpacity = useTransform(smooth, [0, 0.10], [1, 0]);
  const heroScale   = useTransform(smooth, [0, 0.10], [1, 0.97]);

  useEffect(() => { setIsMounted(true); }, []);

  const fadeUp = {
    hidden:  { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: 0.1 * i, duration: 0.8, ease: EASE_OUT },
    }),
  };

  const revealProps = {
    initial:     { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: "-80px" },
    transition:  { duration: 0.8, ease: EASE_OUT },
  };

  const GLASS = `
    relative overflow-hidden rounded-[2.5rem]
    bg-white/40 backdrop-blur-3xl
    border border-[0.5px] border-white/60
    shadow-[0_20px_60px_rgba(0,0,0,0.09)]
    hover:shadow-[0_32px_80px_rgba(0,0,0,0.13)]
    transition-all duration-700
  `;

  const values = [
    { num: "01", color: "text-[#8BA888]",    title: "We write what we mean.",        copy: "Every contract is typed. Every schema is versioned. Every decision is documented before it becomes code. Ambiguity is not a design choice — it is a defect." },
    { num: "02", color: "text-[#D4A373]",    title: "Small is a strategy.",           copy: "We will never scale the team beyond the point where every engineer can own a critical path. Tight scope, full ownership, zero diffusion of accountability." },
    { num: "03", color: "text-[#121212]/45", title: "Boring tech at the foundation.", copy: "We choose PostgreSQL over the database of the month. The data layer is not the place for experimentation. Reliability is earned through deliberate conservatism." },
    { num: "04", color: "text-[#8BA888]",    title: "The client reads the spec.",     copy: "We don't hide complexity behind decks. Every partner receives a living technical document they can understand, challenge, and hold us accountable to." },
    { num: "05", color: "text-[#D4A373]",    title: "Ship when it's correct.",        copy: "We negotiate scope before we negotiate deadlines. A system that ships wrong is more expensive than one that ships late. We say this plainly, upfront, always." },
    { num: "06", color: "text-[#121212]/45", title: "Mangalore, operating globally.", copy: "Founded in Mangalore, India. Our timezone is an advantage — problems raised at close of business in San Francisco are resolved before your morning coffee." },
  ];

  const facts = [
    { val: "2026", lab: "Year Founded"       },
    { val: "3",    lab: "Founding Engineers" },
    { val: "100%", lab: "Founder-Led"        },
    { val: "0",    lab: "Subcontractors"     },
    { val: "∞",    lab: "Uptime Obsession"   },
    { val: "48hr", lab: "Response Guarantee" },
  ];

  if (!isMounted) return <div className="min-h-screen bg-[#F7F7F5]" />;

  /* ── TRIAD LOGIC ──────────────────────────────────────────
     Rule: hovering Sriharsha (index 0) dims BOTH others.
     Hovering any other card dims the others as before.
  ──────────────────────────────────────────────────────── */
  const getIsTriad = (cardIndex: number): boolean => {
    if (hoveredFounder === null) return false;
    return hoveredFounder !== cardIndex;
  };

  return (
    <div
      ref={containerRef}
      className="relative pt-16 bg-[#F7F7F5] font-sans selection:bg-[#8BA888]/30 overflow-x-hidden"
    >
      {/* ── BACKGROUND ─────────────────────────────────────── */}
      <SoftwareBlueprint3D />

      {/* Frost overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 backdrop-blur-[100px] bg-[#F7F7F5]/80" />

      {/* ── HERO ────────────────────────────────────────────── */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex flex-col items-center justify-center px-6 text-center z-10"
      >
        <div className="max-w-5xl w-full">
          <motion.p
            custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-8"
          >
            About Forgestack Labs
          </motion.p>

          <motion.h1
            custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.9] mb-10"
          >
            Built by
            <br />
            <span className="text-[#121212]/30 italic">Engineers,</span>
            <br />
            for&nbsp;Builders.
          </motion.h1>

          <motion.p
            custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed text-[#121212]/60 mb-12"
          >
            A founder-led technology studio based in Mangalore, India. We design and build
            software systems that handle real operational complexity.
          </motion.p>

          <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="flex justify-center">
            <div className={`inline-flex flex-wrap justify-center divide-x divide-[#121212]/8 ${GLASS} overflow-hidden rounded-[2rem]`}>
              {[
                { val: "3",    lab: "Founding Engineers" },
                { val: "2026", lab: "Established"        },
                { val: "0",    lab: "Subcontractors"     },
                { val: "100%", lab: "Founder-Led"        },
              ].map(({ val, lab }) => (
                <div key={lab} className="flex flex-col items-center px-7 py-5 gap-1">
                  <span className="text-2xl md:text-3xl font-medium text-[#000000] tracking-tight leading-none">{val}</span>
                  <span className="text-[9px] uppercase tracking-[0.35em] font-bold text-[#121212]/35 whitespace-nowrap">{lab}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#121212]/25 to-transparent" />
        </motion.div>
      </motion.section>

      <div className="relative z-10 w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#121212]/10 to-transparent" />

      {/* ── FOUNDER UNIT ────────────────────────────────────── */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">

          <motion.div {...revealProps} className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-4">The Unit</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              Three nodes.<br />
              <span className="text-[#121212]/25 italic">One system.</span>
            </h2>
          </motion.div>

          {/* FounderCards — Static Command */}
          <div className="flex flex-col md:flex-row justify-center gap-8 flex-wrap items-start">
            {FOUNDERS.map((founder, i) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.14, ease: EASE_OUT }}
                className="flex-1 min-w-[280px] max-w-[340px]"
              >
                <FounderCard
                  founder={founder}
                  index={i}
                  isTriad={getIsTriad(i)}
                  onHover={(active) => setHoveredFounder(active ? i : null)}
                />
              </motion.div>
            ))}
          </div>

          {/* Unit manifesto */}
          <motion.div {...revealProps} className={`mt-10 ${GLASS} p-10 md:p-14`}>
            <div className="grid md:grid-cols-3 gap-10 md:divide-x divide-[#121212]/5">
              {[
                { label: "No Middlemen",         copy: "Every project is handled by a founding engineer. You always know exactly who is writing your code and why." },
                { label: "Mangalore-Based",       copy: "Founded in Mangalore, India. Operating globally. Startup-level ethic, product-lab discipline on every engagement." },
                { label: "Quality Over Velocity", copy: "We'd rather miss a deadline than ship something we're not proud of. Every line written with the next engineer in mind." },
              ].map((item, i) => (
                <div key={item.label} className={i > 0 ? "md:pl-10" : ""}>
                  <p className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-3">{item.label}</p>
                  <div className="w-6 h-[0.5px] bg-[#121212]/10 mb-4" />
                  <p className="text-sm font-normal leading-relaxed text-[#121212]/55">{item.copy}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#121212]/10 to-transparent" />

      {/* ── ORIGIN STORY ────────────────────────────────────── */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...revealProps} className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-4">Our Origin</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">Why we exist.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className={`${GLASS} p-12 flex flex-col`}
            >
              <span className="text-6xl font-medium text-[#8BA888]/20 leading-none mb-6 select-none">"</span>
              <p className="text-2xl md:text-3xl font-medium text-[#000000] tracking-tight leading-[1.2] flex-1">
                We didn't start a company to build generic software faster. We started one to
                build the right software, once, correctly.
              </p>
              <div className="mt-10 pt-6 border-t border-[#121212]/5">
                <p className="text-[9px] uppercase tracking-[0.45em] font-bold text-[#121212]/30"
                   style={{ fontFamily: "'Courier New', monospace" }}>
                  Forgestack Labs · Est. 2026 · Mangalore, India
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
              className={`${GLASS} p-12 flex flex-col gap-6`}
            >
              {[
                "We built Forgestack Labs after noticing the same pattern across industries: companies were paying agencies for software that looked done but wasn't built to last. Schemas without integrity constraints. APIs without typed contracts. Workable in demo. Catastrophic at scale.",
                "Our answer was to stay small on purpose. Three founding engineers, each owning a full layer of the stack. No account managers translating your requirements into someone else's approximation.",
                "Our flagship product — an intelligent fuel station and inventory management SaaS — is proof of the model. Built entirely in-house. Zero tolerance for data inconsistency. Deployed across multi-station networks with 99.9% uptime as the baseline requirement.",
              ].map((para, i) => (
                <div key={i}>
                  <p className="text-sm font-normal leading-relaxed text-[#121212]/55">{para}</p>
                  {i < 2 && <div className="w-8 h-[0.5px] bg-[#121212]/10 mt-6" />}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative z-10 w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#121212]/10 to-transparent" />

      {/* ── VALUES ──────────────────────────────────────────── */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...revealProps} className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-4">What We Stand For</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              Six things we won't<br />
              <span className="text-[#121212]/25 italic">negotiate on.</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_OUT }}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 200, damping: 22 } }}
                className={`${GLASS} p-12`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.07] select-none pointer-events-none">
                  <span className="text-4xl font-normal text-[#121212]">{v.num}</span>
                </div>
                <h3 className={`text-sm uppercase tracking-widest font-bold mb-6 ${v.color}`}>{v.num}</h3>
                <h4 className="text-xl font-medium mb-5 tracking-tight">{v.title}</h4>
                <div className="w-6 h-[0.5px] bg-[#121212]/10 mb-5" />
                <p className="text-sm font-normal leading-relaxed text-[#121212]/55">{v.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#121212]/10 to-transparent" />

      {/* ── STUDIO FACTS ────────────────────────────────────── */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...revealProps} className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-4">Studio Facts</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">The numbers speak plainly.</h2>
          </motion.div>
          <motion.div {...revealProps} className={`${GLASS} overflow-hidden`}>
            <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-[#121212]/5">
              {facts.map(({ val, lab }) => (
                <motion.div
                  key={lab}
                  whileHover={{ backgroundColor: "rgba(139,168,136,0.04)", transition: { duration: 0.3 } }}
                  className="flex flex-col items-center justify-center py-12 px-6 text-center gap-2 cursor-default"
                >
                  <span className="text-3xl md:text-4xl font-medium text-[#000000] tracking-tight leading-none">{val}</span>
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#121212]/30 leading-tight">{lab}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DARK CTA ────────────────────────────────────────── */}
      <section className="relative py-8 px-6 pb-16 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...revealProps}
            className="relative rounded-[2.5rem] overflow-hidden p-14 text-center"
            style={{ background: "linear-gradient(135deg, #1a1e2a 0%, #141722 100%)" }}
          >
            <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-[100px] opacity-25 pointer-events-none"
              style={{ background: "radial-gradient(circle, #8BA888 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[90px] opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #D4A373 0%, transparent 70%)" }} />
            <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
              <defs>
                <pattern id="footer-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#footer-grid)" />
            </svg>
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.45em] font-bold text-[#8BA888] mb-4">Work with us</p>
              <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-5">
                Serious problems deserve<br />serious engineers.
              </h3>
              <p className="text-sm text-white/50 max-w-lg mx-auto mb-10 leading-relaxed font-normal">
                We respond to every serious inquiry within 48 hours. Send us your project scope,
                timeline, and what success looks like.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link
                  href="/partnerships"
                  className="px-10 py-4 bg-[#8BA888] text-white rounded-full hover:bg-[#7A9777] transition-all duration-500 shadow-sm hover:shadow-lg hover:-translate-y-1 font-medium text-sm"
                >
                  Propose a Partnership
                </Link>
                <a
                  href="mailto:forgestacklabs@forgestacklabs.com"
                  className="px-10 py-4 bg-white/10 text-white border border-white/20 rounded-full hover:bg-white/20 transition-all duration-500 text-sm font-normal"
                >
                  forgestacklabs@forgestacklabs.com →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Typographic sign-off */}
      <section className="relative py-40 overflow-hidden z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex justify-center items-center"
        >
          <h2 className="text-[7vw] font-medium tracking-tighter text-[#121212]/5 whitespace-nowrap select-none">
            Built by Engineers, for Builders.
          </h2>
        </motion.div>
      </section>
    </div>
  );
}