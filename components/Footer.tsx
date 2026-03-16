"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * GlassFooter
 * ──────────────────────────────────────────────────────────────
 * A large glass "Base Plate" footer featuring:
 *   - SOC 2 (Upcoming) status badge
 *   - Local context "Mangalore // 2026"
 *   - Operational uptime pulse
 *   - Nav columns + legal
 */

const NAV_COLS = [
  {
    heading: "Studio",
    links:   [
      { label: "About",    href: "/about"        },
      { label: "Approach", href: "/principles"     },
      { label: "Technology",href: "/technology"  },
    ],
  },
  {
    heading: "Work",
    links:   [

      { label: "Contact",      href: "/contact"      },
    ],
  },
  {
    heading: "System",
    links:   [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms",   href: "/terms" },
    ],
  },
];

const STATUSES = [
  { label: "API Gateway",    ok: true  },
  { label: "Database Layer", ok: true  },
  { label: "Edge Network",   ok: true  },
  { label: "SOC 2",          ok: false, note: "Upcoming" },
];

export default function GlassFooter() {
  return (
    <footer className="relative z-10 px-6 pb-6 pt-0">
      <div
        className="
          relative overflow-hidden
          rounded-[2.5rem]
          bg-white/38 backdrop-blur-3xl
          border border-[0.5px] border-white/60
          shadow-[0_20px_60px_rgba(0,0,0,0.09)]
          p-12 md:p-16
        "
      >
        {/* Grain texture */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]"
          style={{ mixBlendMode: "multiply" }}
        >
          <filter id="footer-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#footer-grain)" />
        </svg>

        <div className="relative z-10">
          {/* Top row */}
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-14">

            {/* Brand column */}
            <div className="flex flex-col gap-6 max-w-xs">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#121212] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white tracking-tight">FS</span>
                </div>
                <span className="text-base font-medium text-[#000000] tracking-tight">
                  Forgestack Labs
                </span>
              </div>

              <p className="text-sm font-normal leading-relaxed text-[#121212]/50">
                A founder-led engineering lab. We build precise, durable software systems for partners
                who demand correctness over speed.
              </p>

              {/* Location context */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span
                  className="text-[9px] uppercase tracking-[0.5em] font-semibold text-[#121212]/35"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  Mangalore // 2026
                </span>
              </div>
            </div>

            {/* Nav columns */}
            <div className="grid grid-cols-3 gap-10 md:gap-16">
              {NAV_COLS.map(col => (
                <div key={col.heading} className="flex flex-col gap-4">
                  <p className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#8BA888]">
                    {col.heading}
                  </p>
                  {col.links.map(link => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm font-normal text-[#121212]/50 hover:text-[#000000] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            {/* System status column */}
            <div className="flex flex-col gap-4 min-w-[200px]">
              <p className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#8BA888]">
                System Status
              </p>
              {STATUSES.map(s => (
                <div key={s.label} className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-normal text-[#121212]/55">{s.label}</span>
                  <div className="flex items-center gap-1.5">
                    {s.ok ? (
                      <>
                        <span className="relative flex h-[5px] w-[5px]">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-60" />
                          <span className="relative inline-flex rounded-full h-[5px] w-[5px] bg-[#10B981]" />
                        </span>
                        <span className="text-[8px] uppercase tracking-[0.4em] font-semibold text-[#10B981]">
                          Live
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="w-[5px] h-[5px] rounded-full bg-[#D4A373]" />
                        <span className="text-[8px] uppercase tracking-[0.4em] font-semibold text-[#D4A373]">
                          {s.note}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* SOC 2 badge */}
              <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#D4A373]/8 border border-[#D4A373]/20">
                <div className="w-6 h-6 rounded-lg bg-[#D4A373]/15 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-[#D4A373]">S2</span>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#D4A373] uppercase tracking-wider">SOC 2</p>
                  <p className="text-[8px] text-[#121212]/35 uppercase tracking-wider">Roadmap 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hairline */}
          <div className="w-full h-[0.5px] bg-[#121212]/6 mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="text-[9px] text-[#121212]/30 uppercase tracking-[0.4em]"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              © 2026 Forgestack Labs Pvt. Ltd. · All Rights Reserved
            </p>

            <div className="flex items-center gap-6">
              <a
                href="mailto:forgestacklabs@forgestacklabs.com"
                className="text-[10px] text-[#121212]/40 hover:text-[#000000] transition-colors uppercase tracking-widest font-medium"
              >
                forgestacklabs@forgestacklabs.com
              </a>
            </div>

            <p
              className="text-[9px] text-[#121212]/20 uppercase tracking-[0.5em]"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              [ BUILT BY THE UNIT ]
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}