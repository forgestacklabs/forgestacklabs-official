"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";

// ── Types ─────────────────────────────────────────────────────────────────────
interface SectionProps {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

interface SubsectionProps {
  title?: string;
  children: React.ReactNode;
}

interface BulletProps {
  items: React.ReactNode[];
}

// ── Table of Contents ─────────────────────────────────────────────────────────
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

// ── Reusable primitives ───────────────────────────────────────────────────────
function Bullet({ items }: BulletProps) {
  return (
    <ul className="mt-3 space-y-2 ml-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[6px] block w-1 h-1 rounded-full bg-[#222222]/30 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Subsection({ title, children }: SubsectionProps) {
  return (
    <div className="mt-5">
      {title && (
        <p className="text-[13px] font-semibold tracking-wide text-[#222222]/80 mb-2 uppercase">
          {title}
        </p>
      )}
      <div className="text-[13px] md:text-sm font-light leading-relaxed text-[#222222]/60 space-y-3">
        {children}
      </div>
    </div>
  );
}

function Section({ id, number, title, children, delay = 0 }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="scroll-mt-32 rounded-2xl px-6 py-7 transition-all duration-500"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible
          ? hovered ? "translateY(-4px)" : "translateY(0)"
          : "translateY(20px)",
        transition: `opacity 700ms ease ${delay}ms, transform ${hovered ? "300ms" : "700ms"} cubic-bezier(0.16,1,0.3,1) ${hovered ? "0ms" : `${delay}ms`}`,
        background: hovered ? "rgba(0,0,0,0.015)" : "transparent",
      }}
    >
      {/* Section header */}
      <div className="flex items-baseline gap-4 mb-4 pb-3 border-b border-[#222222]/[0.06]">
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#222222]/25 shrink-0 tabular-nums">
          {number}
        </span>
        <h2 className="text-base md:text-lg font-semibold tracking-[-0.01em] text-[#222222]">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function TermsPage() {
  const [cardVisible, setCardVisible] = useState(false);
  const [tocOpen, setTocOpen]         = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setCardVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth" }); setTocOpen(false); }
  };

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen bg-[#F7F7F5] overflow-x-hidden">
        {/* Ambient blobs */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(210,210,205,0.45) 0%, transparent 70%)", filter: "blur(90px)" }} />
          <div className="absolute bottom-[-15%] right-[-10%] w-[48vw] h-[48vw] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(205,205,200,0.35) 0%, transparent 70%)", filter: "blur(90px)" }} />
        </div>

        <div className="relative" style={{ zIndex: 1 }}>
          {/* ── HERO ──────────────────────────────────────────────────────── */}
          <div
            className="text-center pt-36 pb-12 px-6"
            style={{
              opacity:   cardVisible ? 1 : 0,
              transform: cardVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 700ms ease 60ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 60ms",
            }}
          >
            <div className="inline-flex items-center gap-2.5 mb-7 px-4 py-1.5 rounded-full border border-black/[0.06] bg-white/60 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#222222]/35 inline-block" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#222222]/35">
                Legal Information
              </span>
            </div>

            <h1
              className="text-4xl md:text-6xl font-light tracking-[-0.03em] text-[#222222] mb-3"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Terms of Service
            </h1>
            <p className="text-sm font-light text-[#222222]/40 tracking-wide mb-1">
              Operating Protocol for Forgestack Labs LLP
            </p>
            <p className="text-[11px] font-light text-[#222222]/30 uppercase tracking-[0.3em]">
              Effective Date: February 2026 &nbsp;·&nbsp; Last Updated: February 5, 2026
            </p>
          </div>

          {/* ── AGREEMENT CARD ────────────────────────────────────────────── */}
          <div
            ref={cardRef}
            className="max-w-4xl mx-auto px-4 sm:px-6 pb-20"
            style={{
              opacity:   cardVisible ? 1 : 0,
              transform: cardVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 700ms ease 200ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 200ms",
            }}
          >
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

              {/* ── TABLE OF CONTENTS ─────────────────────────────────────── */}
              <div
                className="mb-10 rounded-2xl border border-[#222222]/[0.05] overflow-hidden"
                style={{ background: "rgba(255,255,255,0.35)" }}
              >
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200 hover:bg-black/[0.02]"
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#222222]/40">
                    Table of Contents
                  </span>
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
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className="text-left px-3 py-2 text-[11px] font-light text-[#222222]/50 hover:text-[#222222] hover:translate-x-1 rounded-xl transition-all duration-200 hover:bg-black/[0.03]"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── DIVIDER ───────────────────────────────────────────────── */}
              <div className="mb-8 h-[1px] bg-gradient-to-r from-transparent via-[#222222]/10 to-transparent" />

              {/* ── SECTIONS ──────────────────────────────────────────────── */}
              <div className="space-y-2">

                <Section id="s1" number="1.0" title="Introduction" delay={0}>
                  <Subsection>
                    <p>Welcome to <strong className="font-semibold text-[#222222]/80">Forgestack Labs LLP</strong> ("Company", "we", "us", or "our"). These Terms of Service ("Terms") govern your access to and use of:</p>
                    <Bullet items={[
                      "Our website",
                      <>Our software products and platforms (<strong className="font-medium text-[#222222]/75">"Products"</strong> or <strong className="font-medium text-[#222222]/75">"SaaS Products"</strong>)</>,
                      <>Our engineering, consulting, and development services (<strong className="font-medium text-[#222222]/75">"Services"</strong>)</>,
                    ]} />
                    <p className="mt-3">By accessing or using our website, Products, or Services, you agree to be bound by these Terms and our Privacy Policy.</p>
                    <p className="mt-3 font-medium text-[#222222]/75">If you do not agree, you must immediately discontinue use of our website, Products, and Services.</p>
                  </Subsection>
                </Section>

                <Section id="s2" number="2.0" title="Relationship with Other Agreements" delay={40}>
                  <Subsection>
                    <p>If you have executed a <strong className="font-medium text-[#222222]/75">Master Service Agreement ("MSA")</strong>, <strong className="font-medium text-[#222222]/75">Statement of Work ("SOW")</strong>, Subscription Order, or <strong className="font-medium text-[#222222]/75">Data Processing Addendum ("DPA")</strong> with Forgestack Labs LLP:</p>
                    <Bullet items={[
                      "Those documents shall govern your relationship with us.",
                      <>In the event of any conflict, the order of precedence shall be: <strong className="font-medium text-[#222222]/75">MSA → DPA → SOW / Subscription Order → These Terms.</strong></>,
                    ]} />
                    <p className="mt-3">These Terms primarily govern website access and self-service SaaS usage where no separate MSA is executed.</p>
                  </Subsection>
                </Section>

                <Section id="s3" number="3.0" title="Definitions" delay={80}>
                  <Subsection>
                    <div className="space-y-3">
                      {[
                        ['"Client"',         "means any individual or entity engaging Forgestack Labs LLP for Services under an MSA or SOW."],
                        ['"User"',           "means any individual accessing the website or using the SaaS Products."],
                        ['"Deliverables"',   "means specific outputs created for a Client under a Service engagement."],
                        ['"SaaS Product"',   "means Forgestack Labs' proprietary subscription-based software, including the Fuel Station Management System."],
                      ].map(([term, def]) => (
                        <p key={term}>
                          <strong className="font-semibold text-[#222222]/80">{term}</strong> — {def}
                        </p>
                      ))}
                    </div>
                  </Subsection>
                </Section>

                <Section id="s4" number="4.0" title="Use of Products & Services" delay={120}>
                  <Subsection title="4.1 Eligibility">
                    <p>You must be at least <strong className="font-medium text-[#222222]/75">18 years of age</strong> and legally capable of entering into a binding contract under Indian law.</p>
                  </Subsection>
                  <Subsection title="4.2 Account Security">
                    <p>You are responsible for maintaining the confidentiality of your login credentials and for all activities conducted through your account. You must notify us immediately of any unauthorized access.</p>
                  </Subsection>
                  <Subsection title="4.3 Prohibited Conduct">
                    <p>You agree not to:</p>
                    <Bullet items={[
                      "Reverse engineer, decompile, or attempt to extract source code from the SaaS Products",
                      "Use the Products or Services for unlawful purposes",
                      "Interfere with platform security or performance",
                      "Resell, sublicense, or commercially exploit the SaaS Products without written authorization",
                    ]} />
                  </Subsection>
                </Section>

                <Section id="s5" number="5.0" title="Client Services (Custom Development & Consulting)" delay={160}>
                  <Subsection title="5.1 Scope of Work">
                    <p>All Client engagements are governed by a separate <strong className="font-medium text-[#222222]/75">MSA and/or SOW</strong>, which define scope, timelines, pricing, and deliverables.</p>
                  </Subsection>
                  <Subsection title="5.2 Intellectual Property — Client Work">
                    <p>Unless otherwise stated in writing:</p>
                    <Bullet items={[
                      "Upon full payment, the Client owns the specific Deliverables created for them.",
                      <>Forgestack Labs LLP retains ownership of all <strong className="font-medium text-[#222222]/75">Background IP</strong>, including tools, libraries, frameworks, and pre-existing code.</>,
                      "The Client is granted a perpetual, non-exclusive license to use such Background IP solely as embedded within the Deliverables.",
                    ]} />
                  </Subsection>
                </Section>

                <Section id="s6" number="6.0" title="SaaS Products (Subscription Use)" delay={200}>
                  <Subsection title="6.1 License Grant">
                    <p>We grant you a limited, non-exclusive, non-transferable, revocable license to use the SaaS Products solely for <strong className="font-medium text-[#222222]/75">internal business purposes</strong>.</p>
                  </Subsection>
                  <Subsection title="6.2 Data Ownership & Processing">
                    <p>You retain ownership of all data you upload or generate within the SaaS Products (<strong className="font-medium text-[#222222]/75">"Customer Data"</strong>).</p>
                    <p className="mt-2">You grant Forgestack Labs LLP the right to process Customer Data solely to provide and maintain the Services.</p>
                    <p className="mt-2">Data processing obligations are governed by our DPA and Privacy Policy.</p>
                  </Subsection>
                </Section>

                <Section id="s7" number="7.0" title="Fees & Payments" delay={240}>
                  <Subsection>
                    <p><strong className="font-medium text-[#222222]/75">Client Services:</strong> Fees are payable as specified in the applicable SOW. Late payments may attract interest.</p>
                    <p className="mt-3"><strong className="font-medium text-[#222222]/75">SaaS Subscriptions:</strong> Fees are billed in advance (monthly or annually). Non-payment may result in suspension or termination.</p>
                    <p className="mt-3">All fees are exclusive of applicable taxes, including <strong className="font-medium text-[#222222]/75">GST</strong>.</p>
                  </Subsection>
                </Section>

                <Section id="s8" number="8.0" title="Confidentiality" delay={280}>
                  <Subsection>
                    <p>Each party agrees to maintain the confidentiality of non-public business, technical, or commercial information disclosed in connection with the Products or Services, except where disclosure is required by law.</p>
                  </Subsection>
                </Section>

                <Section id="s9" number="9.0" title="Warranties & Disclaimers" delay={320}>
                  <Subsection>
                    <Bullet items={[
                      <>SaaS Products are provided on an <strong className="font-medium text-[#222222]/75">"AS IS"</strong> and <strong className="font-medium text-[#222222]/75">"AS AVAILABLE"</strong> basis.</>,
                      "We do not warrant uninterrupted or error-free operation.",
                      "No warranties are provided except as expressly stated in writing.",
                    ]} />
                  </Subsection>
                </Section>

                <Section id="s10" number="10.0" title="Limitation of Liability" delay={360}>
                  <Subsection>
                    <p>To the maximum extent permitted under Indian law:</p>
                    <Bullet items={[
                      "Forgestack Labs LLP shall not be liable for indirect, incidental, special, or consequential damages, including loss of data, revenue, or profits.",
                      "Our total aggregate liability arising from these Terms shall not exceed the fees paid by you in the three (3) months preceding the claim.",
                      "Liability terms under an executed MSA shall prevail where applicable.",
                    ]} />
                  </Subsection>
                </Section>

                <Section id="s11" number="11.0" title="Termination" delay={400}>
                  <Subsection>
                    <p><strong className="font-medium text-[#222222]/75">By You:</strong> You may discontinue use of the Products at any time. Subscription cancellations take effect at the end of the billing cycle.</p>
                    <p className="mt-3"><strong className="font-medium text-[#222222]/75">By Us:</strong> We may suspend or terminate access for breach, non-payment, or misuse.</p>
                    <p className="mt-3">Termination does not affect accrued payment obligations.</p>
                  </Subsection>
                </Section>

                <Section id="s12" number="12.0" title="Privacy & Data Protection" delay={440}>
                  <Subsection>
                    <p>Your use of the Products and Services is subject to our <Link href="/privacy" className="font-medium text-[#222222]/80 underline underline-offset-2 decoration-[#222222]/20 hover:decoration-[#222222]/60 transition-all duration-200">Privacy Policy</Link> and, where applicable, our Data Processing Addendum.</p>
                  </Subsection>
                </Section>

                <Section id="s13" number="13.0" title="Governing Law & Jurisdiction" delay={480}>
                  <Subsection>
                    <p>These Terms are governed by the <strong className="font-medium text-[#222222]/75">laws of India</strong>. Courts located in Mangalore, Karnataka, India shall have exclusive jurisdiction over any disputes arising under these Terms.</p>
                  </Subsection>
                </Section>

                <Section id="s14" number="14.0" title="Contact Information" delay={520}>
                  <Subsection>
                    <p className="font-medium text-[#222222]/80">Forgestack Labs LLP</p>
                    <p className="mt-1">Mangalore, Karnataka, India · Global</p>
                    <a
                      href="mailto:forgestacklabs@forgestacklabs.com"
                      className="inline-block mt-2 text-[#222222]/70 underline underline-offset-2 decoration-[#222222]/20 hover:decoration-[#222222]/60 hover:text-[#222222] transition-all duration-200"
                    >
                      forgestacklabs@forgestacklabs.com
                    </a>
                  </Subsection>
                </Section>
              </div>

              {/* ── BOTTOM META ───────────────────────────────────────────── */}
              <div className="mt-12 pt-6 border-t border-[#222222]/[0.05] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <p className="text-[11px] font-light text-[#222222]/30 leading-relaxed">
                  © 2026 Forgestack Labs LLP. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <Link href="/privacy" className="text-[11px] font-light text-[#222222]/35 hover:text-[#222222]/70 transition-colors duration-200">
                    Privacy Policy
                  </Link>
                  <span className="text-[#222222]/15">·</span>
                  <Link href="/terms" className="text-[11px] font-medium text-[#222222]/60">
                    Terms of Service
                  </Link>
                </div>
              </div>

              {/* Corner accent */}
              <div className="pointer-events-none absolute bottom-0 right-0 w-32 h-32 rounded-br-[2.5rem]"
                style={{ background: "radial-gradient(circle at bottom right, rgba(255,255,255,0.55), transparent)" }} />
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
}