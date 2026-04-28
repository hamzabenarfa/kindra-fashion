"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Link from "next/link"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"

// Interfaces removed as we are using 'any' for flexibility with DB types for now
// In a real app, we should define a proper type that matches the DB schema + transformed fields

export function ProductCarousel({ product, variant = "default" }: { product: any, variant?: "default" | "men" }) {
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [api, setApi] = useState<CarouselApi>()

  // Handle case where product might be undefined or missing variants
  if (!product || !product.variants || product.variants.length === 0) {
    return null;
  }

  const productVariant = product.variants[selectedVariant]

  // Map images from DB structure (array of objects) or fallback to string array if legacy
  const images = productVariant.images.map((img: any) => typeof img === 'string' ? img : img.imageUrl || img.url);
  console.log("ProductCarousel Images:", images);

  const section = product.section || product.subcategory?.category?.section;
  const categorySlug = product.category || product.subcategory?.category?.slug;

  const productHref = section && categorySlug ? `${section}/${categorySlug}/${product.slug}` : `product/${product.slug}`;
  const price = typeof product.basePrice === 'string' ? parseFloat(product.basePrice) : product.price;

  useEffect(() => {
    if (!api) return
    const handleSelect = () => {
      setCurrentImage(api.selectedScrollSnap())
    }
    api.on("select", handleSelect)
    setCurrentImage(api.selectedScrollSnap())
    return () => {
      api.off("select", handleSelect)
    }
  }, [api])

  const handleIndicatorClick = (index: number) => {
    if (api) {
      api.scrollTo(index)
      setCurrentImage(index)
    }
  }

  return (
    <div>
      <div className="relative overflow-hidden">
        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 rounded-full bg-transparent hover:bg-transparent"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={cn("size-6", isFavorite ? "fill-black stroke-black" : "stroke-black fill-none")} />
        </Button>

        {/* Image carousel */}
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {images.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <Link href={`/${productHref}`}>
                  <div className={cn("relative", variant === "default" ? "aspect-square" : "aspect-[1/2]")}>
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} in ${productVariant.colorName} - view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-1 mx-auto  w-full absolute bottom-2 ">
          {images.map((_: any, index: number) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentImage === index ? "bg-black w-3" : "bg-gray-300",
              )}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Color variants */}
      <div className="flex gap-2 mt-1.5">
        {product.variants.map((variantOption: any, index: number) => (
          <button
            key={index}
            className={cn(
              "size-5 z border transition-all",
              selectedVariant === index ? "ring-1 ring-black " : "border-gray-300",
            )}
            style={{ backgroundColor: variantOption.color }}
            onClick={() => {
              setSelectedVariant(index)
              setCurrentImage(0)
              if (api) {
                api.scrollTo(0)
              }
            }}
            aria-label={`Select ${variantOption.colorName} color`}
          />
        ))}
      </div>

      {/* Product info */}
      <div className="mt-2">
        <h3 className="text-sm font-normal text-[#6F6F6F]">{product.name}</h3>
        <p className="text-sm font-semibold">
          {price.toFixed(2)} {product.currency}
        </p>
        <div className="mt-2">
          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              basePrice: product.basePrice?.toString() || product.price?.toString(),
            }}
            variant={{
              id: productVariant.id,
              colorName: productVariant.colorName,
              images: images.map((url: string) => ({ url })),
              additionalPrice: productVariant.additionalPrice || "0"
            }}
            className="w-full text-xs h-8"
          />
        </div>
      </div>
    </div>
  )
}
