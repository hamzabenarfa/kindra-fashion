import { getCurrentUser } from "@/lib/session";
import { getUnreadNotificationsForUserUseCase, getUserProfileUseCase } from "@/use-cases/users";
import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getProfileImageFullUrl } from "@/components/layout/profile-image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Settings2Icon } from "lucide-react";
import { SignOutItem } from "@/components/layout/sign-out-item";
import { MenuButton } from "@/components/layout/menu-button";
import { Button } from "../ui/button";
export async function HeaderActions() {
    const user = await getCurrentUser();
    const isSignedIn = !!user;

    return (
        <>
            {isSignedIn ? (
                <>


                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Suspense
                                fallback={
                                    <div className="bg-gray-800 rounded-full h-10 w-10 shrink-0 flex items-center justify-center">
                                        ..
                                    </div>
                                }
                            >
                                <ProfileAvatar userId={user.id} />
                            </Suspense>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="space-y-2">
                            <DropdownMenuItem asChild>
                                <Link
                                    href="/account/settings"
                                    className="flex gap-2 items-center cursor-pointer"
                                >
                                    <Settings2Icon className="w-4 h-4" /> Settings
                                </Link>
                            </DropdownMenuItem>
                            <SignOutItem />
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="md:hidden">
                        <MenuButton />
                    </div>
                </>
            ) : (
                <>
                    <Button asChild variant="secondary">
                        <Link href="/sign-in">Sign In</Link>
                    </Button>
                </>
            )}
        </>
    );
}
async function ProfileAvatar({ userId }: { userId: number }) {
    const profile = await getUserProfileUseCase(userId);

    return (
        <Avatar>
            <AvatarImage src={getProfileImageFullUrl(profile)} />
            <AvatarFallback>
                {profile.displayName?.substring(0, 2).toUpperCase() ?? "AA"}
            </AvatarFallback>
        </Avatar>
    );
}

