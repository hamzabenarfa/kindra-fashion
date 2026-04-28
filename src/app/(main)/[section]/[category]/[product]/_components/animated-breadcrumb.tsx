"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface AnimatedBreadcrumbProps {
  section: string
  category: string
  product?: string
  formattedSection: string
  formattedCategory: string
  formattedProduct?: string
}

export function AnimatedBreadcrumb({
  section,
  category,
  product,
  formattedSection,
  formattedCategory,
  formattedProduct,
}: AnimatedBreadcrumbProps) {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren",
      },
    },
  }

  // Animation variants for items
  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      } as any,
    },
  }

  // Animation variants for chevrons
  const chevronVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      } as any,
    },
  }

  // Hover animation for links
  const linkHoverVariants = {
    initial: { color: "#818181" },
    hover: {
      color: "#222222",
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      } as any,
    },
  } as any

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center text-sm mt-16 px-4"
    >
      <motion.div variants={itemVariants}>
        <motion.div variants={linkHoverVariants} initial="initial" whileHover="hover" className="inline-block">
          <Link href={`/${section}`} className="capitalize">
            {formattedSection}
          </Link>
        </motion.div>
      </motion.div>

      {formattedCategory && (
        <>
          <motion.div variants={chevronVariants} className="mx-2 text-[#818181] flex items-center">
            <ChevronRight className="h-4 w-4" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div variants={linkHoverVariants} initial="initial" whileHover="hover" className="inline-block">
              <Link href={`/${section}/${category}`} className="capitalize">
                {formattedCategory}
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}

      {formattedProduct && (
        <>
          <motion.div variants={chevronVariants} className="mx-2 text-[#818181] flex items-center">
            <ChevronRight className="h-4 w-4" />
          </motion.div>

          <motion.div variants={itemVariants} className="font-medium capitalize text-[#222222]">
            {formattedProduct}
          </motion.div>
        </>
      )}
    </motion.nav>
  )
}
