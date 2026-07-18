"use client";

import Link from "next/link";
import { motion, useScroll, useSpring, useTransform,useMotionValueEvent, Variants } from "framer-motion";
import { useRef, useState } from "react";
import SoftwareBlueprint3D from "@/components/SoftwareBlueprint3D";
import AnswerFAQ from "@/components/AnswerFAQ";
import { customSoftwareAnswers } from "@/lib/aeo-content";

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
const timeline = [
  ["2026", "Incorporated in Mangaluru", "Forgestack Labs LLP was established as an in-house software engineering company in Karnataka."],
  ["2026", "DPIIT recognition", "The company received startup recognition from the Government of India."],
  ["2026", "Fuel operations platform", "Product engineering focused on an offline-first operating system for fuel retail workflows."],
  ["Now", "Products and select partnerships", "We continue building proprietary software while accepting custom engagements where the operational fit is strong."],
];
const productPrinciples = [
  ["Solve the operation", "Start with users, constraints, exceptions, and business invariants—not a feature checklist."],
  ["Own the lifecycle", "Architecture, interface, deployment, observability, support, and iteration are one product responsibility."],
  ["Measure usefulness", "A release matters only when it improves reliability, speed, control, or decision quality in real work."],
];
const leadershipPrinciples = [
  ["Engineering standards", "Leaders define review gates, architectural boundaries, security expectations, and the definition of done."],
  ["Direct ownership", "Decisions have named owners who remain accountable from discovery through operation and maintenance."],
  ["Quality without theatre", "Quality is demonstrated through working software, test evidence, operational visibility, and honest risk communication."],
];
const founders = [
  ["Sriharsha", "Founder & Chief Executive Officer", "Every product begins with understanding the problem—not the technology."],
  ["Hardhik", "Co-Founder & Chief Technology Officer", "Great architecture should remain invisible while supporting everything around it."],
  ["Pulavarson", "Co-Founder & Chief Operating Officer", "The best interface is the one users never have to think about."],
] as const;
const labValues = [
  ["Curiosity", "We begin with observation and better questions before writing code."],
  ["Ownership", "We treat every product and client decision with founder-level responsibility."],
  ["Transparency", "We explain tradeoffs, risks, architecture, and delivery decisions clearly."],
  ["Craftsmanship", "We protect quality in the details: data, interface, performance, security, and support."],
  ["Continuous Learning", "We keep improving the system, the product, and the way we work."],
  ["Long-Term Thinking", "We build software that can continue creating value after launch."],
] as const;

function CompanyTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    const idx = Math.min(timeline.length - 1, Math.max(0, Math.floor(v * timeline.length)));
    setActiveIndex(idx);
  });

  return (
    <FadeOutSection>
      <section id="company-timeline" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">

          <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-20 max-w-2xl text-center mx-auto">
            <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888]">Company timeline</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-5xl">Built deliberately from day one.</motion.h2>
            <motion.p variants={fadeUp} className="mt-6 leading-relaxed text-[#121212]/55">Follow the line through the decisions that established our product and engineering direction.</motion.p>
            <motion.div variants={fadeUp} whileHover={{ y: -4, scale: 1.03, transition: btnSpring }} className="mt-8 inline-block">
              <Link href="/timeline" className="rounded-full bg-[#121212] px-6 py-3 text-sm font-medium text-white">
                Open interactive timeline →
              </Link>
            </motion.div>
          </motion.div>

          <div ref={timelineRef} className="relative">
            {/* center line — track + fill */}
            <span aria-hidden className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#121212]/10 lg:block" />
            <motion.span
              aria-hidden
              style={{ scaleY: progress, transformOrigin: "top" }}
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#8BA888] lg:block"
            />
            {/* mobile line */}
            <span aria-hidden className="absolute left-3 top-0 h-full w-px bg-[#121212]/10 lg:hidden" />
            <motion.span
              aria-hidden
              style={{ scaleY: progress, transformOrigin: "top" }}
              className="absolute left-3 top-0 h-full w-px bg-[#8BA888] lg:hidden"
            />

            <div className="space-y-6 lg:space-y-2">
              {timeline.map(([year, title, copy], i) => {
                const isActive = i === activeIndex;
                const isPast = i < activeIndex;
                const isRight = i % 2 === 1;

                return (
                  <motion.div
                    key={`${year}-${title}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }}
                    viewport={VP}
                    className={`relative grid items-center gap-6 pl-12 lg:grid-cols-2 lg:gap-16 lg:pl-0 ${
                      isRight ? "" : ""
                    }`}
                  >
                    {/* node on the line */}
                    <motion.span
                      aria-hidden
                      animate={{
                        backgroundColor: isActive ? "#8BA888" : isPast ? "#8BA888" : "#F7F7F5",
                        scale: isActive ? 1.4 : 1,
                        boxShadow: isActive ? "0 0 0 8px rgba(139,168,136,0.18)" : "0 0 0 0px rgba(139,168,136,0)",
                      }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute left-3 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#121212]/15 lg:left-1/2"
                    />

                    {/* ghost year number — placed opposite the card on desktop */}
                    <div
                      className={`pointer-events-none hidden select-none lg:block ${
                        isRight ? "order-1 text-right pr-10" : "order-2 pl-10"
                      }`}
                    >
                      <motion.span
                        animate={{
                          opacity: isActive ? 0.14 : 0.05,
                          scale: isActive ? 1 : 0.94,
                        }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="block text-[7rem] font-medium leading-none tracking-tight text-[#121212]"
                      >
                        {year}
                      </motion.span>
                    </div>

                    {/* card */}
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0.55,
                        scale: isActive ? 1 : 0.96,
                      }}
                      transition={{ duration: 0.4, ease: EASE }}
                      whileHover={{ scale: isActive ? 1.02 : 0.98, transition: cardSpring }}
                      className={`rounded-[2rem] border p-7 backdrop-blur-2xl md:p-8 ${
                        isRight ? "order-2 lg:order-2" : "order-1 lg:order-1"
                      }`}
                      style={{
                        borderColor: isActive ? "rgba(139,168,136,0.4)" : "rgba(255,255,255,0.7)",
                        backgroundColor: isActive ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.45)",
                        boxShadow: isActive ? "0 24px 70px rgba(139,168,136,0.16)" : "0 18px 60px rgba(0,0,0,.06)",
                      }}
                    >
                      <div className="mb-6 flex items-center justify-between">
                        <span className="text-sm font-bold tracking-[0.2em] text-[#8BA888]">{year}</span>
                        <span className="text-xs text-[#121212]/25">0{i + 1}</span>
                      </div>
                      <h3 className="mb-3 text-2xl font-medium tracking-tight">{title}</h3>
                      <p className="text-sm leading-relaxed text-[#121212]/55">{copy}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </FadeOutSection>
  );
}
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
        <section className="mx-auto flex max-w-7xl flex-col items-center justify-start px-6 pb-16 pt-24 text-center md:min-h-screen md:justify-center md:py-14">
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

      {/* ── Company Facts ── */}
      <FadeOutSection>
        <section id="company-facts" className="px-6 py-28" aria-labelledby="company-facts-heading">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              <motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">
                Company Facts
              </motion.p>
              <motion.h2 variants={fadeUp} id="company-facts-heading" className="text-4xl font-medium tracking-tight md:text-5xl">
                What is Forgestack Labs?
              </motion.h2>
            </motion.div>

            <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              <motion.p variants={fadeUp} className="text-base leading-relaxed text-[#121212]/65 md:text-lg">
                Forgestack Labs LLP is a DPIIT-recognized software engineering company incorporated in 2026 and based in Mangaluru, Karnataka, India.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-[#121212]/65 md:text-lg">
                We build proprietary B2B SaaS products, including Forgestack Fuel OS, and engineer select custom web applications, backend systems, operational dashboards, and workflow platforms entirely in-house.
              </motion.p>
              <motion.dl
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                className="mt-10 grid gap-x-8 gap-y-6 border-y border-[#121212]/10 py-8 sm:grid-cols-2"
              >
                <motion.div variants={staggerItem}>
                  <dt className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#121212]/40">Legal Name</dt>
                  <dd className="mt-2 text-base font-medium">Forgestack Labs LLP</dd>
                </motion.div>
                <motion.div variants={staggerItem}>
                  <dt className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#121212]/40">Engineering Hub</dt>
                  <dd className="mt-2 text-base font-medium">Mangaluru, Karnataka</dd>
                </motion.div>
                <motion.div variants={staggerItem}>
                  <dt className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#121212]/40">Core Product</dt>
                  <dd className="mt-2 text-base font-medium">Forgestack Fuel OS</dd>
                </motion.div>
                <motion.div variants={staggerItem}>
                  <dt className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#121212]/40">Contact</dt>
                  <dd className="mt-2 text-base font-medium">hello@forgestacklabs.com</dd>
                </motion.div>
              </motion.dl>
            </motion.div>
          </div>
        </section>
      </FadeOutSection>

      {/* ── Our Identity ── */}
      <CompanyTimeline />

      <FadeOutSection>
        <section id="product-first" className="px-6 py-28">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#151715] p-8 md:p-14">
            <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-12 grid gap-8 md:grid-cols-2 md:items-end">
              <div><motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] !text-[#9DB59A]">Product-first philosophy</motion.p><motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight !text-white md:text-5xl">Build the product, not just the project.</motion.h2></div>
              <motion.p variants={fadeUp} className="max-w-xl leading-relaxed !text-white/55 md:justify-self-end">We treat software as an operating capability that must remain coherent, supportable, and valuable after the initial release.</motion.p>
            </motion.div>
            <motion.div className="grid gap-4 md:grid-cols-3" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>{productPrinciples.map(([title, copy], i) => <motion.article key={title} variants={cardReveal} className="rounded-[1.75rem] border border-white/10 bg-white/[.06] p-7"><span className="text-[10px] font-bold tracking-[.3em] !text-[#9DB59A]">0{i + 1}</span><h3 className="mb-3 mt-8 text-xl font-medium !text-white">{title}</h3><p className="text-sm leading-relaxed !text-white/50">{copy}</p></motion.article>)}</motion.div>
          </div>
        </section>
      </FadeOutSection>

      <FadeOutSection>
        <section id="leadership-philosophy" className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-14 max-w-4xl"><motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4A373]">Leadership philosophy</motion.p><motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-5xl">Standards are set through ownership.</motion.h2></motion.div>
            <motion.div className="grid gap-6 md:grid-cols-3" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>{leadershipPrinciples.map(([title, copy], i) => <motion.article key={title} variants={cardReveal} whileHover={{ y: -12, boxShadow: "0 36px 90px rgba(18,18,18,0.18)", transition: cardSpring }} className={`${glass} p-8`}><p className="mb-8 text-[10px] font-bold tracking-[.3em] text-[#D4A373]">PRINCIPLE 0{i + 1}</p><h3 className="mb-4 text-2xl font-medium tracking-tight">{title}</h3><p className="text-sm leading-relaxed text-[#121212]/55">{copy}</p></motion.article>)}</motion.div>
          </div>
        </section>
      </FadeOutSection>

      <FadeOutSection>
        <section id="founders" className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-14 max-w-4xl">
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888]">
                Founders
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-5xl">
                The people behind ForgeStack.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 max-w-3xl text-base leading-relaxed text-[#121212]/60 md:text-lg">
                ForgeStack Labs was founded by three people who share one belief: businesses deserve technology built with the same care and ownership founders have for their own companies.
              </motion.p>
              <motion.div variants={fadeUp} whileHover={{ y: -4, scale: 1.03, transition: btnSpring }} className="mt-8 inline-block">
                <Link href="/founder-timeline" className="rounded-full bg-[#121212] px-6 py-3 text-sm font-medium text-white">
                  View founder timeline →
                </Link>
              </motion.div>
            </motion.div>
            <motion.div className="grid gap-6 md:grid-cols-3" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              {founders.map(([name, role, quote], i) => (
                <motion.article
                  key={name}
                  variants={cardReveal}
                  whileHover={{ y: -12, boxShadow: "0 36px 90px rgba(18,18,18,0.18)", transition: cardSpring }}
                  className={`${glass} p-8`}
                >
                  <p className="mb-8 text-[10px] font-bold tracking-[.3em] text-[#D4A373]">FOUNDER 0{i + 1}</p>
                  <h3 className="mb-2 text-2xl font-medium tracking-tight">{name}</h3>
                  <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.28em] text-[#121212]/35">{role}</p>
                  <p className="text-sm leading-relaxed text-[#121212]/60">&ldquo;{quote}&rdquo;</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      </FadeOutSection>

      <FadeOutSection>
        <section id="lab-values" className="px-6 py-28">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#151715] p-8 md:p-14">
            <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-12 grid gap-8 md:grid-cols-2 md:items-end">
              <div>
                <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] !text-[#9DB59A]">
                  Values
                </motion.p>
                <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight !text-white md:text-5xl">
                  The standards we expect from ourselves.
                </motion.h2>
              </div>
              <motion.p variants={fadeUp} className="max-w-xl leading-relaxed !text-white/55 md:justify-self-end">
                Curiosity, ownership, transparency, craftsmanship, continuous learning, and long-term thinking define the way we build.
              </motion.p>
            </motion.div>
            <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              {labValues.map(([title, copy], i) => (
                <motion.article key={title} variants={cardReveal} className="rounded-[1.75rem] border border-white/10 bg-white/[.06] p-7">
                  <span className="text-[10px] font-bold tracking-[.3em] !text-[#9DB59A]">0{i + 1}</span>
                  <h3 className="mb-3 mt-8 text-xl font-medium !text-white">{title}</h3>
                  <p className="text-sm leading-relaxed !text-white/50">{copy}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      </FadeOutSection>

      <FadeOutSection>
        <section id="lab-book" className="px-6 py-28">
          <motion.div
            variants={panelReveal}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] border border-white/70 bg-white/55 p-10 shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur-3xl md:grid-cols-[1fr_auto] md:items-center md:p-14"
          >
            <div>
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888]">
                ForgeStack Book
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-5xl">
                The Lab, documented.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-[#121212]/55">
                Read the company story, philosophy, founders, capabilities, Fuel OS thinking, research direction, and partnership standards in one interactive book.
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

      <AnswerFAQ
        id="about-answers"
        eyebrow="Direct Answers"
        title="What should businesses know about Forgestack Labs?"
        introduction="Clear answers about our company, Mangaluru engineering hub, product work, custom software capabilities, and project enquiry process."
        items={customSoftwareAnswers}
      />
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
