"use client"

import { amoria } from "@/fonts/font"
import Marquee from "react-fast-marquee"

interface ScrollingTextProps {
  text: string
  speed?: number
  className?: string
  direction?: "left" | "right"
  pauseOnHover?: boolean
  gradient?: boolean
  gradientColor?: string
  gradientWidth?: number
}

export default function ScrollingText({
  text,
  speed = 50,
  className = "",
  direction = "left",
  pauseOnHover = false,
  gradient = false,
  gradientColor = "white",
  gradientWidth = 100,
}: ScrollingTextProps) {
  return (
    <section className={`py-10 overflow-hidden ${className}`}>
      <Marquee
        speed={speed}
        direction={direction}
        pauseOnHover={pauseOnHover}
        gradient={gradient}
        gradientColor={gradientColor}
        gradientWidth={gradientWidth}
        className={`${amoria.className} font-bold text-2xl tracking-wide`}
      >
        <span className="mx-4">{text}</span>
      </Marquee>
    </section>
  )
}
