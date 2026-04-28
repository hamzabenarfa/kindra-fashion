"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"

interface AnimatedButtonProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function AnimatedButton({ href, children, className = "" }: AnimatedButtonProps) {
  return (
    <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        className={`border border-black py-2 px-4 inline-flex items-center justify-center transition-colors hover:bg-black hover:text-white ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  )
}
