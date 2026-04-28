"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookIcon, MenuIcon, SearchIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MenuButton() {
  const path = usePathname();
  const isLandingPage = path === "/";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        {!isLandingPage && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/account"
                className="flex gap-2 items-center cursor-pointer"
              >
                <UsersIcon className="w-4 h-4" /> Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/orders"
                className="flex gap-2 items-center cursor-pointer"
              >
                <BookIcon className="w-4 h-4" /> Orders
              </Link>
            </DropdownMenuItem>
          </>
        )}
        {isLandingPage && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/#features"
                className="flex gap-2 items-center cursor-pointer"
              >
                Features
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/#pricing"
                className="flex gap-2 items-center cursor-pointer"
              >
                Pricing
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
