"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface AnimatedProductImagesProps {
  images: string[]
}

export function AnimatedProductImages({ images }: AnimatedProductImagesProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap my-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex w-max space-x-10 py-8"
      >
        {images.map((artwork, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="overflow-hidden h-[600px] w-[400px]"
          >
            <Image
              src={artwork || "/placeholder.svg"}
              alt={`Photo ${index + 1}`}
              className="h-full w-full object-cover"
              width={400}
              height={600}
            />
          </motion.div>
        ))}
      </motion.div>
      <ScrollBar orientation="horizontal" className="" />
    </ScrollArea>
  )
}
