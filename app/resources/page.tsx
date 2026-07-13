"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import ResourceLibrary from "@/components/ResourceLibrary";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE_OUT } },
};

const staggerWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: EASE_OUT },
  },
};

const heroWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

// Eyebrow label slides from left
const labelReveal: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

// Dark panel slides up as a unit
const panelReveal: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

// ─── Hover spring configs (same as About page) ────────────────────────────────
const cardSpring = { type: "spring", stiffness: 220, damping: 18 } as const;
const btnSpring  = { type: "spring", stiffness: 320, damping: 20 } as const;

// ─── Viewport config — positive margin means element must be THIS far inside viewport ───
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
type GalleryImage = {
  src: string;
  alt: string;
  title: string;
};

const galleryVideo = "/gallery/demo_vedio.mp4";

const galleryImages: GalleryImage[] = [
  { src: "/gallery/slide1.png",  alt: "Gallery slide 1",  title: "Slide 1" },
  { src: "/gallery/slide2.png",  alt: "Gallery slide 2",  title: "Slide 2" },
  { src: "/gallery/slide3.png",  alt: "Gallery slide 3",  title: "Slide 3" },
  { src: "/gallery/slide4.png",  alt: "Gallery slide 4",  title: "Slide 4" },
  { src: "/gallery/slide5.png",  alt: "Gallery slide 5",  title: "Slide 5" },
  { src: "/gallery/slide6.png",  alt: "Gallery slide 6",  title: "Slide 6" },
  { src: "/gallery/slide7.png",  alt: "Gallery slide 7",  title: "Slide 7" },
  { src: "/gallery/slide8.png",  alt: "Gallery slide 8",  title: "Slide 8" },
  { src: "/gallery/slide9.png",  alt: "Gallery slide 9",  title: "Slide 9" },
  { src: "/gallery/slide10.png", alt: "Gallery slide 10", title: "Slide 10" },
  { src: "/gallery/slide11.png", alt: "Gallery slide 11", title: "Slide 11" },
  { src: "/gallery/slide12.png", alt: "Gallery slide 12", title: "Slide 12" },
  { src: "/gallery/slide13.png", alt: "Gallery slide 13", title: "Slide 13" },
  { src: "/gallery/slide14.png", alt: "Gallery slide 14", title: "Slide 14" },
  { src: "/gallery/slide15.png", alt: "Gallery slide 15", title: "Slide 15" },
];

const takeaways = [
  "The Digital Twin Mapping System",
  "Offline-First Edge Computing Mechanics",
  "Evidence-Based Reconciliation Workflows",
];

const deckIncludes = [
  "Complete Business Logic & Market Defensibility",
  "System Architecture Schematics: AWS, Docker, Database Sync",
  "In-House Engineering Standards & Execution Models",
];

const engineeringLogs = [
  {
    title: "Engineering an Offline-First Sync Engine",
    copy: "A technical look at conflict-safe synchronization between edge operations and central data ledgers.",
  },
  {
    title: "Why We Enforce Strict Branching Models",
    copy: "How repository discipline, peer review, and deployment gates reduce operational risk in production systems.",
  },
  {
    title: "Backend Load-Testing Configurations",
    copy: "Notes on validating high-availability services before traffic spikes expose weak assumptions.",
  },
];

function wrapIndex(index: number) {
  return (index + galleryImages.length) % galleryImages.length;
}

function slideOffset(index: number, activeIndex: number) {
  const raw = index - activeIndex;
  const half = galleryImages.length / 2;
  if (raw > half) return raw - galleryImages.length;
  if (raw < -half) return raw + galleryImages.length;
  return raw;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ResourcesPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleSlides = useMemo(
    () =>
      galleryImages
        .map((image, index) => ({ image, index, offset: slideOffset(index, activeIndex) }))
        .filter(({ offset }) => Math.abs(offset) <= 2),
    [activeIndex],
  );

  const goPrevious = () => setActiveIndex((current) => wrapIndex(current - 1));
  const goNext     = () => setActiveIndex((current) => wrapIndex(current + 1));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1));
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F7F7F5] pt-12 text-[#222222]">

      {/* Background — fade in on load */}
      <motion.div
        className="fixed inset-0 -z-10 overflow-hidden"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F7F5] via-[#F0F0EE] to-[#F7F7F5]" />
        <div className="absolute top-[-10%] right-[-5%] h-[70vw] w-[70vw] rounded-full bg-[#8BA888]/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] h-[60vw] w-[60vw] rounded-full bg-[#D4A373]/5 blur-[120px]" />
      </motion.div>

      {/* ── Hero ── */}
      <FadeOutSection>
        <section className="px-6 pb-14 pt-14 md:pb-16 md:pt-14">
          <motion.div
            variants={heroWrap}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-5xl text-center"
          >
            <motion.p variants={heroItem} className="mb-6 text-[10px] font-bold uppercase tracking-[0.55em] text-[#8BA888] inline-flex items-center justify-center gap-3">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
              </span>              <span className="font-bold">Inside the Engine</span>
            </motion.p>
            <motion.h1 variants={heroItem} className="mb-8 text-5xl font-medium tracking-tight text-[#222222] md:text-7xl lg:text-8xl">
              Radical Technical Transparency.
            </motion.h1>
            <motion.p variants={heroItem} className="mx-auto max-w-3xl text-base leading-relaxed text-[#222222]/60 md:text-xl">
              We believe in showing our work. Explore the architectural logic, product mechanics,
              and corporate presentations that define the Forgestack ecosystem.
            </motion.p>
          </motion.div>
        </section>
      </FadeOutSection>

      {/* ── Platform Mechanics / Video ── */}
      <FadeOutSection>
        <section className="px-4 pb-16 pt-4">
          <div className="mx-auto max-w-3xl">

            {/* Header */}
            <motion.div
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="mb-8 text-center"
            >
              <motion.p variants={labelReveal} className="mb-3 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888]">
                Architecture Demystified
              </motion.p>
              <motion.h2 variants={fadeUp} className="mb-5 text-3xl font-medium tracking-tight text-[#222222] md:text-5xl">
                Platform Mechanics in Action
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-sm leading-relaxed text-[#222222]/60 md:text-base">
                Watch how our offline-first architecture bridges the gap between physical forecourt
                operations and secure digital ledgers. This explainer breaks down the precise mechanics
                of our flagship Fuel OS ecosystem.
              </motion.p>
            </motion.div>

            {/* Video */}
            <motion.div
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
              style={{ boxShadow: "0 28px 80px rgba(0,0,0,0.14)" }}
              className="overflow-hidden rounded-[1.6rem] border border-white/60 bg-white/45 backdrop-blur-md"
            >
              <video
                src={galleryVideo}
                controls
                preload="metadata"
                className="aspect-video w-full bg-black object-contain"
              />
            </motion.div>

            {/* Takeaway pills */}
            <motion.div
              className="mt-6 grid gap-3 md:grid-cols-3"
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              {takeaways.map((item) => (
                <motion.div
                  key={item}
                  variants={staggerItem}
                  whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                  style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                  className="rounded-2xl border border-white/60 bg-white/45 px-5 py-4 text-center text-xs font-medium text-[#222222]/60 backdrop-blur-md"
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>
      </FadeOutSection>

      {/* ── Architecture Deck Header ── */}
      <FadeOutSection>
        <section className="px-6 pb-4 pt-8">
          <div className="mx-auto max-w-5xl text-center">

            <motion.div
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              <motion.p variants={staggerItem} className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888]">
              Architecture Deck
            </motion.p>

              <motion.h2 variants={fadeUp} className="mb-5 text-3xl font-medium tracking-tight text-[#222222] md:text-5xl">
                Corporate Overview &amp; Technical Specs
              </motion.h2>

              <motion.p variants={fadeUp} className="mx-auto max-w-3xl text-sm leading-relaxed text-[#222222]/60 md:text-base">
                For enterprise partners, investors, and technical leads requiring a comprehensive breakdown
                of our software ecosystems and corporate capabilities, our official presentation deck is
                available for review.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap items-center justify-center gap-3"
                variants={staggerWrap}
              >
                {deckIncludes.map((item) => (
                  <motion.span
                    key={item}
                    variants={staggerItem}
                    className="rounded-full border border-[#121212]/10 bg-white/45 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#222222]/45 backdrop-blur-md"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </section>
      </FadeOutSection>

      {/* ── Carousel ── */}
      <FadeOutSection>
        <section className="flex flex-col items-center justify-start px-4 pb-16 pt-8 md:min-h-[calc(82vh-4rem)] md:justify-center md:pb-20">

          {/* Carousel header */}
          <motion.div
            variants={staggerWrap}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="mb-6 text-center"
          >
            <motion.p variants={labelReveal} className="mb-3 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888]">
              Presentation Deck
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-medium tracking-tight text-[#222222] md:text-5xl">
              Forgestack Labs Corporate &amp; Architecture Overview
            </motion.h2>
          </motion.div>

          {/* Carousel slides — not wrapped in whileInView, interactive */}
          <div className="relative h-[46vh] min-h-[320px] w-full max-w-7xl overflow-visible md:h-[54vh]">
            {visibleSlides.map(({ image, index, offset }) => {
              const isActive = offset === 0;
              return (
                <motion.button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${image.title}`}
                  animate={{
                    x: `calc(-50% + ${offset * 34}vw)`,
                    y: "-50%",
                    scale: isActive ? 1 : 0.66,
                    opacity: isActive ? 1 : Math.abs(offset) === 1 ? 0.55 : 0.22,
                    filter: isActive ? "blur(0px)" : "blur(2px)",
                    zIndex: 10 - Math.abs(offset),
                  }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                  className="absolute left-1/2 top-1/2 aspect-video w-[min(86vw,42rem)] overflow-hidden rounded-[1.4rem] border bg-white text-left shadow-[0_28px_80px_rgba(0,0,0,0.24)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#8BA888] md:w-[min(56vw,42rem)]"
                  style={{ borderColor: isActive ? "rgba(139,168,136,0.9)" : "rgba(255,255,255,0.12)" }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 768px) 48vw, 78vw"
                    className="object-contain"
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Dot indicators */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="relative z-20 mt-7 flex items-center justify-center gap-2"
          >
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to ${image.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "w-9 bg-[#8BA888]" : "w-2 bg-[#222222]/20 hover:bg-[#222222]/40"
                }`}
              />
            ))}
          </motion.div>

          {/* Prev / Next buttons */}
          <motion.div
            variants={staggerWrap}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="relative z-20 mt-7 flex items-center justify-center gap-5"
          >
            <motion.button
              variants={staggerItem}
              type="button"
              onClick={goPrevious}
              aria-label="Previous slide"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#222222]/15 bg-white/45 text-[#222222] backdrop-blur-md transition-all duration-300 hover:-translate-x-0.5 hover:bg-white/75"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
            <motion.button
              variants={staggerItem}
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#222222]/15 bg-white/45 text-[#222222] backdrop-blur-md transition-all duration-300 hover:translate-x-0.5 hover:bg-white/75"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </motion.div>

        </section>
      </FadeOutSection>

      {/* ── Engineering Logs ── */}
      <FadeOutSection>
        <section className="px-6 py-32">
          <div className="mx-auto max-w-7xl">

            {/* Header */}
            <motion.div
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="mb-12 text-center"
            >
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888]">
                Engineering Ledger
              </motion.p>
              <motion.h2 variants={fadeUp} className="mb-5 text-3xl font-medium tracking-tight text-[#222222] md:text-5xl">
                Engineering Logs &amp; Release Notes
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto max-w-3xl text-sm leading-relaxed text-[#222222]/60 md:text-base">
                Notes directly from our architects. Deep dives into how we solve massive scaling challenges,
                backend load-testing configurations, and front-end spatial UI updates.
              </motion.p>
            </motion.div>

            {/* Log cards */}
            <motion.div
              className="grid gap-6 md:grid-cols-3"
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              {engineeringLogs.map((item, index) => (
                <motion.article
                  key={item.title}
                  variants={cardReveal}
                  whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                  style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                  className="rounded-[2rem] border border-white/60 bg-white/45 p-8 backdrop-blur-md"
                >
                  <motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#8BA888]">
                    Log {String(index + 1).padStart(2, "0")}
                  </motion.p>
                  <h3 className="mb-4 text-2xl font-medium tracking-tight text-[#222222]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#222222]/60">{item.copy}</p>
                </motion.article>
              ))}
            </motion.div>

          </div>
        </section>
      </FadeOutSection>

      {/* ── CTA ── */}
      <ResourceLibrary />

      <FadeOutSection>
        <section className="px-6 pb-36 pt-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={panelReveal}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
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
                  Ready to review the code in production?
                </motion.h2>
                <motion.div variants={staggerItem}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.04, transition: btnSpring }}
                    className="inline-block"
                  >
                    <Link
                      href="/contact?mode=demo#contact-inquiry"
                      className="inline-flex rounded-full bg-[#8BA888] px-10 py-4 text-sm text-white backdrop-blur-md transition-all duration-500 hover:bg-white/20"
                    >
                      Request a Live Product Demo
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

            </motion.div>
          </div>
        </section>
      </FadeOutSection>

    </div>
  );
}
