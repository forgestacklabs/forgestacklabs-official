"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ClauseProps {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

interface SubclauseProps {
  title?: string;
  children: React.ReactNode;
}

interface BulletProps {
  items: React.ReactNode[];
}

// ── TOC ───────────────────────────────────────────────────────────────────────
const TOC_ITEMS = [
  { id: "c1", label: "1.0  Introduction" },
  { id: "c2", label: "2.0  Information We Collect" },
  { id: "c3", label: "3.0  Purpose of Data Processing" },
  { id: "c4", label: "4.0  Data Security Measures" },
  { id: "c5", label: "5.0  Data Sharing & Third-Party Disclosures" },
  { id: "c6", label: "6.0  Data Retention" },
  { id: "c7", label: "7.0  Your Rights Under DPDPA, 2023" },
  { id: "c8", label: "8.0  Cookies & Tracking Technologies" },
  { id: "c9", label: "9.0  Contact & Grievance Officer" },
];

// ── Primitives ────────────────────────────────────────────────────────────────
function Bullet({ items }: BulletProps) {
  return (
    <ul className="mt-3 space-y-2.5 ml-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[7px] block w-[3px] h-[3px] rounded-full bg-[#222222]/30 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Subclause({ title, children }: SubclauseProps) {
  return (
    <div className="mt-6 first:mt-0">
      {title && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#222222]/50 mb-2.5">
          {title}
        </p>
      )}
      <div className="text-[13px] md:text-sm font-light leading-relaxed text-[#222222]/60 space-y-3">
        {children}
      </div>
    </div>
  );
}

// ── Callout box ───────────────────────────────────────────────────────────────
function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-5 px-5 py-4 rounded-2xl border border-[#222222]/[0.07]"
      style={{ background: "rgba(34,34,34,0.03)" }}
    >
      <p className="text-[12px] font-light leading-relaxed text-[#222222]/65">
        {children}
      </p>
    </div>
  );
}

// ── Clause ────────────────────────────────────────────────────────────────────
function Clause({ id, number, title, children, delay = 0 }: ClauseProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.07 }
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
      className="scroll-mt-32 rounded-2xl px-6 py-7 transition-colors duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-4px)" : "translateY(0px)"
          : "translateY(20px)",
        transition: `opacity 700ms ease ${delay}ms, transform ${hovered ? "300ms" : "700ms"} cubic-bezier(0.16,1,0.3,1) ${hovered ? "0ms" : `${delay}ms`}`,
        background: hovered ? "rgba(0,0,0,0.02)" : "transparent",
      }}
    >
      <div className="flex items-baseline gap-4 mb-5 pb-3 border-b border-[#222222]/[0.06]">
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#222222]/22 tabular-nums shrink-0">
          {number}
        </span>
        <h2 className="text-sm md:text-base font-semibold tracking-[-0.01em] text-[#222222]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PrivacyPage() {
  const [ready, setReady] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setTocOpen(false);
  };

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0px)" : "translateY(20px)",
    transition: `opacity 700ms ease ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

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
          <div className="text-center pt-36 pb-12 px-6">
            <div style={fadeUp(0)} className="inline-flex items-center gap-2.5 mb-7 px-4 py-1.5 rounded-full border border-black/[0.06] bg-white/60 backdrop-blur-sm">
              <span className="relative inline-flex w-1.5 h-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-green-500" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#222222]/35">
                Legal Information
              </span>
            </div>

            <h1
              style={{
                ...fadeUp(80),
                fontFamily: "'Georgia', 'Times New Roman', serif",
              }}
              className="text-4xl md:text-6xl font-light tracking-[-0.03em] text-[#222222] mb-3"
            >
              Privacy Protocol
            </h1>

            <div style={fadeUp(140)} className="flex items-center justify-center gap-4 flex-wrap">
              <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#222222]/35 px-3 py-1 rounded-full border border-[#222222]/10 bg-white/50">
                Version 4.0.2
              </span>
              <span className="text-[#222222]/15">·</span>
              <span className="text-[11px] font-light text-[#222222]/30 uppercase tracking-[0.3em]">
                Last Updated: February 2026
              </span>
            </div>
          </div>

          {/* ── MAIN CARD ─────────────────────────────────────────────────── */}
          <div
            className="max-w-4xl mx-auto px-4 sm:px-6 pb-20"
            style={fadeUp(200)}
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
              {/* Top gloss streak */}
              <div className="pointer-events-none absolute top-0 left-10 right-10 h-[1px]"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }} />

              {/* ── TABLE OF CONTENTS ─────────────────────────────────────── */}
              <div
                className="mb-10 rounded-2xl border border-[#222222]/[0.05] overflow-hidden"
                style={{ background: "rgba(255,255,255,0.35)" }}
              >
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-black/[0.02] transition-colors duration-200"
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#222222]/40">
                    Clause Index
                  </span>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    style={{ transform: tocOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 300ms ease" }}
                  >
                    <path d="M2.5 5L7 9.5L11.5 5" stroke="#222222" strokeOpacity="0.35" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {tocOpen && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 px-4 pb-4 pt-1">
                    {TOC_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className="text-left px-3 py-2 rounded-xl text-[11px] font-light text-[#222222]/50 hover:text-[#222222] hover:translate-x-1 hover:bg-black/[0.03] transition-all duration-200"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="mb-8 h-[1px] bg-gradient-to-r from-transparent via-[#222222]/10 to-transparent" />

              {/* ── CLAUSES ───────────────────────────────────────────────── */}
              <div className="space-y-2">

                {/* 1.0 Introduction */}
                <Clause id="c1" number="1.0" title="Introduction" delay={0}>
                  <Subclause>
                    <p><strong className="font-semibold text-[#222222]/80">Forgestack Labs LLP</strong> ("Company", "we", "us", or "our") is a product-first technology company incorporated in India. We are committed to protecting the privacy, confidentiality, and security of personal and business data entrusted to us.</p>
                    <p className="mt-3">This Privacy Protocol governs the collection, use, storage, and disclosure of information in connection with:</p>
                    <Bullet items={[
                      <><strong className="font-medium text-[#222222]/75">Our Website:</strong> www.forgestacklabs.com</>,
                      <><strong className="font-medium text-[#222222]/75">Our Products & Platforms:</strong> Proprietary SaaS applications and software products</>,
                      <><strong className="font-medium text-[#222222]/75">Our Services:</strong> Custom software development, consulting, and related professional services</>,
                    ]} />
                    <p className="mt-3">By accessing or using our website, products, or services, you agree to the data practices described herein, in accordance with the <strong className="font-medium text-[#222222]/75">Digital Personal Data Protection Act, 2023 (DPDPA)</strong> and the <strong className="font-medium text-[#222222]/75">Information Technology Act, 2000</strong>, along with applicable rules thereunder.</p>
                  </Subclause>
                </Clause>

                {/* 2.0 Information We Collect */}
                <Clause id="c2" number="2.0" title="Information We Collect" delay={40}>
                  <Subclause>
                    <p>We collect information based on the nature of your interaction with Forgestack Labs.</p>
                  </Subclause>

                  <Subclause title="2.1 — Website Visitors & Prospective Clients">
                    <Bullet items={[
                      <><strong className="font-medium text-[#222222]/75">Identity & Contact Information:</strong> Name, email address, phone number, company name, and other details submitted through contact forms or inquiries.</>,
                      <><strong className="font-medium text-[#222222]/75">Project & Business Information:</strong> Details relating to project requirements, budgets, timelines, or service requests.</>,
                      <><strong className="font-medium text-[#222222]/75">Technical Information:</strong> IP address, browser type, device identifiers, and usage metadata collected through cookies and analytics tools.</>,
                    ]} />
                  </Subclause>

                  <Subclause title="2.2 — Users of Our Products (SaaS / Software Platforms)">
                    <Bullet items={[
                      <><strong className="font-medium text-[#222222]/75">Account Information:</strong> Usernames, encrypted passwords, authentication tokens, and role-based access credentials.</>,
                      <><strong className="font-medium text-[#222222]/75">Operational & Business Data:</strong> Data entered into our platforms as part of normal usage — including inventory records, staff details, transaction logs, or operational metrics.</>,
                      <><strong className="font-medium text-[#222222]/75">Usage & System Logs:</strong> Activity timestamps, feature usage patterns, and diagnostic logs used for monitoring and issue resolution.</>,
                    ]} />
                    <Callout>
                      <strong className="font-semibold text-[#222222]/80">Data Processor Notice:</strong> For operational and business data processed through our SaaS platforms, Forgestack Labs acts strictly as a Data Processor. Ownership and control of such data remain with the client. We process this data solely to provide agreed-upon software functionality.
                    </Callout>
                  </Subclause>
                </Clause>

                {/* 3.0 Purpose of Data Processing */}
                <Clause id="c3" number="3.0" title="Purpose of Data Processing" delay={80}>
                  <Subclause>
                    <p>Forgestack Labs does not sell or commercially exploit personal or business data. Information is processed strictly for the following lawful purposes:</p>
                    <Bullet items={[
                      <><strong className="font-medium text-[#222222]/75">Product Operation:</strong> User authentication, session management, and delivery of core software features.</>,
                      <><strong className="font-medium text-[#222222]/75">Service Fulfilment:</strong> Execution of contractual obligations, including development, deployment, and maintenance of software solutions.</>,
                      <><strong className="font-medium text-[#222222]/75">Security & Risk Management:</strong> Fraud detection, access control, monitoring, and safeguarding platform integrity.</>,
                      <><strong className="font-medium text-[#222222]/75">Communication & Support:</strong> Account notifications, service updates, billing communications, and customer support.</>,
                      <><strong className="font-medium text-[#222222]/75">Legal & Regulatory Compliance:</strong> Compliance with applicable Indian laws, tax regulations, audits, and lawful governmental requests.</>,
                    ]} />
                  </Subclause>
                </Clause>

                {/* 4.0 Data Security */}
                <Clause id="c4" number="4.0" title="Data Security Measures" delay={120}>
                  <Subclause>
                    <p>Security is foundational to our operations. We implement reasonable, industry-accepted safeguards in line with the <strong className="font-medium text-[#222222]/75">IT (Reasonable Security Practices and Procedures) Rules, 2011</strong>.</p>
                    <Bullet items={[
                      <><strong className="font-medium text-[#222222]/75">Encryption in Transit:</strong> All data exchanged between user devices and our servers is secured using SSL/TLS encryption.</>,
                      <><strong className="font-medium text-[#222222]/75">Encryption at Rest:</strong> Sensitive information, including credentials and databases, is encrypted within our storage systems.</>,
                      <><strong className="font-medium text-[#222222]/75">Access Controls:</strong> Production data access is strictly limited to authorized personnel, protected by role-based permissions and Multi-Factor Authentication (MFA).</>,
                      <><strong className="font-medium text-[#222222]/75">Periodic Reviews:</strong> Regular internal assessments of data handling practices to identify and mitigate potential risks.</>,
                    ]} />
                  </Subclause>
                </Clause>

                {/* 5.0 Data Sharing */}
                <Clause id="c5" number="5.0" title="Data Sharing & Third-Party Disclosures" delay={160}>
                  <Subclause>
                    <p>We disclose information only where necessary to operate our services securely and efficiently.</p>
                    <Bullet items={[
                      <><strong className="font-medium text-[#222222]/75">Infrastructure & Hosting Providers:</strong> Trusted cloud service providers (such as AWS, Google Cloud, or Vercel) for hosting and infrastructure management.</>,
                      <><strong className="font-medium text-[#222222]/75">Analytics Services:</strong> Limited use of analytics tools (e.g., Google Analytics) to evaluate anonymized usage trends.</>,
                      <><strong className="font-medium text-[#222222]/75">Legal Obligations:</strong> Disclosure when required under applicable laws, court orders, or requests from authorized government agencies.</>,
                    ]} />
                    <Callout>
                      <strong className="font-semibold text-[#222222]/80">Our Commitment:</strong> We do not sell, rent, or share personal or business data with advertisers or unauthorized third parties.
                    </Callout>
                  </Subclause>
                </Clause>

                {/* 6.0 Data Retention */}
                <Clause id="c6" number="6.0" title="Data Retention" delay={200}>
                  <Subclause>
                    <Bullet items={[
                      <><strong className="font-medium text-[#222222]/75">Client & Contractual Data:</strong> Retained for the duration of the engagement and thereafter as required by applicable tax, accounting, or legal obligations (generally 5–8 years).</>,
                      <><strong className="font-medium text-[#222222]/75">Product & Operational Data:</strong> Retained while the account remains active. Upon termination, clients may request a data export. Operational data will be deleted from active systems within <strong className="font-medium text-[#222222]/75">60 days</strong>, subject to backup retention and legal requirements.</>,
                    ]} />
                  </Subclause>
                </Clause>

                {/* 7.0 Your Rights */}
                <Clause id="c7" number="7.0" title="Your Rights Under DPDPA, 2023" delay={240}>
                  <Subclause>
                    <p>As a Data Principal under the DPDPA, 2023, you have the right to:</p>
                    <Bullet items={[
                      <><strong className="font-medium text-[#222222]/75">Access:</strong> Request information about personal data processed by us.</>,
                      <><strong className="font-medium text-[#222222]/75">Correction:</strong> Request correction of inaccurate or incomplete personal data.</>,
                      <><strong className="font-medium text-[#222222]/75">Erasure:</strong> Request deletion of personal data, subject to statutory retention obligations.</>,
                      <><strong className="font-medium text-[#222222]/75">Grievance Redressal:</strong> Raise concerns regarding data protection or privacy practices.</>,
                    ]} />
                    <p className="mt-3">Requests may be submitted using the contact details in Clause 9.0 below.</p>
                  </Subclause>
                </Clause>

                {/* 8.0 Cookies */}
                <Clause id="c8" number="8.0" title="Cookies & Tracking Technologies" delay={280}>
                  <Subclause>
                    <Bullet items={[
                      <><strong className="font-medium text-[#222222]/75">Essential Cookies:</strong> Required for authentication, session management, and security. These cannot be disabled without affecting platform functionality.</>,
                      <><strong className="font-medium text-[#222222]/75">Non-Essential Cookies:</strong> Analytics cookies used to evaluate aggregate usage patterns. These can be managed through your browser settings.</>,
                    ]} />
                    <p className="mt-3 text-[#222222]/50">Disabling certain cookies may affect platform functionality and your experience.</p>
                  </Subclause>
                </Clause>

                {/* 9.0 Contact */}
                <Clause id="c9" number="9.0" title="Contact & Grievance Officer" delay={320}>
                  <Subclause>
                    <p>For questions, concerns, or data rights requests relating to this Privacy Protocol, please contact:</p>
                    <div
                      className="mt-5 p-5 rounded-2xl border border-[#222222]/[0.07]"
                      style={{ background: "rgba(255,255,255,0.5)" }}
                    >
                      <p className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#222222]/35 mb-3">Grievance Officer</p>
                      <p className="text-sm font-semibold text-[#222222]/80 mb-1">Forgestack Labs LLP</p>
                      <p className="text-[13px] font-light text-[#222222]/50 mb-1">Mangaluru, Karnataka, India</p>
                      <a
                        href="mailto:forgestacklabs@forgestacklabs.com"
                        className="inline-block text-[13px] font-light text-[#222222]/65 underline underline-offset-2 decoration-[#222222]/20 hover:text-[#222222] hover:decoration-[#222222]/50 transition-all duration-200 break-all"
                      >
                        forgestacklabs@forgestacklabs.com
                      </a>
                    </div>
                  </Subclause>
                </Clause>

              </div>

              {/* ── BOTTOM META ───────────────────────────────────────────── */}
              <div className="mt-12 pt-6 border-t border-[#222222]/[0.05] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <p className="text-[11px] font-light text-[#222222]/30 leading-relaxed">
                  © 2026 Forgestack Labs LLP. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <Link href="/privacy" className="text-[11px] font-medium text-[#222222]/60">
                    Privacy Protocol
                  </Link>
                  <span className="text-[#222222]/15">·</span>
                  <Link href="/terms" className="text-[11px] font-light text-[#222222]/35 hover:text-[#222222]/70 transition-colors duration-200">
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