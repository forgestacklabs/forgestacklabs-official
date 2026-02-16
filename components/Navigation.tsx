
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/technology", label: "Technology" },
  { href: "/principles", label: "Approach" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function NavigationAlt() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <header className="relative z-20">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo2.png"
              alt="ForgeStack Labs"
              className="h-11 w-auto"
            />
            <span className="text-base uppercase tracking-[0.25em] text-white/85 hover:text-white transition-colors">
              FORGESTACK LABS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-[0.3em] transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <span
                  className={`${
                    isActive(link.href)
                      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[2px] w-5 bg-white/80 rounded-full transition-all duration-300 origin-center ${
                isMenuOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-white/80 rounded-full transition-all duration-300 ${
                isMenuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-white/80 rounded-full transition-all duration-300 origin-center ${
                isMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-black/95 border-l border-white/10 flex flex-col transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header — Logo + Brand */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <img
                src="/logo2.png"
                alt="ForgeStack Labs"
                className="h-8 w-auto"
              />
              <span className="text-[11px] uppercase tracking-[0.25em] text-white/80">
                ForgeStack Labs
              </span>
            </Link>

            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] rounded-md bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <span className="block h-[2px] w-4 bg-white/80 rounded-full rotate-45 translate-y-[7px]" />
              <span className="block h-[2px] w-4 bg-white/80 rounded-full opacity-0" />
              <span className="block h-[2px] w-4 bg-white/80 rounded-full -rotate-45 -translate-y-[7px]" />
            </button>
          </div>

          {/* Sidebar Links */}
          <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`group flex items-center gap-3 py-3 px-3 rounded-lg transition-all duration-300 ${
                  isActive(link.href) ? "bg-white/5" : "hover:bg-white/5"
                }`}
                style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms" }}
              >
                <span
                  className={`block w-[2px] h-4 rounded-full transition-all duration-300 ${
                    isActive(link.href)
                      ? "bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
                      : "bg-white/10 group-hover:bg-white/30"
                  }`}
                />
                <span
                  className={`text-xs uppercase tracking-[0.3em] transition-all duration-300 ${
                    isActive(link.href)
                      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                      : "text-white/60 group-hover:text-white"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer — Contact Info */}
          <div className="px-6 py-6 border-t border-white/10 flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Get in Touch
            </p>
            
              <a href="mailto:forgestacklabs@forgestacklabs.com"
              className="text-[11px] text-white/60 hover:text-white transition-colors tracking-wide break-all"
            >
              forgestacklabs@forgestacklabs.com
            </a>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              India · Global
            </p>
          </div>
        </div>
      </div>
    </>
  );
}