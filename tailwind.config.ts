import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontSize: {
      // Display
      "display-large": [
        "6rem",
        { lineHeight: "7rem", letterSpacing: "-0.094rem" },
      ],
      "display-small": [
        "3rem",
        { lineHeight: "110%", letterSpacing: "-0.094rem" },
      ],
      lg: ["1.125rem", { lineHeight: "1.5rem" }],
      md: ["1rem", { lineHeight: "1.5rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      xs: ["0.75rem", { lineHeight: "1rem" }],
    },
    fontFamily: {
      oswald: ["var(--font-oswald)", "serif"],
    },
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
        neutral: {
          50: "hsl(256, 8%, 98%)",
          100: "hsl(256, 8%, 95%)",
          200: "hsl(256, 8%, 90%)",
          300: "hsl(256, 8%, 80%)",
          400: "hsl(256, 8%, 70%)",
          500: "hsl(256, 8%, 60%)",
          600: "hsl(256, 4%, 50%)",
          700: "hsl(256, 4%, 38%)",
          800: "hsl(256, 4%, 12%)",
          900: "hsl(256, 4%, 6%)",
        },
        gray: {
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
