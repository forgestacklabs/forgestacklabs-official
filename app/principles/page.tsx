"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";


/**
 * FORGESTACK LABS — APPROACH PAGE
 * Design System: Homepage Parity — Calm Tech / Minimalist Product Lab
 * Colors: #8BA888 (sage), #D4A373 (amber), #222222 (ink), #F7F7F5 (bg)
 * Font: font-medium/light tracking-tight (not font-black)
 * Cards: rounded-[2.5rem] bg-white/40 border-white/50
 */

/* ── CONSTANTS ─────────────────────────────────────────────── */
const EASE_OUT   = [0.215, 0.61, 0.355, 1] as const;
const SPRING     = { stiffness: 100, damping: 30 } as const;

/* ── GLASS CARD CLASS — homepage token ────────────────────── */
const GLASS = `
  relative overflow-hidden rounded-[2.5rem]
  bg-white/40 backdrop-blur-md
  border border-white/50
  shadow-sm hover:shadow-md
  transition-all duration-700
`;

/* ── REVEAL COMPONENT ──────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/* ── FLOATING GLASS CARD — homepage hover/shadow style ─────── */
function FloatCard({
  children,
  floatDelay = 0,
  className = "",
}: {
  children: React.ReactNode;
  floatDelay?: number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      whileHover={{ y: -5, transition: { type: "spring", ...SPRING } }}
      className={`${GLASS} ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/* ── SECTION LABEL — homepage green accent ─────────────────── */
function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-4">
      {children}
    </p>
  );
}

/* ── STEP CONNECTOR ────────────────────────────────────────── */
function StepConnector({ index }: { index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="relative flex items-center gap-5 py-2 ml-8 md:ml-14">
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        style={{ originY: 0 }}
        className="w-[1px] h-16 bg-gradient-to-b from-[#222222]/10 via-[#222222]/5 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
        className="flex items-center gap-2"
      >
        <div className="w-4 h-[0.5px] bg-[#222222]/10" />
        <span className="text-[8px] uppercase tracking-[0.5em] font-semibold text-[#222222]/20">
          {`0${index}`}
        </span>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default function ApproachPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  /* ── Scroll-driven hero exit — exact homepage pattern ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroOpacity = useTransform(smooth, [0, 0.12], [1, 0]);
  const heroScale   = useTransform(smooth, [0, 0.12], [1, 0.98]);
  const bgY         = useTransform(smooth, [0, 1], ["0%", "20%"]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-[#F7F7F5]" />;

  /* ── PILLARS DATA ───────────────────────────────────── */
  const pillars = [
    {
      index:      1,
      accent:     "Pillar 01",
      headline:   "Direct Access.\nNo Intermediaries.",
      kicker:     "Founder-Led Execution",
      copy:       "We eliminated the 'Account Manager' layer entirely. When you partner with us, you are in direct conversation with the founders writing the code. This ensures technical decisions are made with business goals in mind — increasing velocity, reducing noise, and removing the telephone-game distortion that plagues traditional agencies.",
      metric:     { val: "0",   lab: "Communication layers" },
      color:      "text-[#8BA888]",
      glyph:      "◆",
      floatDelay: 0,
    },
    {
      index:      2,
      accent:     "Pillar 02",
      headline:   "Design for\nthe Edge Case.",
      kicker:     "Explicit Architecture",
      copy:       "We favor explicit design over implicit behavior. Before the first line of code is written, we map out the logic, failure points, and data flows. This disciplined approach eliminates 90% of bugs before they manifest in production — because a problem caught on a whiteboard costs nothing compared to one found at 2am by a client.",
      metric:     { val: "90%", lab: "Bugs eliminated pre-code" },
      color:      "text-[#D4A373]",
      glyph:      "◇",
      floatDelay: 1.5,
    },
    {
      index:      3,
      accent:     "Pillar 03",
      headline:   "Elite Unit\nEfficiency.",
      kicker:     "Venture-Grade Velocity",
      copy:       "As a focused, 4-person agile unit, we move faster than agencies ten times our size. We utilize a modern, modular tech stack that allows us to ship enterprise-grade systems in weeks, not months. Every person on the team writes code. There are no passengers.",
      metric:     { val: "4×",  lab: "Faster than agency average" },
      color:      "text-[#222222]/60",
      glyph:      "◈",
      floatDelay: 3,
    },
  ];

  /* ── HERO STAGGER — homepage fadeUp pattern ─────────── */
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.8, ease: EASE_OUT },
    }),
  };

  return (
    <div
      ref={containerRef}
      className="relative pt-16 bg-[#F7F7F5] text-[#222222] font-sans selection:bg-[#8BA888]/30 overflow-x-hidden"
    >
     

      {/* ════════════════════════════════
          FIXED BACKGROUND — homepage orbs
      ════════════════════════════════ */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-gradient-to-b from-[#F7F7F5] via-[#F0F0EE] to-[#F7F7F5]"
        />

        {/* Sage orb — top-right (homepage token) */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] rounded-full bg-[#8BA888]/5 blur-[120px]"
        />
        {/* Amber orb — bottom-left (homepage token) */}
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#D4A373]/5 blur-[120px]"
        />
      </div>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="max-w-5xl w-full">

          {/* Badge */}
          <motion.p
            custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold text-[#8BA888] mb-8"
          >
            Approach
          </motion.p>

          {/* Headline — homepage font-medium tracking-tight style */}
          <motion.h1
            custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="font-medium tracking-tight leading-[0.92] text-[#222222] mb-6"
            style={{ fontSize: "clamp(3.8rem, 8.5vw, 10rem)" }}
          >
            Restraint
            <br />
            <span className="text-[#222222]/40 italic">as a Feature.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="text-[10px] uppercase tracking-[0.55em] font-bold text-[#8BA888]/70 mb-8"
          >
            We don't build to fill a roadmap. We build to solve a bottleneck.
          </motion.p>

          {/* Body */}
          <motion.p
            custom={3} initial="hidden" animate="visible" variants={fadeUp}
            className="max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed text-[#222222]/70 mb-14"
          >
            Our philosophy is rooted in the belief that software should be quiet, reliable,
            and invisible. We avoid the bloat of traditional agencies to focus on the
            high-precision architecture your business requires.
          </motion.p>

          {/* Hero glass strip — manifesto phrases */}
          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="flex justify-center">
            <FloatCard floatDelay={0} className="inline-block">
              <div className="flex divide-x divide-[#222222]/5 px-2">
                {[
                  { color: "text-[#8BA888]",      glyph: "◆", text: "Quiet by design" },
                  { color: "text-[#D4A373]",      glyph: "◇", text: "Explicit always"  },
                  { color: "text-[#222222]/40",   glyph: "◈", text: "Built to last"    },
                ].map(({ color, glyph, text }) => (
                  <div key={text} className="flex items-center gap-3 px-7 py-5">
                    <span className={`${color} text-base select-none`}>{glyph}</span>
                    <span className="text-[9px] uppercase tracking-[0.4em] font-semibold text-[#222222]/40 whitespace-nowrap">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </FloatCard>
          </motion.div>
        </div>

        {/* Scroll nudge — homepage style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#222222]/20 to-transparent" />
        </motion.div>
      </motion.section>

      {/* Hairline */}
      <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#222222]/8 to-transparent" />

      {/* ════════════════════════════════
          STEP-SEQUENCE: 3 PILLARS
      ════════════════════════════════ */}
      <section className="relative py-32 px-6 md:px-16 z-10">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <Reveal className="mb-16">
            <SLabel>The Forgestack Manifesto</SLabel>
            <h2
              className="font-medium tracking-tight leading-tight text-[#222222]"
              style={{ fontSize: "clamp(2.2rem, 4vw, 4rem)" }}
            >
              Three pillars.
              <br />
              <span className="text-[#222222]/30 italic">No compromises.</span>
            </h2>
          </Reveal>

          {/* The sequence */}
          <div className="mt-4 space-y-0">
            {pillars.map((pillar, i) => (
              <div key={pillar.index}>

                {i > 0 && <StepConnector index={pillar.index} />}

                {/* PILLAR CARD — homepage card style */}
                <Reveal delay={0.05}>
                  <motion.div
                    whileHover={{ y: -5, transition: { type: "spring", ...SPRING } }}
                    className={`${GLASS} w-full`}
                  >
                    {/* Corner ghost number — homepage pattern */}
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none select-none">
                      <span className="text-5xl font-light">{`0${pillar.index}`}</span>
                    </div>

                    <div className="p-10 md:p-14">
                      <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-start">

                        {/* LEFT — content */}
                        <div>
                          {/* Kicker + pillar label */}
                          <div className="flex items-center gap-4 mb-6">
                            <span className={`text-sm uppercase tracking-widest font-bold ${pillar.color}`}>
                              {pillar.accent}
                            </span>
                            <div className="w-8 h-[0.5px] bg-[#222222]/10" />
                            <span className="text-[8px] uppercase tracking-[0.45em] font-semibold text-[#222222]/30">
                              {pillar.kicker}
                            </span>
                          </div>

                          {/* Headline */}
                          <h3
                            className="font-medium tracking-tight leading-[0.95] text-[#222222] mb-6 whitespace-pre-line"
                            style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}
                          >
                            {pillar.headline}
                          </h3>

                          {/* Hairline */}
                          <div className="w-12 h-[0.5px] bg-[#222222]/10 mb-6" />

                          {/* Body */}
                          <p className="text-[#222222]/60 font-light leading-relaxed max-w-xl"
                            style={{ fontSize: "clamp(0.88rem, 1.1vw, 0.98rem)" }}
                          >
                            {pillar.copy}
                          </p>
                        </div>

                        {/* RIGHT — metric card */}
                        <div className="flex-shrink-0 self-center">
                          <motion.div
                            whileHover={{ scale: 1.04, transition: { type: "spring", ...SPRING } }}
                            className="
                              rounded-[2rem] p-7 text-center min-w-[140px]
                              bg-white/50 backdrop-blur-md
                              border border-white/60
                              shadow-sm hover:shadow-md transition-all duration-700
                            "
                          >
                            {/* Glyph */}
                            <motion.span
                              className={`block text-xl mb-3 select-none ${pillar.color}`}
                              animate={{ rotate: [0, 8, 0, -8, 0] }}
                              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: pillar.floatDelay }}
                            >
                              {pillar.glyph}
                            </motion.span>

                            {/* Value */}
                            <span
                              className="block font-medium text-[#222222] tracking-tight leading-none mb-2"
                              style={{ fontSize: "clamp(2.2rem, 3.5vw, 2.8rem)" }}
                            >
                              {pillar.metric.val}
                            </span>

                            {/* Label */}
                            <span className="block text-[8px] uppercase tracking-[0.35em] font-semibold text-[#222222]/30 leading-tight">
                              {pillar.metric.lab}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              </div>
            ))}

            {/* Terminal connector */}
            <div className="flex items-center gap-5 py-2 ml-8 md:ml-14">
              <div className="w-[1px] h-10 bg-gradient-to-b from-[#222222]/8 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Hairline */}
      <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#222222]/8 to-transparent" />

      {/* ════════════════════════════════
          WHY THIS MATTERS
      ════════════════════════════════ */}
      <section className="relative py-32 px-6 md:px-16 z-10">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-16">
            <SLabel>Why It Works</SLabel>
            <h2
              className="font-medium tracking-tight leading-tight text-[#222222]"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
            >
              The sum of the parts.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num:   "01",
                color: "text-[#8BA888]",
                title: "No Account Managers",
                copy:  "The person who answers your call is the person who wrote the code. Zero translation layer means zero distortion of your requirements.",
              },
              {
                num:   "02",
                color: "text-[#D4A373]",
                title: "Documented before Built",
                copy:  "Every architecture decision is written down before it becomes an implementation. Our clients receive a living technical spec, not just a deployment.",
              },
              {
                num:   "03",
                color: "text-[#222222]/60",
                title: "Small, On Purpose",
                copy:  "We will never scale this team beyond the point where every member can own a critical system. Competence cannot be distributed infinitely.",
              },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 0.13}>
                <motion.div
                  whileHover={{ y: -5, transition: { type: "spring", ...SPRING } }}
                  className={`${GLASS} p-12 h-full flex flex-col`}
                >
                  {/* Corner ghost num — homepage pattern */}
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none select-none">
                    <span className="text-4xl font-light">{item.num}</span>
                  </div>
                  <div className="relative z-10 flex flex-col h-full">
                    <span className={`text-sm uppercase tracking-widest font-bold mb-6 ${item.color}`}>
                      {item.num}
                    </span>
                    <h4 className="font-medium text-[#222222] text-2xl tracking-tight mb-4">
                      {item.title}
                    </h4>
                    <div className="w-6 h-[0.5px] bg-[#222222]/10 mb-5" />
                    <p className="text-sm text-[#222222]/60 font-light leading-relaxed mt-auto">
                      {item.copy}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hairline */}
      <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#222222]/8 to-transparent" />

      {/* ════════════════════════════════
          FINAL CALL-TO-ACTION
          — dark card, exact homepage style
      ════════════════════════════════ */}
      <section className="relative py-32 px-6 md:px-16 z-10">
        <div className="max-w-6xl mx-auto">
          <Reveal delay={0.05}>
            <motion.div
              className="relative rounded-[2.5rem] overflow-hidden p-14 md:p-20 text-center"
              style={{ background: "linear-gradient(135deg, #1a1e2a 0%, #141722 100%)" }}
              whileHover={{ scale: 1.005, transition: { type: "spring", ...SPRING } }}
            >
              {/* Sage ambient glow */}
              <div
                className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-[100px] opacity-25 pointer-events-none"
                style={{ background: "radial-gradient(circle, #8BA888 0%, transparent 70%)" }}
              />
              {/* Amber ambient glow */}
              <div
                className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[90px] opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, #D4A373 0%, transparent 70%)" }}
              />

              {/* Blueprint grid */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
                <defs>
                  <pattern id="dark-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                    <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dark-grid)" />
              </svg>

              <div className="relative z-10">
                {/* Kicker */}
                <p className="text-[10px] uppercase tracking-[0.45em] font-bold text-[#8BA888] mb-4">
                  The next step
                </p>

                {/* Headline */}
                <h2
                  className="font-medium tracking-tight text-white leading-tight mb-5"
                  style={{ fontSize: "clamp(2.4rem, 4.5vw, 5rem)" }}
                >
                  Ready to Architect?
                </h2>

                {/* Body */}
                <p className="text-sm text-white/40 font-light max-w-lg mx-auto mb-12 leading-relaxed">
                  We partner with founders and product teams who have real constraints and real ambitions.
                  If you've read this far, we're probably a fit. Let's find out.
                </p>

                {/* CTA — homepage button style */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", ...SPRING }}
                  >
                    <Link
                      href="/partnerships"
                      className="
                        inline-flex items-center gap-3 px-10 py-4 rounded-full
                        bg-[#8BA888] text-white text-sm font-semibold
                        hover:bg-[#7A9777] transition-all duration-500
                        shadow-sm hover:shadow-lg hover:-translate-y-1
                      "
                    >
                      Propose a Partnership
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════
          SIGN-OFF WATERMARK — homepage typographic pre-footer style
      ════════════════════════════════ */}
      <section className="relative py-60 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-[#222222]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-[#222222]/5 to-transparent" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex justify-center items-center"
        >
          <h2
            className="font-medium tracking-tighter leading-[0.88] select-none text-[#222222]/5 whitespace-nowrap"
            style={{ fontSize: "7vw" }}
          >
            RESTRAINT AS A FEATURE.
          </h2>
        </motion.div>
      </section>

    </div>
  );
}