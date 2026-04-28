"use client"

import { motion } from "framer-motion"
import ProductCareInstructions from "@/components/product-care-instructions"

interface AnimatedCareInstructionsProps {
  img?: string
}

export function AnimatedCareInstructions({ img }: AnimatedCareInstructionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <ProductCareInstructions img={img} />
    </motion.div>
  )
}
