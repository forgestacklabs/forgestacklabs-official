"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/",              label: "Home" },
  { href: "/products",   label: "Products" },
  { href: "/about",        label: "The Lab" },
  { href: "/careers",      label: "Career" },
  { href: "/resources",   label: "Resources" },
];

export default function Navbar() {
  const pathname      = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // â”€â”€ Scroll detection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(media.matches);

    onChange();
    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, []);

  // â”€â”€ Lock body scroll when mobile menu is open â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  const compact = scrolled && isDesktop;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none"
      >
        <div
          className="pointer-events-auto w-full transition-all duration-700 ease-in-out px-4 sm:px-6"
          style={{
            paddingTop: compact ? "12px" : "16px",
            maxWidth: compact ? "960px" : "100%",
          }}
        >
          <motion.div
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-between px-5 md:px-7 py-3.5 transition-all duration-700 ease-in-out"
            style={{
              background: compact
                ? "rgba(255,255,255,0.55)"
                : "rgba(255,255,255,0.30)",
              backdropFilter: compact ? "blur(20px)" : "blur(8px)",
              WebkitBackdropFilter: compact ? "blur(20px)" : "blur(8px)",
              borderRadius: compact ? "9999px" : "1.5rem",
              border: compact
                ? "0.5px solid rgba(255,255,255,0.60)"
                : "0.5px solid rgba(255,255,255,0.35)",
              borderTop: "0.5px solid rgba(255,255,255,0.80)",
              borderLeft: "0.5px solid rgba(255,255,255,0.80)",
              marginLeft: compact ? "70px" : "0px",
              transitionProperty: "background, backdrop-filter, border-radius, border-color, box-shadow",
              boxShadow: compact
                ? "0 8px 32px rgba(0,0,0,0.04), 0 1px 0 rgba(255,255,255,0.8) inset"
                : "0 4px 16px rgba(0,0,0,0.02)",
            }}
            whileHover={{
              boxShadow: "0 20px 40px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.8) inset",
              scale: 1.005,
            }}
          >
            {/* â”€â”€ BRAND â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <Link
              href="/"
              className="flex items-center gap-1.5 group transition-all duration-700"
              aria-label="ForgeStack Labs home"
            >
              <Image
                src="/logo.png"
                alt="ForgeStack Labs"
                width={1536}
                height={1024}
                priority
                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
              {!compact && (
                <span className="hidden text-sm font-semibold tracking-tight text-[#222222] transition-colors duration-300 group-hover:text-[#8BA888] sm:inline">
                  ForgeStack Labs
                </span>
              )}
            </Link>

            {/* â”€â”€ DESKTOP NAV â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 md:flex items-center gap-0"
              style={{ left: compact ? "calc(50% - 35px)" : "50%" }}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  className="relative px-3.5 py-2 text-[12px] font-medium tracking-wide transition-colors duration-200 z-10"
                  style={{
                    color: isActive(link.href)
                      ? "#222222"
                      : hoveredLink === link.href
                      ? "#222222"
                      : "rgba(34,34,34,0.50)",
                  }}
                >
                  {/* Magnetic capsule */}
                  <AnimatePresence>
                    {hoveredLink === link.href && (
                      <motion.span
                        layoutId="nav-capsule"
                        className="absolute inset-0 rounded-full bg-black/[0.05]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Active underline dot */}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#222222]/40"
                    />
                  )}

                  {link.label}
                </Link>
              ))}
            </nav>

            {/* â”€â”€ CTA + HAMBURGER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <div className="flex items-center gap-3">
              {/* CTA â€” desktop only */}
              <motion.div className="hidden md:block" whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.3em] text-white transition-all duration-300"
                  style={{
                    background: "#222222",
                    borderRadius: "9999px",
                    padding: "9px 20px",
                    boxShadow: "0 2px 8px rgba(34,34,34,0.12)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 0 20px rgba(0,0,0,0.15), 0 4px 12px rgba(34,34,34,0.2)";
                    (e.currentTarget as HTMLAnchorElement).style.transform =
                      "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 2px 8px rgba(34,34,34,0.12)";
                    (e.currentTarget as HTMLAnchorElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  Contact & Support
                </Link>
              </motion.div>

              {/* Hamburger â€” mobile only */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] rounded-full bg-black/[0.05] hover:bg-black/10 transition-colors"
                aria-label="Toggle menu"
              >
                <span
                  className={`block h-[1.5px] w-4 bg-[#222222]/70 rounded-full transition-all duration-300 origin-center ${
                    isMenuOpen ? "rotate-45 translate-y-[6.5px]" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-4 bg-[#222222]/70 rounded-full transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-4 bg-[#222222]/70 rounded-full transition-all duration-300 origin-center ${
                    isMenuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
                  }`}
                />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* â”€â”€ MOBILE SIDEBAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 right-0 h-full w-72 flex flex-col"
              style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                borderLeft: "0.5px solid rgba(255,255,255,0.60)",
                boxShadow: "-20px 0 60px rgba(0,0,0,0.06)",
              }}
            >
              {/* Sidebar header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#222222]/[0.06]">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="/logo.png"
                    alt="ForgeStack Labs"
                    width={1536}
                    height={1024}
                    priority
                    className="h-8 w-auto object-contain"
                  />
                </Link>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center w-7 h-7 rounded-full bg-black/[0.05] hover:bg-black/10 transition-colors"
                  aria-label="Close menu"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 1L9 9M9 1L1 9" stroke="#222222" strokeOpacity="0.6" strokeWidth="1.25" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-4 py-6 gap-1 flex-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`group flex items-center gap-3 py-3 px-3 rounded-2xl transition-all duration-200 ${
                        isActive(link.href) ? "bg-black/[0.04]" : "hover:bg-black/[0.03]"
                      }`}
                    >
                      <span
                        className={`block w-[2px] h-4 rounded-full transition-all duration-300 ${
                          isActive(link.href)
                            ? "bg-[#222222]/50"
                            : "bg-black/10 group-hover:bg-black/25"
                        }`}
                      />
                      <span
                        className={`text-[10px] uppercase tracking-[0.35em] font-medium transition-colors duration-200 ${
                          isActive(link.href)
                            ? "text-[#222222]"
                            : "text-[#222222]/45 group-hover:text-[#222222]"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Sidebar CTA */}
              <div className="px-5 pb-5">
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center text-[10px] uppercase tracking-[0.35em] font-medium text-white py-3.5 rounded-full transition-all duration-200 active:scale-[0.98]"
                  style={{ background: "#222222" }}
                >
                  Contact & Support
                </Link>
              </div>

              {/* Sidebar footer */}
              <div className="px-6 py-5 border-t border-[#222222]/[0.06] space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#222222]/30 font-light">
                  Get in Touch
                </p>
                <a
                  href="mailto:hello@forgestacklabs.com"
                  className="block text-[11px] font-light text-[#222222]/45 hover:text-[#222222] transition-colors tracking-wide break-all"
                >
                  hello@forgestacklabs.com
                </a>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#222222]/25 font-light">
                  Mangaluru · Global
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}


















