"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore, CartItem } from "@/store/cart";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export function AddToCartButton({
    product,
    variant,
    className
}: {
    product: any,
    variant?: any,
    className?: string
}) {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsAdding(true);

        // Default to first variant if not provided
        const selectedVariant = variant || (product.variants && product.variants[0]);

        if (!selectedVariant) {
            toast.error("Product unavailable");
            setIsAdding(false);
            return;
        }

        const price = selectedVariant.additionalPrice
            ? (parseFloat(product.basePrice) + parseFloat(selectedVariant.additionalPrice)).toFixed(2)
            : product.basePrice;

        const item: CartItem = {
            variantId: selectedVariant.id,
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price: price,
            image: selectedVariant.images?.[0]?.url || "/placeholder.svg",
            color: selectedVariant.colorName,
            quantity: 1,
        };

        addItem(item);
        toast.success("Added to cart");

        setTimeout(() => setIsAdding(false), 500);
    };

    return (
        <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={cn(className, "rounded-none bg-black h-12")}
        >
            {isAdding ? "Adding..." : (
                <div className="flex items-center justify-between w-full">
                    <div />
                    Add to Cart
                    <Image src={"/icons/ic-shoppingbag-white.svg"} height={20} width={20} alt="shopping-bag" className="text-white  " />
                </div>
            )}
        </Button>
    );
}
