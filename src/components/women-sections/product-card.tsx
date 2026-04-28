"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"

interface Product {
  id: number
  name: string
  price: string
  image: string
  colors: string[]
  type: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)

  return (
    <div className="group relative">
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        <button
          className="absolute top-3 right-3 z-10"
          onClick={() => setIsWishlisted(!isWishlisted)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-6 h-6 transition-colors ${isWishlisted ? "fill-black stroke-black" : "stroke-black fill-transparent"}`}
          />
        </button>

        {/* Image pagination dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-black" : "bg-gray-400"}`}></div>
          ))}
        </div>
      </div>

      {/* Color options */}
      <div className="mt-3 flex space-x-1">
        {product.colors.map((color, index) => (
          <button
            key={index}
            className={`w-5 h-5 rounded-sm ${index === selectedColorIndex ? "ring-1 ring-black" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColorIndex(index)}
            aria-label={`Select color ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Product info */}
      <div className="mt-2">
        <h3 className="text-sm text-gray-700">{product.name}</h3>
        <p className="font-medium">{product.price} TND</p>
      </div>
    </div>
  )
}
