import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { database } from "@/db";
import { products, orders, users } from "@/db/schema";
import { count } from "drizzle-orm";

export default async function AdminDashboard() {
    const [productCount] = await database.select({ count: count() }).from(products);
    const [orderCount] = await database.select({ count: count() }).from(orders);
    const [userCount] = await database.select({ count: count() }).from(users);

    return (
        <div className="flex flex-col gap-8 py-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{productCount.count}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{orderCount.count}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userCount.count}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
