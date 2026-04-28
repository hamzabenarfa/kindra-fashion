"use server";

import { env } from "@/env";
import { Stripe } from "stripe";
import { getCurrentUser } from "@/lib/session";
import { headers } from "next/headers";
import { database } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

export async function createCheckoutSessionAction(
  items: any[],
  shippingInfo?: {
    phone: string;
    country: string;
    city: string;
    postalCode: string;
    address: string;
  }
) {
  const user = await getCurrentUser();
  const headersList = await headers();
  const origin = headersList.get("origin") || env.HOST_NAME;

  let shippingName = "Guest";
  if (user) {
    const profile = await database.query.profiles.findFirst({
      where: eq(profiles.userId, user.id),
    });
    shippingName = profile?.displayName || user.email || "Guest";
  }

  if (!items || items.length === 0) {
    throw new Error("No items in cart");
  }

  const lineItems = items.map((item) => {
    // Convert relative image URLs to absolute URLs for Stripe
    let imageUrl = item.image;
    if (imageUrl && !imageUrl.startsWith('http')) {
      // If image is a relative path, make it absolute
      imageUrl = `${origin}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: imageUrl ? [imageUrl] : [],
          metadata: {
            productId: item.productId,
            variantId: item.variantId,
            color: item.color,
            size: item.size,
          },
        },
        unit_amount: Math.round(parseFloat(item.price) * 100),
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
    ...(user?.email && { customer_email: user.email }),
    metadata: {
      userId: user?.id ? user.id.toString() : "guest",
      ...(shippingInfo && {
        shippingName: shippingName,
        shippingPhone: shippingInfo.phone,
        shippingAddress: shippingInfo.address,
        shippingCity: shippingInfo.city,
        shippingPostalCode: shippingInfo.postalCode,
        shippingCountry: shippingInfo.country,
      }),
    },
  });

  return { url: session.url };
}
