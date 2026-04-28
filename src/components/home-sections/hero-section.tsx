"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { amoria, seasons } from "@/fonts/font";
interface HeroSectionProps {
  leftImage: string;
  rightImage: string;
}

export default function HeroSection({
  leftImage,
  rightImage,
}: HeroSectionProps) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

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
      ref={heroRef}
      className="grid   lg:grid-rows-1 lg:grid-cols-3 lg:h-[700px]  "
      initial="hidden"
      animate={heroInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <motion.div
        className="col-span-1 bg-[#fcfcfc] overflow-hidden"
        variants={fadeInUp}
      >
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          className="h-full w-full"
        >
          <Image
            src={leftImage || "/placeholder.svg"}
            alt="Fashion model in black shirt"
            width={400}
            height={500}
            className="object-cover h-full w-full"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="col-span-1 py-10  bg-[#252525] flex flex-col  items-center justify-center text-white text-center "
        variants={fadeInUp}
      >
        <motion.h1
          className={`hidden lg:block font-serif text-7xl leading-tight mb-4 ${seasons.className}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          For the
          <br />
          Ones Who
          <br />
          Define
          <br />
          Style
        </motion.h1>

        <motion.h1
          className={` lg:hidden block font-serif text-3xl leading-tight mb-4 ${seasons.className}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          For the Ones
          <br />
          Who Define Style
        </motion.h1>

        <motion.p
          className="hidden lg:block text-3xl tracking-wide font-light italic mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Dress sharp. Live
          <br />
          effortless
        </motion.p>

        <motion.p
          className=" lg:hidden block text-xl tracking-wide font-light italic "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Dress sharp. Live effortless
        </motion.p>
      </motion.div>

      <motion.div
        className="col-span-1 bg-[#d9d9d9] overflow-hidden"
        variants={fadeInUp}
      >
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          className="h-full w-full"
        >
          <Image
            src={rightImage || "/placeholder.svg"}
            alt="Fashion model in gray blazer"
            width={400}
            height={500}
            className="object-cover h-full w-full"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
