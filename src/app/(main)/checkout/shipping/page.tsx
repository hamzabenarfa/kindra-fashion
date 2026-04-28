"use client";

import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { createCheckoutSessionAction } from "../actions";
import { useRouter } from "next/navigation";

export default function ShippingPage() {
    const { items } = useCartStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        phone: "",
        country: "",
        city: "",
        postalCode: "",
        address: "",
    });

    const total = items.reduce((acc, item) => {
        return acc + parseFloat(item.price) * item.quantity;
    }, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validate form
            const requiredFields = Object.entries(formData);
            for (const [key, value] of requiredFields) {
                if (!value.trim()) {
                    toast.error(`Please fill in ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                    setIsLoading(false);
                    return;
                }
            }

            // Create checkout session with shipping info
            const result = await createCheckoutSessionAction(items, formData);

            if (result?.url) {
                window.location.href = result.url;
            } else {
                toast.error("Failed to create checkout session");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    if (items.length === 0) {
        router.push("/checkout");
        return null;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Top Banner */}
            <div className="bg-black text-white text-center py-3">
                <p className="text-xs tracking-wide">FREE SHIPPING STARTING FROM 200 TND PURCHASE</p>
            </div>

            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="grid lg:grid-cols-[1fr_350px] gap-8 lg:gap-12">
                    {/* Left Column - Form */}
                    <div className="space-y-8">
                        {/* Personal Information */}
                        <div>
                            <h2 className="text-lg font-semibold mb-6 tracking-wide">PERSONAL INFORMATION</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="phone" className="text-xs font-semibold text-gray-700 uppercase">
                                        Phone*
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="PHONE"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="mt-2 uppercase placeholder:text-gray-400 bg-white border-gray-300"
                                    />
                                </div>

                                {/* Shipping Information */}
                                <div className="pt-6">
                                    <h2 className="text-lg font-semibold mb-6 tracking-wide">SHIPPING INFORMATION</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <Label htmlFor="country" className="text-xs font-semibold text-gray-700 uppercase">
                                                Country*
                                            </Label>
                                            <Input
                                                id="country"
                                                type="text"
                                                placeholder="COUNTRY"
                                                value={formData.country}
                                                onChange={handleChange}
                                                required
                                                className="mt-2 uppercase placeholder:text-gray-400 bg-white border-gray-300"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="city" className="text-xs font-semibold text-gray-700 uppercase">
                                                City*
                                            </Label>
                                            <Input
                                                id="city"
                                                type="text"
                                                placeholder="CITY"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                                className="mt-2 uppercase placeholder:text-gray-400 bg-white border-gray-300"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="postalCode" className="text-xs font-semibold text-gray-700 uppercase">
                                                Postal Code*
                                            </Label>
                                            <Input
                                                id="postalCode"
                                                type="text"
                                                placeholder="POSTAL CODE"
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                required
                                                className="mt-2 uppercase placeholder:text-gray-400 bg-white border-gray-300"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="address" className="text-xs font-semibold text-gray-700 uppercase">
                                                Complete Address*
                                            </Label>
                                            <Input
                                                id="address"
                                                type="text"
                                                placeholder="COMPLETE ADDRESS"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                                className="mt-2 uppercase placeholder:text-gray-400 bg-white border-gray-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit button - only on mobile */}
                                <div className="lg:hidden">
                                    <Button
                                        type="submit"
                                        className="w-full bg-black hover:bg-gray-900 text-white h-12 text-sm font-medium tracking-wider"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "PROCESSING..." : "CONTINUE"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:sticky lg:top-8 h-fit">
                        <div className="bg-white border border-gray-200 p-6">
                            {/* Header */}
                            <div className="mb-6">
                                <h3 className="text-xs font-medium tracking-wider text-gray-600 mb-2">
                                    ITEMS ({items.length})
                                </h3>
                                <div className="flex justify-between items-baseline border-b border-gray-200 pb-4">
                                    <span className="text-sm font-medium">TOTAL</span>
                                    <span className="text-2xl font-bold">{total.toFixed(2)}TND</span>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.variantId} className="flex gap-3">
                                        {/* Product Image */}
                                        <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-gray-100">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover object-center"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                                                    <span className="text-gray-400 text-xs">No image</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 text-xs">
                                            <h4 className="font-medium text-gray-900 uppercase mb-1 leading-tight">
                                                {item.name}
                                            </h4>
                                            <p className="text-gray-600 mb-1">KIND:29A</p>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-gray-600">COLOR:</span>
                                                <div
                                                    className="w-3 h-3 rounded-full border border-gray-300"
                                                    style={{ backgroundColor: item.color?.toLowerCase() || '#000' }}
                                                />
                                            </div>
                                            <p className="text-gray-600">SIZE: {item.size || "37"}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Continue Button - Desktop only */}
                            <div className="hidden lg:block">
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="w-full bg-black hover:bg-gray-900 text-white h-12 text-sm font-medium tracking-wider"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "PROCESSING..." : "CONTINUE"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
