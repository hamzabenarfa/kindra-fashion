"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import ProductCard from "./product-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Product {
  name: string
  price: string
  colors: string[]
  image: string
}

interface LastChanceSectionProps {
  products: Product[]
}

export default function LastChanceSection({ products }: LastChanceSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollToNext = () => {
    if (carouselRef.current) {
      const newIndex = Math.min(currentIndex + 1, products.length - 1)
      setCurrentIndex(newIndex)
      carouselRef.current.scrollTo({
        left: newIndex * carouselRef.current.offsetWidth,
        behavior: "smooth",
      })
    }
  }

  const scrollToPrev = () => {
    if (carouselRef.current) {
      const newIndex = Math.max(currentIndex - 1, 0)
      setCurrentIndex(newIndex)
      carouselRef.current.scrollTo({
        left: newIndex * carouselRef.current.offsetWidth,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft
      const itemWidth = carouselRef.current.offsetWidth
      const newIndex = Math.round(scrollPosition / itemWidth)
      setCurrentIndex(newIndex)
    }
  }

  return (
    <motion.section
      className="py-16 px-8 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-serif text-3xl mb-2">LAST CHANCE</h2>
        <p className="text-sm">Yours if you're fast enough</p>
      </motion.div>

      {/* Mobile Carousel View */}
      <div className="relative md:hidden">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
          onScroll={handleScroll}
        >
          {products.map((product, index) => (
            <div key={index} className="min-w-full w-full flex-shrink-0 snap-center px-2">
              <ProductCard
                name={product.name}
                price={product.price}
                colors={product.colors}
                image={product.image}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={scrollToPrev}
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10 ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={scrollToNext}
          className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10 ${currentIndex === products.length - 1 ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
          disabled={currentIndex === products.length - 1}
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 gap-1.5">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                carouselRef.current?.scrollTo({
                  left: index * carouselRef.current.offsetWidth,
                  behavior: "smooth",
                })
              }}
              className={`h-2 w-2 rounded-full ${currentIndex === index ? "bg-black" : "bg-gray-300"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            colors={product.colors}
            image={product.image}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  )
}
