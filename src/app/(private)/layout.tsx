import { signOutAction } from "@/actions/notif";
import { applicationName } from "@/app-config";
import { Button } from "@/components/ui/button";
import { amoria } from "@/fonts/font";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";


export default async function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full">
      <header className="flex items-center backdrop-blur-3xl justify-between px-12 py-4 border-b">
        <div className="flex flex-row gap-4 justify-center items-center">
          <Link href="/men" className="flex items-center gap-2">
            Men
          </Link>
          <Link href="/women" className="flex items-center gap-2">
            Women
          </Link>
        </div>
        <div className="flex items-center gap-4">

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className={`${amoria.className} text-2xl font-serif tracking-widest`}
            >
              {applicationName}
            </Link>
          </div>
        </div>

        <form action={signOutAction}>
          <Button
            type="submit"
            variant="link"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </form>
      </header>
      <div className="">{children}</div>

    </div>
  );
}
