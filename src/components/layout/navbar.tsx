"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { amoria } from "@/fonts/font";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, Menu } from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";
import { useCartStore } from "@/store/cart";

// Types
type MenuCategory = {
  title: string;
  links: { href: string; label: string }[];
};

type MegaMenuData = {
  categories: MenuCategory[];
  promotionalImages: {
    main: { src: string; alt: string; title: string };
    secondary: {
      src: string;
      alt: string;
      title: string;
      ctaText: string;
      ctaLink: string;
      ctaTextSize: string;
    };
  };
};

type NavLink = {
  href: string;
  label: string;
  hasMegaMenu?: boolean;
  megaMenuData?: MegaMenuData;
};

// Reusable components
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-xs font-medium tracking-wider">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const MenuCategory = ({ category }: { category: MenuCategory }) => (
  <div className="p-3">
    <div className="flex items-center mb-4">
      <h2 className="font-medium text-sm">{category.title}</h2>
      <ChevronRight className="h-4 w-4 ml-2" />
    </div>
    <ul className="space-y-2">
      {category.links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-xs tracking-wider hover:opacity-70 transition-opacity block py-1"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const PromotionalContent = ({
  images,
}: {
  images: MegaMenuData["promotionalImages"];
}) => (
  <div className="grid grid-cols-2 gap-4 p-4 pt-0">
    <div className="relative">
      <Image
        src={images.main.src || "/placeholder.svg"}
        alt={images.main.alt}
        width={500}
        height={500}
        className="w-full h-auto"
      />
      <div className="absolute bottom-8 left-8 text-white text-5xl font-light">
        {images.main.title}
      </div>
    </div>
    <div className="flex flex-col">
      <Image
        src={images.secondary.src || "/placeholder.svg"}
        alt={images.secondary.alt}
        width={500}
        height={500}
        className="w-full h-auto"
      />
      <div className="mt-4">
        <h3 className="text-md font-medium text-center mb-4">
          {images.secondary.title}
        </h3>
        <Link
          href={images.secondary.ctaLink}
          className="inline-flex items-center justify-center border border-black w-full h-12 px-4 hover:bg-black hover:text-white transition-colors"
        >
          <span style={{ fontSize: images.secondary.ctaTextSize }}>
            {images.secondary.ctaText}
          </span>
        </Link>
      </div>
    </div>
  </div>
);

const MegaMenuContent = ({ data }: { data: MegaMenuData }) => (
  <div className="flex w-[95vw] p-4 ">
    {data.categories.map((category, index) => (
      <MenuCategory key={index} category={category} />
    ))}
    <PromotionalContent images={data.promotionalImages} />
  </div>
);

interface NavbarProps {
  brandName: string;
  menCategoriesData: any[];
  womenCategoriesData: any[];
  user: any | null;
}

export default function Navbar({ brandName, menCategoriesData, womenCategoriesData, user }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleCart, items } = useCartStore();

  // Navigation data

  /************************ WOMEN ********************************/

  const promotionalContent = {
    main: {
      src: "/img-menu-women1.png",
      alt: "Circular bag with gold chain",
      title: "",
    },
    secondary: {
      src: "/img-menu-women2.png",
      alt: "New bags collection",
      title: "NEW BAGS COLLECTION",
      ctaText: "VIEW COLLECTION",
      ctaTextSize: "12px",
      ctaLink: "/collections/bags",
    },
  };

  /************************ MEN ********************************/
  const menPromotionalContent = {
    main: {
      src: "/men-page/img-men-menu1.png",
      alt: "Circular bag with gold chain",
      title: "",
    },
    secondary: {
      src: "/men-page/img-men-menu2.png",
      alt: "New bags collection",
      title: "NEW SUMMER COLLECTION",
      ctaText: "VIEW COLLECTION",
      ctaTextSize: "12px",
      ctaLink: "/men/t-shirt",
    },
  };

  const womenCategories: MenuCategory[] = womenCategoriesData.map(cat => ({
    title: cat.name.toUpperCase(),
    links: cat.subcategories.map((sub: any) => ({
      href: `/women/${cat.slug}/${sub.slug}`,
      label: sub.name.toUpperCase()
    }))
  }));

  const menCategories: MenuCategory[] = menCategoriesData.map(cat => ({
    title: cat.name.toUpperCase(),
    links: cat.subcategories.map((sub: any) => ({
      href: `/men/${cat.slug}/${sub.slug}`,
      label: sub.name.toUpperCase()
    }))
  }));

  const womenMegaMenu: MegaMenuData = {
    categories: womenCategories,
    promotionalImages: promotionalContent,
  };

  const menMegaMenu: MegaMenuData = {
    categories: menCategories,
    promotionalImages: menPromotionalContent,
  };

  const links: NavLink[] = [
    {
      href: "/highlights",
      label: "HIGHLIGHTS",
      hasMegaMenu: true,
      megaMenuData: womenMegaMenu,
    },
    {
      href: "/women",
      label: "WOMEN",
      hasMegaMenu: true,
      megaMenuData: womenMegaMenu,
    },
    {
      href: "/men",
      label: "MEN",
      hasMegaMenu: true,
      megaMenuData: menMegaMenu,
    },
    { href: "/store", label: "STORE" },
    // { href: "/services", label: "SERVICES" },
    ...(user
      ? [
        ...(user.isAdmin ? [{ href: "/admin", label: "ADMIN" }] : []),
        { href: "/account", label: "ACCOUNT" },
      ]
      : [{ href: "/sign-in", label: "LOGIN" }]),
  ];

  return (
    <motion.nav className="flex items-center backdrop-blur-3xl justify-between px-12 py-4 fixed top-0 left-0 right-0 z-50">
      {/* Mobile menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <motion.button
            aria-label="Menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col gap-6 pb-12 p-6 ">
            <SheetTitle>
              <Link
                href="/"
                className={`${amoria.className} text-2xl font-serif tracking-widest`}
              >
                {brandName}
              </Link>
            </SheetTitle>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wider hover:opacity-70 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Left side links with mega menu */}
      <div className="hidden lg:flex items-center space-x-8">

        <NavigationMenu className=" ">
          <NavigationMenuList className=" ">
            {links
              .filter((link) => link.hasMegaMenu)
              .map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuTrigger className="text-xs  font-medium tracking-wider hover:opacity-70 transition-opacity bg-transparent">
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className=" ">
                    {link.megaMenuData && (
                      <MegaMenuContent data={link.megaMenuData} />
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Brand name */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link
          href="/"
          className={`${amoria.className} text-2xl font-serif tracking-widest`}
        >
          {brandName}
        </Link>
      </div>

      {/* Right side links and icons */}
      <div className="flex items-center space-x-6">
        <div className="hidden lg:flex items-center space-x-6">
          {links.slice(3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-wider hover:opacity-70 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* <Suspense fallback={<HeaderActionsFallback />}>
          <HeaderActions />
        </Suspense> */}

        <motion.button
          aria-label="Search"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/icons/ic-search.svg"
            width={15}
            height={15}
            alt="search"
          />
        </motion.button>

        <motion.button
          aria-label="Shopping bag"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleCart}
        >
          <div className="relative">
            <Image
              src="/icons/ic-shoppingbag.svg"
              width={15}
              height={15}
              alt="shopping bag"
            />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {items.length}
              </span>
            )}
          </div>
        </motion.button>
      </div>
    </motion.nav>
  );
}
