"use client";

import { motion, Variants } from "framer-motion";

const EASE = [0.215, 0.61, 0.355, 1] as const;
const VP = { once: false, margin: "-180px" } as const;

const heroWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.78, ease: EASE } },
};

const lineReveal: Variants = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.82, ease: EASE } },
};

const cardSpring = { type: "spring", stiffness: 220, damping: 18 } as const;

type Principle = {
  eyebrow: string;
  title: string;
  copy: string;
};

export default function ManifestoClient({
  principles,
}: {
  principles: readonly Principle[];
}) {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 pb-28 pt-32 text-[#121212]">
      <motion.section
        className="mx-auto max-w-7xl"
        variants={heroWrap}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fadeUp} className="mb-8 text-[10px] font-bold uppercase tracking-[.5em] text-[#8BA888]">
          Manifesto
        </motion.p>
        <motion.h1 variants={fadeUp} className="max-w-6xl text-6xl font-medium leading-[.95] tracking-[-.07em] md:text-8xl lg:text-[9rem]">
          Technology changes.
          <span className="block text-[#8BA888]">Trust endures.</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-10 max-w-3xl text-xl leading-relaxed text-[#121212]/60 md:text-2xl">
          The ForgeStack philosophy is intentionally simple: understand before building, simplify complexity, communicate honestly, and engineer for the long term.
        </motion.p>
      </motion.section>

      <motion.section
        variants={lineReveal}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        className="mx-auto mt-24 max-w-7xl border-y border-[#121212]/10 py-16"
      >
        <p className="max-w-5xl text-4xl font-medium leading-tight tracking-[-.04em] md:text-6xl">
          We do not build software for its own sake. We engineer operational confidence.
        </p>
      </motion.section>

      <section className="mx-auto mt-20 grid max-w-7xl gap-10">
        {principles.map((item, index) => (
          <motion.article
            key={item.eyebrow}
            variants={lineReveal}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            whileHover={{
              y: -10,
              backgroundColor: "rgba(255,255,255,0.58)",
              boxShadow: "0 30px 90px rgba(18,18,18,0.12)",
              transition: cardSpring,
            }}
            className="grid gap-6 rounded-[2rem] border border-transparent border-b-[#121212]/10 p-5 pb-10 transition-colors md:grid-cols-[7rem_minmax(0,1fr)_minmax(18rem,28rem)] md:p-7"
          >
            <span className="text-sm font-medium text-[#8BA888]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[.35em] text-[#121212]/35">
                {item.eyebrow}
              </p>
              <h2 className="text-3xl font-medium leading-tight tracking-[-.04em] md:text-5xl">
                {item.title}
              </h2>
            </div>
            <p className="text-base leading-relaxed text-[#121212]/60">
              {item.copy}
            </p>
          </motion.article>
        ))}
      </section>

      <motion.section
        variants={lineReveal}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        whileHover={{
          y: -12,
          scale: 1.01,
          boxShadow: "0 44px 120px rgba(18,18,18,0.24)",
          transition: cardSpring,
        }}
        className="mx-auto mt-24 max-w-7xl rounded-[2.5rem] bg-[#151715] p-8 text-white md:p-14"
      >
        <p className="mb-6 text-[10px] font-bold uppercase tracking-[.4em] text-[#9DB59A]">
          Guiding principle
        </p>
        <p className="max-w-4xl text-4xl font-medium leading-tight tracking-[-.04em] text-white md:text-6xl">
          Every line of code represents a promise made to the people who depend on it.
        </p>
      </motion.section>
    </main>
  );
}
