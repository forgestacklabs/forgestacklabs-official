"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const EASE = [0.215, 0.61, 0.355, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const staggerWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const heroWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const VP = { once: false, margin: "-240px" } as const;

// ─── Hover spring configs (exact from home/products) ──────────────────────────
const cardSpring = { type: "spring", stiffness: 220, damping: 18 } as const;
const btnSpring  = { type: "spring", stiffness: 320, damping: 20 } as const;

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

type InquiryMode = "demo" | "custom";
type FormStatus = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  scale: string;
  budget: string;
  industry: string;
  country: string;
  timeline: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  scale: "",
  budget: "",
  industry: "",
  country: "",
  timeline: "",
  message: "",
};

const directLines = [
  {
    label: "Technical & Partnership Inquiries",
    value: "hello@forgestacklabs.com",

  },
  {
    label: "Client Support SLA",
    value: "hello@forgestacklabs.com",

  },
  {
    label: "Operations Hub",
    value: "Mangaluru, Karnataka. Deploying Globally.",

  },
  {
    label: "Response Standard",
    value: "Engineering assessment, not a sales pitch.",

  },
];

const supportOptions = [
  {
    title: "Client Helpdesk Login",
    copy: "Access your dedicated SLA ticketing dashboard to log issues and track resolution times.",
  },
  {
    title: "Knowledge Base & Documentation",
    copy: "Search comprehensive guides on platform mechanics, offline-sync protocols, and hardware integration.",
  },
  {
    title: "Emergency Support Protocol",
    copy: "For critical, system-halting interruptions, active clients can trigger the Priority 1 contact protocol documented in your deployment agreement.",
  },
];

const inputClass =
  "w-full rounded-2xl border border-[#121212]/10 bg-white/55 px-5 py-4 text-sm text-[#121212] shadow-inner shadow-white/40 outline-none backdrop-blur-xl transition focus:border-[#8BA888]/60 focus:bg-white/80";

const labelClass = "mb-2 block text-[10px] font-bold uppercase tracking-[0.32em] text-[#121212]/45";

export default function ContactPage() {
  const [mode, setMode] = useState<InquiryMode>("demo");
  const [formData, setFormData] = useState<FormState>(initialState);
  const [status, setStatus] = useState<FormStatus>("idle");

  const isDemo = mode === "demo";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedMode = params.get("mode");
    if (requestedMode === "custom" || requestedMode === "demo") {
      setMode(requestedMode);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModeChange = (nextMode: InquiryMode) => {
    setMode(nextMode);
    setStatus("idle");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const detailLines = isDemo
      ? ["Product demo requested."]
      : [
          `Industry: ${formData.industry || "Not specified"}`,
          `Country: ${formData.country || "Not specified"}`,
          `Timeline: ${formData.timeline || "Not specified"}`,
          `Estimated Budget Range: ${formData.budget || "Not specified"}`,
          `Technical Brief: ${formData.message}`,
        ];

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          message: detailLines.join("\n\n"),
          source: isDemo ? "Product Demo Request" : "Custom Architecture Brief",
        }),
      });

      if (!response.ok) throw new Error("Unable to submit");

      setStatus("success");
      setFormData(initialState);
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F7F5] pt-14 text-[#121212]">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute left-[-10%] top-[-15%] h-[42rem] w-[42rem] rounded-full bg-[#8BA888]/15 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-12%] h-[38rem] w-[38rem] rounded-full bg-[#D4A373]/18 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,18,18,0.08)_1px,transparent_1px)] [background-size:46px_46px] opacity-25" />
      </div>

      {/* ── Hero ── */}
      <FadeOutSection>
        <section className="relative z-10 mx-auto flex max-w-7xl flex-col justify-start px-6 pb-16 pt-32 text-center md:min-h-[66vh] md:justify-center md:py-14">
          <motion.div variants={heroWrap} initial="hidden" animate="visible" className="flex flex-col items-center">
            <motion.p variants={heroItem} className="mb-8 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888] md:text-xs inline-flex items-center justify-center gap-3">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
              </span>
              <span className="font-bold">Initiate A Deployment Or Get Support</span>
            </motion.p>
            <motion.h1 variants={heroItem} className="mx-auto max-w-5xl text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Let&apos;s Architect Your Next Scale.
            </motion.h1>
            <motion.p variants={heroItem} className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-[#121212]/60 md:text-xl">
              Whether you are looking to deploy our offline-first SaaS ecosystems, commission a highly secure custom
              architecture, or access technical support for an active deployment, our engineering team is ready.
            </motion.p>
            <motion.div variants={heroItem} className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="rounded-full border border-[#121212]/10 bg-white/55 px-5 py-2.5 text-xs font-medium">Free initial technical consultation</span>
              <span className="rounded-full border border-[#121212]/10 bg-white/55 px-5 py-2.5 text-xs font-medium">Reply within 24 hours · Proposal within 48 hours</span>
            </motion.div>
          </motion.div>
        </section>
      </FadeOutSection>

      {/* ── Direct Lines ── */}
      <FadeOutSection>
        <section className="relative z-10 px-6 pb-36">
          <motion.div
            className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4"
            variants={staggerWrap}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {directLines.map((line) => {
              const card = (
                <motion.div
                  variants={staggerItem}
                  whileHover={{
                    y: -14,
                    scale: 1.018,
                    boxShadow: "0 40px 100px rgba(18,18,18,0.22)",
                    transition: cardSpring,
                  }}
                  style={{ boxShadow: "0 18px 60px rgba(0,0,0,0.06)" }}
                  className="h-full rounded-[2rem] border border-white/70 bg-white/45 p-7 backdrop-blur-2xl transition-colors duration-300 hover:border-[#121212]/18 hover:bg-white/80"
                >
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8BA888]">{line.label}</p>
                  <p className="break-words text-lg font-medium tracking-tight text-[#121212]">{line.value}</p>
                </motion.div>
              );

              return <div key={line.label}>{card}</div>;
            })}
          </motion.div>
        </section>
      </FadeOutSection>

      {/* ── Contact Form ── */}
      <FadeOutSection>
        <section id="contact-inquiry" className="relative z-10 scroll-mt-28 px-6 pb-44 pt-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]"
          >
            {/* Left panel */}
            <motion.div
              whileHover={{
                y: -14,
                scale: 1.018,
                boxShadow: "0 40px 100px rgba(18,18,18,0.22)",
                transition: cardSpring,
              }}
              style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.08)" }}
              className="rounded-[2.5rem] border border-white/70 bg-white/45 p-9 backdrop-blur-3xl transition-colors duration-300 hover:border-[#121212]/18 hover:bg-white/80 md:p-12"
            >
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#D4A373]">
                Dual Conversion Engine
              </p>
              <h2 className="mb-6 text-4xl font-medium tracking-tight md:text-5xl">Choose the right lane.</h2>
              <p className="mb-8 text-sm leading-relaxed text-[#121212]/60 md:text-base">
                Request a technical product demo for the Forgestack ecosystem, or submit a bespoke architecture brief
                for corporate-grade software engineering.
              </p>
              <div className="grid gap-3">
                <motion.button
                  type="button"
                  onClick={() => handleModeChange("demo")}
                  whileHover={{ y: -3, scale: 1.03, transition: btnSpring }}
                  className={`rounded-full px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.25em] transition ${
                    isDemo ? "bg-[#121212] text-white" : "border border-[#121212]/10 bg-white/45 text-[#121212]/55"
                  }`}
                >
                  Request Product Demo
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => handleModeChange("custom")}
                  whileHover={{ y: -3, scale: 1.03, transition: btnSpring }}
                  className={`rounded-full px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.25em] transition ${
                    !isDemo ? "bg-[#121212] text-white" : "border border-[#121212]/10 bg-white/45 text-[#121212]/55"
                  }`}
                >
                  Commission Custom Architecture
                </motion.button>
              </div>
            </motion.div>

            {/* Right panel — form card, no lift hover since it contains inputs */}
            <div className="rounded-[2.5rem] border border-white/70 bg-white/55 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.08)] backdrop-blur-3xl md:p-12">
              <div className="mb-8 border-b border-[#121212]/10 pb-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-[#8BA888]">
                  {isDemo ? "For flagship product deployment" : "For bespoke engineering"}
                </p>
                <h2 className="text-3xl font-medium tracking-tight">
                  {isDemo ? "Request Product Demo" : "Submit Project Brief"}
                </h2>
              </div>

              {status === "success" ? (
                <div className="py-16 text-center">
                  <p className="mb-3 text-2xl font-medium tracking-tight">Inquiry received.</p>
                  <p className="mx-auto max-w-md text-sm leading-relaxed text-[#121212]/55">
                    A Forgestack engineer will review the details and respond with the right next step.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClass}>Full Name</label>
                      <input id="name" name="name" required value={formData.name} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="organization" className={labelClass}>{isDemo ? "Business Name" : "Enterprise Name"}</label>
                      <input id="organization" name="organization" required value={formData.organization} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelClass}>Email Address</label>
                      <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone Number</label>
                      <input id="phone" name="phone" required value={formData.phone} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>

                  {!isDemo && (
                    <div className="grid gap-6 md:grid-cols-3">
                      <div><label htmlFor="industry" className={labelClass}>Industry</label><input id="industry" name="industry" required value={formData.industry} onChange={handleChange} className={inputClass} /></div>
                      <div><label htmlFor="country" className={labelClass}>Country</label><input id="country" name="country" required value={formData.country} onChange={handleChange} className={inputClass} /></div>
                      <div><label htmlFor="timeline" className={labelClass}>Target Timeline</label><input id="timeline" name="timeline" required value={formData.timeline} onChange={handleChange} className={inputClass} /></div>
                    </div>
                  )}

                  {!isDemo && (
                    <div>
                      <label htmlFor="budget" className={labelClass}>Estimated Budget Range</label>
                      <input id="budget" name="budget" required value={formData.budget} onChange={handleChange} className={inputClass} />
                    </div>
                  )}

                  {!isDemo && (
                    <div>
                      <label htmlFor="message" className={labelClass}>Technical Brief / Project Scope</label>
                      <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                    </div>
                  )}

                  {status === "error" && (
                    <p className="text-sm text-red-500">Something went wrong. Please try again or email us directly.</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ y: -5, scale: 1.04, transition: btnSpring }}
                    className="rounded-full bg-[#121212] px-8 py-4 text-xs font-bold uppercase tracking-[0.35em] text-white transition hover:bg-[#121212]/85 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === "submitting" ? "Submitting..." : isDemo ? "Request Technical Demo" : "Submit Project Brief"}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </section>
      </FadeOutSection>

{/* ── Support Portal ── */}
      <FadeOutSection>
        <section className="relative z-10 px-6 pb-44 pt-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/70 bg-[#121212] p-9 text-white shadow-[0_28px_100px_rgba(0,0,0,0.18)] md:p-14"
          >
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div variants={staggerWrap} initial="hidden" whileInView="visible" viewport={VP}>
                <motion.p variants={staggerItem} className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">
                  Active Client Support Portal
                </motion.p>
                <motion.h2 variants={staggerItem} className="mb-6 text-4xl font-medium tracking-tight text-white md:text-5xl">
                  Forgestack Ecosystem Support
                </motion.h2>
                <motion.p variants={staggerItem} className="text-sm leading-relaxed text-white/60 md:text-base">
                  We guarantee high-availability support for all active ecosystem deployments. If you are a current
                  client experiencing an operational bottleneck or require technical intervention, use the secure
                  channels below.
                </motion.p>
              </motion.div>

              <motion.div
                className="grid gap-4"
                variants={staggerWrap}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
              >
                {supportOptions.map((option) => (
                  <motion.div
                    key={option.title}
                    variants={staggerItem}
                    whileHover={{
                      y: -14,
                      scale: 1.018,
                      boxShadow: "0 40px 100px rgba(0,0,0,0.35)",
                      transition: cardSpring,
                    }}
                    style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                    className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.12]"
                  >
                    <h3 className="mb-3 text-lg font-medium tracking-tight text-white">{option.title}</h3>
                    <p className="text-sm leading-relaxed text-white/60">{option.copy}</p>
                  </motion.div>
                ))}

                <motion.a
                  variants={staggerItem}
                  whileHover={{ y: -5, scale: 1.04, transition: btnSpring }}
                  href="https://mail.google.com/mail/?view=cm&to=hello@forgestacklabs.com&su=Client%20Support%20Request&body=Hi%20Forgestack%20Labs%2C%0A%0AI%20need%20support%20with%20an%20active%20deployment.%0A%0ACompany%20%2F%20Deployment%3A%0AIssue%3A%0A"
                  target="_blank"
                  className="mt-2 inline-flex w-fit rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.28em] text-[#121212] transition hover:bg-white/85"
                >
                  Access Client Support Portal
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </FadeOutSection>

      <section className="relative z-10 px-6 pb-36"><div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] border border-white/70 bg-white/50 p-8 backdrop-blur-2xl md:grid-cols-3 md:p-12"><div><p className="mb-3 text-[10px] font-bold uppercase tracking-[.35em] text-[#8BA888]">Global engagement</p><h2 className="text-3xl font-medium tracking-tight">Mangaluru based. Globally available.</h2></div><div><p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#121212]/40">Working hours</p><p className="text-sm leading-relaxed text-[#121212]/60">IST core hours with planned overlap for APAC, Middle East, Europe, and North America.</p></div><div><p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#121212]/40">Response standard</p><p className="text-sm leading-relaxed text-[#121212]/60">Initial reply within 24 hours. Qualified briefs receive a proposal or scoped next-step plan within 48 hours.</p></div></div></section>
    </main>
  );
}



