"use client";

import Link from "next/link";
import AnswerFAQ from "@/components/AnswerFAQ";
import { fuelOsAnswers } from "@/lib/aeo-content";
import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

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

const ctaReveal: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

// ─── Hover spring configs (same as home) ─────────────────────────────────────
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
const threats = [
  { title: "The Trust Deficit",  copy: "Owners suffer from invisible theft. Manual tracking makes it impossible to distinguish evaporation, mathematical errors, or employee skimming." },
  { title: "Offline Paralysis",  copy: "Traditional cloud-based POS systems fail during internet outages, a frequent reality in highway or Tier-2 locations, paralyzing the station and halting billing entirely." },
  { title: "The Credit Trap",    copy: "B2B fleet credit is actively mismanaged through notebooks or WhatsApp, leading to breached limits and drained working capital." },
];
const platforms = [
  { title: "The Owner's Desktop Command Center",     copy: "A high-speed Web POS engineered for sub-5-second billing, paired with a comprehensive analytics dashboard for the cashier and station owner." },
  { title: "The Manager's Offline-First Mobile App", copy: "A resilient on-ground mobile application for forecourt managers to handle shift operations, inventory, and billing right at the pump." },
];
const differentiators = [
  { num: "01", title: "Digital Twin Architecture",             copy: "The software visually maps underground tanks to above-ground pumps and nozzles. When fuel leaves a nozzle, the system deducts the exact volume from the corresponding digital tank, creating a single source of truth." },
  { num: "02", title: "True Offline-First Edge Computing",     copy: "The mobile app uses local on-device databases so managers can log in, verify B2B credit limits, and continue billing with zero internet connectivity. Background sync pushes data to the cloud when the network returns." },
  { num: "03", title: "Evidence-Based Digital Reconciliation", copy: "A stressful 3-hour manual shift audit becomes a mathematically secure 3-minute workflow with mandatory photographic evidence of physical pump meters and instant variance calculation." },
  { num: "04", title: "Hard-Enforced Credit Locks",            copy: "If a commercial fleet truck attempts to purchase fuel beyond its pre-set limit, the POS API blocks the transaction and refuses to print the bill." },
  { num: "05", title: "In-House Engineering & Premium Design", copy: "Built entirely in-house, Fuel OS abandons clunky ERP aesthetics for a premium, high-contrast glassmorphic UI that feels desktop-grade on the forecourt." },
];
const roadmap = [
  { phase: "Phase 01", title: "Operational Core", copy: "Billing, shift controls, tank inventory, credit customers, reconciliation, and owner visibility form the first dependable operating layer." },
  { phase: "Phase 02", title: "Offline-First Field Operations", copy: "Manager mobile workflows continue to work locally when connectivity drops, then synchronize operational records when the network returns." },
  { phase: "Phase 03", title: "Digital Twin Intelligence", copy: "Tanks, pumps, nozzles, inventory, sales, credit, and events become one connected model for clearer decisions and exception handling." },
  { phase: "Phase 04", title: "Analytics & Multi-Site Growth", copy: "Reporting, alerts, comparative station views, and higher-level operational intelligence support owners as the business scales." },
] as const;
const stats = [
  { value: "<5s",  label: "Billing Target" },
  { value: "3m",   label: "Shift Audit" },
  { value: "0",    label: "Offline Downtime" },
  { value: "100%", label: "In-House" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  return (
    <main className="relative min-h-screen bg-[#F7F7F5] pt-14 text-[#121212]">

      {/* Background blobs */}
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute left-[-12%] top-[-18%] h-[44rem] w-[44rem] rounded-full bg-[#8BA888]/14 blur-[120px]" />
        <div className="absolute bottom-[-18%] right-[-12%] h-[40rem] w-[40rem] rounded-full bg-[#D4A373]/14 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,18,18,0.08)_1px,transparent_1px)] [background-size:46px_46px] opacity-20" />
      </motion.div>

      {/* ── Hero ── */}
      <FadeOutSection>
        <section className="relative mx-auto flex max-w-7xl flex-col justify-start px-6 pb-16 pt-24 text-center md:min-h-screen md:justify-center md:py-14">
          <motion.div variants={heroWrap} initial="hidden" animate="visible" className="flex flex-col items-center">

            <motion.p variants={heroItem} className="mb-8 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888] md:text-xs inline-flex items-center justify-center gap-3">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
              </span>
              <span className="font-bold">Offline-First Fuel Station Management OS</span>
            </motion.p>

            <motion.h1 variants={heroItem} className="mx-auto max-w-6xl text-5xl font-medium leading-[0.93] tracking-tight md:text-7xl lg:text-8xl">
              The station&apos;s central nervous system.
            </motion.h1>

            <motion.p variants={heroItem} className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-[#121212]/60 md:text-xl">
              Forgestack Fuel OS is a dual-platform, offline-first POS and management ecosystem engineered to eliminate fuel station theft, connect physical inventory with financial reality, and automate B2B credit control.
            </motion.p>

            {/* Unified stats strip */}
            <motion.div
              className="mt-12 flex justify-center"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.55 } } }}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={statItem}
                whileHover={{ y: -8, scale: 1.03, boxShadow: "0 28px 60px rgba(0,0,0,0.14)", transition: { type: "spring", stiffness: 300, damping: 18 } }}
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.09)" }}
                className="relative inline-grid grid-cols-2 overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-3xl md:grid-cols-4"
              >
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-1 border-[#121212]/5 px-7 py-5 md:border-r last:border-r-0">
                    <span className="text-2xl font-medium leading-none tracking-tight text-[#000000] md:text-3xl">{s.value}</span>
                    <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.35em] text-[#121212]/35">{s.label}</span>
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

      {/* ── Why We Built It ── */}
      <FadeOutSection>
        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">

            <motion.div className="mb-14 max-w-4xl" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#D4A373]">
                Why We Built It
              </motion.p>
              <motion.h2 variants={fadeUp} className="mb-6 text-4xl font-medium tracking-tight md:text-5xl">
                Solving the fuel retail black box.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base leading-relaxed text-[#121212]/60 md:text-lg">
                Fuel stations run on razor-thin margins, yet physical fuel, cash, and credit data often remain disconnected. Fuel OS neutralizes the three threats that make daily operations anxious and opaque.
              </motion.p>
            </motion.div>

            <motion.div className="grid gap-6 md:grid-cols-3" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              {threats.map((t) => (
                <motion.article
                  key={t.title}
                  variants={cardReveal}
                  whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                  style={{ boxShadow: "0 20px 70px rgba(0,0,0,0.06)" }}
                  className="rounded-[2rem] border border-white/70 bg-white/50 p-8 backdrop-blur-3xl transition-colors duration-500 hover:border-[#121212]/18 hover:bg-white/80"
                >
                  <h3 className="mb-4 text-2xl font-medium tracking-tight">{t.title}</h3>
                  <p className="text-sm leading-relaxed text-[#121212]/58">{t.copy}</p>
                </motion.article>
              ))}
            </motion.div>

          </div>
        </section>
      </FadeOutSection>

      {/* ── Two Platforms ── */}
      <FadeOutSection>
        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={panelReveal}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="rounded-[2.5rem] border border-white/70 bg-[#121212] p-9 text-white shadow-[0_28px_100px_rgba(0,0,0,0.18)] md:p-14"
            >
              <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

                <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
                  <motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">
                    What It Is
                  </motion.p>
                  <motion.h2 variants={fadeUp} className="mb-6 text-4xl font-medium tracking-tight text-white md:text-5xl">
                    Two perfectly synced platforms.
                  </motion.h2>
                  <motion.p variants={fadeUp} className="text-sm leading-relaxed text-white/60 md:text-base">
                    Fuel OS directly links the physical realities of the forecourt, tanks and pumps, with financial realities like billing, cash, and B2B credit.
                  </motion.p>
                </motion.div>

                <motion.div className="grid gap-4" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
                  {platforms.map((p) => (
                    <motion.div
                      key={p.title}
                      variants={cardReveal}
                      whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(0,0,0,0.35)", transition: cardSpring }}
                      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                      className="rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-7 backdrop-blur-xl transition-colors duration-500 hover:border-white/30 hover:bg-white/[0.12]"
                    >
                      <h3 className="mb-3 text-xl font-medium tracking-tight text-white">{p.title}</h3>
                      <p className="text-sm leading-relaxed text-white/60">{p.copy}</p>
                    </motion.div>
                  ))}
                </motion.div>

              </div>
            </motion.div>
          </div>
        </section>
      </FadeOutSection>

      {/* ── Engineering Differentiators ── */}
      <FadeOutSection>
        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">

            <motion.div className="mb-14 max-w-4xl" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">
                Engineering Differentiators
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-5xl">
                Replacing manual trust with digital verification.
              </motion.h2>
            </motion.div>

            <motion.div className="grid gap-6 md:grid-cols-2" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              {differentiators.map((d) => (
                <motion.article
                  key={d.num}
                  variants={cardReveal}
                  whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                  style={{ boxShadow: "0 20px 70px rgba(0,0,0,0.06)" }}
                  className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/50 p-8 backdrop-blur-3xl transition-colors duration-500 hover:border-[#121212]/18 hover:bg-white/80"
                >
                  <span className="absolute right-8 top-6 text-5xl font-medium text-[#121212]/5">{d.num}</span>
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#D4A373]">{d.num}</p>
                  <h3 className="mb-4 text-2xl font-medium tracking-tight">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-[#121212]/58">{d.copy}</p>
                </motion.article>
              ))}
            </motion.div>

          </div>
        </section>
      </FadeOutSection>

      {/* ── Fuel OS Roadmap ── */}
      <FadeOutSection>
        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div className="mb-14 max-w-4xl" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#D4A373]">
                Fuel OS Roadmap
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-5xl">
                From daily control to operational intelligence.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 max-w-3xl text-base leading-relaxed text-[#121212]/60 md:text-lg">
                Fuel OS is not a single feature set. It is a phased operating system for modern fuel retail, designed to evolve from reliable daily workflows into connected decision intelligence.
              </motion.p>
            </motion.div>

            <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              {roadmap.map((item, i) => (
                <motion.article
                  key={item.phase}
                  variants={cardReveal}
                  whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                  className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 p-7 shadow-[0_20px_70px_rgba(0,0,0,0.06)] backdrop-blur-3xl"
                >
                  <span className="absolute right-6 top-4 text-5xl font-medium text-[#121212]/5">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8BA888]">{item.phase}</p>
                  <h3 className="mb-4 text-xl font-medium tracking-tight">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#121212]/58">{item.copy}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      </FadeOutSection>

      <AnswerFAQ
        id="fuel-os-answers"
        eyebrow="Fuel OS Answers"
        title="What should operators know about fuel station management software?"
        introduction="Direct answers about Forgestack Fuel OS, offline operations, inventory control, and the teams the platform is designed to support."
        items={fuelOsAnswers}
      />
      {/* ── CTA ── */}
      <FadeOutSection>
        <section className="px-6 py-28">
          <motion.div
            variants={ctaReveal}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/70 bg-white/55 p-10 text-center shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur-3xl md:p-16"
          >
            <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              <motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">
                Request Access
              </motion.p>
              <motion.h2 variants={fadeUp} className="mx-auto mb-6 max-w-4xl text-4xl font-medium tracking-tight md:text-5xl">
                Ready to secure your station&apos;s operations?
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-[#121212]/60 md:text-base">
                Talk to Forgestack Labs about deploying an offline-first operating system for fuel retail operations.
              </motion.p>
              <motion.div variants={staggerItem}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.04, transition: btnSpring }}
                  className="inline-block"
                >
                  <Link
                    href="/contact?mode=demo#contact-inquiry"
                    className="inline-flex rounded-full bg-[#8BA888] px-9 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white shadow-[0_18px_45px_rgba(139,168,136,0.28)] transition-colors duration-300 hover:bg-[#121212] hover:shadow-[0_24px_60px_rgba(18,18,18,0.22)]"
                  >
                    Request a Demo
                  </Link>
                </motion.div>
              </motion.div>
              <motion.p variants={fadeUp} className="mt-6 text-sm text-[#121212]/45">
                hello@forgestacklabs.com · Engineered in Mangaluru, deploying globally.
              </motion.p>
            </motion.div>
          </motion.div>
        </section>
      </FadeOutSection>

    </main>
  );
}


