import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#f3e5e5",
          100: "#f1b2b2",
          200: "#ef7f7f",
          300: "#ed4c4c",
          400: "#eb1a1a",
          500: "#e50914", // Netflix Red
          600: "#d00712",
          700: "#b00610",
          800: "#8c050e",
          900: "#6f040c",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
