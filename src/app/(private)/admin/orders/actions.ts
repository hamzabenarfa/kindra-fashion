"use server";

import { getCurrentUser } from "@/lib/session";
import { updateOrderStatusUseCase } from "@/use-cases/admin-orders";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const updateStatusSchema = z.object({
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
});

export async function updateOrderStatusAction(orderId: number, formData: FormData) {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  const status = formData.get("status");
  const validated = updateStatusSchema.parse({ status });

  await updateOrderStatusUseCase(user, orderId, validated.status);
  
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}
