import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { getAllOrdersUseCase } from "@/use-cases/admin-orders";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default async function AdminOrdersPage() {
    const user = await getCurrentUser();
    const orders = await getAllOrdersUseCase(user!);

    return (
        <div className="flex flex-col gap-8 py-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            </div>

            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order #</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle font-medium">{order.orderNumber}</td>
                                    <td className="p-4 align-middle">
                                        {format(order.createdAt, "MMM d, yyyy")}
                                    </td>
                                    <td className="p-4 align-middle">
                                        {order.user?.email || "Guest"}
                                    </td>
                                    <td className="p-4 align-middle">
                                        {order.total} TND
                                    </td>
                                    <td className="p-4 align-middle">
                                        <Badge variant={
                                            order.status === "delivered" ? "default" :
                                                order.status === "cancelled" ? "destructive" :
                                                    "secondary"
                                        }>
                                            {order.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/orders/${order.id}`}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
