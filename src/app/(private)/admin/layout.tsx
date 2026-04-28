import { getCurrentUser } from "@/lib/session";
import { assertAdmin } from "@/use-cases/authorization";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    ShoppingBag,
    Layers,
    Settings,
    Users,
    Package
} from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();

    try {
        await assertAdmin(user);
    } catch (e) {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/admin" className="flex items-center gap-2 font-semibold">
                        <Package className="h-6 w-6" />
                        <span className="">Kindra Admin</span>
                    </Link>
                </div>
                <nav className="flex flex-col gap-4 px-4 py-4">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <ShoppingBag className="h-4 w-4" />
                        Orders
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Package className="h-4 w-4" />
                        Products
                    </Link>
                    <Link
                        href="/admin/categories"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Layers className="h-4 w-4" />
                        Categories
                    </Link>
                    <Link
                        href="/admin/customers"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Users className="h-4 w-4" />
                        Customers
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:pl-64">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
