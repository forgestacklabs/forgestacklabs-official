"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

// ── Animation config ───────────────────────────────────────────────────────
const EASE = [0.215, 0.61, 0.355, 1] as const;
const VP   = { once: false, margin: "-60px" } as const;

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

// Clause card itself slides up
const clauseCard: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
};

// Clause header fades in first
const clauseHeader: Variants = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease: EASE, delay: 0.45 } },
};

// Each text block staggered after header — very slow, deliberate
const textBlockWrap: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.26, delayChildren: 0.8 } },
};

const textBlock: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
};

// Bullet items — each line drifts in one by one
const bulletWrap: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.25 } },
};

const bulletItem: Variants = {
  hidden:  { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease: EASE } },
};

// TOC items
const tocWrap: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.3 } },
};
const tocItem: Variants = {
  hidden:  { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: EASE } },
};

const cardSpring = { type: "spring", stiffness: 220, damping: 18 } as const;

// ── FadeOutSection ─────────────────────────────────────────────────────────
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

// ── Types ──────────────────────────────────────────────────────────────────
interface ClauseProps {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}
interface SubclauseProps {
  title?: string;
  children: React.ReactNode;
}
interface BulletProps {
  items: React.ReactNode[];
}

// ── TOC ────────────────────────────────────────────────────────────────────
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

// ── Primitives ─────────────────────────────────────────────────────────────
function Bullet({ items }: BulletProps) {
  return (
    <motion.ul variants={bulletWrap} className="mt-3 space-y-2.5 ml-1">
      {items.map((item, i) => (
        <motion.li key={i} variants={bulletItem} className="flex items-start gap-3">
          <span className="mt-[7px] block w-[3px] h-[3px] rounded-full bg-[#222222]/30 shrink-0" />
          <span>{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function Subclause({ title, children }: SubclauseProps) {
  return (
    <div className="mt-6 first:mt-0">
      {title && (
        <motion.p variants={textBlock} className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#222222]/50 mb-2.5">
          {title}
        </motion.p>
      )}
      <div className="text-[13px] md:text-sm font-light leading-relaxed text-[#222222]/60 space-y-3">
        {children}
      </div>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={textBlock}
      className="mt-5 px-5 py-4 rounded-2xl border border-[#222222]/[0.07]"
      style={{ background: "rgba(34,34,34,0.03)" }}
    >
      <p className="text-[12px] font-light leading-relaxed text-[#222222]/65">
        {children}
      </p>
    </motion.div>
  );
}

// ── Clause ─────────────────────────────────────────────────────────────────
function Clause({ id, number, title, children }: ClauseProps) {
  return (
    <motion.section
      id={id}
      variants={clauseCard}
      initial="hidden"
      whileInView="visible"
      viewport={VP}
      whileHover={{
        y: -6,
        scale: 1.01,
        boxShadow: "0 28px 70px rgba(18,18,18,0.10)",
        transition: cardSpring,
      }}
      className="scroll-mt-32 relative overflow-hidden rounded-[2rem] px-8 py-8 md:px-10 md:py-9"
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

      <motion.div variants={clauseHeader} className="flex items-baseline gap-4 mb-5 pb-3 border-b border-[#222222]/[0.06]">
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#222222]/22 tabular-nums shrink-0">
          {number}
        </span>
        <h2 className="text-sm md:text-base font-semibold tracking-[-0.01em] text-[#222222]">
          {title}
        </h2>
      </motion.div>

      <motion.div variants={textBlockWrap}>
        {children}
      </motion.div>
    </motion.section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function PrivacyPage() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <FadeOutSection>
          <section className="text-center pt-36 pb-16 px-6">
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
                Privacy Protocol
              </motion.h1>

              <motion.div variants={heroItem} className="flex items-center justify-center gap-4 flex-wrap">
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#222222]/35 px-3 py-1 rounded-full border border-[#222222]/10 bg-white/50">
                  Version 4.0.2
                </span>
                <span className="text-[#222222]/15">·</span>
                <span className="text-[11px] font-light text-[#222222]/30 uppercase tracking-[0.3em]">Last Updated: February 2026</span>
              </motion.div>

            </motion.div>
          </section>
        </FadeOutSection>

        {/* ── BODY ───────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">

          {/* TOC */}
          <motion.div
            className="mb-6 rounded-[2rem] border border-[#222222]/[0.05] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.50)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
            variants={tocWrap}
            initial="hidden"
            animate="visible"
          >
            <div className="px-8 py-5 border-b border-[#222222]/[0.05]">
              <motion.p variants={labelReveal} className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#222222]/40">
                Clause Index
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 px-5 pb-5 pt-3">
              {TOC_ITEMS.map((item) => (
                <motion.button key={item.id} variants={tocItem}
                  onClick={() => scrollTo(item.id)}
                  whileHover={{ x: 5, transition: cardSpring }}
                  className="text-left px-3 py-2 rounded-xl text-[11px] font-light text-[#222222]/50 hover:text-[#222222] hover:bg-black/[0.03] transition-colors duration-200">
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ── CLAUSES ────────────────────────────────────────────────────── */}
          <div className="space-y-4">

            <Clause id="c1" number="1.0" title="Introduction">
              <Subclause>
                <motion.p variants={textBlock}>
                  <strong className="font-semibold text-[#222222]/80">Forgestack Labs LLP</strong> ("Company", "we", "us", or "our") is a product-first technology company incorporated in India. We are committed to protecting the privacy, confidentiality, and security of personal and business data entrusted to us.
                </motion.p>
                <motion.p variants={textBlock} className="mt-3">
                  This Privacy Protocol governs the collection, use, storage, and disclosure of information in connection with:
                </motion.p>
                <Bullet items={[
                  <><strong className="font-medium text-[#222222]/75">Our Website:</strong> www.forgestacklabs.com</>,
                  <><strong className="font-medium text-[#222222]/75">Our Products & Platforms:</strong> Proprietary SaaS applications and software products</>,
                  <><strong className="font-medium text-[#222222]/75">Our Services:</strong> Custom software development, consulting, and related professional services</>,
                ]} />
                <motion.p variants={textBlock} className="mt-3">
                  By accessing or using our website, products, or services, you agree to the data practices described herein, in accordance with the <strong className="font-medium text-[#222222]/75">Digital Personal Data Protection Act, 2023 (DPDPA)</strong> and the <strong className="font-medium text-[#222222]/75">Information Technology Act, 2000</strong>, along with applicable rules thereunder.
                </motion.p>
              </Subclause>
            </Clause>

            <Clause id="c2" number="2.0" title="Information We Collect">
              <Subclause>
                <motion.p variants={textBlock}>We collect information based on the nature of your interaction with Forgestack Labs.</motion.p>
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

            <Clause id="c3" number="3.0" title="Purpose of Data Processing">
              <Subclause>
                <motion.p variants={textBlock}>Forgestack Labs does not sell or commercially exploit personal or business data. Information is processed strictly for the following lawful purposes:</motion.p>
                <Bullet items={[
                  <><strong className="font-medium text-[#222222]/75">Product Operation:</strong> User authentication, session management, and delivery of core software features.</>,
                  <><strong className="font-medium text-[#222222]/75">Service Fulfilment:</strong> Execution of contractual obligations, including development, deployment, and maintenance of software solutions.</>,
                  <><strong className="font-medium text-[#222222]/75">Security & Risk Management:</strong> Fraud detection, access control, monitoring, and safeguarding platform integrity.</>,
                  <><strong className="font-medium text-[#222222]/75">Communication & Support:</strong> Account notifications, service updates, billing communications, and customer support.</>,
                  <><strong className="font-medium text-[#222222]/75">Legal & Regulatory Compliance:</strong> Compliance with applicable Indian laws, tax regulations, audits, and lawful governmental requests.</>,
                ]} />
              </Subclause>
            </Clause>

            <Clause id="c4" number="4.0" title="Data Security Measures">
              <Subclause>
                <motion.p variants={textBlock}>Security is foundational to our operations. We implement reasonable, industry-accepted safeguards in line with the <strong className="font-medium text-[#222222]/75">IT (Reasonable Security Practices and Procedures) Rules, 2011</strong>.</motion.p>
                <Bullet items={[
                  <><strong className="font-medium text-[#222222]/75">Encryption in Transit:</strong> All data exchanged between user devices and our servers is secured using SSL/TLS encryption.</>,
                  <><strong className="font-medium text-[#222222]/75">Encryption at Rest:</strong> Sensitive information, including credentials and databases, is encrypted within our storage systems.</>,
                  <><strong className="font-medium text-[#222222]/75">Access Controls:</strong> Production data access is strictly limited to authorized personnel, protected by role-based permissions and Multi-Factor Authentication (MFA).</>,
                  <><strong className="font-medium text-[#222222]/75">Periodic Reviews:</strong> Regular internal assessments of data handling practices to identify and mitigate potential risks.</>,
                ]} />
              </Subclause>
            </Clause>

            <Clause id="c5" number="5.0" title="Data Sharing & Third-Party Disclosures">
              <Subclause>
                <motion.p variants={textBlock}>We disclose information only where necessary to operate our services securely and efficiently.</motion.p>
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

            <Clause id="c6" number="6.0" title="Data Retention">
              <Subclause>
                <Bullet items={[
                  <><strong className="font-medium text-[#222222]/75">Client & Contractual Data:</strong> Retained for the duration of the engagement and thereafter as required by applicable tax, accounting, or legal obligations (generally 5–8 years).</>,
                  <><strong className="font-medium text-[#222222]/75">Product & Operational Data:</strong> Retained while the account remains active. Upon termination, clients may request a data export. Operational data will be deleted from active systems within <strong className="font-medium text-[#222222]/75">60 days</strong>, subject to backup retention and legal requirements.</>,
                ]} />
              </Subclause>
            </Clause>

            <Clause id="c7" number="7.0" title="Your Rights Under DPDPA, 2023">
              <Subclause>
                <motion.p variants={textBlock}>As a Data Principal under the DPDPA, 2023, you have the right to:</motion.p>
                <Bullet items={[
                  <><strong className="font-medium text-[#222222]/75">Access:</strong> Request information about personal data processed by us.</>,
                  <><strong className="font-medium text-[#222222]/75">Correction:</strong> Request correction of inaccurate or incomplete personal data.</>,
                  <><strong className="font-medium text-[#222222]/75">Erasure:</strong> Request deletion of personal data, subject to statutory retention obligations.</>,
                  <><strong className="font-medium text-[#222222]/75">Grievance Redressal:</strong> Raise concerns regarding data protection or privacy practices.</>,
                ]} />
                <motion.p variants={textBlock} className="mt-3">Requests may be submitted using the contact details in Clause 9.0 below.</motion.p>
              </Subclause>
            </Clause>

            <Clause id="c8" number="8.0" title="Cookies & Tracking Technologies">
              <Subclause>
                <Bullet items={[
                  <><strong className="font-medium text-[#222222]/75">Essential Cookies:</strong> Required for authentication, session management, and security. These cannot be disabled without affecting platform functionality.</>,
                  <><strong className="font-medium text-[#222222]/75">Non-Essential Cookies:</strong> Analytics cookies used to evaluate aggregate usage patterns. These can be managed through your browser settings.</>,
                ]} />
                <motion.p variants={textBlock} className="mt-3 text-[#222222]/50">Disabling certain cookies may affect platform functionality and your experience.</motion.p>
              </Subclause>
            </Clause>

            <Clause id="c9" number="9.0" title="Contact & Grievance Officer">
              <Subclause>
                <motion.p variants={textBlock}>For questions, concerns, or data rights requests relating to this Privacy Protocol, please contact:</motion.p>
                <motion.div variants={textBlock}
                  className="mt-5 p-5 rounded-2xl border border-[#222222]/[0.07]"
                  style={{ background: "rgba(255,255,255,0.5)" }}>
                  <p className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#222222]/35 mb-3">Grievance Officer</p>
                  <p className="text-sm font-semibold text-[#222222]/80 mb-1">Forgestack Labs LLP</p>
                  <p className="text-[13px] font-light text-[#222222]/50 mb-1">Mangaluru, Karnataka, India</p>
                  <a 
                    className="inline-block text-[13px] font-light text-[#222222]/65 decoration-[#222222]/20 hover:text-[#222222] hover:decoration-[#222222]/50 transition-all duration-200 break-all">
                    hello@forgestacklabs.com
                  </a>
                </motion.div>
              </Subclause>
            </Clause>

          </div>

          {/* Bottom meta */}

        </div>
      </div>
    </div>
  );
}

