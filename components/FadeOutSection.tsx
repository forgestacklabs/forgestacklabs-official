"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FadeOutSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.45, 0.9], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.45, 0.9], [1, 0.94]);
  const y = useTransform(scrollYProgress, [0.45, 0.9], ["0px", "-40px"]);

  return (
    <div ref={ref}>
      <motion.div style={{ opacity, scale, y, transformOrigin: "center top" }}>
        {children}
      </motion.div>
    </div>
  );
}