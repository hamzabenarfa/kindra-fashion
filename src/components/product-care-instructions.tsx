"use client"

import { useState } from "react"
import Image from "next/image"

export default function ProductCareInstructions({ img = "/placeholder.svg?key=upcuc" }) {
  const [hoverInstruction, setHoverInstruction] = useState<number | null>(null)

  const careInstructions = [
    {
      icon: "/clothes-icons/ic-wash.svg",
      label: "Machine Wash",
      description: "Do not wach",
    },
    {
      icon: "/clothes-icons/ic-iron.svg",
      label: "Do Not Iron",
      description: "Do not iron",
    },

    {
      icon: "/clothes-icons/ic-bleach.svg",
      label: "No Bleach",
      description: "Do not bleach",
    },
    {
      icon: "/clothes-icons/ic-tumble.svg",
      label: "Tumble Dry Low",
      description: "do not tumble dry",
    },
    {
      icon: "/clothes-icons/ic-dryclean.svg",
      label: "No Dry Cleaning",
      description: "Do not dry clean",
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-6">
        <Image src={img || "/placeholder.svg"} alt="White sneaker" width={300} height={300} className="object-fit" />
      </div>

      <div className="">
        <div className="flex justify-between items-center">
          {careInstructions.map((instruction, index) => (
            <button
              key={index}
              className={`p-2 rounded-full transition-all duration-200 ${
                hoverInstruction === index ? " scale-110" : ""
              }`}
              onMouseEnter={() => setHoverInstruction(index)}
              onMouseLeave={() => setHoverInstruction(null)}
              aria-label={instruction.label}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src={instruction.icon || "/placeholder.svg"}
                  alt={instruction.label}
                  width={24}
                  height={24}
                  className={`opacity-80 transition-opacity duration-200 ${
                    hoverInstruction === index ? "opacity-100" : ""
                  }`}
                />
              </div>
            </button>
          ))}
        </div>

        {hoverInstruction !== null ? (
          <div className="rounded-lg animate-fadeIn transition-all duration-200">
            <p className="text-gray-600 text-xs  uppercase">{careInstructions[hoverInstruction].description}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
