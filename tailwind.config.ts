import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        /* Core Design System */
        pearl: "#F7F7F5",        // Background
        charcoal: "#222222",     // Primary Text (NOT black)
        sage: "#8BA888",         // Primary Action
        clay: "#D4A373",         // Secondary / Hover

        /* Optional neutrals for subtle UI depth */
        mist: "#EDEDEB",
      },

      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },

      boxShadow: {
        /* Soft diffused shadow for glass */
        soft: "0 10px 40px rgba(0, 0, 0, 0.05)",
      },

      backdropBlur: {
        glass: "16px",
      },

      keyframes: {
        /* Cinematic fade-up (20–30px max as specified) */
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },

        /* Extremely slow background drift */
        drift: {
          "0%": { transform: "translateY(0px) translateX(0px)" },
          "100%": { transform: "translateY(-40px) translateX(20px)" },
        },
      },

      animation: {
        fadeUp: "fadeUp 1s ease-out forwards",
        drift: "drift 30s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;