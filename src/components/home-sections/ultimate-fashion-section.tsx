"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function UltimateFashionSection() {
  return (
    <motion.section
      className="py-16 px-8 max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-32 h-32 relative"
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path
              d="M50,10 A40,40 0 1,1 49.9,10"
              fill="none"
              stroke="transparent"
              id="circlePath"
            />
            <text>
              <textPath
                href="#circlePath"
                startOffset="0%"
                className="text-[10px] uppercase tracking-widstr"
              >
                ultimate fashion for the season • ultimate fashion for the
              </textPath>
            </text>
          </svg>
        </motion.div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <motion.h2
          className="font-sans font-semibold text-center text-[#252525] tracking-wide text-4xl lg:text-5xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your ultimate
          <br />
          fashion outfits
        </motion.h2>

        <motion.p
          className=" text-xl text-center lg:text-sm mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Meet your new capsule wardrobe —<br />
          modern, wearable, made for now
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="  w-full "
        >
          <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#style"
              className="border border-black py-2 px-4 inline-flex items-center justify-center  w-full   transition-colors hover:bg-black hover:text-white"
            >
              STYLE IS WAITING <span className="ml-2">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div />
    </motion.section>
  );
}
