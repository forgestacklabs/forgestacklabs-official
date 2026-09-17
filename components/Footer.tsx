"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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

  // Clutch widget initialization
  useEffect(() => {
    const initClutch = () => {
      if ((window as any).CLUTCHCO) {
        (window as any).CLUTCHCO.Init();
      }
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://widget.clutch.co/static/js/widget.js"]'
    );

    if (existingScript) {
      initClutch();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://widget.clutch.co/static/js/widget.js";
    script.async = true;

    script.onload = () => {
      initClutch();
    };

    script.onerror = () => {
      console.error("Failed to load Clutch widget script.");
    };

    document.body.appendChild(script);
  }, []);

  if (pathname.startsWith("/forgeos")) return null;

  return (
    <footer className="relative z-10 bg-[#F7F7F5] px-3 pb-3 pt-0 sm:px-6 sm:pb-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/62 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.09)] backdrop-blur-3xl sm:p-8 md:rounded-[2.5rem] md:p-16">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
          style={{ mixBlendMode: "multiply" }}
        >
          <filter id="footer-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>

          <rect
            width="100%"
            height="100%"
            filter="url(#footer-grain)"
          />
        </svg>

        <div className="relative z-10">
          {/* TOP SECTION */}
          <div className="mb-10 flex flex-col justify-between gap-10 md:mb-14 md:flex-row md:gap-12">

            {/* COMPANY INFO */}
            <div className="flex max-w-sm flex-col gap-6">
              <span className="text-base font-medium tracking-tight text-black">
                Forgestack Labs
              </span>

              <p className="text-sm font-normal leading-relaxed text-[#121212]">
                A founder-led engineering lab. We build precise, durable
                software systems for partners who demand correctness over
                speed.
              </p>

              {/* RECOGNITIONS */}
              <div className="flex flex-col items-start gap-3">
                <div className="grid w-full grid-cols-2 items-stretch gap-3">
                  <div className="flex min-h-[62px] min-w-0 items-center justify-center rounded-2xl border border-[#121212]/10 bg-white/40 px-3.5 py-2.5">
                    <Image
                      src="/gov-login-img.png"
                      alt="DPIIT Recognized"
                      width={260}
                      height={80}
                      className="h-10 w-auto max-w-full object-contain"
                    />
                  </div>

                  <div className="flex min-h-[62px] min-w-0 items-center justify-center rounded-2xl border border-[#121212]/10 bg-white/40 px-3.5 py-2.5">
                    <Image
                      src="/startup_kar.png"
                      alt="Startup Karnataka"
                      width={588}
                      height={141}
                      className="h-10 w-auto max-w-full object-contain"
                    />
                  </div>
                </div>

                {/* COMPANY PROFILE LINKS */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href="https://www.goodfirms.co/company/forgestack-labs-llp"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Forgestack Labs GoodFirms profile"
                    className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#121212]/10 bg-white/35 p-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8BA888]/50 hover:bg-white/70"
                  >
                    <Image
                      src="/goodfirms_logo.png"
                      alt="GoodFirms"
                      width={800}
                      height={800}
                      className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </a>

                  <a
                    href="https://www.crunchbase.com/organization/forgestack-labs-llp"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Forgestack Labs Crunchbase profile"
                    className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#121212]/10 bg-white/35 p-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8BA888]/50 hover:bg-white/70"
                  >
                    <Image
                      src="/crunbase_logo.jpg"
                      alt="Crunchbase"
                      width={220}
                      height={80}
                      className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </a>

                  <a
                    href="https://techbehemoths.com/company/forgestack-labs-llp"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Forgestack Labs Tech Behemoths profile"
                    className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#121212]/10 bg-white/35 p-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8BA888]/50 hover:bg-white/70"
                  >
                    <Image
                      src="/TB-logo-only.svg"
                      alt="Tech Behemoths"
                      width={220}
                      height={80}
                      className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </a>

                  <a
                    href="https://tracxn.com/d/legal-entities/india/forgestack-labs-llp/__WRxqjSfXmCnA7PbUfFNvlD3kIUymGCKAhOGmfKIaaQM"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Forgestack Labs Tracxn profile"
                    className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#121212]/10 bg-white/35 p-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8BA888]/50 hover:bg-white/70"
                  >
                    <Image
                      src="/tracxn-logo-only.svg"
                      alt="Tracxn"
                      width={100}
                      height={22}
                      className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </a>

                  <a
                    href="https://www.sensibook.com/companies/3895054/ACU-3315/FORGESTACK-LABS-LLP"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Forgestack Labs SensiBook profile"
                    className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#121212]/10 bg-white/35 p-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8BA888]/50 hover:bg-white/70"
                  >
                    <Image
                      src="/sensibook_logo.png"
                      alt="SensiBook"
                      width={100}
                      height={22}
                      className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </a>

                  {/* CLUTCH */}
                  <div
                    aria-label="Forgestack Labs Clutch profile"
                    title="Clutch"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#121212]/10 bg-white/35 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8BA888]/50 hover:bg-white/70"
                  >
                    <div
                      className="clutch-widget h-20 w-20 shrink-0 translate-x-[2px] -translate-y-[22px] overflow-hidden"
                      data-url="https://widget.clutch.co"
                      data-widget-type="10"
                      data-height="auto"
                      data-nofollow="false"
                      data-expandifr="true"
                      data-shape="round"
                      data-scale="100"
                      data-clutchcompany-id="2682759"
                    />
                  </div>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />

                <span
                  className="text-[9px] font-semibold uppercase tracking-[0.5em] text-[#121212]"
                  style={{
                    fontFamily: "'Courier New', monospace",
                  }}
                >
                  Mangaluru
                </span>
              </div>
            </div>

            {/* NAVIGATION */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 md:grid-cols-4 md:gap-12">
              {NAV_COLS.map((col) => (
                <div
                  key={col.heading}
                  className="flex min-w-0 flex-col gap-4"
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#8BA888]">
                    {col.heading}
                  </p>

                  {col.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="group/link relative w-fit text-sm font-normal text-[#121212] transition-all duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#8BA888] after:transition-all after:duration-300 hover:-translate-y-0.5 hover:text-[#8BA888] hover:after:w-full"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* DIVIDER */}
          <div className="mb-8 h-px w-full bg-[#121212]/6" />

          {/* BOTTOM */}
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:gap-4">

            {/* COPYRIGHT */}
            <div className="flex w-full flex-col items-center gap-1 md:w-auto md:items-start">
              <p
                className="text-center text-[9px] font-bold uppercase leading-relaxed tracking-[0.16em] text-[#121212] sm:tracking-[0.28em] md:text-left md:tracking-[0.32em]"
                style={{
                  fontFamily: "'Courier New', monospace",
                }}
              >
                Company Founded on : Jan 14th 2026
              </p>

              <p
                className="text-center text-[9px] uppercase leading-relaxed tracking-[0.14em] text-[#121212] sm:tracking-[0.25em] md:text-left md:tracking-[0.4em]"
                style={{
                  fontFamily: "'Courier New', monospace",
                }}
              >
                &copy; 2026 Forgestack Labs LLP &middot; All Rights Reserved
              </p>
            </div>

            {/* EMAIL + SOCIAL */}
            <div className="flex w-full flex-wrap items-center justify-center gap-3 md:w-auto md:flex-nowrap md:justify-start md:gap-4">
              <a
                href="mailto:hello@forgestacklabs.com"
                className="w-full text-center text-[10px] font-medium uppercase tracking-wider text-[#121212] transition-colors duration-300 hover:text-[#8BA888] sm:w-auto"
              >
                hello@forgestacklabs.com
              </a>

              <a
                href="https://www.linkedin.com/company/forgestack-labs-llp/"
                target="_blank"
                rel="noreferrer"
                aria-label="Forgestack Labs on LinkedIn"
                title="LinkedIn"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
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
                href="https://www.instagram.com/forgestacklabs/"
                target="_blank"
                rel="noreferrer"
                aria-label="Forgestack Labs on Instagram"
                title="Instagram"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              >
                <Image
                  src="/Instagram_icon.png"
                  alt="Instagram"
                  width={256}
                  height={256}
                  className="h-8 w-8 object-contain mix-blend-multiply"
                />
              </a>

              <a
                href="https://www.youtube.com/@ForgestackLabs"
                target="_blank"
                rel="noreferrer"
                aria-label="Forgestack Labs on YouTube"
                title="YouTube"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              >
                <Image
                  src="/youtube_logo.png"
                  alt="YouTube"
                  width={256}
                  height={256}
                  className="h-10 w-10 object-contain mix-blend-multiply"
                />
              </a>

              <a
                href="https://github.com/forgestacklabs"
                target="_blank"
                rel="noreferrer"
                aria-label="Forgestack Labs on GitHub"
                title="GitHub"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
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

            {/* BUILT BY */}
            <p
              className="text-center text-[9px] font-bold uppercase tracking-[0.35em] text-[#121212] sm:tracking-[0.5em]"
              style={{
                fontFamily: "'Courier New', monospace",
              }}
            >
              [ Built By The Unit ]
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}