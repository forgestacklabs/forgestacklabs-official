"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const EASE = [0.215, 0.61, 0.355, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
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

const cardSpring = { type: "spring", stiffness: 220, damping: 18 } as const;
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

type Item = { eyebrow?: string; title: string; copy: string; points?: readonly string[]; href?: string };
type Props = { eyebrow: string; title: string; intro: string; items: readonly Item[]; note?: string };

export default function EditorialPage({ eyebrow, title, intro, items, note }: Props) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 pb-28 pt-40 text-[#121212]">
      <div className="mx-auto max-w-7xl">

        {/* ── Header ── */}
        <FadeOutSection>
          <motion.header
            variants={heroWrap}
            initial="hidden"
            animate="visible"
            className="mb-20 max-w-5xl"
          >
            <motion.p variants={heroItem} className="mb-7 text-[10px] font-bold uppercase tracking-[.45em] text-[#8BA888]">
              {eyebrow}
            </motion.p>
            <motion.h1 variants={heroItem} className="text-5xl font-medium leading-[.96] tracking-tight md:text-7xl lg:text-8xl">
              {title}
            </motion.h1>
            <motion.p variants={heroItem} className="mt-8 max-w-3xl text-lg leading-relaxed text-[#121212]/55 md:text-xl">
              {intro}
            </motion.p>
          </motion.header>
        </FadeOutSection>

        {note && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="mb-8 rounded-2xl border border-[#D4A373]/30 bg-[#D4A373]/10 px-5 py-4 text-sm text-[#121212]/65"
          >
            {note}
          </motion.p>
        )}

        {/* ── Items grid ── */}
        <FadeOutSection>
          <motion.section
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerWrap}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {items.map((item, i) => (
              <motion.article
                key={item.title}
                variants={cardReveal}
                whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                onClick={() => item.href && router.push(item.href)}
                onKeyDown={(event) => {
                  if (!item.href) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    router.push(item.href);
                  }
                }}
                role={item.href ? "link" : undefined}
                tabIndex={item.href ? 0 : undefined}
                className={`rounded-[2rem] border border-white/70 bg-white/50 p-7 shadow-[0_18px_60px_rgba(0,0,0,.06)] backdrop-blur-2xl md:p-8 ${item.href ? "cursor-pointer" : ""}`}
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[.3em] text-[#8BA888]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.eyebrow && (
                    <span className="text-[9px] uppercase tracking-[.25em] text-[#121212]/35">{item.eyebrow}</span>
                  )}
                </div>
                <h2 className="mb-4 text-2xl font-medium tracking-tight">
                  {item.href ? (
                    <Link href={item.href} className="transition hover:text-[#8BA888]">
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h2>
                <p className="text-sm leading-relaxed text-[#121212]/55">{item.copy}</p>
                {item.points && (
                  <ul className="mt-6 space-y-2 border-t border-[#121212]/10 pt-5">
                    {item.points.map((point) => (
                      <li key={point} className="text-xs text-[#121212]/60">— {point}</li>
                    ))}
                  </ul>
                )}
                {item.href && (
                  <motion.div
                    whileHover={{ y: -3, scale: 1.03, x: 2, transition: linkSpring }}
                    className="mt-7 w-fit"
                  >
                    <Link href={item.href} className="inline-flex text-xs font-medium text-[#8BA888]">
                      Explore capability →
                    </Link>
                  </motion.div>
                )}
              </motion.article>
            ))}
          </motion.section>
        </FadeOutSection>

        {/* ── CTA ── */}
        <FadeOutSection>
          <motion.section
            variants={panelReveal}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="mt-20 rounded-[2.5rem] bg-[#151715] p-8 md:flex md:items-center md:justify-between md:p-12"
          >
            <motion.div
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              <motion.p variants={labelReveal} className="mb-3 text-[10px] font-bold uppercase tracking-[.4em] !text-[#9DB59A]">
                Talk to engineering
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl font-medium !text-white md:text-5xl">
                Bring us the operational problem.
              </motion.h2>
            </motion.div>
            <motion.div
              variants={staggerItem}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              whileHover={{ y: -5, scale: 1.04, transition: btnSpring }}
              className="mt-8 inline-block md:mt-0"
            >
              <Link href="/contact?mode=custom#contact-inquiry" className="block rounded-full bg-white px-6 py-3 text-sm font-medium text-[#151715]">
                Book a technical consultation →
              </Link>
            </motion.div>
          </motion.section>
        </FadeOutSection>

      </div>
    </main>
  );
}
