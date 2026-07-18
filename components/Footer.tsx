"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_COLS = [
  {
    heading: "Navigate",
    links: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "The Lab", href: "/about" },
      { label: "Career", href: "/careers" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    heading: "Support",
    links: [{ label: "Contact & Support", href: "/contact" }],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  {
    heading: "Authority",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Industries", href: "/industries" },
      { label: "Engineering", href: "/engineering" },
      { label: "Manifesto", href: "/manifesto" },
      { label: "Research", href: "/research" },
      { label: "Technologies", href: "/technologies" },
      { label: "Insights", href: "/insights" },
      { label: "Book", href: "/book" },
    ],
  },
];

export default function GlassFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/forgeos")) return null;

  return (
    <footer className="relative z-10 bg-[#F7F7F5] px-6 pb-6 pt-0">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/62 p-12 shadow-[0_20px_60px_rgba(0,0,0,0.09)] backdrop-blur-3xl md:p-16">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
          style={{ mixBlendMode: "multiply" }}
        >
          <filter id="footer-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#footer-grain)" />
        </svg>

        <div className="relative z-10">
          <div className="mb-14 flex flex-col justify-between gap-12 md:flex-row">
            <div className="flex max-w-sm flex-col gap-6">
              <span className="text-base font-medium tracking-tight text-[#000000]">Forgestack Labs</span>

              <p className="text-sm font-normal leading-relaxed text-[#121212]">
                A founder-led engineering lab. We build precise, durable software systems for partners who demand correctness over speed.
              </p>

              <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
                <div className="inline-flex shrink-0 items-center justify-center rounded-2xl border border-[#121212]/10 bg-white/40 px-3.5 py-2.5">
                  <Image
                    src="/gov-login-img.png"
                    alt="DPIIT Recognized"
                    width={260}
                    height={80}
                    className="h-10 w-auto object-contain"
                  />
                </div>

                <a
                  href="https://www.goodfirms.co/company/forgestack-labs-llp"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Forgestack Labs GoodFirms profile"
                  className="group inline-flex shrink-0 items-center gap-3 rounded-2xl border border-[#121212]/10 bg-white/40 px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#8BA888]/50 hover:bg-white/75 hover:shadow-[0_18px_42px_rgba(18,18,18,0.12)]"
                >
                  <Image
                    src="/goodfirms_logo.png"
                    alt="GoodFirms"
                    width={800}
                    height={800}
                    className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#121212] transition-colors duration-300 group-hover:text-[#8BA888]">
                    GoodFirms
                  </span>
                </a>
                <a
                  href="https://www.crunchbase.com/organization/forgestack-labs-llp"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Forgestack Labs Crunchbase profile"
                  className="group inline-flex shrink-0 items-center gap-3 rounded-2xl border border-[#121212]/10 bg-white/40 px-4 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#8BA888]/50 hover:bg-white/75 hover:shadow-[0_18px_42px_rgba(18,18,18,0.12)]"
                >
                  <Image
                    src="/crunbase_logo.jpg"
                    alt="Crunchbase"
                    width={220}
                    height={80}
                    className="h-9 w-auto object-contain"
                  />
                  <div className="text-left">
                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#121212]/55 transition-colors duration-300 group-hover:text-[#8BA888]">
                      Profile Listing
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#121212]">Listed on Crunchbase</p>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                <span
                  className="text-[9px] font-semibold uppercase tracking-[0.5em] text-[#121212]"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  Mangaluru 
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-12">
              {NAV_COLS.map((col) => (
                <div key={col.heading} className="flex flex-col gap-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#8BA888]">{col.heading}</p>
                  {col.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="group/link relative w-fit text-sm font-normal text-[#121212] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#8BA888] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#8BA888] after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 h-px w-full bg-[#121212]/6" />

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-1 md:items-start">
              <p
                className="text-[9px] uppercase font-bold tracking-[0.32em] text-[#121212]"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
               Company Founded on :Jan 14th 2026
              </p>
              <p
                className="text-[9px] uppercase tracking-[0.4em] text-[#121212]"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                &copy; 2026 Forgestack Labs LLP &middot; All Rights Reserved
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a className="relative text-[10px] font-medium uppercase tracking-widest text-[#121212]">
                hello@forgestacklabs.com
              </a>
              <a
                href="https://www.linkedin.com/company/forgestack-labs-llp/"
                target="_blank"
                rel="noreferrer"
                aria-label="Forgestack Labs on LinkedIn"
                title="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              >
                <Image
                  src="/linked_in.png"
                  alt="LinkedIn"
                  width={256}
                  height={256}
                  className="h-8 w-8 object-contain mix-blend-multiply"
                />
              </a>
              <a
                href="https://github.com/forgestacklabs"
                target="_blank"
                rel="noreferrer"
                aria-label="Forgestack Labs on GitHub"
                title="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              >
                <Image
                  src="/github_logo.png"
                  alt="GitHub"
                  width={256}
                  height={256}
                  className="h-8 w-8 object-contain mix-blend-multiply"
                />
              </a>
            </div>

            <p
              className="text-[9px] uppercase font-bold tracking-[0.5em] text-[#121212]"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              [ Built By The Unit ]
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
