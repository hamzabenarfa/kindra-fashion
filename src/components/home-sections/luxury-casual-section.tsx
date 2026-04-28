"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { copeland } from "@/fonts/font";

export default function LuxuryCasualSection() {
  const luxuryRef = useRef(null);
  const luxuryInView = useInView(luxuryRef, { once: true, amount: 0.3 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.section
      ref={luxuryRef}
      className="py-8 lg:py-20 px-4 relative"
      initial="hidden"
      animate={luxuryInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <div className="max-w-5xl mx-auto text-center relative">
        <motion.div
          className="absolute left-16 top-20 lg:-top-5"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 90 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <svg width="50" height="50" viewBox="0 0 100 100">
            <path
              d="M50,0 C50,30 70,50 100,50 C70,50 50,70 50,100 C50,70 30,50 0,50 C30,50 50,30 50,0"
              fill="none"
              stroke="black"
              strokeWidth="1"
            />
          </svg>
        </motion.div>

        <motion.h2
          className={`font-serif text-4xl lg:text-7xl tracking-widest leading-24 lg:leading-tight ${copeland.className} font-semibold`}
          variants={fadeInUp}
        >
          LUXURY-CASUAL VIBE
          <br />
          IS
          <br />
          THE STYLE
          <br />
          THAT
          <br />
          SELLS ITSELF
        </motion.h2>

        <motion.div
          className="absolute right-10 bottom-20 md:right-40 md:top-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="rounded-full border border-black w-24 h-24 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="text-xs text-center">
              <span className="block">OUR SHOP</span>
              <motion.span
                className="block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2,
                  duration: 0.6,
                }}
              >
                ♥
              </motion.span>
              <span className="block">LUXURY</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="absolute left-10 bottom-20  md:left-20 md:top-22" variants={fadeInUp}>
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src="/lux/2.jpg"
              alt="Fashion model"
              width={80}
              height={100}
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div className="absolute right-16 top-20 md:right-10 md:top-10" variants={fadeInUp}>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src="/lux/1.jpg"
              alt="Fashion model"
              width={80}
              height={100}
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="text-center mt-16 max-w-md mx-auto"
        variants={fadeInUp}
      >
        <p className="text-md leading-relaxed">
          Loved by thousands. Worn by trendsetters.
          <br />
          The pieces everyone is reaching for this season.
          <br />
          <span className="font-medium">Ready to join them?</span>
        </p>
      </motion.div>
    </motion.section>
  );
}
