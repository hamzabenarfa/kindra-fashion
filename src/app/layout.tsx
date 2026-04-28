import "@/app/globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ReactNode, Suspense } from "react";
import { Providers } from "@/providers/providers";
import { applicationName, appConfig } from "@/app-config";
import PostHogPageView from "@/components/posthog-page-view";
import { BreakpointOverlay } from "@/components/breakpoint-overlay";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: {
    default: applicationName,
    template: `%s | ${applicationName}`,
  },
  description:
    "KINDRA - Discover premium fashion and style. Shop the latest trends in clothing, accessories, and essentials for men and women. Elevate your wardrobe with quality pieces and exceptional service.",
  keywords:
    "fashion, online shopping, clothing store, men's fashion, women's fashion, premium clothing, fashion boutique, style, trendy clothes, designer fashion, fashion ecommerce, online boutique, clothing brand, fashion retail, apparel, accessories, wardrobe essentials, fashion trends, luxury fashion, contemporary fashion, KINDRA fashion, fashion shopping, clothing online, buy clothes online, fashion store",
  authors: [{ name: applicationName }],
  creator: applicationName,
  publisher: applicationName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://kindra.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: applicationName,
    description:
      "KINDRA - Discover premium fashion and style. Shop the latest trends in clothing, accessories, and essentials for men and women.",
    url: '/',
    siteName: applicationName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${applicationName} - Premium Fashion & Style`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: applicationName,
    description:
      "KINDRA - Discover premium fashion and style. Shop the latest trends in clothing, accessories, and essentials for men and women.",
    images: ['/og-image.jpg'],
    creator: '@kindra',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: [
    { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
  ],
  manifest: '/site.webmanifest',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          montserrat.className
        )}
      >
        <Providers>
          <Suspense>
            <PostHogPageView />
          </Suspense>
          <NextTopLoader color="#000000"
            showSpinner={false} />
          <div>{children}</div>
        </Providers>
        <Toaster />
        <BreakpointOverlay />
      </body>
    </html>
  );
}
