import { AuthenticationError } from "@/app/(main)/util";
import { database } from "@/db";
import { users } from "@/db/schema";
import { UserSession } from "@/use-cases/types";
import { eq } from "drizzle-orm";
import { PublicError } from "./errors";

export async function assertAdmin(user: UserSession | undefined) {
  if (!user) {
    throw new AuthenticationError();
  }

  const userRecord = await database.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  if (!userRecord?.isAdmin) {
    throw new PublicError("Admin access required");
  }

  return userRecord;
}

export async function isAdmin(user: UserSession | undefined) {
  if (!user) return false;

  const userRecord = await database.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  return !!userRecord?.isAdmin;
}
