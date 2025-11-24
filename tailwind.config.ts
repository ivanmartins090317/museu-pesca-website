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
        primary: {
          sand: "#E5C4B0",
          beach: "#C9A582",
          stone: "#8B9B9B",
          ocean: "#1A6B6B",
          aqua: "#4DB8B8",
          sea: "#0d1f3c",
          sea_floor: "#050d1a",
        },
        neutral: {
          white: "#FFFFFF",
          black: "#0A0A0A",
          gray: {
            100: "#FaFaFa",
            200: "#E5E5E5",
            300: "#D4D4D4",
            800: "#262626",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"],
      },
      fontSize: {
        hero: "clamp(3rem, 8vw, 6rem)",
        h1: "clamp(2.5rem, 6vw, 4.5rem)",
        h2: "clamp(2rem, 5vw, 3.5rem)",
        h3: "clamp(1.5rem, 4vw, 2.5rem)",
        body: "clamp(1rem, 2vw, 1.125rem)",
        small: "0.875rem",
      },
      spacing: {
        section: "120px",
        "section-lg": "160px",
      },
    },
  },
  plugins: [],
};
export default config;
