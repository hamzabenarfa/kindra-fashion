"use client"

import { motion } from "framer-motion"
import { ProductCarousel } from "@/components/women-sections/product-carousel"

interface AnimatedProductGridProps {
  products: any[]
}

export function AnimatedProductGrid({ products }: AnimatedProductGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="container mx-auto px-8 py-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <ProductCarousel product={product} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
