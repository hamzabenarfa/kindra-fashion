"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView, Variants } from "framer-motion"
import AnimatedButton from "@/components/ui/animated-button"
import { urbanist } from "@/fonts/font"

export default function TrendSection() {
  const trendRef = useRef(null)
  const trendInView = useInView(trendRef, { once: true, amount: 0.3 })

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.section
      ref={trendRef}
      className="py-20 px-8 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto"
      initial="hidden"
      animate={trendInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <motion.div className="flex items-center justify-center" variants={fadeInUp}>
        <motion.div
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-[500px] h-[500px]">
            <Image
              src="/Images.png"
              alt="Fashion models"
              width={400}
              height={500}
              className="object-fit h-full w-full"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="flex flex-col justify-center" variants={staggerContainer}>
        <motion.h2 className={`font-[500] tracking-wide text-2xl lg:text-4xl mb-6 ${urbanist.className} `} variants={fadeInUp}>
          TREND-FOCUSED & FASHION FORWARD
        </motion.h2>
        <motion.p className="text-md mb-2" variants={fadeInUp}>
          Where street meets sophistication...
        </motion.p>
        <motion.p className="text-md mb-2" variants={fadeInUp}>
          Modern fits, bold textures, all-day comfort.
        </motion.p>
        <motion.p className="text-md mb-6" variants={fadeInUp}>
          Step into the season's most wearable looks — for him and her.
        </motion.p>

        <motion.div variants={fadeInUp}>
          <AnimatedButton href="#lookbook" className="w-full lg:w-fit text-xl ">
            See the Lookbook →
          </AnimatedButton>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
