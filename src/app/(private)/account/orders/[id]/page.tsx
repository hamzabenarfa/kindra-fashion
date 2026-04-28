import { getOrderUseCase } from "@/use-cases/orders";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package } from "lucide-react";
import { notFound } from "next/navigation";

export default async function OrderDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const orderId = parseInt(id);

    if (isNaN(orderId)) {
        notFound();
    }

    let order: any;
    try {
        order = await getOrderUseCase(orderId);
    } catch (error) {
        notFound();
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/account/orders">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Order #{order.id}</h1>
                    <p className="text-muted-foreground">
                        Placed on {format(order.createdAt, "MMMM d, yyyy 'at' h:mm a")}
                    </p>
                </div>
            </div>

            {/* Order Status */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Order Status</CardTitle>
                        <Badge
                            variant={
                                order.status === "delivered"
                                    ? "default"
                                    : order.status === "cancelled"
                                        ? "destructive"
                                        : "secondary"
                            }
                        >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Order Number</p>
                            <p className="text-lg font-semibold">{order.orderNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Payment ID</p>
                            <p className="text-lg font-semibold">{order.paymentId || "N/A"}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
                <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                    <CardDescription>{order.items.length} item(s)</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {order.items.map((item: any) => (
                            <div key={item.id} className="flex gap-4 items-center border-b pb-4 last:border-0 last:pb-0">
                                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                                    <Image
                                        src={item.variant?.images[0]?.imageUrl || "/placeholder.svg"}
                                        alt={item.productName}
                                        fill
                                        className="object-cover object-center"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium">{item.productName}</h4>
                                    {item.variantName && (
                                        <p className="text-sm text-muted-foreground">{item.variantName}</p>
                                    )}
                                    <p className="text-sm text-muted-foreground">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{item.priceAtPurchase} TND</p>
                                    <p className="text-sm text-muted-foreground">
                                        Subtotal: {item.subtotal} TND
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{order.subtotal} TND</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>{order.shipping} TND</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>{order.tax} TND</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>{order.total} TND</span>
                    </div>
                </CardContent>
            </Card>

            {/* Shipping Address */}
            {order.shippingAddress && (
                <Card>
                    <CardHeader>
                        <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="text-sm whitespace-pre-wrap">
                            {JSON.stringify(order.shippingAddress, null, 2)}
                        </pre>
                    </CardContent>
                </Card>
            )}

            {/* Billing Address */}
            {order.billingAddress && (
                <Card>
                    <CardHeader>
                        <CardTitle>Billing Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="text-sm whitespace-pre-wrap">
                            {JSON.stringify(order.billingAddress, null, 2)}
                        </pre>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
