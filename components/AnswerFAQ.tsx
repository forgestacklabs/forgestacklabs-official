"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import type { AnswerItem } from "@/lib/aeo-content";

const EASE = [0.215, 0.61, 0.355, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const staggerWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const labelReveal: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const itemReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const VP = { once: false, margin: "-160px" } as const;

type AnswerFAQProps = {
  id: string;
  eyebrow: string;
  title: string;
  introduction: string;
  items: AnswerItem[];
};

export default function AnswerFAQ({ id, eyebrow, title, introduction, items }: AnswerFAQProps) {
  const headingId = `${id}-heading`;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id={id} aria-labelledby={headingId} className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-5xl">

        <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
          <motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">
            {eyebrow}
          </motion.p>
          <motion.h2 variants={fadeUp} id={headingId} className="max-w-4xl text-4xl font-medium tracking-tight text-[#121212] md:text-5xl">
            {title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-3xl text-sm leading-relaxed text-[#121212]/60 md:text-base">
            {introduction}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 border-y border-[#121212]/10"
          variants={staggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.question}
                variants={itemReveal}
                className="border-b border-[#121212]/10 last:border-b-0"
              >
                <motion.button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  whileHover={{ x: 4, transition: { type: "spring", stiffness: 340, damping: 20 } }}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-7 text-left text-lg font-medium text-[#121212] md:text-xl"
                >
                  <span>{item.question}</span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center text-2xl font-light text-[#8BA888]"
                  >
                    +
                  </motion.span>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-7 pr-12 text-sm leading-relaxed text-[#121212]/60 md:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}