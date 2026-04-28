"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import AnimatedButton from "@/components/ui/animated-button";
import AnimatedImage from "@/components/ui/animated-image";
import { aboreto } from "@/fonts/font";

export default function WearItSection() {
  const wearItRef = useRef(null);
  const wearItInView = useInView(wearItRef, { once: true, amount: 0.3 });

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      ref={wearItRef}
      className="py-20 px-8 grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl mx-auto"
      initial="hidden"
      animate={wearItInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <motion.div
        className="md:col-span-3 flex flex-col-reverse lg:flex-col  justify-center"
        variants={staggerContainer}
      >
        <div>
          <motion.h2
            className={`font-serif leading-tight mb-4 text-4xl lg:text-5xl ${aboreto.className}`}
            variants={fadeInUp}
          >
            WEAR IT <br className="hidden lg:block" />
            YOUR <br className="hidden lg:block" />
            WAY
          </motion.h2>
          <motion.p className="text-sm mb-6" variants={fadeInUp}>
            Explore the new men's collection <br className="hidden lg:block" />
            tailored essentials, relaxed fits,{" "}
            <br className="hidden lg:block" />
            made for everyday confidence.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <AnimatedButton href="#wardrobe" className=" w-full lg:w-fit mb-8">
              Refine Your Wardrobe →
            </AnimatedButton>
          </motion.div>
        </div>
        <div className="flex flex-row gap-4 justify-center">
          <AnimatedImage
            src="/Home-MenSection/shoe.png"
            alt="Casual shoes"
            width={150}
            height={150}
            containerClassName="rounded-full overflow-hidden mt-20 mb-4"
          />

          <AnimatedImage
            src="/Home-MenSection/bag.png"
            alt="Leather bag"
            width={150}
            height={150}
            containerClassName="rounded-full overflow-hidden "
          />
        </div>
      </motion.div>

      <motion.div
        className="md:col-span-6 flex items-center justify-center"
        variants={fadeInUp}
      >
        <Image
          src="/Home-MenSection/menn.png"
          alt="Male model in casual outfit"
          width={400}
          height={600}
          className="object-cover h-full lg:w-1/2"
        />
      </motion.div>

      <motion.div
        className="md:col-span-3 flex flex-col-reverse lg:flex-col justify-center relative"
        variants={staggerContainer}
      >
        <div className="flex flex-row gap-4 justify-center">
          <AnimatedImage
            src="/Home-MenSection/sebta.png"
            alt="Leather belt"
            width={150}
            height={150}
            containerClassName=" overflow-hidden "
          />

          <AnimatedImage
            src="/Home-MenSection/lunette.jpg"
            alt="Sunglasses"
            width={150}
            height={150}
            containerClassName="rounded-full overflow-hidden  mt-20 mb-4"
          />
        </div>

        <motion.div
          className="lg:absolute top-60 right-50 hidden "
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 45 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Image src="/star.svg" alt="Star" width={100} height={100} />
        </motion.div>

        <motion.p className="text-sm mb-8" variants={fadeInUp}>
          This season's men's drop is <br className=" hidden lg:block" />
          all about bold textures and <br className=" hidden lg:block" />
          wearable luxury
        </motion.p>

        <motion.h3
          className={`font-serif leading-tight tracking-tight mb-4 text-4xl lg:text-5xl ${aboreto.className}`}
          variants={fadeInUp}
        >
          ELEVATE <br className=" hidden lg:block" />
          YOUR <br className=" hidden lg:block" />
          LOOK
        </motion.h3>
      </motion.div>
    </motion.section>
  );
}
