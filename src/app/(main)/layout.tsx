import { ReactNode } from "react";
import { appConfig, applicationName } from "@/app-config";
import { NavbarWrapper } from "@/components/layout/navbar-wrapper";
import { CartSheet } from "@/components/cart/cart-sheet";
import Footer from "@/components/layout/footer";
import { footerColumns, legalLinks } from "@/data/footer-data";

export default async function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full">
      {appConfig.mode === "live" && <NavbarWrapper />}
      <CartSheet />
      <div className="mt-16">{children}</div>
      {appConfig.mode === "live" &&
        <Footer
          brandName="KINDRA"
          columns={footerColumns}
          legalLinks={legalLinks}
        />}
    </div>
  );
}
