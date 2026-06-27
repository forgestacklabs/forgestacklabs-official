"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ── Types ───────────────────────────────────────────────────────────────────
interface SectionProps {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}

interface SubsectionProps {
  title?: string;
  children: React.ReactNode;
}

interface BulletProps {
  items: React.ReactNode[];
}

// ── Animation config ────────────────────────────────────────────────────────
const EASE = [0.215, 0.61, 0.355, 1] as const;
const VP   = { once: false, margin: "-60px" } as const;

// ── Framer Motion Variants (matching Privacy page) ──────────────────────────
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const heroWrap: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.22 } },
};

const heroItem: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
};

const labelReveal: Variants = {
  hidden:  { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};

const sectionCard: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
};

const sectionHeader: Variants = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease: EASE, delay: 0.45 } },
};

const textBlockWrap: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.26, delayChildren: 0.8 } },
};

const textBlock: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
};

const bulletWrap: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.25 } },
};

const bulletItem: Variants = {
  hidden:  { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease: EASE } },
};

const tocWrap: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.3 } },
};

const tocItem: Variants = {
  hidden:  { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: EASE } },
};

const cardSpring = { type: "spring", stiffness: 220, damping: 18 } as const;

// ── TOC ─────────────────────────────────────────────────────────────────────
const TOC_ITEMS = [
  { id: "s1",  label: "1.0  Introduction" },
  { id: "s2",  label: "2.0  Relationship with Other Agreements" },
  { id: "s3",  label: "3.0  Definitions" },
  { id: "s4",  label: "4.0  Use of Products & Services" },
  { id: "s5",  label: "5.0  Client Services" },
  { id: "s6",  label: "6.0  SaaS Products" },
  { id: "s7",  label: "7.0  Fees & Payments" },
  { id: "s8",  label: "8.0  Confidentiality" },
  { id: "s9",  label: "9.0  Warranties & Disclaimers" },
  { id: "s10", label: "10.0  Limitation of Liability" },
  { id: "s11", label: "11.0  Termination" },
  { id: "s12", label: "12.0  Privacy & Data Protection" },
  { id: "s13", label: "13.0  Governing Law & Jurisdiction" },
  { id: "s14", label: "14.0  Contact Information" },
];

// ── FadeOutSection ───────────────────────────────────────────────────────────
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

// ── Primitives ───────────────────────────────────────────────────────────────
function Bullet({ items }: BulletProps) {
  return (
    <motion.ul variants={bulletWrap} className="mt-3 space-y-2.5 ml-1">
      {items.map((item, i) => (
        <motion.li key={i} variants={bulletItem} className="flex items-start gap-3">
          <span className="mt-[6px] block w-1 h-1 rounded-full bg-[#222222]/30 shrink-0" />
          <span>{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function Subsection({ title, children }: SubsectionProps) {
  return (
    <div className="mt-5 first:mt-0">
      {title && (
        <motion.p variants={textBlock} className="text-[13px] font-semibold tracking-wide text-[#222222]/80 mb-2 uppercase">
          {title}
        </motion.p>
      )}
      <div className="text-[13px] md:text-sm font-light leading-relaxed text-[#222222]/60 space-y-3">
        {children}
      </div>
    </div>
  );
}

// ── Section card (mirrors Privacy's Clause) ──────────────────────────────────
function Section({ id, number, title, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      variants={sectionCard}
      initial="hidden"
      whileInView="visible"
      viewport={VP}
      whileHover={{
        y: -6,
        scale: 1.01,
        boxShadow: "0 28px 70px rgba(18,18,18,0.10)",
        transition: cardSpring,
      }}
      className="scroll-mt-32 relative overflow-hidden rounded-2xl px-6 py-7"
      style={{
        background: "rgba(255,255,255,0.40)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "0.5px solid rgba(255,255,255,0.60)",
        borderTop: "0.5px solid rgba(255,255,255,0.80)",
        borderLeft: "0.5px solid rgba(255,255,255,0.80)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.85)",
      }}
    >
      {/* gloss streak */}
      <div className="pointer-events-none absolute top-0 left-8 right-8 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }} />

      <motion.div variants={sectionHeader} className="flex items-baseline gap-4 mb-4 pb-3 border-b border-[#222222]/[0.06]">
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#222222]/25 shrink-0 tabular-nums">
          {number}
        </span>
        <h2 className="text-base md:text-lg font-semibold tracking-[-0.01em] text-[#222222]">
          {title}
        </h2>
      </motion.div>

      <motion.div variants={textBlockWrap}>
        {children}
      </motion.div>
    </motion.section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function TermsPage() {
  const [tocOpen, setTocOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth" }); setTocOpen(false); }
  };

  return (
    <div className="relative min-h-screen bg-[#F7F7F5] overflow-x-hidden">

      {/* Ambient blobs */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible"
        className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(210,210,205,0.45) 0%, transparent 70%)", filter: "blur(90px)" }} />
        <div className="absolute bottom-[-15%] right-[-10%] w-[48vw] h-[48vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(205,205,200,0.35) 0%, transparent 70%)", filter: "blur(90px)" }} />
      </motion.div>

      <div className="relative" style={{ zIndex: 1 }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <FadeOutSection>
          <section className="text-center pt-36 pb-12 px-6">
            <motion.div variants={heroWrap} initial="hidden" animate="visible" className="flex flex-col items-center">

              <motion.div variants={heroItem}
                className="inline-flex items-center gap-2.5 mb-7 px-4 py-1.5 rounded-full border border-black/[0.06] bg-white/60 backdrop-blur-sm">
                <span className="relative inline-flex w-1.5 h-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-green-500" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#222222]/35">Legal Information</span>
              </motion.div>

              <motion.h1 variants={heroItem}
                className="text-4xl md:text-6xl font-light tracking-[-0.03em] text-[#222222] mb-3"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                Terms of Service
              </motion.h1>

              <motion.p variants={heroItem} className="text-sm font-light text-[#222222]/40 tracking-wide mb-1">
                Operating Protocol for Forgestack Labs LLP
              </motion.p>

              <motion.p variants={heroItem} className="text-[11px] font-light text-[#222222]/30 uppercase tracking-[0.3em]">
                Effective Date: February 2026 &nbsp;·&nbsp; Last Updated: February 5, 2026
              </motion.p>

            </motion.div>
          </section>
        </FadeOutSection>

        {/* ── BODY ─────────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">

          {/* Outer glass card */}
          <div
            className="relative overflow-hidden p-8 md:p-12 my-4 rounded-[2.5rem]"
            style={{
              background: "rgba(255,255,255,0.40)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "0.5px solid rgba(255,255,255,0.60)",
              borderTop: "0.5px solid rgba(255,255,255,0.80)",
              borderLeft: "0.5px solid rgba(255,255,255,0.80)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.85)",
            }}
          >
            {/* Top gloss */}
            <div className="pointer-events-none absolute top-0 left-10 right-10 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }} />

            {/* ── TOC ──────────────────────────────────────────────────────── */}
            <motion.div
              className="mb-10 rounded-2xl border border-[#222222]/[0.05] overflow-hidden"
              style={{ background: "rgba(255,255,255,0.35)" }}
              variants={tocWrap}
              initial="hidden"
              animate="visible"
            >
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200 hover:bg-black/[0.02]"
              >
                <motion.span variants={labelReveal} className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#222222]/40">
                  Table of Contents
                </motion.span>
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="transition-transform duration-300"
                  style={{ transform: tocOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <path d="M2.5 5L7 9.5L11.5 5" stroke="#222222" strokeOpacity="0.35" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {tocOpen && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 px-4 pb-4 pt-1">
                  {TOC_ITEMS.map((item) => (
                    <motion.button
                      key={item.id}
                      variants={tocItem}
                      onClick={() => scrollTo(item.id)}
                      whileHover={{ x: 5, transition: cardSpring }}
                      className="text-left px-3 py-2 rounded-xl text-[11px] font-light text-[#222222]/50 hover:text-[#222222] hover:bg-black/[0.03] transition-colors duration-200"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Divider */}
            <div className="mb-8 h-[1px] bg-gradient-to-r from-transparent via-[#222222]/10 to-transparent" />

            {/* ── SECTIONS ─────────────────────────────────────────────────── */}
            <div className="space-y-2">

              <Section id="s1" number="1.0" title="Introduction">
                <Subsection>
                  <motion.p variants={textBlock}>Welcome to <strong className="font-semibold text-[#222222]/80">Forgestack Labs LLP</strong> ("Company", "we", "us", or "our"). These Terms of Service ("Terms") govern your access to and use of:</motion.p>
                  <Bullet items={[
                    "Our website",
                    <><strong className="font-medium text-[#222222]/75">"Products"</strong> or <strong className="font-medium text-[#222222]/75">"SaaS Products"</strong> — our software products and platforms</>,
                    <><strong className="font-medium text-[#222222]/75">"Services"</strong> — our engineering, consulting, and development services</>,
                  ]} />
                  <motion.p variants={textBlock} className="mt-3">By accessing or using our website, Products, or Services, you agree to be bound by these Terms and our Privacy Policy.</motion.p>
                  <motion.p variants={textBlock} className="mt-3 font-medium text-[#222222]/75">If you do not agree, you must immediately discontinue use of our website, Products, and Services.</motion.p>
                </Subsection>
              </Section>

              <Section id="s2" number="2.0" title="Relationship with Other Agreements">
                <Subsection>
                  <motion.p variants={textBlock}>If you have executed a <strong className="font-medium text-[#222222]/75">Master Service Agreement ("MSA")</strong>, <strong className="font-medium text-[#222222]/75">Statement of Work ("SOW")</strong>, Subscription Order, or <strong className="font-medium text-[#222222]/75">Data Processing Addendum ("DPA")</strong> with Forgestack Labs LLP:</motion.p>
                  <Bullet items={[
                    "Those documents shall govern your relationship with us.",
                    <><strong className="font-medium text-[#222222]/75">Order of precedence:</strong> MSA → DPA → SOW / Subscription Order → These Terms.</>,
                  ]} />
                  <motion.p variants={textBlock} className="mt-3">These Terms primarily govern website access and self-service SaaS usage where no separate MSA is executed.</motion.p>
                </Subsection>
              </Section>

              <Section id="s3" number="3.0" title="Definitions">
                <Subsection>
                  <div className="space-y-3">
                    {[
                      ['"Client"',         "means any individual or entity engaging Forgestack Labs LLP for Services under an MSA or SOW."],
                      ['"User"',           "means any individual accessing the website or using the SaaS Products."],
                      ['"Deliverables"',   "means specific outputs created for a Client under a Service engagement."],
                      ['"SaaS Product"',   "means Forgestack Labs' proprietary subscription-based software, including the Fuel Station Management System."],
                    ].map(([term, def]) => (
                      <motion.p key={term} variants={textBlock}>
                        <strong className="font-semibold text-[#222222]/80">{term}</strong> — {def}
                      </motion.p>
                    ))}
                  </div>
                </Subsection>
              </Section>

              <Section id="s4" number="4.0" title="Use of Products & Services">
                <Subsection title="4.1 Eligibility">
                  <motion.p variants={textBlock}>You must be at least <strong className="font-medium text-[#222222]/75">18 years of age</strong> and legally capable of entering into a binding contract under Indian law.</motion.p>
                </Subsection>
                <Subsection title="4.2 Account Security">
                  <motion.p variants={textBlock}>You are responsible for maintaining the confidentiality of your login credentials and for all activities conducted through your account. You must notify us immediately of any unauthorized access.</motion.p>
                </Subsection>
                <Subsection title="4.3 Prohibited Conduct">
                  <motion.p variants={textBlock}>You agree not to:</motion.p>
                  <Bullet items={[
                    "Reverse engineer, decompile, or attempt to extract source code from the SaaS Products",
                    "Use the Products or Services for unlawful purposes",
                    "Interfere with platform security or performance",
                    "Resell, sublicense, or commercially exploit the SaaS Products without written authorization",
                  ]} />
                </Subsection>
              </Section>

              <Section id="s5" number="5.0" title="Client Services (Custom Development & Consulting)">
                <Subsection title="5.1 Scope of Work">
                  <motion.p variants={textBlock}>All Client engagements are governed by a separate <strong className="font-medium text-[#222222]/75">MSA and/or SOW</strong>, which define scope, timelines, pricing, and deliverables.</motion.p>
                </Subsection>
                <Subsection title="5.2 Intellectual Property — Client Work">
                  <motion.p variants={textBlock}>Unless otherwise stated in writing:</motion.p>
                  <Bullet items={[
                    "Upon full payment, the Client owns the specific Deliverables created for them.",
                    <>Forgestack Labs LLP retains ownership of all <strong className="font-medium text-[#222222]/75">Background IP</strong>, including tools, libraries, frameworks, and pre-existing code.</>,
                    "The Client is granted a perpetual, non-exclusive license to use such Background IP solely as embedded within the Deliverables.",
                  ]} />
                </Subsection>
              </Section>

              <Section id="s6" number="6.0" title="SaaS Products (Subscription Use)">
                <Subsection title="6.1 License Grant">
                  <motion.p variants={textBlock}>We grant you a limited, non-exclusive, non-transferable, revocable license to use the SaaS Products solely for <strong className="font-medium text-[#222222]/75">internal business purposes</strong>.</motion.p>
                </Subsection>
                <Subsection title="6.2 Data Ownership & Processing">
                  <motion.p variants={textBlock}>You retain ownership of all data you upload or generate within the SaaS Products (<strong className="font-medium text-[#222222]/75">"Customer Data"</strong>).</motion.p>
                  <motion.p variants={textBlock} className="mt-2">You grant Forgestack Labs LLP the right to process Customer Data solely to provide and maintain the Services.</motion.p>
                  <motion.p variants={textBlock} className="mt-2">Data processing obligations are governed by our DPA and Privacy Policy.</motion.p>
                </Subsection>
              </Section>

              <Section id="s7" number="7.0" title="Fees & Payments">
                <Subsection>
                  <motion.p variants={textBlock}><strong className="font-medium text-[#222222]/75">Client Services:</strong> Fees are payable as specified in the applicable SOW. Late payments may attract interest.</motion.p>
                  <motion.p variants={textBlock} className="mt-3"><strong className="font-medium text-[#222222]/75">SaaS Subscriptions:</strong> Fees are billed in advance (monthly or annually). Non-payment may result in suspension or termination.</motion.p>
                  <motion.p variants={textBlock} className="mt-3">All fees are exclusive of applicable taxes, including <strong className="font-medium text-[#222222]/75">GST</strong>.</motion.p>
                </Subsection>
              </Section>

              <Section id="s8" number="8.0" title="Confidentiality">
                <Subsection>
                  <motion.p variants={textBlock}>Each party agrees to maintain the confidentiality of non-public business, technical, or commercial information disclosed in connection with the Products or Services, except where disclosure is required by law.</motion.p>
                </Subsection>
              </Section>

              <Section id="s9" number="9.0" title="Warranties & Disclaimers">
                <Subsection>
                  <Bullet items={[
                    <><strong className="font-medium text-[#222222]/75">"AS IS"</strong> and <strong className="font-medium text-[#222222]/75">"AS AVAILABLE"</strong> — SaaS Products are provided without guarantee of fitness for a particular purpose.</>,
                    "We do not warrant uninterrupted or error-free operation.",
                    "No warranties are provided except as expressly stated in writing.",
                  ]} />
                </Subsection>
              </Section>

              <Section id="s10" number="10.0" title="Limitation of Liability">
                <Subsection>
                  <motion.p variants={textBlock}>To the maximum extent permitted under Indian law:</motion.p>
                  <Bullet items={[
                    "Forgestack Labs LLP shall not be liable for indirect, incidental, special, or consequential damages, including loss of data, revenue, or profits.",
                    "Our total aggregate liability arising from these Terms shall not exceed the fees paid by you in the three (3) months preceding the claim.",
                    "Liability terms under an executed MSA shall prevail where applicable.",
                  ]} />
                </Subsection>
              </Section>

              <Section id="s11" number="11.0" title="Termination">
                <Subsection>
                  <motion.p variants={textBlock}><strong className="font-medium text-[#222222]/75">By You:</strong> You may discontinue use of the Products at any time. Subscription cancellations take effect at the end of the billing cycle.</motion.p>
                  <motion.p variants={textBlock} className="mt-3"><strong className="font-medium text-[#222222]/75">By Us:</strong> We may suspend or terminate access for breach, non-payment, or misuse.</motion.p>
                  <motion.p variants={textBlock} className="mt-3">Termination does not affect accrued payment obligations.</motion.p>
                </Subsection>
              </Section>

              <Section id="s12" number="12.0" title="Privacy & Data Protection">
                <Subsection>
                  <motion.p variants={textBlock}>Your use of the Products and Services is subject to our <Link href="/privacy" className="font-medium text-[#222222]/80 underline underline-offset-2 decoration-[#222222]/20 hover:decoration-[#222222]/60 transition-all duration-200">Privacy Policy</Link> and, where applicable, our Data Processing Addendum.</motion.p>
                </Subsection>
              </Section>

              <Section id="s13" number="13.0" title="Governing Law & Jurisdiction">
                <Subsection>
                  <motion.p variants={textBlock}>These Terms are governed by the <strong className="font-medium text-[#222222]/75">laws of India</strong>. Courts located in Mangalore, Karnataka, India shall have exclusive jurisdiction over any disputes arising under these Terms.</motion.p>
                </Subsection>
              </Section>

              <Section id="s14" number="14.0" title="Contact Information">
                <Subsection>
                  <motion.p variants={textBlock} className="font-medium text-[#222222]/80">Forgestack Labs LLP</motion.p>
                  <motion.p variants={textBlock} className="mt-1">Mangalore, Karnataka, India · Global</motion.p>
                  <motion.a
                    variants={textBlock}
                
                    className="inline-block mt-2 text-[#222222]/70  decoration-[#222222]/20 hover:decoration-[#222222]/60 hover:text-[#222222] transition-all duration-200"
                  >
                    hello@forgestacklabs.com
                  </motion.a>
                </Subsection>
              </Section>

            </div>

            {/* ── BOTTOM META ──────────────────────────────────────────────── */}

            {/* Corner accent */}
            <div className="pointer-events-none absolute bottom-0 right-0 w-32 h-32 rounded-br-[2.5rem]"
              style={{ background: "radial-gradient(circle at bottom right, rgba(255,255,255,0.55), transparent)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

