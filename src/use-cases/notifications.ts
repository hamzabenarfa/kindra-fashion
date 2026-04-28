import { database as db } from "@/db";
import { notifications } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { UserId } from "./types";

export async function markNotificationAsReadUseCase(
  user: { id: UserId },
  notificationId: number
) {
  await db
    .update(notifications)
    .set({ isRead: true })
    .where(
      and(
        eq(notifications.id, notificationId),
        eq(notifications.userId, user.id)
      )
    );
}
