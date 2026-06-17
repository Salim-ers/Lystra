import type { Config } from "tailwindcss";

/**
 * Lystra design system.
 * Brand palette is exposed both as semantic shadcn tokens (hsl via CSS vars)
 * and as a direct `lystra` scale for editorial/marketing surfaces.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // ---- Lystra brand (exact hex from brief) ----
        lystra: {
          ivory: "#FBF7F0",      // fond principal
          cream: "#FFF9F1",      // blanc cassé
          ink: "#24121F",        // texte / prune-noir
          champagne: "#D8B47A",  // or rose / premium
          plum: "#3A1633",       // accent prune profond
          rose: "#D9A6A0",       // rose poudré
          dark: "#180B16",       // fond sombre premium
          gray: "#6E6168",       // gris doux (AA ≥ 4.5:1 sur fonds clairs)
        },
        // ---- shadcn semantic tokens (driven by CSS vars in globals.css) ----
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        xl: "calc(var(--radius) + 6px)",
        "2xl": "calc(var(--radius) + 12px)",
      },
      boxShadow: {
        // very light, premium elevation
        soft: "0 1px 2px rgba(36,18,31,0.04), 0 8px 24px -12px rgba(36,18,31,0.12)",
        card: "0 1px 3px rgba(36,18,31,0.05), 0 12px 32px -16px rgba(36,18,31,0.18)",
        lift: "0 2px 6px rgba(36,18,31,0.06), 0 24px 48px -20px rgba(36,18,31,0.26)",
        glow: "0 0 0 1px rgba(216,180,122,0.35), 0 18px 50px -18px rgba(58,22,51,0.45)",
      },
      letterSpacing: {
        tightish: "-0.012em",
        eyebrow: "0.22em",
      },
      backgroundImage: {
        "plum-deep": "radial-gradient(120% 120% at 50% 0%, #3A1633 0%, #221026 45%, #180B16 100%)",
        "champagne-line": "linear-gradient(90deg, transparent, rgba(216,180,122,0.55) 18%, rgba(216,180,122,0.9) 50%, rgba(216,180,122,0.55) 82%, transparent)",
        "ivory-fade": "linear-gradient(180deg, #FFF9F1 0%, #FBF7F0 100%)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-up": { "0%": { opacity: "0", transform: "translateY(14px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 1.8s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
