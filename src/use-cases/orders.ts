import { database as db } from "@/db";
import { orders, orderItems, products, productVariants, productImages } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getCurrentUser } from "@/lib/session";

export async function getUserOrdersUseCase() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userId, user.id),
    orderBy: [desc(orders.createdAt)],
    with: {
      items: {
        with: {
          variant: {
            with: {
              product: true,
              images: {
                limit: 1,
              },
            },
          },
        },
      },
    },
  });

  return userOrders;
}

export async function getOrderUseCase(orderId: number) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const order = await db.query.orders.findFirst({
    where: (orders, { eq, and }) => and(
      eq(orders.id, orderId),
      eq(orders.userId, user.id)
    ),
    with: {
      items: {
        with: {
          variant: {
            with: {
              product: true,
              images: {
                limit: 1,
              },
            },
          },
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
}
