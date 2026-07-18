"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";

const EASE = [0.215, 0.61, 0.355, 1] as const;
const VP = { once: false, margin: "-180px" } as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const staggerWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardSpring = { type: "spring", stiffness: 220, damping: 18 } as const;

type ExplorerItem = {
  eyebrow: string;
  title: string;
  copy: string;
};

export default function ArchitectureExplorer({
  items,
}: {
  items: readonly ExplorerItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 pb-28 pt-32 text-[#121212]">
      <motion.header
        variants={staggerWrap}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl"
      >
        <motion.p variants={fadeUp} className="mb-7 text-[10px] font-bold uppercase tracking-[.48em] text-[#8BA888]">
          Architecture Explorer
        </motion.p>
        <motion.h1 variants={fadeUp} className="max-w-5xl text-5xl font-medium leading-[.96] tracking-tight md:text-7xl lg:text-8xl">
          A map of the systems behind operational confidence.
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-8 max-w-3xl text-lg leading-relaxed text-[#121212]/60 md:text-xl">
          Select an architecture layer to explore how ForgeStack connects Fuel OS, enterprise platforms, offline-first apps, and operational software.
        </motion.p>
      </motion.header>

      <section className="mx-auto mt-20 grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_30rem]">
        <motion.div
          variants={staggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="grid gap-4 md:grid-cols-2"
        >
          {items.map((item, index) => {
            const activeItem = index === activeIndex;
            return (
              <motion.button
                key={item.eyebrow}
                type="button"
                variants={fadeUp}
                onClick={() => setActiveIndex(index)}
                whileHover={{ y: -12, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.18)", transition: cardSpring }}
                className={`min-h-64 rounded-[2.25rem] border p-8 text-left transition-colors ${
                  activeItem
                    ? "border-[#8BA888]/50 bg-[#151715] text-white shadow-[0_30px_100px_rgba(18,18,18,0.22)]"
                    : "border-white/70 bg-white/50 hover:bg-white/80"
                }`}
              >
                <span className={`mb-10 block text-[10px] font-bold uppercase tracking-[.32em] ${
                  activeItem ? "text-[#9DB59A]" : "text-[#8BA888]"
                }`}>
                  {item.eyebrow}
                </span>
                <span className={`block text-3xl font-medium leading-tight tracking-[-.04em] ${
                  activeItem ? "text-white" : "text-[#121212]"
                }`}>
                  {item.title}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.aside
          key={activeIndex}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="h-fit rounded-[2.5rem] border border-[#121212]/10 bg-white/70 p-8 shadow-[0_24px_90px_rgba(18,18,18,0.10)] backdrop-blur-2xl lg:sticky lg:top-28"
        >
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[.4em] text-[#8BA888]">
            Active layer
          </p>
          <h2 className="text-4xl font-medium leading-tight tracking-[-.04em]">
            {active.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#121212]/60">
            {active.copy}
          </p>
          <div className="mt-8 rounded-[2rem] bg-[#F7F7F5] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[.3em] text-[#121212]/35">
              Connected to
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#121212]/60">
              Product strategy, implementation architecture, security decisions, and long-term operational reliability.
            </p>
          </div>
        </motion.aside>
      </section>
    </main>
  );
}
