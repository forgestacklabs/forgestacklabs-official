"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const EASE = [0.215, 0.61, 0.355, 1] as const;

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
const pillSpring = { type: "spring", stiffness: 300, damping: 18 } as const;
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

const offerings = [
  {
    label: "Card 01",
    accent: "#8BA888",
    accentClass: "text-[#8BA888]",
    title: "The Forgestack Ecosystem",
    copy: "Discover our suite of ready-to-deploy software. From our flagship offline-first fuel station management platform to next-generation tools in stealth, we build tech that eliminates industry bottlenecks.",
    href: "/products",
    cta: "View Platforms",
  },
  {
    label: "Card 02",
    accent: "#D4A373",
    accentClass: "text-[#D4A373]",
    title: "Enterprise Web Architecture",
    copy: "We partner with select clients to build highly secure, custom digital solutions. From resilient server architectures to fluid frontend execution, we enforce our proprietary standards on your vision.",
    href: "/contact?mode=custom#contact-inquiry",
    cta: "Discuss Your Project",
  },
];

const standards = [
  {
    num: "01",
    color: "text-[#8BA888]",
    title: "Architectural Precision",
    copy: "Strict branching models, mandatory peer reviews, and automated CI/CD pipelines ensure a secure, highly maintainable codebase.",
  },
  {
    num: "02",
    color: "text-[#D4A373]",
    title: "High-Availability Scaling",
    copy: "Containerized server deployments and rigorous backend load-testing guarantee flawless performance during massive traffic surges.",
  },
  {
    num: "03",
    color: "text-[#121212]/50",
    title: "Design-First Execution",
    copy: "Heavy-duty backend engineering seamlessly merged with fluid, minimalist, glassmorphic user interfaces.",
  },
];

const stats = [
  { value: "98%", label: "Client Retention" },
  { value: "5s",  label: "Billing Target" },
  { value: "3m",  label: "Shift Audit" },
  { value: "0",   label: "Offline Downtime" },
];

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.06, boxShadow: "0 28px 60px rgba(0,0,0,0.14)", transition: pillSpring }}
      style={{ boxShadow: "0 18px 60px rgba(0,0,0,0.06)" }}
      className="rounded-[1.75rem] border border-white/60 bg-white/40 px-7 py-6 backdrop-blur-2xl cursor-default"
    >
      <p className="text-3xl font-medium tracking-tight">{value}</p>
      <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.32em] text-[#121212]/35">{label}</p>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-[#F7F7F5] font-sans text-[#121212] selection:bg-[#8BA888]/30">

      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(247,247,245,0.5)_100%)]" />
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute right-[-8%] top-[-12%] h-[44rem] w-[44rem] rounded-full bg-[#8BA888]/10 blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-12%] h-[38rem] w-[38rem] rounded-full bg-[#D4A373]/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,18,18,0.07)_1px,transparent_1px)] [background-size:46px_46px] opacity-20" />
        </div>
      </motion.div>

      {/* ── Hero ── */}
      <FadeOutSection>
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-20 text-center md:pt-24">
          <div className="w-full max-w-6xl">
            <motion.div variants={heroWrap} initial="hidden" animate="visible" className="flex flex-col items-center">

              <motion.p variants={heroItem} className="relative top-4 mb-8 inline-flex items-center justify-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888] md:text-xs">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
                </span>
                <span className="font-bold">When Vision Meets Precision</span>
              </motion.p>

              <motion.h1 variants={heroItem} className="mb-10 text-5xl font-medium leading-[0.93] tracking-tight text-[#121212] md:text-7xl lg:text-[6.5rem]">
                Engineer the Solution.
                <br />
                <span className="italic text-[#121212]/30">Scale</span> the Impact.
              </motion.h1>

              <motion.p variants={heroItem} className="mx-auto mb-12 max-w-3xl text-lg font-normal leading-relaxed text-[#121212]/55 md:text-xl">
                ForgeStack Labs is a DPIIT-recognized software firm. We architect proprietary B2B SaaS
                ecosystems and engineer corporate-grade custom web applications built for scale.
              </motion.p>

              <motion.div variants={heroItem} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.div whileHover={{ y: -5, scale: 1.04, transition: btnSpring }}>
                  <Link
                    href="/products"
                    className="block rounded-full bg-[#8BA888] px-10 py-4 text-sm font-medium text-white shadow-[0_18px_45px_rgba(139,168,136,0.28)] transition-colors duration-300 hover:bg-[#121212] hover:shadow-[0_24px_60px_rgba(18,18,18,0.22)]"
                  >
                    Explore Our Ecosystem
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -5, scale: 1.03, transition: btnSpring }}>
                  <Link
                    href="/contact?mode=custom#contact-inquiry"
                    className="group block rounded-full border border-[#121212]/12 bg-white/50 px-10 py-4 text-sm backdrop-blur-md transition-colors duration-300 hover:border-[#121212]/30 hover:bg-white hover:shadow-[0_24px_60px_rgba(18,18,18,0.18)]"
                  >
                    <span className="font-normal text-[#121212] transition-colors group-hover:text-[#8BA888]">
                      Commission a Project
                    </span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="mt-14 flex flex-wrap justify-center gap-3"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.6 } } }}
                initial="hidden"
                animate="visible"
              >
                {stats.map((stat) => (
                  <motion.div key={stat.label} variants={statItem}>
                    <StatPill {...stat} />
                  </motion.div>
                ))}
              </motion.div>

            </motion.div>
          </div>
        </section>
      </FadeOutSection>

      {/* ── Trust Badges ── */}
      <FadeOutSection>
        <section className="px-6 py-24">
          <div className="mx-auto w-full max-w-5xl text-center">

            <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-12">
              <motion.p variants={labelReveal} className="mb-3 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">
                Validated Engineering Standards
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl font-medium tracking-tight md:text-4xl">
                Recognised. Trusted. Verified.
              </motion.h2>
            </motion.div>

            <motion.div
              className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2"
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              <motion.div
                variants={badgeReveal}
                className="flex min-h-[96px] items-center justify-center rounded-[1.5rem] border border-white/70 bg-white/55 px-7 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-2xl"
              >
                <Image src="/gov-login-img.png" alt="DPIIT Recognized" width={260} height={80} className="h-10 w-auto object-contain" />
              </motion.div>

              <motion.a
                variants={badgeReveal}
                whileHover={{ y: -8, scale: 1.03, boxShadow: "0 30px 70px rgba(18,18,18,0.18)", transition: { type: "spring", stiffness: 260, damping: 18 } }}
                href="https://www.goodfirms.co/company/forgestack-labs-llp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[96px] items-center justify-center gap-4 rounded-[1.5rem] border border-white/70 bg-white/55 px-7 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-colors duration-300 hover:border-[#121212]/20 hover:bg-white"
              >
                <Image src="/partner_badge.png" alt="GoodFirms partner badge" width={180} height={180} className="h-14 w-auto object-contain" />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#121212]/55">GoodFirms</span>
              </motion.a>
            </motion.div>

          </div>
        </section>
      </FadeOutSection>

      {/* ── Offerings ── */}
      <FadeOutSection>
        <section className="px-6 py-24">
          <div className="mx-auto w-full max-w-7xl">

            <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-16">
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888]">
                The Dual-Engine Offerings
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-5xl">
                Built to Solve. Engineered to Scale.
              </motion.h2>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-2"
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              {offerings.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={cardReveal}
                  whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                  className="group relative flex min-h-[340px] flex-col rounded-[2.5rem] border border-white/50 bg-white/40 p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-md transition-colors duration-500 hover:border-[#121212]/18 hover:bg-white/80 md:p-12"
                >
                  <div className="absolute right-0 top-0 p-8 opacity-[0.08] transition-opacity group-hover:opacity-25">
                    <span className="text-5xl font-medium text-[#121212]">0{index + 1}</span>
                  </div>
                  <p className={`mb-6 text-sm font-bold uppercase tracking-widest ${item.accentClass}`}>{item.label}</p>
                  <h3 className="mb-6 text-3xl font-medium tracking-tight text-[#121212]">{item.title}</h3>
                  <div className="mb-6 h-px w-10" style={{ background: item.accent + "30" }} />
                  <p className="mb-10 text-sm leading-relaxed text-[#121212]/55 md:text-base">{item.copy}</p>
                  <motion.div
                    whileHover={{ y: -3, scale: 1.03, x: 2, transition: linkSpring }}
                    className="mt-auto w-fit"
                  >
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-3 rounded-full border border-[#121212]/10 bg-white/40 px-6 py-3 text-sm font-medium text-[#121212] transition-colors duration-300 hover:border-[#8BA888]/80 hover:bg-[#8BA888] hover:text-white hover:shadow-[0_18px_38px_rgba(18,18,18,0.18)]"
                    >
                      {item.cta} <span aria-hidden>→</span>
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>
      </FadeOutSection>

      {/* ── Standards ── */}
      <FadeOutSection>
        <section className="px-6 py-24">
          <div className="mx-auto w-full max-w-7xl">

            <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-16 max-w-4xl">
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888]">
                The Engineering Standard
              </motion.p>
              <motion.h2 variants={fadeUp} className="mb-6 text-4xl font-medium tracking-tight md:text-5xl">
                Corporate-Grade Discipline.
              </motion.h2>
              <motion.p variants={fadeUp} className="max-w-2xl text-base leading-relaxed text-[#121212]/55 md:text-lg">
                We do not just write code. We enforce strict development protocols to guarantee zero-friction performance.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-3"
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              {standards.map((item) => (
                <motion.div
                  key={item.num}
                  variants={cardReveal}
                  whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                  className="group relative rounded-[2.5rem] border border-white/50 bg-white/40 p-12 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-md transition-colors duration-500 hover:border-[#121212]/18 hover:bg-white/80"
                >
                  <div className="absolute right-0 top-0 p-8 opacity-[0.08] transition-opacity group-hover:opacity-30">
                    <span className="text-4xl font-medium text-[#121212]">{item.num}</span>
                  </div>
                  <h3 className={`mb-6 text-sm font-bold uppercase tracking-widest ${item.color}`}>Pillar {item.num}</h3>
                  <h4 className="mb-6 text-2xl font-medium tracking-tight">{item.title}</h4>
                  <div className="mb-6 h-px w-8 bg-[#121212]/10" />
                  <p className="text-sm leading-relaxed text-[#121212]/55">{item.copy}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>
      </FadeOutSection>

      {/* ── CTA ── */}
      <FadeOutSection>
        <section className="px-6 pb-20 pt-36 md:pt-44">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div
              variants={panelReveal}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="relative overflow-hidden rounded-[2.5rem] p-14 text-center md:p-20"
              style={{ background: "linear-gradient(135deg, #1a1e2a 0%, #141722 100%)" }}
            >
              <div className="pointer-events-none absolute left-1/4 top-0 h-80 w-80 rounded-full opacity-20 blur-[100px]" style={{ background: "radial-gradient(circle, #8BA888 0%, transparent 70%)" }} />
              <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full opacity-15 blur-[90px]" style={{ background: "radial-gradient(circle, #D4A373 0%, transparent 70%)" }} />
              <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

              <motion.div
                className="relative z-10"
                variants={staggerWrap}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
              >
                <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">
                  Ready to deploy
                </motion.p>
                <motion.h2 variants={fadeUp} className="mb-8 text-3xl font-medium tracking-tight text-white md:text-5xl">
                  Ready to architect something that scales?
                </motion.h2>
                <motion.div variants={staggerItem} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <motion.div whileHover={{ y: -5, scale: 1.04, transition: btnSpring }}>
                    <Link
                      href="/contact?mode=custom#contact-inquiry"
                      className="block rounded-full bg-[#8BA888] px-10 py-4 text-sm font-medium text-white shadow-[0_18px_45px_rgba(139,168,136,0.28)] transition-colors duration-300 hover:border-white/70 hover:bg-white/15 hover:text-white hover:shadow-[0_22px_55px_rgba(255,255,255,0.12)]"
                    >
                      Contact Our Engineers
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ y: -5, scale: 1.04, transition: btnSpring }}>
                    <Link
                      href="/products"
                      className="block rounded-full border border-white/15 px-10 py-4 text-sm text-white/70 transition-colors duration-300 hover:border-white/70 hover:bg-white/15 hover:text-white hover:shadow-[0_22px_55px_rgba(255,255,255,0.12)]"
                    >
                      See Our Products
                    </Link>
                  </motion.div>
                </motion.div>
                <motion.p variants={fadeUp} className="mt-8 text-sm text-white/25">
                  hello@forgestacklabs.com · Engineered in Mangaluru, deploying globally.
                </motion.p>
              </motion.div>

            </motion.div>
          </div>
        </section>
      </FadeOutSection>

    </div>
  );
}

