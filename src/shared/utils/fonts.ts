import { Mukta, Oswald } from "next/font/google";

export const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  weight: ["600"],
  variable: "--font-oswald",
});

export const mukta = Mukta({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-mukta",
});
