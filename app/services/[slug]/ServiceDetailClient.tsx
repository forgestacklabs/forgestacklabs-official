"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import type { Service } from "../services-data";

const EASE = [0.215, 0.61, 0.355, 1] as const;

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const heroWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
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

const labelReveal: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const ctaReveal: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const btnSpring = { type: "spring", stiffness: 320, damping: 20 } as const;
const VP = { once: true, amount: 0.1, margin: "0px 0px -10% 0px" } as const;

function FadeOutSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.45, 0.9], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.45, 0.9], [1, 0.94]);
  const y = useTransform(scrollYProgress, [0.45, 0.9], ["0px", "-40px"]);

  return (
    <div ref={ref}>
      <motion.div style={{ opacity, scale, y, transformOrigin: "center top" }}>{children}</motion.div>
    </div>
  );
}

export default function ServiceDetailClient({ service }: { service: Service }) {
  return (
    <main className="relative min-h-screen bg-[#F7F7F5] pt-14 text-[#121212]">
      <motion.div className="pointer-events-none fixed inset-0 -z-10" variants={fadeIn} initial="hidden" animate="visible">
        <div className="absolute left-[-12%] top-[-18%] h-[44rem] w-[44rem] rounded-full bg-[#8BA888]/14 blur-[120px]" />
        <div className="absolute bottom-[-18%] right-[-12%] h-[40rem] w-[40rem] rounded-full bg-[#D4A373]/14 blur-[120px]" />
      </motion.div>

      <FadeOutSection>
        <section className="relative mx-auto flex max-w-5xl flex-col justify-start px-6 pb-16 pt-24 text-center md:min-h-[70vh] md:justify-center md:py-14">
          <motion.div variants={heroWrap} initial="hidden" animate="visible" className="flex flex-col items-center">
            <motion.p variants={heroItem} className="mb-6 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888] md:text-xs">
              Service {service.num}
            </motion.p>
            <motion.h1 variants={heroItem} className="mx-auto max-w-4xl text-4xl font-medium leading-[0.98] tracking-tight md:text-6xl">
              {service.title}
            </motion.h1>
            <motion.p variants={heroItem} className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[#121212]/60 md:text-xl">
              {service.longCopy}
            </motion.p>
          </motion.div>
        </section>
      </FadeOutSection>

      <FadeOutSection>
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP} className="mb-10">
              <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#D4A373]">
                What&apos;s Included
              </motion.p>
            </motion.div>

            <motion.div className="grid gap-4 sm:grid-cols-2" variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
              {service.features.map((f) => (
                <motion.div
                  key={f}
                  variants={staggerItem}
                  className="rounded-2xl border border-white/70 bg-white/50 p-6 backdrop-blur-3xl"
                >
                  <p className="text-sm font-medium leading-relaxed text-[#121212]/75">{f}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </FadeOutSection>

      <FadeOutSection>
        <section className="px-6 py-28">
          <motion.div
            variants={ctaReveal}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/70 bg-white/55 p-10 text-center shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur-3xl md:p-16"
          >
            <motion.p variants={fadeUp} className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-[#121212]/60 md:text-base">
              Talk to ForgeStack Labs about {service.title.toLowerCase()} for your business.
            </motion.p>
            <motion.div whileHover={{ y: -5, scale: 1.04, transition: btnSpring }} className="inline-block">
              <Link
                href="/contact?mode=discovery#contact-inquiry"
                className="inline-flex rounded-full bg-[#8BA888] px-9 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white shadow-[0_18px_45px_rgba(139,168,136,0.28)] transition-colors duration-300 hover:bg-[#121212] hover:shadow-[0_24px_60px_rgba(18,18,18,0.22)]"
              >
                Book a Discovery Call
              </Link>
            </motion.div>
            <p className="mt-8">
              <Link href="/services" className="text-xs font-bold uppercase tracking-[0.3em] text-[#121212]/40 hover:text-[#121212]">
                ← All Services
              </Link>
            </p>
          </motion.div>
        </section>
      </FadeOutSection>
    </main>
  );
}