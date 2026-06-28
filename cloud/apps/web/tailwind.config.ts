import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#090909",
        sidebar: "#0d0d0d",
        card: "#111111",
        accent: "#f3f4f6"
      },
      boxShadow: {
        glass: "0 20px 80px rgba(0, 0, 0, 0.45)",
        soft: "0 10px 28px rgba(0, 0, 0, 0.35)"
      },
      borderRadius: {
        xl2: "1rem"
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui"],
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular"]
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        rise: "rise 450ms ease-out"
      }
    }
  },
  plugins: []
} satisfies Config;
