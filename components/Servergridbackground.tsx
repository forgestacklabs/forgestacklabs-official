"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * FORGESTACK LABS — NeuralMirrorBackground
 * ─────────────────────────────────────────
 * Concept : "Digital Brain" — a perfectly mirrored neural network
 *           of nodes + synapses, shifting behind frosted glass.
 *
 * Architecture:
 *   • 75 base nodes on the LEFT half → mirrored to RIGHT half = 150 total
 *   • Nodes bounce off edges (reflect), creating seamless infinite loop
 *   • Synapses drawn between nodes within CONNECTION_RADIUS
 *   • Mouse within REPEL_RADIUS gently pushes nodes away (ripple effect)
 *   • Frost layer: CSS backdrop-blur + SVG feTurbulence grain overlay
 *
 * Performance:
 *   • HTML5 Canvas 2D + requestAnimationFrame
 *   • devicePixelRatio capped at 2 for retina without overdraw
 *   • Fixed position, pointer-events: none — zero scroll jank
 *   • Off-screen mirror drawn by flipping ctx transform (no extra memory)
 */

/* ── TUNING CONSTANTS ───────────────────────────────────────── */
const BASE_NODES       = 72;          // left-half nodes; mirrored = 144 total
const CONNECTION_DIST  = 160;         // px — max synapse length
const REPEL_RADIUS     = 200;         // px — mouse influence zone
const REPEL_STRENGTH   = 0.018;       // push force multiplier
const NODE_RADIUS_MIN  = 1.2;
const NODE_RADIUS_MAX  = 2.8;
const SPEED_MIN        = 0.12;
const SPEED_MAX        = 0.48;
const NODE_OPACITY     = 0.12;        // base node fill opacity
const SYNAPSE_OPACITY  = 0.07;        // base line opacity (fades with distance)
const LINE_COLOR       = "18,18,18";  // #121212 in r,g,b

/* ── TYPES ──────────────────────────────────────────────────── */
interface Node {
  x: number;   // position in LEFT half space [0, halfW]
  y: number;
  vx: number;
  vy: number;
  r: number;   // radius
}

/* ── COMPONENT ──────────────────────────────────────────────── */
export default function NeuralMirrorBackground() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const nodesRef   = useRef<Node[]>([]);
  const mouseRef   = useRef({ x: -9999, y: -9999 });
  const rafRef     = useRef<number>(0);
  const sizeRef    = useRef({ w: 0, h: 0, halfW: 0 });

  /* ── Initialise nodes in left half ─────────────────────── */
  const initNodes = useCallback((halfW: number, h: number) => {
    nodesRef.current = Array.from({ length: BASE_NODES }, () => {
      const speed = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
      const angle = Math.random() * Math.PI * 2;
      return {
        x:  Math.random() * halfW,
        y:  Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r:  NODE_RADIUS_MIN + Math.random() * (NODE_RADIUS_MAX - NODE_RADIUS_MIN),
      };
    });
  }, []);

  /* ── Resize handler ─────────────────────────────────────── */
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr  = Math.min(window.devicePixelRatio || 1, 2);
    const w    = window.innerWidth;
    const h    = window.innerHeight;
    const half = w / 2;

    canvas.width        = w * dpr;
    canvas.height       = h * dpr;
    canvas.style.width  = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    sizeRef.current = { w, h, halfW: half };
    initNodes(half, h);
  }, [initNodes]);

  /* ── Main animation loop ────────────────────────────────── */
  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    /* Mouse tracking — world coords */
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const canvas = canvasRef.current!;

    function tick() {
      rafRef.current = requestAnimationFrame(tick);

      const ctx    = canvas.getContext("2d")!;
      const { w, h, halfW } = sizeRef.current;
      const mouse  = mouseRef.current;
      const nodes  = nodesRef.current;

      /* ── Clear ─────────────────────────────────────────── */
      ctx.clearRect(0, 0, w, h);

      /* ── Update node positions ─────────────────────────── */
      for (const node of nodes) {
        /* Mouse repulsion — applied in full canvas space for LEFT side */
        const nx  = node.x;          // left-half x
        const ny  = node.y;

        /* Repel from cursor (left side) */
        const dxL = nx - mouse.x;
        const dyL = ny - mouse.y;
        const distL = Math.sqrt(dxL * dxL + dyL * dyL);
        if (distL < REPEL_RADIUS && distL > 0) {
          const force = (1 - distL / REPEL_RADIUS) * REPEL_STRENGTH;
          node.vx += (dxL / distL) * force;
          node.vy += (dyL / distL) * force;
        }

        /* Repel from cursor mirror (right side x = w - node.x) */
        const mirrorX = w - nx;
        const dxR = nx - (w - mouse.x); // mouse mirrored
        const dyR = ny - mouse.y;
        const distR = Math.sqrt(dxR * dxR + dyR * dyR);
        if (distR < REPEL_RADIUS && distR > 0) {
          const force = (1 - distR / REPEL_RADIUS) * REPEL_STRENGTH;
          /* Push away, but only in Y for mirror coherence */
          node.vy += (dyR / distR) * force;
        }
        void mirrorX; // suppress unused warning

        /* Clamp velocity to prevent runaway after repulsion */
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > SPEED_MAX * 2.5) {
          node.vx = (node.vx / speed) * SPEED_MAX * 2.5;
          node.vy = (node.vy / speed) * SPEED_MAX * 2.5;
        }

        /* Advance */
        node.x += node.vx;
        node.y += node.vy;

        /* Reflect off left-half boundaries */
        if (node.x < node.r) {
          node.x  =  node.r;
          node.vx = Math.abs(node.vx);
        } else if (node.x > halfW - node.r) {
          node.x  = halfW - node.r;
          node.vx = -Math.abs(node.vx);
        }
        if (node.y < node.r) {
          node.y  =  node.r;
          node.vy = Math.abs(node.vy);
        } else if (node.y > h - node.r) {
          node.y  = h - node.r;
          node.vy = -Math.abs(node.vy);
        }
      }

      /* ── Draw helper: render one side ─────────────────── */
      function drawSide(flipX: boolean) {
        ctx.save();
        if (flipX) {
          /* Mirror the entire coordinate system around center */
          ctx.translate(w, 0);
          ctx.scale(-1, 1);
        }

        /* Synapses first (under nodes) */
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a  = nodes[i];
            const b  = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d  = Math.sqrt(dx * dx + dy * dy);

            if (d < CONNECTION_DIST) {
              /* Opacity fades with distance */
              const alpha = SYNAPSE_OPACITY * (1 - d / CONNECTION_DIST);
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(${LINE_COLOR},${alpha.toFixed(3)})`;
              ctx.lineWidth   = 0.6;
              ctx.stroke();
            }
          }
        }

        /* Nodes */
        for (const node of nodes) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${LINE_COLOR},${NODE_OPACITY})`;
          ctx.fill();
        }

        ctx.restore();
      }

      /* ── Draw LEFT side ────────────────────────────────── */
      drawSide(false);

      /* ── Draw RIGHT side (mirrored) ────────────────────── */
      drawSide(true);

      /* ── Central axis hairline ─────────────────────────── */
      const axisGrad = ctx.createLinearGradient(halfW, 0, halfW, h);
      axisGrad.addColorStop(0,   "rgba(18,18,18,0)");
      axisGrad.addColorStop(0.2, "rgba(18,18,18,0.06)");
      axisGrad.addColorStop(0.5, "rgba(18,18,18,0.10)");
      axisGrad.addColorStop(0.8, "rgba(18,18,18,0.06)");
      axisGrad.addColorStop(1,   "rgba(18,18,18,0)");
      ctx.beginPath();
      ctx.moveTo(halfW, 0);
      ctx.lineTo(halfW, h);
      ctx.strokeStyle = axisGrad;
      ctx.lineWidth   = 0.5;
      ctx.stroke();

      /* ── Vignette: pulls edges back to bg ──────────────── */
      const vignette = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.85);
      vignette.addColorStop(0, "rgba(247,247,245,0)");
      vignette.addColorStop(1, "rgba(247,247,245,0.55)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [resize]);

  return (
    <>
      {/*
       * ── LAYER 1: Neural Network Canvas (raw, behind frost) ──
       * z-index: 0 · fixed · pointer-events: none
       */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        0,
          pointerEvents: "none",
          display:       "block",
          willChange:    "transform",
        }}
      />

      {/*
       * ── LAYER 2: Frost Glass Overlay ──────────────────────
       * Sits above the canvas, below all page content (z-index: 1).
       * backdrop-blur creates the "deep frosted pane" effect.
       * SVG feTurbulence grain simulates frosted glass texture.
       */}
      <div
        aria-hidden="true"
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        1,
          pointerEvents: "none",

          /* Frost layer */
          backdropFilter:         "blur(72px) saturate(1.1) brightness(1.02)",
          WebkitBackdropFilter:   "blur(72px) saturate(1.1) brightness(1.02)",
          backgroundColor:        "rgba(247, 247, 245, 0.72)",

          /* SVG grain as mask-image noise texture */
          WebkitMaskImage:        "none",
        }}
      >
        {/* Grain texture via inline SVG filter */}
        <svg
          aria-hidden="true"
          style={{
            position:      "absolute",
            inset:         0,
            width:         "100%",
            height:        "100%",
            opacity:       0.055,
            mixBlendMode:  "multiply",
            pointerEvents: "none",
          }}
        >
          <filter id="frost-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#frost-grain)" />
        </svg>
      </div>
    </>
  );
}