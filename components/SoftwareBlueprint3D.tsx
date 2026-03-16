"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * SoftwareBlueprint3D
 * ─────────────────────────────────────────────────────────────
 * Concept: A hollow 3D software architecture model — nodes for
 * PostgreSQL, Docker, API layers — connected by tension struts,
 * slowly rotating on multiple axes. Rendered on Canvas 2D via
 * a projection pipeline (no Three.js dep).
 *
 * Layers:
 *   [0] Canvas — raw 3D projection (z-index: 0, fixed)
 *   [1] Frost div — backdrop-blur + grain (z-index: 1, fixed)
 *   [2+] Page content
 */

/* ── TYPES ─────────────────────────────────────────────────── */
interface Vec3 { x: number; y: number; z: number }
interface Node3D { pos: Vec3; label: string; layer: "pg" | "docker" | "api" | "hub" }
interface Edge { a: number; b: number; weight: number } // weight: 0–1 (opacity factor)

/* ── MATH UTILS ────────────────────────────────────────────── */
const rotX = (p: Vec3, a: number): Vec3 => ({
  x: p.x,
  y: p.y * Math.cos(a) - p.z * Math.sin(a),
  z: p.y * Math.sin(a) + p.z * Math.cos(a),
});
const rotY = (p: Vec3, a: number): Vec3 => ({
  x: p.x * Math.cos(a) + p.z * Math.sin(a),
  y: p.y,
  z: -p.x * Math.sin(a) + p.z * Math.cos(a),
});
const rotZ = (p: Vec3, a: number): Vec3 => ({
  x: p.x * Math.cos(a) - p.y * Math.sin(a),
  y: p.x * Math.sin(a) + p.y * Math.cos(a),
  z: p.z,
});

/* ── ARCHITECTURE DEFINITION ────────────────────────────────── */
// 3 concentric "rings" representing layers + a hub spine
function buildArchitecture(): { nodes: Node3D[]; edges: Edge[] } {
  const nodes: Node3D[] = [];
  const edges: Edge[]   = [];

  // Hub spine — vertical axis nodes
  const hubPositions: Vec3[] = [
    { x: 0, y: -1.8, z: 0 },
    { x: 0, y:  0,   z: 0 },
    { x: 0, y:  1.8, z: 0 },
  ];
  const hubLabels = ["PG", "API", "HUB"];
  hubPositions.forEach((pos, i) => {
    nodes.push({ pos, label: hubLabels[i], layer: i === 0 ? "pg" : i === 1 ? "api" : "hub" });
  });

  // PostgreSQL ring — bottom (y = -1.8)
  const pgCount = 5;
  const pgStart = nodes.length;
  for (let i = 0; i < pgCount; i++) {
    const a = (i / pgCount) * Math.PI * 2;
    nodes.push({
      pos: { x: Math.cos(a) * 2.2, y: -2.2, z: Math.sin(a) * 2.2 },
      label: "PG",
      layer: "pg",
    });
    edges.push({ a: 0, b: pgStart + i, weight: 0.9 }); // spoke to center
    if (i > 0) edges.push({ a: pgStart + i - 1, b: pgStart + i, weight: 0.5 }); // ring
  }
  edges.push({ a: pgStart + pgCount - 1, b: pgStart, weight: 0.5 }); // close ring

  // Docker ring — middle (y = 0)
  const dockerCount = 6;
  const dockerStart = nodes.length;
  for (let i = 0; i < dockerCount; i++) {
    const a = (i / dockerCount) * Math.PI * 2 + 0.3;
    nodes.push({
      pos: { x: Math.cos(a) * 2.8, y: 0.2, z: Math.sin(a) * 2.8 },
      label: "DOCKER",
      layer: "docker",
    });
    edges.push({ a: 1, b: dockerStart + i, weight: 0.9 });
    if (i > 0) edges.push({ a: dockerStart + i - 1, b: dockerStart + i, weight: 0.5 });
    // Cross-connect to pg ring
    edges.push({ a: pgStart + (i % pgCount), b: dockerStart + i, weight: 0.25 });
  }
  edges.push({ a: dockerStart + dockerCount - 1, b: dockerStart, weight: 0.5 });

  // API ring — top (y = 1.8)
  const apiCount = 4;
  const apiStart = nodes.length;
  for (let i = 0; i < apiCount; i++) {
    const a = (i / apiCount) * Math.PI * 2 + 0.8;
    nodes.push({
      pos: { x: Math.cos(a) * 1.8, y: 2.2, z: Math.sin(a) * 1.8 },
      label: "API",
      layer: "api",
    });
    edges.push({ a: 2, b: apiStart + i, weight: 0.9 });
    if (i > 0) edges.push({ a: apiStart + i - 1, b: apiStart + i, weight: 0.5 });
    edges.push({ a: dockerStart + (i % dockerCount), b: apiStart + i, weight: 0.3 });
  }
  edges.push({ a: apiStart + apiCount - 1, b: apiStart, weight: 0.5 });

  // Hub connections — vertical spine
  edges.push({ a: 0, b: 1, weight: 1.0 });
  edges.push({ a: 1, b: 2, weight: 1.0 });

  return { nodes, edges };
}

const ARCH = buildArchitecture();

/* ── COMPONENT ─────────────────────────────────────────────── */
export default function SoftwareBlueprint3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const angleRef  = useRef({ x: 0.0, y: 0.0, z: 0.0 });

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width        = window.innerWidth  * dpr;
    canvas.height       = window.innerHeight * dpr;
    canvas.style.width  = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    const canvas = canvasRef.current!;

    function project(p: Vec3, cx: number, cy: number, fov: number): [number, number, number] {
      const z    = p.z + fov;
      const scale = fov / (z + 0.001);
      return [cx + p.x * scale * 90, cy + p.y * scale * 90, scale];
    }

    function tick() {
      rafRef.current = requestAnimationFrame(tick);

      const ctx = canvas.getContext("2d")!;
      const W   = window.innerWidth;
      const H   = window.innerHeight;
      const cx  = W / 2;
      const cy  = H / 2;
      const fov = 6;

      ctx.clearRect(0, 0, W, H);

      // Advance rotation — multi-axis, very slow
      angleRef.current.x += 0.0018;
      angleRef.current.y += 0.0024;
      angleRef.current.z += 0.0007;

      const { x: ax, y: ay, z: az } = angleRef.current;

      // Project all nodes
      const projected = ARCH.nodes.map(node => {
        let p = rotX(node.pos, ax);
        p     = rotY(p, ay);
        p     = rotZ(p, az);
        const [sx, sy, scale] = project(p, cx, cy, fov);
        return { sx, sy, scale, layer: node.layer, label: node.label, z: p.z };
      });

      // Sort edges by average z (painter's algorithm)
      const sortedEdges = [...ARCH.edges].sort((a, b) => {
        const za = (projected[a.a].z + projected[a.b].z) / 2;
        const zb = (projected[b.a].z + projected[b.b].z) / 2;
        return za - zb;
      });

      // Draw edges (struts)
      for (const edge of sortedEdges) {
        const pa = projected[edge.a];
        const pb = projected[edge.b];
        const avgScale = (pa.scale + pb.scale) / 2;
        const alpha = edge.weight * avgScale * 0.25 * 0.6;

        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);

        // Gradient along strut for depth
        const grad = ctx.createLinearGradient(pa.sx, pa.sy, pb.sx, pb.sy);
        grad.addColorStop(0, `rgba(18,18,18,${(alpha * 0.6).toFixed(3)})`);
        grad.addColorStop(0.5, `rgba(18,18,18,${alpha.toFixed(3)})`);
        grad.addColorStop(1, `rgba(18,18,18,${(alpha * 0.6).toFixed(3)})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth   = 0.5 + avgScale * 0.3;
        ctx.stroke();
      }

      // Draw nodes (sorted front-to-back)
      const sortedNodes = [...projected]
        .map((p, i) => ({ ...p, idx: i }))
        .sort((a, b) => a.z - b.z);

      for (const node of sortedNodes) {
        const baseR = node.layer === "hub" ? 4 : node.layer === "api" ? 2.5 : 2;
        const r     = baseR * node.scale * 0.85;
        const alpha = Math.min(0.18, node.scale * 0.12);

        // Outer ring
        ctx.beginPath();
        ctx.arc(node.sx, node.sy, r * 2.2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(18,18,18,${(alpha * 0.35).toFixed(3)})`;
        ctx.lineWidth   = 0.4;
        ctx.stroke();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.sx, node.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(18,18,18,${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // Mirror axis — vertical hairline at center
      const axisGrad = ctx.createLinearGradient(cx, 0, cx, H);
      axisGrad.addColorStop(0,   "rgba(18,18,18,0)");
      axisGrad.addColorStop(0.3, "rgba(18,18,18,0.04)");
      axisGrad.addColorStop(0.7, "rgba(18,18,18,0.04)");
      axisGrad.addColorStop(1,   "rgba(18,18,18,0)");
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, H);
      ctx.strokeStyle = axisGrad;
      ctx.lineWidth   = 0.5;
      ctx.stroke();
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  return (
    <>
      {/* Raw canvas — z-index: 0 */}
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

      {/* Frost overlay — z-index: 1 */}
      <div
        aria-hidden="true"
        style={{
          position:              "fixed",
          inset:                 0,
          zIndex:                1,
          pointerEvents:         "none",
          backdropFilter:        "blur(80px) saturate(1.08) brightness(1.02)",
          WebkitBackdropFilter:  "blur(80px) saturate(1.08) brightness(1.02)",
          backgroundColor:       "rgba(247,247,245,0.78)",
        }}
      >
        {/* SVG grain texture */}
        <svg
          aria-hidden="true"
          style={{
            position:      "absolute",
            inset:         0,
            width:         "100%",
            height:        "100%",
            opacity:       0.045,
            mixBlendMode:  "multiply",
            pointerEvents: "none",
          }}
        >
          <filter id="bp-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#bp-grain)" />
        </svg>
      </div>
    </>
  );
}