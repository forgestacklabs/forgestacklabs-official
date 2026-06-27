"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import SoftwareBlueprint3D from "@/components/SoftwareBlueprint3D";

const EASE = [0.215, 0.61, 0.355, 1] as const;

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
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

const heroWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const statItem: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
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

// ─── Hover spring configs (same as home & products) ───────────────────────────
const cardSpring = { type: "spring", stiffness: 220, damping: 18 } as const;
const btnSpring  = { type: "spring", stiffness: 320, damping: 20 } as const;

const VP = { once: false, margin: "-240px" } as const;

// ─── FadeOutSection ───────────────────────────────────────────────────────────
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const culture = [
  {
    num: "01",
    color: "text-[#8BA888]",
    title: "In-House Excellence",
    kicker: "Zero Outsourcing",
    copy: "We completely reject the vibe-coder and outsourcing mentalities. Every line of code, every database schema, and every user interface is crafted entirely in-house by an elite, IIT-rooted leadership team and dedicated technical specialists.",
  },
  {
    num: "02",
    color: "text-[#D4A373]",
    title: "Uncompromising Professionalism",
    kicker: "Strict Delivery Discipline",
    copy: "Elite output requires strict discipline. From senior architects to incoming interns, we enforce absolute professional accountability. Mandatory office presence, structured deliverable timelines, and rigorous peer code reviews ensure technical debt never compromises our products.",
  },
  {
    num: "03",
    color: "text-[#121212]/50",
    title: "Design-First Execution",
    kicker: "Premium Software Experience",
    copy: "We believe enterprise software should not look like a 90s ERP system. We merge heavy-duty backend data processing with premium, high-contrast aesthetics. Our spatial glassmorphism brings a fluid, desktop-grade experience to everything we touch.",
  },
];

const facts = [
  { val: "2026", lab: "Incorporated" },
  { val: "DPIIT", lab: "Recognized" },
  { val: "0", lab: "Outsourcing" },
  { val: "100%", lab: "In-House" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const glass =
    "relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.09)] backdrop-blur-3xl";

  return (
    <main className="relative min-h-screen bg-[#F7F7F5] pt-12 font-sans text-[#121212] selection:bg-[#8BA888]/30">

      {/* Background — fade in on load */}
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <SoftwareBlueprint3D />
        <div className="absolute inset-0 bg-[#F7F7F5]/80 backdrop-blur-[100px]" />
      </motion.div>

      {/* ── Hero ── */}
      <FadeOutSection>
        <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-14 text-center">
          <motion.div variants={heroWrap} initial="hidden" animate="visible" className="flex flex-col items-center">

            <motion.p variants={heroItem} className="mb-8 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888] md:text-xs inline-flex items-center justify-center gap-3">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
              </span>
              <span className="font-bold">Architects of Scale</span>
            </motion.p>

            <motion.h1 variants={heroItem} className="mb-10 text-5xl font-medium leading-[0.93] tracking-tight md:text-7xl lg:text-8xl">
              We are builders.
              <br />
              <span className="text-[#121212]/30 italic">Not</span> middlemen.
            </motion.h1>

            <motion.p variants={heroItem} className="mx-auto mb-12 max-w-3xl text-lg font-normal leading-relaxed text-[#121212]/60 md:text-xl">
              Incorporated in 2026 and rooted in Mangaluru, Karnataka, Forgestack Labs was founded on a
              singular premise: complex business bottlenecks require dedicated, in-house, corporate-grade engineering.
            </motion.p>

            {/* Fact pills — hover float on the whole pill strip */}
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.55 } } }}
              initial="hidden"
              animate="visible"
              className="flex justify-center"
            >
              <motion.div
                variants={statItem}
                whileHover={{ y: -8, scale: 1.03, boxShadow: "0 28px 60px rgba(0,0,0,0.14)", transition: { type: "spring", stiffness: 300, damping: 18 } }}
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.09)" }}
                className={`${glass} inline-grid grid-cols-2 overflow-hidden rounded-[2rem] md:grid-cols-4`}
              >
                {facts.map(({ val, lab }) => (
                  <div key={lab} className="flex flex-col items-center gap-1 border-[#121212]/5 px-7 py-5 md:border-r last:border-r-0">
                    <span className="text-2xl font-medium leading-none tracking-tight text-[#000000] md:text-3xl">{val}</span>
                    <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.35em] text-[#121212]/35">{lab}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

          </motion.div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="h-12 w-px bg-gradient-to-b from-[#121212]/25 to-transparent" />
          </div>
        </section>
      </FadeOutSection>

      {/* ── Our Identity ── */}
      <FadeOutSection>
        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">

            <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-16 max-w-4xl">
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888]">
                Our Identity
              </motion.p>
              <motion.h2 variants={fadeUp} className="mb-6 text-4xl font-medium tracking-tight md:text-5xl">
                A Pure Software Product Company
              </motion.h2>
              <motion.p variants={fadeUp} className="max-w-3xl text-base leading-relaxed text-[#121212]/60 md:text-lg">
                We are not a digital agency. We are a deeply technical software engineering product company.
                Our core focus is architecting and scaling our own proprietary B2B SaaS ecosystem, tools that
                eliminate black-box operational failures in traditional industries.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-[1.05fr_0.95fr]"
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              {/* Identity card 1 */}
              <motion.div
                variants={cardReveal}
                whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.09)" }}
                className={`${glass} p-10 md:p-12`}
              >
                <motion.p variants={labelReveal} className="mb-6 text-[10px] font-bold uppercase tracking-[0.45em] text-[#D4A373]">
                  The Anti-Agency
                </motion.p>
                <h3 className="mb-6 text-3xl font-medium tracking-tight text-[#121212] md:text-4xl">
                  Because we build for ourselves, we know exactly what it takes to build for you.
                </h3>
                <div className="mb-6 h-px w-12 bg-[#121212]/10" />
                <p className="text-sm leading-relaxed text-[#121212]/60 md:text-base">
                  When we partner with select enterprises for custom engineering, we apply the exact same
                  uncompromising standards, architectural rigor, and DPIIT-recognized methodologies that power
                  our own flagship products.
                </p>
              </motion.div>

              {/* Identity card 2 */}
              <motion.div
                variants={cardReveal}
                whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.09)" }}
                className={`${glass} p-10 md:p-12`}
              >
                <motion.p variants={labelReveal} className="mb-6 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">
                  What This Means
                </motion.p>
                <div className="space-y-5">
                  {[
                    "No account-manager translation layer.",
                    "No outsourced engineering hidden behind polished decks.",
                    "No demo-only architecture that collapses under real operations.",
                    "No compromise between technical integrity and interface quality.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8BA888]/70" />
                      <p className="text-sm leading-relaxed text-[#121212]/60">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

          </div>
        </section>
      </FadeOutSection>

      {/* ── Culture ── */}
      <FadeOutSection>
        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">

            <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-16 text-center">
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888]">
                The Forgestack Culture
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-5xl">
                How We Work
              </motion.h2>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-3"
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              {culture.map((item) => (
                <motion.div
                  key={item.num}
                  variants={cardReveal}
                  whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.09)" }}
                  className={`${glass} group p-10 md:p-12`}
                >
                  <div className="absolute right-0 top-0 p-8 opacity-10 transition-opacity group-hover:opacity-30">
                    <span className="text-4xl font-normal text-[#121212]">{item.num}</span>
                  </div>
                  <p className={`mb-5 text-sm font-bold uppercase tracking-widest ${item.color}`}>{item.num}</p>
                  <h3 className="mb-3 text-2xl font-medium tracking-tight text-[#121212]">{item.title}</h3>
                  <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.35em] text-[#121212]/35">{item.kicker}</p>
                  <div className="mb-6 h-px w-8 bg-[#121212]/10" />
                  <p className="text-sm leading-relaxed text-[#121212]/60">{item.copy}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>
      </FadeOutSection>

      {/* ── CTA ── */}
      <FadeOutSection>
        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={panelReveal}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              <div
                className="relative overflow-hidden rounded-[2.5rem] p-14 text-center md:p-20"
                style={{ background: "linear-gradient(135deg, #1a1e2a 0%, #141722 100%)" }}
              >
                <div
                  className="pointer-events-none absolute left-1/4 top-0 h-80 w-80 rounded-full blur-[100px] opacity-25"
                  style={{ background: "radial-gradient(circle, #8BA888 0%, transparent 70%)" }}
                />
                <div
                  className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full blur-[90px] opacity-20"
                  style={{ background: "radial-gradient(circle, #D4A373 0%, transparent 70%)" }}
                />
                <motion.div
                  className="relative z-10"
                  variants={staggerWrap}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VP}
                >
                  <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">
                    Footer &amp; Conversion
                  </motion.p>
                  <motion.h2 variants={fadeUp} className="mb-8 text-3xl font-medium tracking-tight text-white md:text-5xl">
                    Looking for a team that shares your obsession with scale?
                  </motion.h2>
                  <motion.div variants={staggerItem}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.04, transition: btnSpring }}
                      className="inline-block"
                    >
                      <Link
                        href="/contact?mode=custom#contact-inquiry"
                        className="inline-flex rounded-full bg-[#8BA888]  px-10 py-4 text-sm text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20"
                      >
                        Commission Forgestack Labs
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </FadeOutSection>

     

    </main>
  );
}