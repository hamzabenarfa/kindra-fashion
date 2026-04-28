"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/util/currency"; // Assuming utility exists or I'll create it inline for now

export function CartSheet() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity } = useCartStore();

    const total = items.reduce((acc, item) => {
        return acc + parseFloat(item.price) * item.quantity;
    }, 0);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                    <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                            <ShoppingBag className="h-12 w-12" />
                            <p>Your cart is empty</p>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={`${item.variantId}`} className="flex gap-4">
                                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover object-center"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                                            <ShoppingBag className="h-8 w-8 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <Link href={`/product/${item.slug}`} onClick={() => setIsOpen(false)}>
                                                    {item.name}
                                                </Link>
                                            </h3>
                                            <p className="ml-4">{item.price} TND</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {item.color} {item.size ? `| ${item.size}` : ""}
                                        </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center border rounded-md">
                                            <button
                                                className="p-1 hover:bg-gray-100"
                                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="px-2">{item.quantity}</span>
                                            <button
                                                className="p-1 hover:bg-gray-100"
                                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            className="font-medium text-red-600 hover:text-red-500"
                                            onClick={() => removeItem(item.variantId)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-gray-200 pt-6 space-y-4">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>{total.toFixed(2)} TND</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                            <Button className="w-full border-none" asChild>
                                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                                    Checkout
                                </Link>
                            </Button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or{" "}
                                <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </p>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
