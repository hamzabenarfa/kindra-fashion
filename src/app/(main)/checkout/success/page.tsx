"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
    const clearCart = useCartStore((state) => state.clearCart);
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        if (sessionId) {
            clearCart();
        }
    }, [sessionId, clearCart]);

    return (
        <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mb-8">
                <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md">
                Thank you for your purchase. Your order has been received and is being processed.
            </p>

            {sessionId && (
                <p className="text-sm text-gray-500 mb-8">
                    Order Reference: {sessionId.slice(-8)}
                </p>
            )}

            <div className="flex gap-4">
                <Button asChild size="lg">
                    <Link href="/">Continue Shopping</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href="/orders">View Orders</Link>
                </Button>
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mb-8">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
                <p className="text-xl text-gray-600 mb-8 max-w-md">
                    Loading order details...
                </p>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
