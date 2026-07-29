"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundField() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // start animations AFTER first paint
    requestAnimationFrame(() => setAnimate(true));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-ink to-black" />

      <motion.div
        className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-accent/20 blur-[72px] md:-top-32 md:-right-24 md:h-96 md:w-96 md:blur-[120px]"
        animate={
          animate
            ? { opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }
            : { opacity: 0.4, scale: 1 }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-24 left-8 h-72 w-72 rounded-full bg-white/5 blur-[80px] md:left-16 md:h-[420px] md:w-[420px] md:blur-[140px]"
        animate={
          animate
            ? { opacity: [0.3, 0.6, 0.3], y: [0, -20, 0] }
            : { opacity: 0.3, y: 0 }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/3 left-1/2 h-48 w-48 rounded-full bg-accent/10 blur-[64px] md:h-64 md:w-64 md:blur-[100px]"
        animate={
          animate
            ? { opacity: [0.25, 0.5, 0.25], x: [0, 20, 0] }
            : { opacity: 0.25, x: 0 }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
