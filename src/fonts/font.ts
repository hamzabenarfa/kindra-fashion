import localFont from "next/font/local";
import { Urbanist } from "next/font/google";
import { Aboreto } from "next/font/google";

export const aboreto = Aboreto({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-aboreto",
  display: "swap",
});

// Amoria font
export const amoria = localFont({
  src: "./amoria.otf",
  variable: "--font-amoria",
});

export const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["500", "800"],
  variable: "--font-urbanist",
  display: "swap",
});

// Copeland font
export const copeland = localFont({
  src: "./copeland/Copeland.otf",
});

export const seasons = localFont({
  src: [
    {
      path: "./season/Fontspring-DEMO-theseasons-reg.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./season/Fontspring-DEMO-theseasons-bd.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./season/Fontspring-DEMO-theseasons-it.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./season/Fontspring-DEMO-theseasons-bdit.otf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-seasons",
});
