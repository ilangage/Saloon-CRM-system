import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF7EF",
        blush: "#F9D7D8",
        rose: "#B76E79",
        wine: "#6F263D",
        charcoal: "#201A1E",
        gold: "#D4A857"
      },
      boxShadow: {
        premium: "0 24px 70px rgba(111, 38, 61, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
