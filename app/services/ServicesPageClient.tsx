"use client";

import Link from "next/link";
import AnswerFAQ from "@/components/AnswerFAQ";
import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import {
  services,
  whyForgestack,
  deliveryProcess,
  industries,
  techStack,
  engagementModels,
  servicesAnswers,
} from "./services-data";

// Unique services referenced by an FAQ answer, in FAQ order — powers the
// "Related Services" links below the FAQ so each linked topic has a real,
// working internal link to its service page (see services-data.ts SEO notes).
const relatedFaqServices = Array.from(
  new Set(servicesAnswers.map((a) => a.relatedSlug).filter((s): s is string => Boolean(s))),
)
  .map((slug) => services.find((s) => s.slug === slug))
  .filter((s): s is (typeof services)[number] => Boolean(s));

const EASE = [0.215, 0.61, 0.355, 1] as const;

// ─── Variants (mirrors /app/products/page.tsx exactly) ────────────────────────

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

const cardSpring = { type: "spring", stiffness: 220, damping: 18 } as const;
const btnSpring = { type: "spring", stiffness: 320, damping: 20 } as const;

const VP = { once: true, amount: 0.1, margin: "0px 0px -10% 0px" } as const;

// ─── FadeOutSection (identical to products page, + optional custom range) ───────
function FadeOutSection({
  children,
  range = [0.45, 0.9],
}: {
  children: React.ReactNode;
  range?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, range, [1, 0]);
  const scale = useTransform(scrollYProgress, range, [1, 0.94]);
  const y = useTransform(scrollYProgress, range, ["0px", "-40px"]);

  return (
    <div ref={ref}>
      <motion.div style={{ opacity, scale, y, transformOrigin: "center top" }}>
        {children}
      </motion.div>
    </div>
  );
}

const stats = [
  { value: "7", label: "Service Lines" },
  { value: "3", label: "Own Products" },
  { value: "100%", label: "In-House" },
  { value: "0", label: "Vendor Lock-In" },
];

export default function ServicesPageClient() {
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
      {/* Faster fade range (vs. default [0.45, 0.9]) so the heading clears
          out of the way before the navbar goes compact at 50px scroll —
          otherwise the shrunk pill overlaps the still full-size heading. */}
      <FadeOutSection range={[0.03, 0.22]}>
        <section className="relative mx-auto flex max-w-7xl flex-col justify-start px-6 pb-16 pt-24 text-center md:min-h-screen md:justify-center md:py-14">
          <motion.div variants={heroWrap} initial="hidden" animate="visible" className="flex flex-col items-center">
            <motion.p variants={heroItem} className="mb-8 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888] md:text-xs inline-flex items-center justify-center gap-3">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
              </span>
              <span className="font-bold">Product Company &amp; Engineering Partner</span>
            </motion.p>

            <motion.h1 variants={heroItem} className="mx-auto max-w-6xl text-5xl font-medium leading-[0.93] tracking-tight md:text-7xl lg:text-8xl">
              We build our own products. We build yours too.
            </motion.h1>

            <motion.p variants={heroItem} className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-[#121212]/60 md:text-xl">
              ForgeStack Labs is a product-first software company and a B2B engineering partner. We design, build, and scale custom software with the same standards we hold our own products to.
            </motion.p>

            <motion.div variants={heroItem} className="mt-10">
              <motion.div whileHover={{ y: -5, scale: 1.04, transition: btnSpring }} className="inline-block">
                <Link
                  href="/contact?mode=discovery#contact-inquiry"
                  className="inline-flex rounded-full bg-[#5C7859] px-9 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white shadow-[0_18px_45px_rgba(139,168,136,0.28)] transition-colors duration-300 hover:bg-[#121212] hover:shadow-[0_24px_60px_rgba(18,18,18,0.22)]"
                >
                  Book a Discovery Call
                </Link>
              </motion.div>
            </motion.div>

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

      {/* ── Why ForgeStack Labs ── */}
      {/* pt-12 instead of the default py-28 top — hero already has its own
          bottom padding, so the default here doubled up into a large gap. */}
      <FadeOutSection>
        <section className="px-6 pb-28 pt-12">
          <div className="mx-auto max-w-7xl">
            <motion.div className="mb-14 max-w-4xl" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#D4A373]">
                Why ForgeStack Labs
              </motion.p>
              <motion.h2 variants={fadeUp} className="mb-6 text-4xl font-medium tracking-tight md:text-5xl">
                Engineering judgment, not just delivery.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base leading-relaxed text-[#121212]/60 md:text-lg">
                We&apos;re not a generic dev shop. Product thinking runs through every engagement because it&apos;s how we build our own software too.
              </motion.p>
            </motion.div>

            <motion.div className="grid gap-6 md:grid-cols-3" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              {whyForgestack.map((t) => (
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

      {/* ── Services Grid ── */}
      <FadeOutSection>
        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div className="mb-14 max-w-4xl" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">
                What We Do
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-5xl">
                Seven service lines, one engineering standard.
              </motion.h2>
            </motion.div>

            <motion.div className="grid gap-6 md:grid-cols-2" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              {services.map((s) => (
                <motion.div
                  key={s.slug}
                  variants={cardReveal}
                  whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                  style={{ boxShadow: "0 20px 70px rgba(0,0,0,0.06)" }}
                  className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/50 p-8 backdrop-blur-3xl transition-colors duration-500 hover:border-[#121212]/18 hover:bg-white/80"
                >
                  <Link href={`/services/${s.slug}`} className="block">
                    <span className="absolute right-8 top-6 text-5xl font-medium text-[#121212]/5">{s.num}</span>
                    <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#D4A373]">{s.num}</p>
                    <h3 className="mb-4 text-2xl font-medium tracking-tight">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-[#121212]/58">{s.shortCopy}</p>
                    <span className="mt-6 inline-block text-xs font-bold uppercase tracking-[0.3em] text-[#8BA888]">
                      Learn more →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </FadeOutSection>

      {/* ── Delivery Process ── */}
      <FadeOutSection>
        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div className="mb-14 max-w-4xl" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#D4A373]">
                Delivery Process
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-5xl">
                Seven stages, no shortcuts.
              </motion.h2>
            </motion.div>

            <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              {deliveryProcess.map((item) => (
                <motion.article
                  key={item.phase}
                  variants={cardReveal}
                  whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                  className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 p-7 shadow-[0_20px_70px_rgba(0,0,0,0.06)] backdrop-blur-3xl"
                >
                  <span className="absolute right-6 top-4 text-5xl font-medium text-[#121212]/5">{item.phase}</span>
                  <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8BA888]">Step {item.phase}</p>
                  <h3 className="mb-4 text-xl font-medium tracking-tight">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#121212]/58">{item.copy}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      </FadeOutSection>

      {/* ── Industries (dark panel) ── */}
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
              <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-10 max-w-3xl">
                <motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">
                  Industries
                </motion.p>
                <motion.h2 variants={fadeUp} className="mb-6 text-4xl font-medium tracking-tight text-white md:text-5xl">
                  Built for how each industry actually runs.
                </motion.h2>
              </motion.div>

              <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
                {industries.map((ind) => (
                  <motion.div
                    key={ind.title}
                    variants={cardReveal}
                    whileHover={{ y: -10, scale: 1.018, boxShadow: "0 40px 100px rgba(0,0,0,0.35)", transition: cardSpring }}
                    style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                    className="rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-7 backdrop-blur-xl transition-colors duration-500 hover:border-white/30 hover:bg-white/[0.12]"
                  >
                    <h3 className="mb-3 text-xl font-medium tracking-tight text-white">{ind.title}</h3>
                    <p className="text-sm leading-relaxed text-white/60">{ind.copy}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </FadeOutSection>

      {/* ── Technology Stack ── */}
      <FadeOutSection>
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <motion.p variants={labelReveal} initial="hidden" whileInView="visible" viewport={VP} className="mb-8 text-[10px] font-bold uppercase tracking-[0.45em] text-[#D4A373]">
              Technology Stack
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center justify-center gap-3"
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              {techStack.map((tech) => (
                <motion.span
                  key={tech}
                  variants={staggerItem}
                  whileHover={{ y: -4, scale: 1.05, transition: btnSpring }}
                  className="rounded-full border border-[#121212]/10 bg-white/50 px-6 py-3 text-sm font-medium tracking-tight text-[#121212]/70 backdrop-blur-xl"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>
      </FadeOutSection>

      {/* ── Engagement Models ── */}
      <FadeOutSection>
        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div className="mb-14 max-w-4xl" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#D4A373]">
                Engagement Models
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-medium tracking-tight md:text-5xl">
                Work with us the way that fits.
              </motion.h2>
            </motion.div>

            <motion.div className="grid gap-6 md:grid-cols-3" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              {engagementModels.map((m) => (
                <motion.article
                  key={m.title}
                  variants={cardReveal}
                  whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                  style={{ boxShadow: "0 20px 70px rgba(0,0,0,0.06)" }}
                  className="rounded-[2rem] border border-white/70 bg-white/50 p-8 backdrop-blur-3xl transition-colors duration-500 hover:border-[#121212]/18 hover:bg-white/80"
                >
                  <h3 className="mb-4 text-2xl font-medium tracking-tight">{m.title}</h3>
                  <p className="text-sm leading-relaxed text-[#121212]/58">{m.copy}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      </FadeOutSection>

      <AnswerFAQ
        id="services-answers"
        eyebrow="Services FAQ"
        title="What businesses ask before partnering with ForgeStack Labs"
        introduction="Direct answers about how we engage, what we build, and how our product-first approach shapes client work."
        items={servicesAnswers}
      />

      {/* ── Related Services (internal links from FAQ topics) ── */}
      {relatedFaqServices.length > 0 && (
        <section className="px-6 pb-4 pt-16">
          <div className="mx-auto max-w-7xl">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#D4A373]">
              Related Services
            </p>
            <div className="flex flex-wrap gap-3">
              {relatedFaqServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="rounded-full border border-[#121212]/10 bg-white/50 px-5 py-2.5 text-sm font-medium text-[#121212]/75 backdrop-blur-xl transition-colors duration-300 hover:border-[#8BA888]/60 hover:bg-white hover:text-[#121212]"
                >
                  {s.title} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
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
                Let&apos;s Talk
              </motion.p>
              <motion.h2 variants={fadeUp} className="mx-auto mb-6 max-w-4xl text-4xl font-medium tracking-tight md:text-5xl">
                Ready to build something that lasts?
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-[#121212]/60 md:text-base">
                Tell us what you&apos;re building. We&apos;ll tell you honestly whether it&apos;s a fit.
              </motion.p>
              <motion.div variants={staggerItem}>
                <motion.div whileHover={{ y: -5, scale: 1.04, transition: btnSpring }} className="inline-block">
                  <Link
                    href="/contact?mode=discovery#contact-inquiry"
                    className="inline-flex rounded-full bg-[#5C7859] px-9 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white shadow-[0_18px_45px_rgba(139,168,136,0.28)] transition-colors duration-300 hover:bg-[#121212] hover:shadow-[0_24px_60px_rgba(18,18,18,0.22)]"
                  >
                    Book a Discovery Call
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