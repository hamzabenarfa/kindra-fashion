import { getUserOrdersUseCase } from "@/use-cases/orders";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default async function OrdersPage() {
    const orders = await getUserOrdersUseCase();

    if (orders.length === 0) {
        return (
            <div className="text-center py-24">
                <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
                <p className="mb-8 text-gray-600">You haven't placed any orders yet.</p>
                <Button asChild>
                    <Link href="/">Start Shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
            <div className="space-y-6">
                {orders.map((order) => (
                    <Card key={order.id}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Order #{order.id}</CardTitle>
                                    <CardDescription>
                                        Placed on {format(order.createdAt, "MMMM d, yyyy")}
                                    </CardDescription>
                                </div>
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
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <Image
                                                src={item.variant?.images[0]?.imageUrl || "/placeholder.svg"}
                                                alt={item.productName}
                                                fill
                                                className="object-cover object-center"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">{item.productName}</h4>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity} | {item.priceAtPurchase} TND
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-6">
                            <div className="font-medium">
                                Total: {order.total} TND
                            </div>
                            <Button variant="outline" asChild>
                                <Link href={`/account/orders/${order.id}`}>View Details</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
