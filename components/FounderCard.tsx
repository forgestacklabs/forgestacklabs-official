"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

/* ── TYPES ─────────────────────────────────────────────────── */
export interface Founder {
  initial:   string;
  name:      string;
  title:     string;
  function_: string;
  logic:     string;     // "System Logic" — decrypts on hover
  roast:     string;     // "The Roast"    — decrypts on hover
  footer:    string;     // 10px mono one-liner
  color:     string;     // accent colour class (e.g. "text-[#8BA888]")
  accentHex: string;
}

/* ── PROPS ─────────────────────────────────────────────────── */
interface FounderCardProps {
  founder:  Founder;
  index:    number;
  /** true when a DIFFERENT card is being hovered (Triad Sync) */
  isTriad:  boolean;
  /** called with true on mouseenter, false on mouseleave */
  onHover:  (active: boolean) => void;
}



/* ── FOUNDER CARD ───────────────────────────────────────────── */
export default function FounderCard({
  founder,
  index,
  isTriad,
  onHover,
}: FounderCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  /* 3D tilt springs */
  const rotX = useSpring(0, { stiffness: 180, damping: 22 });
  const rotY = useSpring(0, { stiffness: 180, damping: 22 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      rotX.set(-dy * 9);
      rotY.set(dx * 9);
    },
    [rotX, rotY]
  );

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    onHover(true);
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    onHover(false);
    rotX.set(0);
    rotY.set(0);
  }, [onHover, rotX, rotY]);

  /* Accent border glow colour */
  const glowColor =
    founder.accentHex === "#121212"
      ? "rgba(18,18,18,0.18)"
      : `${founder.accentHex}55`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        opacity: isTriad ? 0.6 : 1,
        scale:   isTriad ? 0.97 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className="relative flex flex-col w-full md:w-[320px] rounded-[2.5rem] cursor-default select-none"
    >
      {/* Frosted Glass Shell */}
      <div
        className={`
          flex flex-col flex-1 h-full
          rounded-[2.5rem] overflow-hidden
          bg-white/40 backdrop-blur-3xl
          border border-white/60
          transition-shadow duration-500
        `}
        style={{
          boxShadow: hovered
            ? `0 32px 80px rgba(0,0,0,0.13), 0 0 0 1px ${glowColor}`
            : `0 20px 60px rgba(0,0,0,0.09)`,
        }}
      >
        {/* ── TOP: IDENTITY ─────────────────────────────── */}
        <div className="px-10 pt-10 pb-8">
          {/* Initial Badge */}
          <div className="flex items-start justify-between mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: `${founder.accentHex}14` }}
            >
              <span
                className="text-2xl font-medium"
                style={{ color: founder.accentHex === "#121212" ? "#121212" : founder.accentHex }}
              >
                {founder.initial}
              </span>
            </div>

            {/* Function tag */}
            <span
              className="text-[9px] uppercase tracking-[0.4em] font-bold px-3 py-1.5 rounded-full"
              style={{
                color:      founder.accentHex === "#121212" ? "#121212" : founder.accentHex,
                background: `${founder.accentHex}12`,
              }}
            >
              {founder.function_}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-2xl font-medium tracking-tight text-[#000000] leading-none mb-1">
            {founder.name}
          </h3>

          {/* Title */}
          <p className="text-xs text-[#121212]/45 font-normal tracking-wide mt-1">
            {founder.title}
          </p>
        </div>

        {/* Hairline */}
        <div className="mx-10 h-[0.5px] bg-[#121212]/8" />

        {/* ── MIDDLE: SYSTEM LOGIC ──────────────────────── */}
        <div className="px-10 py-7 flex-1">
          <p
            className="text-[9px] uppercase tracking-[0.45em] font-bold mb-3"
            style={{ color: founder.accentHex === "#121212" ? "#12121255" : `${founder.accentHex}` }}
          >
            System Logic
          </p>

          <motion.p
            className="text-sm font-normal leading-relaxed"
            animate={{ opacity: hovered ? 1 : 0.4, color: hovered ? "#121212" : "#121212" }}
            transition={{ duration: 0.3 }}
          >
            {founder.logic}
          </motion.p>
        </div>

        {/* Hairline */}
        <div className="mx-10 h-[0.5px] bg-[#121212]/8" />

        {/* ── BOTTOM: THE ROAST ─────────────────────────── */}
        <div className="px-10 py-7">
          <p
            className="text-[9px] uppercase tracking-[0.45em] font-bold mb-3"
            style={{ color: "#D4A37399" }}
          >
            The Roast
          </p>

          <motion.p
            className="text-sm font-normal leading-relaxed"
            animate={{ opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {founder.roast}
          </motion.p>
        </div>

        {/* ── FOOTER ONE-LINER ──────────────────────────── */}
        <div
          className="px-10 py-5 border-t border-[#121212]/5"
          style={{ background: `${founder.accentHex}07` }}
        >
          <p
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize:   "10px",
              color:      "#121212",
              opacity:    0.5,
              lineHeight: 1.5,
              letterSpacing: "0.03em",
            }}
          >
            {founder.footer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}