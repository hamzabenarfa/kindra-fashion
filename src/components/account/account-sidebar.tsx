"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    LayoutDashboard,
    Package,
    Settings,
    LogOut,
    User,
} from "lucide-react";
import { signOutAction } from "@/actions/notif";

const sidebarLinks = [
    {
        title: "Dashboard",
        href: "/account",
        icon: LayoutDashboard,
    },
    {
        title: "Orders",
        href: "/account/orders",
        icon: Package,
    },
    {
        title: "Settings",
        href: "/account/settings",
        icon: Settings,
    },
];

export function AccountSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col border-r bg-muted/40">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/account" className="flex items-center gap-2 font-semibold">
                    <User className="h-6 w-6" />
                    <span>My Account</span>
                </Link>
            </div>
            <ScrollArea className="flex-1 px-3 py-4">
                <nav className="grid gap-1">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href ||
                            (link.href !== "/account" && pathname?.startsWith(link.href));

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                                    isActive
                                        ? "bg-accent text-accent-foreground"
                                        : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {link.title}
                            </Link>
                        );
                    })}
                </nav>
            </ScrollArea>
            <div className="mt-auto border-t p-4">
                <form action={signOutAction}>
                    <Button
                        type="submit"
                        variant="ghost"
                        className="w-full justify-start gap-3 text-muted-foreground hover:text-accent-foreground"
                    >
                        <LogOut className="h-4 w-4" />
                        Log Out
                    </Button>
                </form>
            </div>
        </div>
    );
}
