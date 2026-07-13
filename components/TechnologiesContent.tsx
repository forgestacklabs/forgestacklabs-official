"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Code2 } from "lucide-react";
import { FaCloud, FaNodeJs, FaRobot } from "react-icons/fa";
import { MdOfflineBolt } from "react-icons/md";
import { SiNextdotjs, SiPostgresql } from "react-icons/si";
import FadeOutSection from "@/components/FadeOutSection";

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
const btnSpring = { type: "spring", stiffness: 320, damping: 20 } as const;

const VP = { once: false, margin: "-240px" } as const;

type TechItem = {
  title: string;
  copy: string;
  href: string;
};

export default function TechnologiesContent({ items }: { items: TechItem[] }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* ── Intro ── */}
      <FadeOutSection>
        <motion.div
          variants={staggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="flex flex-col items-center text-center"
        >
          <motion.p
            variants={labelReveal}
            className="inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Technologies
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 max-w-2xl text-4xl font-medium tracking-tight text-[#121212] sm:text-5xl"
          >
            Technology selected by operational need.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-[#121212]/55 md:text-lg">
            Our stack decisions follow product constraints: reliability,
            security, maintainability, deployment context, and the team
            responsible for operating the result.
          </motion.p>
        </motion.div>
      </FadeOutSection>

      {/* ── Grid ── */}
      <FadeOutSection>
        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.href}
              variants={cardReveal}
              whileHover={{
                y: -14,
                scale: 1.018,
                boxShadow: "0 40px 100px rgba(18,18,18,0.22)",
                transition: cardSpring,
              }}
              className="group relative flex min-h-[260px] flex-col rounded-[2.5rem] border border-white/50 bg-white/40 p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-md transition-colors duration-500 hover:border-[#121212]/18 hover:bg-white/80"
            >
              <div className="absolute right-0 top-0 p-8 opacity-[0.08] transition-opacity group-hover:opacity-25">
                <span className="text-4xl font-medium text-[#121212]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#121212]/10 bg-white/60">
                {item.href.endsWith("/nextjs-react") ? (
                  <SiNextdotjs className="h-6 w-6 text-black" aria-hidden="true" />
                ) : item.href.endsWith("/nodejs-api") ? (
                  <FaNodeJs className="h-6 w-6 text-[#339933]" aria-hidden="true" />
                ) : item.href.endsWith("/postgresql-data") ? (
                  <SiPostgresql className="h-6 w-6 text-[#4169E1]" aria-hidden="true" />
                ) : item.href.endsWith("/offline-first-pwa") ? (
                  <MdOfflineBolt className="h-6 w-6 text-[#D97706]" aria-hidden="true" />
                ) : item.href.endsWith("/cloud-devops") ? (
                  <FaCloud className="h-6 w-6 text-[#2563EB]" aria-hidden="true" />
                ) : item.href.endsWith("/applied-ai") ? (
                  <FaRobot className="h-6 w-6 text-[#7C3AED]" aria-hidden="true" />
                ) : (
                  <Code2 className="h-5 w-5 text-[#121212]/70" strokeWidth={1.5} />
                )}
              </div>

              <h3 className="mb-4 text-2xl font-medium tracking-tight text-[#121212]">
                {item.title}
              </h3>
              <div className="mb-5 h-px w-8 bg-[#121212]/10" />
              <p className="mb-8 text-sm leading-relaxed text-[#121212]/55">
                {item.copy}
              </p>

              <motion.div
                whileHover={{ y: -3, scale: 1.03, x: 2, transition: btnSpring }}
                className="mt-auto w-fit"
              >
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-3 rounded-full border border-[#121212]/10 bg-white/40 px-6 py-3 text-sm font-medium text-[#121212] transition-colors duration-300 hover:border-[#8BA888]/80 hover:bg-[#8BA888] hover:text-white hover:shadow-[0_18px_38px_rgba(18,18,18,0.18)]"
                >
                  Learn more <span aria-hidden>→</span>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </FadeOutSection>

      {/* ── CTA ── */}
      <FadeOutSection>
        <motion.div
          variants={panelReveal}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="relative mt-24 overflow-hidden rounded-[2.5rem] p-14 sm:p-16"
          style={{ background: "linear-gradient(135deg, #1a1e2a 0%, #141722 100%)" }}
        >
          <div
            className="pointer-events-none absolute left-1/4 top-0 h-80 w-80 rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(circle, #8BA888 0%, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full opacity-15 blur-[90px]"
            style={{ background: "radial-gradient(circle, #D4A373 0%, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <motion.div
            className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between"
            variants={staggerWrap}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <div>
              <motion.p
                variants={labelReveal}
                className="mb-3 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]"
              >
                Talk to engineering
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Bring us the operational problem.
              </motion.h2>
            </div>

            <motion.div variants={staggerItem} whileHover={{ y: -5, scale: 1.04, transition: btnSpring }}>
              <Link
                href="/contact?mode=custom#contact-inquiry"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-black shadow-[0_18px_45px_rgba(0,0,0,0.25)] transition-transform duration-300"
              >
                Book a technical consultation →
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </FadeOutSection>
    </div>
  );
}
