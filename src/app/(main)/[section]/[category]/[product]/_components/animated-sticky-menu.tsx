"use client"

import { motion } from "framer-motion"
import { StickyProductMenu } from "@/components/sticky-product-menu"

interface AnimatedStickyMenuProps {
  productId: number
  productSlug: string
  name: string
  price: number
  currency: string
  reference: string
  variants: any[]
  defaultVariant: any
}

export function AnimatedStickyMenu({
  productId,
  productSlug,
  name,
  price,
  currency,
  reference,
  variants,
  defaultVariant,
}: AnimatedStickyMenuProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
    >
      <StickyProductMenu
        productId={productId}
        productSlug={productSlug}
        name={name}
        price={price}
        currency={currency}
        reference={reference}
        variants={variants}
        defaultVariant={defaultVariant}
      />
    </motion.div>
  )
}
