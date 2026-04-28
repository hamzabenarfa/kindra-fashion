import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { getOrderByIdUseCase } from "@/use-cases/admin-orders";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateOrderStatusAction } from "../actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getCurrentUser();
    const order = await getOrderByIdUseCase(user!, parseInt(id));

    if (!order) {
        notFound();
    }

    const updateAction = updateOrderStatusAction.bind(null, order.id);

    return (
        <div className="flex flex-col gap-8 py-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Order #{order.orderNumber}</h1>
                <div className="flex items-center gap-4">
                    <form action={updateAction} className="flex items-center gap-2">
                        <Select name="status" defaultValue={order.status}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button type="submit" variant="outline">Update</Button>
                    </form>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-1">
                            <div className="font-medium">{order.user?.email || "Guest"}</div>
                            <div className="text-sm text-muted-foreground">
                                Placed on {format(order.createdAt, "PPP p")}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Assuming address is stored as JSON, displaying raw for now or need a helper */}
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {JSON.stringify(order.shippingAddress, null, 2)}
                        </pre>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>{order.total} USD</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Quantity</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Total</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {order.items.map((item: any) => (
                                    <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">
                                            {item.variant?.product?.name || item.productName}
                                            {item.variant?.colorName && ` - ${item.variant.colorName}`}
                                        </td>
                                        <td className="p-4 align-middle">
                                            {item.priceAtPurchase} USD
                                        </td>
                                        <td className="p-4 align-middle">{item.quantity}</td>
                                        <td className="p-4 align-middle text-right">
                                            {item.subtotal} USD
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
