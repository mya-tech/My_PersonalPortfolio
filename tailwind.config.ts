import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          tertiary: "var(--color-bg-tertiary)",
        },
        accent: {
          light: "var(--color-accent-light)",
          mid: "var(--color-accent-mid)",
          dark: "var(--color-accent-dark)",
          deeper: "var(--color-accent-deeper)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        border: {
          light: "var(--color-border-light)",
          mid: "var(--color-border-mid)",
        },
        tag: {
          bg: "var(--color-tag-bg)",
          text: "var(--color-tag-text)",
          border: "var(--color-tag-border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
