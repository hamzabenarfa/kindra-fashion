"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface GalleryItem {
  src: string;
  alt: string;
}

interface FashionGallerySectionProps {
  leftItems: string[];
  rightItems: string[];
  images: GalleryItem[];
}

export default function FashionGallerySection({
  leftItems,
  rightItems,
  images,
}: FashionGallerySectionProps) {
  return (
    <div className="flex justify-center items-center w-full py-12 px-4 bg-white">
      <motion.section
        className="w-full max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4  justify-center mx-auto p-4">
          {/* Left Sidebar Text + Image */}
          <motion.div
            className="row-span-2 space-y-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {leftItems.map((item, index) => (
                <p
                  key={index}
                  className="italic text-5xl lg:text-2xl font-medium "
                >
                  {item}
                </p>
              ))}
              <div className="lg:border-t-4 border-black flex items-center justify-center mt-2"></div>
            </motion.div>

            <Image
              src={images[0]?.src || "/placeholder.svg"}
              alt={images[0]?.alt || "Placeholder"}
              width={250}
              height={300}
              className="object-cover w-full h-auto "
            />
          </motion.div>

          {/* Two stacked images on the left of center */}
          <motion.div
            className="row-span-2 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <Image
              src={images[1]?.src || "/placeholder.svg"}
              alt={images[1]?.alt || "Placeholder"}
              width={250}
              height={200}
              className="object-cover w-full h-auto mt-4"
            />
            <Image
              src={images[2]?.src || "/placeholder.svg"}
              alt={images[2]?.alt || "Placeholder"}
              width={250}
              height={200}
              className="object-cover w-full h-auto mb-20"
            />
          </motion.div>

          {/* Center large image */}
          <motion.div
            className="row-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <Image
              src={images[3]?.src || "/placeholder.svg"}
              alt={images[3]?.alt || "Placeholder"}
              width={250}
              height={400}
              className="object-cover w-full h-full "
            />
          </motion.div>

          {/* Two stacked images on the right of center */}
          <motion.div
            className="row-span-2 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <Image
              src={images[4]?.src || "/placeholder.svg"}
              alt={images[4]?.alt || "Placeholder"}
              width={250}
              height={200}
              className="object-cover w-full h-auto mt-20"
            />
            <Image
              src={images[5]?.src || "/placeholder.svg"}
              alt={images[5]?.alt || "Placeholder"}
              width={250}
              height={200}
              className="object-cover w-full h-auto "
            />
          </motion.div>

          {/* Right Sidebar Image + Text */}
          <motion.div
            className="row-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Image
              src={images[6]?.src || "/placeholder.svg"}
              alt={images[6]?.alt || "Placeholder"}
              width={250}
              height={300}
              className="object-cover w-full h-auto "
            />

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {rightItems.map((item, index) => (
                <p
                  key={index}
                  className="italic text-5xl lg:text-2xl  text-center lg:text-left font-medium"
                >
                  {item}
                </p>
              ))}
              <div className="hiddden lg:border-t-4 border-black w-24 mt-2"></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
