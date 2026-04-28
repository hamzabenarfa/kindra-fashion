"use client";

import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Minus, Plus, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
    const { items, updateQuantity, removeItem } = useCartStore();
    const [promoCode, setPromoCode] = useState("");
    const [shippingOpen, setShippingOpen] = useState(false);
    const [returnOpen, setReturnOpen] = useState(false);
    const [secureOpen, setSecureOpen] = useState(false);

    const subtotal = items.reduce((acc, item) => {
        return acc + parseFloat(item.price) * item.quantity;
    }, 0);

    const shippingCost = subtotal >= 200 ? 0 : 0; // Free shipping
    const salesTax = 0;
    const total = subtotal + shippingCost + salesTax;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                <p className="mb-8 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild>
                    <Link href="/">Continue Shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
                    {/* Left Column - Cart Items */}
                    <div className="space-y-6">
                        {items.map((item) => (
                            <div key={item.variantId} className="flex gap-6 pb-6 border-b border-gray-200">
                                {/* Product Image */}
                                <div className="relative h-48 w-36 flex-shrink-0 overflow-hidden bg-gray-100">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover object-center"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                                            <span className="text-gray-400 text-sm">No image</span>
                                        </div>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between mb-2">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 uppercase tracking-wide">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">{item.price.split('.')[0]}.00TND</p>
                                        </div>
                                    </div>

                                    {/* Color Selector */}
                                    <div className="mt-3">
                                        <label className="text-xs font-medium text-gray-700 block mb-2">Color</label>
                                        <div className="flex gap-2">
                                            {/* Display selected color - in a real app, you'd have all available colors */}
                                            <div
                                                className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer"
                                                style={{ backgroundColor: item.color?.toLowerCase() || '#000' }}
                                                title={item.color}
                                            />
                                            {/* Example additional colors - static for now */}
                                            <div className="w-6 h-6 rounded-full border border-gray-200 bg-gray-200 opacity-40" />
                                            <div className="w-6 h-6 rounded-full border border-gray-200 bg-blue-300 opacity-40" />
                                        </div>
                                    </div>

                                    {/* Size Selector */}
                                    <div className="mt-4">
                                        <label className="text-xs font-medium text-gray-700 block mb-2">Size</label>
                                        <Select value={item.size || "37"} disabled>
                                            <SelectTrigger className="w-32">
                                                <SelectValue placeholder="Size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="37">37</SelectItem>
                                                <SelectItem value="38">38</SelectItem>
                                                <SelectItem value="39">39</SelectItem>
                                                <SelectItem value="40">40</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Quantity and Delete */}
                                    <div className="flex items-center justify-between mt-auto pt-4">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center border border-gray-300 rounded">
                                            <button
                                                className="p-2 hover:bg-gray-50 transition-colors"
                                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="px-4 text-sm font-medium min-w-[40px] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                className="p-2 hover:bg-gray-50 transition-colors"
                                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* Delete Button */}
                                        <button
                                            type="button"
                                            className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                                            onClick={() => removeItem(item.variantId)}
                                        >
                                            DELETE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:sticky lg:top-8 h-fit">
                        <div className="bg-white border border-gray-200 p-6">
                            {/* Header */}
                            <h2 className="text-sm font-medium tracking-wider mb-6">
                                SHOPPING BAG ({items.length})
                            </h2>

                            {/* Total */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm font-medium">TOTAL</span>
                                    <span className="text-2xl font-bold">{total.toFixed(2)}TND</span>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="mb-6">
                                <Input
                                    type="text"
                                    placeholder="ENTER PERSONAL CODE"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    className="bg-gray-50 border-gray-300 text-sm placeholder:text-gray-400"
                                />
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">SUB TOTAL</span>
                                    <span className="font-medium">{subtotal.toFixed(2)}TND</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">SHIPPING COST</span>
                                    <span className="font-medium text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">SALES TAX</span>
                                    <span className="font-medium">{salesTax.toFixed(2)}TND</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <Button
                                className="w-full bg-black hover:bg-gray-900 text-white h-12 text-sm font-medium tracking-wider mb-6"
                                asChild
                            >
                                <Link href="/checkout/shipping">CHECKOUT</Link>
                            </Button>

                            {/* Payment Icons */}
                            <div className="flex items-center justify-center gap-3 mb-6 pb-6 border-b border-gray-200 flex-wrap">
                                <Image src="/payment/master.svg" alt="Mastercard" width={40} height={24} className="opacity-70" />
                                <Image src="/payment/GooglePay.png" alt="Google Pay" width={40} height={24} className="opacity-70" />
                                <Image src="/payment/visa.png" alt="Visa" width={40} height={24} className="opacity-70" />
                                <Image src="/payment/Discover.png" alt="Discover" width={40} height={24} className="opacity-70" />
                            </div>

                            {/* Collapsible Sections */}
                            <div className="space-y-4">
                                {/* Shipping Details */}
                                <Collapsible open={shippingOpen} onOpenChange={setShippingOpen}>
                                    <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium hover:text-gray-700 transition-colors">
                                        <span>SHIPPING DETAILS</span>
                                        <ChevronDown className={`h-4 w-4 transition-transform ${shippingOpen ? 'rotate-180' : ''}`} />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pt-3 text-sm text-gray-600">
                                        Free shipping on orders over 200 TND. Standard delivery takes 3-5 business days.
                                    </CollapsibleContent>
                                </Collapsible>

                                {/* Return Policy */}
                                <Collapsible open={returnOpen} onOpenChange={setReturnOpen}>
                                    <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium hover:text-gray-700 transition-colors">
                                        <span>RETURN POLICY</span>
                                        <ChevronDown className={`h-4 w-4 transition-transform ${returnOpen ? 'rotate-180' : ''}`} />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pt-3 text-sm text-gray-600">
                                        Returns accepted within 30 days of delivery. Items must be unworn and in original packaging.
                                    </CollapsibleContent>
                                </Collapsible>

                                {/* Secure Shopping */}
                                <Collapsible open={secureOpen} onOpenChange={setSecureOpen}>
                                    <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium hover:text-gray-700 transition-colors">
                                        <span>SECURE SHOPPING</span>
                                        <ChevronDown className={`h-4 w-4 transition-transform ${secureOpen ? 'rotate-180' : ''}`} />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pt-3 text-sm text-gray-600">
                                        Your payment information is processed securely. We use SSL encryption to protect your data.
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
