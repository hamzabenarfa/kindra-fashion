import { ReactNode } from "react";
import { AccountSidebar } from "@/components/account/account-sidebar";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen ">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 lg:block">
        <AccountSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
