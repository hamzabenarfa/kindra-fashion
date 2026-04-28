import { database } from "@/db";
import { orders, orderItems, users } from "@/db/schema";
import { assertAdmin } from "@/use-cases/authorization";
import { UserSession } from "@/use-cases/types";
import { eq, desc } from "drizzle-orm";

export async function getAllOrdersUseCase(user: UserSession) {
  await assertAdmin(user);
  return await database.query.orders.findMany({
    orderBy: [desc(orders.createdAt)],
    with: {
      user: true,
      items: true,
    },
  });
}

export async function getOrderByIdUseCase(user: UserSession, id: number) {
  await assertAdmin(user);
  return await database.query.orders.findFirst({
    where: eq(orders.id, id),
    with: {
      user: true,
      items: {
        with: {
          variant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
}

export async function updateOrderStatusUseCase(
  user: UserSession, 
  orderId: number, 
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
) {
  await assertAdmin(user);
  
  await database
    .update(orders)
    .set({ status, updatedAt: new Date() })
    .where(eq(orders.id, orderId));
}
