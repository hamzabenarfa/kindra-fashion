"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useCartStore, CartItem } from "@/store/cart";

interface ProductVariant {
  id: number;
  color: string | null;
  colorName: string | null;
  size: string | null;
  images: string[];
}

interface StickyProductMenuProps {
  productId: number;
  productSlug: string;
  name: string;
  price: number;
  currency: string;
  reference: string;
  variants: ProductVariant[];
  defaultVariant: ProductVariant;
}

export function StickyProductMenu({
  productId,
  productSlug,
  name,
  price,
  currency,
  reference,
  variants,
  defaultVariant,
}: StickyProductMenuProps) {
  const addItem = useCartStore((state) => state.addItem);

  const [selectedColor, setSelectedColor] = React.useState(
    defaultVariant.colorName || ""
  );
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);

  // Extract unique colors
  const uniqueColors = React.useMemo(() => {
    const colorsMap = new Map<string, { color: string; colorName: string }>();
    variants.forEach((v) => {
      if (v.color && v.colorName && !colorsMap.has(v.colorName)) {
        colorsMap.set(v.colorName, { color: v.color, colorName: v.colorName });
      }
    });
    return Array.from(colorsMap.values());
  }, [variants]);

  // Get available sizes based on selected color
  const availableSizes = React.useMemo(() => {
    const filteredVariants = variants.filter(
      (v) => !selectedColor || v.colorName === selectedColor
    );
    return [...new Set(filteredVariants.map((v) => v.size).filter(Boolean))];
  }, [variants, selectedColor]);

  // Find the selected variant
  const selectedVariant = React.useMemo(() => {
    return variants.find(
      (v) =>
        (!selectedColor || v.colorName === selectedColor) &&
        (!selectedSize || v.size === selectedSize)
    );
  }, [variants, selectedColor, selectedSize]);

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const cartItem: CartItem = {
      variantId: selectedVariant.id,
      productId,
      name,
      slug: productSlug,
      price: price.toString(),
      image: selectedVariant.images[0],
      color: selectedVariant.colorName || undefined,
      size: selectedVariant.size || undefined,
      quantity: 1,
    };

    addItem(cartItem);
  };

  const isAddToCartDisabled = availableSizes.length > 0 && !selectedSize;

  return (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur-lg flex flex-col lg:flex-row lg:items-center justify-between w-full border-t border-[#eaeaea] p-6 lg:px-10 z-50 h-fit">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="text-xl font-medium capitalize">{name}</div>
            <h1 className="text-xl lg:hidden block font-bold">
              {price.toFixed(2)}
              {currency}
            </h1>
          </div>
        </div>
        <div className="text-xs text-[#818181]">
          {selectedColor} | Ref: {reference}
        </div>

        {uniqueColors.length > 0 && (
          <div className="flex flex-col mt-2">
            <div className="flex gap-2">
              {uniqueColors.map((variant, index) => (
                <button
                  key={index}
                  className={`w-6 h-6 border hover:border-[#222222] focus:outline-none focus:ring-2 focus:ring-[#222222] ${selectedColor === variant.colorName
                    ? "border-[#222222] border-2"
                    : "border-[#eaeaea]"
                    }`}
                  style={{ backgroundColor: variant.color }}
                  aria-label={`Select ${variant.colorName} color`}
                  onClick={() => {
                    setSelectedColor(variant.colorName);
                    setSelectedSize(null); // Reset size when color changes
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <h1 className="text-2xl hidden lg:block font-bold">
        {price.toFixed(2)}
        {currency}
      </h1>

      {availableSizes.length > 0 && (
        <div className="flex flex-col gap-1 py-2">
          <p className="text-xs text-[#818181]">Size:</p>
          <div className="flex gap-2 justify-between overflow-x-auto md:overflow-visible">
            {availableSizes.map((size) => (
              <button
                key={size}
                className={`border py-1 px-2 text-sm min-w-[40px] focus:outline-none ${selectedSize === size
                  ? "border-[#222222] bg-[#222222] text-white"
                  : "border-[#eaeaea] hover:border-[#222222]"
                  }`}
                onClick={() => setSelectedSize(size!)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button
        size={"lg"}
        className="bg-[#222222] hover:bg-[#000000] text-white rounded-none py-5 px-8"
        disabled={isAddToCartDisabled}
        onClick={handleAddToCart}
      >
        ADD TO BAG
      </Button>
    </div>
  );
}
