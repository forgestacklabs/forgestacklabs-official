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

type TimelineItem = {
  eyebrow: string;
  title: string;
  copy: string;
};

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  items: readonly TimelineItem[];
};

export default function InteractiveTimelinePage({ eyebrow, title, intro, items }: Props) {
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
          {eyebrow}
        </motion.p>
        <motion.h1 variants={fadeUp} className="max-w-5xl text-5xl font-medium leading-[.96] tracking-tight md:text-7xl lg:text-8xl">
          {title}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-8 max-w-3xl text-lg leading-relaxed text-[#121212]/60 md:text-xl">
          {intro}
        </motion.p>
      </motion.header>

      <section className="mx-auto mt-20 grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_28rem]">
        <motion.div
          variants={staggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="relative"
        >
          <div className="pointer-events-none absolute bottom-8 left-[2.625rem] top-8 w-px bg-[#121212]/10" />
          <div className="grid gap-5">
            {items.map((item, index) => {
              const activeItem = index === activeIndex;
              return (
                <motion.button
                  key={`${item.eyebrow}-${item.title}`}
                  type="button"
                  variants={fadeUp}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ y: -8, scale: 1.01, boxShadow: "0 30px 90px rgba(18,18,18,0.14)", transition: cardSpring }}
                  className={`relative flex items-start gap-5 rounded-[2rem] border p-6 text-left transition-colors ${
                    activeItem
                      ? "border-[#8BA888]/45 bg-white/80 shadow-[0_24px_80px_rgba(18,18,18,0.10)]"
                      : "border-white/70 bg-white/45 hover:bg-white/70"
                  }`}
                >
                  <span
                    className={`relative z-10 flex h-9 w-9 flex-none items-center justify-center rounded-full border text-xs font-medium ${
                      activeItem ? "border-[#8BA888] bg-[#8BA888] text-white" : "border-[#121212]/10 bg-[#F7F7F5] text-[#121212]/45"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-[.3em] text-[#8BA888]">
                      {item.eyebrow}
                    </span>
                    <span className="mt-2 block text-2xl font-medium tracking-tight md:text-3xl">
                      {item.title}
                    </span>
                    <span className="mt-3 block text-sm leading-relaxed text-[#121212]/55">
                      {item.copy}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.aside
          key={activeIndex}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="h-fit rounded-[2.5rem] bg-[#151715] p-8 text-white shadow-[0_30px_100px_rgba(18,18,18,0.22)] lg:sticky lg:top-28"
        >
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[.4em] text-[#9DB59A]">
            Selected moment
          </p>
          <p className="mb-4 text-sm text-white/45">{active.eyebrow}</p>
          <h2 className="text-4xl font-medium leading-tight tracking-[-.04em] text-white">
            {active.title}
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/60">
            {active.copy}
          </p>
        </motion.aside>
      </section>
    </main>
  );
}