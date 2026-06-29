"use client";


import { motion, Variants } from "framer-motion";

const EASE = [0.215, 0.61, 0.355, 1] as const;

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const staggerWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: EASE },
  },
};

const heroWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Eyebrow label slides from left
const labelReveal: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

// Dark panel slides up as a unit
const panelReveal: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: EASE },
  },
};

// ─── Hover spring configs (same as About page) ────────────────────────────────
const cardSpring = { type: "spring", stiffness: 220, damping: 18 } as const;
const btnSpring  = { type: "spring", stiffness: 320, damping: 20 } as const;

const VP = { once: false, margin: "-240px" } as const;

// ─── Data ─────────────────────────────────────────────────────────────────────
const standards = [
  {
    title: "Mandatory In-Office Presence",
    copy: "Elite collaboration happens in the room. We operate directly from our Mangaluru engineering hub.",
  },
  {
    title: "Corporate-Grade Protocols",
    copy: "Engineers work with CI/CD pipelines, containerized deployments, and rigorous backend load-testing.",
  },
  {
    title: "Design-First Execution",
    copy: "Performance never compromises aesthetics. We merge heavy-duty logic with fluid, glassmorphic interfaces.",
  },
];

const futureTracks = [
  "Backend Systems Engineering",
  "Frontend UI/UX Architecture",
  "Product Engineering Internships",
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CareersPage() {
  const glass =
    "relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.09)] backdrop-blur-3xl ";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F7F5] text-[#121212]">

      {/* Background blobs — fade in on load */}
      <motion.div
        className="pointer-events-none fixed inset-0 opacity-70"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute left-[-12%] top-[-16%] h-[44rem] w-[44rem] rounded-full bg-[#8BA888]/14 blur-[120px]" />
        <div className="absolute bottom-[-18%] right-[-12%] h-[38rem] w-[38rem] rounded-full bg-[#D4A373]/16 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,18,18,0.08)_1px,transparent_1px)] [background-size:44px_44px] opacity-20" />
      </motion.div>

      {/* ── Hero ── */}
        <section className="mx-auto flex max-w-7xl flex-col items-center justify-start px-6 pb-16 pt-32 text-center md:min-h-screen md:justify-center md:py-14">
          <motion.div variants={heroWrap} initial="hidden" animate="visible" className="flex flex-col items-center">

            <motion.p variants={heroItem} className="mb-8 text-[10px] font-bold uppercase tracking-[0.5em] text-[#8BA888] md:text-xs inline-flex items-center justify-center gap-3">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
              </span>
              <span className="font-bold">Join The Deployment</span>
            </motion.p>

            <motion.h1 variants={heroItem} className="mx-auto max-w-5xl text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Code with Discipline. Build for Scale.
            </motion.h1>

            <motion.p variants={heroItem} className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-[#121212]/60 md:text-xl">
              Forgestack Labs is not a playground. We are a DPIIT-recognized product company engineering mission-critical software. We are looking for disciplined architects, engineers, and interns who respect the craft.
            </motion.p>

          </motion.div>

        </section>

      {/* ── Who We Hire ── */}
        <section className="px-6 py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">

            {/* Left card */}
            <motion.div
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.09)" }}
              className={`${glass} p-9 md:p-12`}
            >
              <motion.p
                variants={labelReveal}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
                className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#D4A373]"
              >
                Who We Hire
              </motion.p>
              <h2 className="mb-6 text-4xl font-medium tracking-tight md:text-5xl">The Anti-Agency Reality</h2>
              <p className="text-sm leading-relaxed text-[#121212]/60 md:text-base">
                We completely reject the vibe coder mentality. We do not outsource, and we do not compromise on technical debt. Working at Forgestack Labs means strict branching models, mandatory peer code reviews, and absolute professional accountability under our IIT-rooted leadership team.
              </p>
            </motion.div>

            {/* Right standard cards */}
            <motion.div
              className="grid gap-4 md:grid-cols-3"
              variants={staggerWrap}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              {standards.map((item) => (
                <motion.div
                  key={item.title}
                  variants={cardReveal}
                  whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.09)" }}
                  className={`${glass} p-7`}
                >
                  <motion.p variants={labelReveal} className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8BA888]">
                    The Forgestack Standard
                  </motion.p>
                  <h3 className="mb-4 text-xl font-medium tracking-tight">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#121212]/55">{item.copy}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

      {/* ── No Active Positions ── */}
        <section className="px-6 py-28">
          <motion.div
            variants={cardReveal}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="mx-auto max-w-7xl"
          >
            <motion.div
              whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.09)" }}
              className={`${glass} p-9 text-center md:p-14`}
            >
              <motion.p
                variants={labelReveal}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
                className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]"
              >
                Open Roles
              </motion.p>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
                className="mb-6 text-4xl font-medium tracking-tight md:text-5xl"
              >
                No Active Positions Currently
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
                className="mx-auto max-w-2xl text-sm leading-relaxed text-[#121212]/60 md:text-base"
              >
                We are not hiring for full-time engineering roles or internships at the moment. Future openings will appear here when a hiring cycle starts.
              </motion.p>
            </motion.div>
          </motion.div>
        </section>

      {/* ── Future Hiring Tracks ── */}
        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={panelReveal}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="relative overflow-hidden rounded-[2.5rem] p-9 text-white shadow-[0_28px_100px_rgba(0,0,0,0.18)] md:p-14"
              style={{ background: "linear-gradient(135deg, #1a1e2a 0%, #141722 100%)" }}
            >
              {/* Ambient glows */}
              <div
                className="pointer-events-none absolute left-1/4 top-0 h-80 w-80 rounded-full blur-[100px] opacity-25"
                style={{ background: "radial-gradient(circle, #8BA888 0%, transparent 70%)" }}
              />
              <div
                className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full blur-[90px] opacity-20"
                style={{ background: "radial-gradient(circle, #D4A373 0%, transparent 70%)" }}
              />

              <div className="relative z-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

                {/* Left copy */}
                <motion.div
                  variants={staggerWrap}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VP}
                >
                  <motion.p variants={labelReveal} className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8BA888]">
                    Future Hiring Tracks
                  </motion.p>
                  <motion.h2 variants={fadeUp} className="mb-6 text-4xl font-medium tracking-tight text-white md:text-5xl">
                    Keep an eye on the forge.
                  </motion.h2>
                  <motion.p variants={fadeUp} className="text-sm leading-relaxed text-white/60 md:text-base">
                    When we open hiring, we look for people who can handle production discipline, technical ownership, and high-accountability engineering work.
                  </motion.p>
                </motion.div>

                {/* Right track cards */}
                <motion.div
                  className="grid gap-4"
                  variants={staggerWrap}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VP}
                >
                  {futureTracks.map((track) => (
                    <motion.div
                      key={track}
                      variants={cardReveal}
                      whileHover={{ y: -14, scale: 1.018, boxShadow: "0 40px 100px rgba(18,18,18,0.22)", transition: cardSpring }}
                      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                      className="rounded-[1.75rem] border border-white/15 bg-white/[0.09] p-6 backdrop-blur-xl"
                    >
                      <h3 className="text-lg font-medium tracking-tight text-white">{track}</h3>
                    </motion.div>
                  ))}
                  <motion.div variants={staggerItem}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.04, transition: btnSpring }}
                      className="inline-block"
                    >
                      <a
                        href="https://mail.google.com/mail/?view=cm&to=hello@forgestacklabs.com&su=Future%20Career%20Interest&body=Hi%20Forgestack%20Labs%2C%0A%0AI%20am%20interested%20in%20future%20opportunities%20at%20your%20company."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 w-fit rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.28em] text-[#121212] transition hover:bg-white/85 inline-block"
                      >
                        Send Future Interest
                      </a>
                    </motion.div>
                  </motion.div>
                  <motion.p variants={fadeUp} className="text-xs text-white/45">
                    Opens email compose to hello@forgestacklabs.com
                  </motion.p>
                </motion.div>

              </div>
            </motion.div>
          </div>
        </section>

    

    </main>
  );
}
