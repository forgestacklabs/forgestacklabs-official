"use client";

import { useState, useEffect, useRef } from "react";

const initialState = {
  nameOrg: "",
  workEmail: "",
  challenge: "",
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function PartnershipsPage() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // ── Digital Forge node-link background ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const NODE_COUNT = 52;
    const MAX_DIST = 155;

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.1;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,34,34,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34,34,34,0.15)";
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData(initialState);
    } catch {
      setStatus("error");
    }
  };

  // ── fadeUp helper ────────────────────────────────────────────────────────────
  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0px)" : "translateY(24px)",
    transition: `opacity 700ms ease ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  const inputClass =
    "w-full rounded-2xl border border-black/[0.07] bg-white/50 backdrop-blur-sm px-5 py-3.5 text-sm font-light text-[#222222] placeholder:text-[#222222]/40 transition-all duration-300 focus:border-black/20 focus:bg-white/80 focus:outline-none focus:ring-0";

  const labelClass =
    "block text-[10px] uppercase tracking-[0.35em] font-medium text-[#222222]/70 mb-2.5";

  return (
    <div className="relative min-h-screen bg-[#F7F7F5] overflow-x-hidden">
      {/* Node-link canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div
          className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(210,210,205,0.45) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute bottom-[-15%] right-[-10%] w-[48vw] h-[48vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(205,205,200,0.35) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 2 }}>
        <div className="mx-auto max-w-2xl px-6 py-24 md:py-32">

          {/* ── HERO ──────────────────────────────────────────────────────── */}
          <div className="mb-14 text-center">
            <div
              style={fadeUp(0)}
              className="inline-flex items-center gap-2.5 mb-8 px-4 py-1.5 rounded-full border border-black/[0.06] bg-white/60 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#222222]/40 inline-block" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#222222]/35">
                Forgestack Labs
              </span>
            </div>

            <h1
              style={{
                ...fadeUp(80),
                fontFamily: "'Georgia', 'Times New Roman', serif",
              }}
              className="text-4xl md:text-6xl font-extralight tracking-[-0.03em] leading-[1.08] text-[#222222] mb-6"
            >
              Propose a<br />
              <em>Partnership.</em>
            </h1>

            <p
              style={fadeUp(160)}
              className="text-sm md:text-base font-light text-[#222222]/70 leading-relaxed max-w-md mx-auto"
            >
              Every great system begins with a conversation. We don&apos;t
              provide quotes; we provide architectural solutions.
            </p>
          </div>

          {/* ── FORM CARD ─────────────────────────────────────────────────── */}
          <div
            style={{
              ...fadeUp(260),
              background: "rgba(255,255,255,0.40)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: "2.5rem",
              border: "1px solid rgba(255,255,255,0.50)",
              boxShadow:
                "0 1px 2px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.85)",
            }}
            className="p-12"
          >
            {status === "success" ? (
              /* ── SUCCESS STATE ────────────────────────────────────────── */
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div
                  className="w-12 h-12 rounded-full border border-black/10 bg-white/80 flex items-center justify-center mb-8"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4.5 10.5L8.5 14.5L16 7"
                      stroke="#222222"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  className="text-2xl font-extralight tracking-[-0.02em] text-[#222222] mb-4"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Inquiry Logged.
                </h2>
                <p className="text-sm font-light text-[#222222]/60 leading-relaxed max-w-sm">
                  A founder will review your challenge and reach out to schedule
                  a deep-dive meeting.
                </p>
              </div>
            ) : (
              /* ── FORM ─────────────────────────────────────────────────── */
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section label */}
                <div className="pb-2 border-b border-black/[0.05]">
                  <p className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#222222]/50">
                    Lead Intake — {new Date().getFullYear()}
                  </p>
                </div>

                {/* Name & Organization */}
                <div>
                  <label htmlFor="nameOrg" className={labelClass}>
                    Who are we speaking with?
                  </label>
                  <input
                    id="nameOrg"
                    name="nameOrg"
                    required
                    placeholder="Full name & organization"
                    value={formData.nameOrg}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* Work Email */}
                <div>
                  <label htmlFor="workEmail" className={labelClass}>
                    Where should we send the invitation?
                  </label>
                  <input
                    id="workEmail"
                    name="workEmail"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.workEmail}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* The Challenge */}
                <div>
                  <label htmlFor="challenge" className={labelClass}>
                    The Technical Challenge
                  </label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    required
                    rows={5}
                    placeholder="Describe the bottleneck or vision you are facing. Be as detailed as possible."
                    value={formData.challenge}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Error */}
                {status === "error" && (
                  <p className="text-[11px] font-light text-red-400/80 tracking-wide -mt-2">
                    Something went wrong. Please try again.
                  </p>
                )}

                {/* CTA */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-full py-4 text-xs uppercase tracking-[0.4em] font-medium text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.97]"
                  style={{
                    background: "#222222",
                    boxShadow: "0 4px 20px rgba(34,34,34,0.16)",
                  }}
                >
                  {status === "submitting"
                    ? "Submitting…"
                    : "Request Architectural Consultation"}
                </button>
              </form>
            )}
          </div>

          {/* ── THE PROMISE ───────────────────────────────────────────────── */}
          <div style={fadeUp(420)} className="mt-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#222222]/10" />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle
                  cx="6"
                  cy="6"
                  r="5.25"
                  stroke="#222222"
                  strokeOpacity="0.15"
                  strokeWidth="0.75"
                />
                <circle cx="6" cy="6" r="1.75" fill="#222222" fillOpacity="0.2" />
              </svg>
              <div className="w-8 h-[1px] bg-[#222222]/10" />
            </div>
            <p className="text-xs font-light text-[#222222]/50 tracking-wide mb-1.5">
              Direct Founder Response within{" "}
              <span className="text-[#222222]/70">48 hours.</span>
            </p>
            <p className="text-[11px] font-light text-[#222222]/35 tracking-wide">
              Committed to SOC 2 and GDPR standards of data privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}