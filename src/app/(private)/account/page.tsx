import { getCurrentUser } from "@/lib/session";
import { getUserOrdersUseCase } from "@/use-cases/orders";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, ShoppingBag, User } from "lucide-react";
import { format } from "date-fns";

export default async function AccountPage() {
  const user = await getCurrentUser();
  const orders = await getUserOrdersUseCase();

  // Get recent orders (last 3)
  const recentOrders = orders.slice(0, 3);

  // Calculate stats
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === "delivered").length;
  const pendingOrders = orders.filter(o => o.status === "pending" || o.status === "processing").length;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground mt-2">
          Manage your orders, settings, and account information.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest orders and their status</CardDescription>
            </div>
            <Button asChild variant="outline">
              <Link href="/account/orders">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No orders yet</p>
              <Button asChild className="mt-4">
                <Link href="/">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(order.createdAt, "MMM d, yyyy")} • {order.items.length} item(s)
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{order.total} TND</p>
                      <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/account/orders/${order.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Button asChild variant="outline" className="justify-start">
            <Link href="/account/settings/profile">
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link href="/account/settings/security">
              <Package className="mr-2 h-4 w-4" />
              Security Settings
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
