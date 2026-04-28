"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface AnimatedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  containerClassName?: string
}

export default function AnimatedImage({
  src,
  alt,
  width,
  height,
  className = "",
  containerClassName = "",
}: AnimatedImageProps) {
  return (
    <motion.div
      className={`relative ${containerClassName}`}
      whileHover={{ scale: 1.05, rotate: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`object-cover ${className}`}
      />
    </motion.div>
  )
}
