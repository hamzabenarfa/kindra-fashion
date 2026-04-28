"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: string;
  colors: string[];
  image: string;
  index: number;
}

export default function ProductCard({
  name,
  price,
  colors,
  image,
  index,
}: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
  };

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative bg-gray-100 aspect-[3/4] mb-3">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={300}
          height={400}
          className="object-cover w-full h-full"
        />
        <button
          className="absolute top-2 cursor-pointer right-2 text-dark hover:scale-110 transition-transform"
          onClick={toggleFavorite}
          aria-label={
            isFavorited ? "Remove from favorites" : "Add to favorites"
          }
        >
          <Heart
            className="transition-colors duration-300"
            fill={isFavorited ? "dark" : "none"}
            size={24}
          />
        </button>
      </div>
      <div className="flex space-x-1 mb-2">
        {colors.map((color, i) => (
          <div
            key={i}
            className={`w-4 h-4 ${color} border border-gray-300`}
          ></div>
        ))}
      </div>
      <h3 className="text-sm font-medium">{name}</h3>
      <p className="text-sm">{price}</p>
    </motion.div>
  );
}
