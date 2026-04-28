import { database } from "@/db";
import { categories, subcategories } from "@/db/schema";
import { assertAdmin } from "@/use-cases/authorization";
import { UserSession } from "@/use-cases/types";
import { eq, desc } from "drizzle-orm";

export type CategoryInput = {
  name: string;
  slug: string;
  section: "men" | "women";
  description?: string;
  imageId?: string;
  image?: string;
  isActive?: boolean;
};

export async function getAllCategoriesUseCase(user: UserSession) {
  await assertAdmin(user);
  return await database.query.categories.findMany({
    orderBy: [desc(categories.createdAt)],
    with: {
      subcategories: true,
    },
  });
}

export async function getCategoryByIdUseCase(user: UserSession, id: number) {
  await assertAdmin(user);
  return await database.query.categories.findFirst({
    where: eq(categories.id, id),
  });
}

export async function createCategoryUseCase(user: UserSession, data: CategoryInput) {
  await assertAdmin(user);
  
  const [newCategory] = await database.insert(categories).values({
    ...data,
    isActive: data.isActive ?? true,
  }).returning();
  
  return newCategory;
}

export async function updateCategoryUseCase(user: UserSession, id: number, data: Partial<CategoryInput>) {
  await assertAdmin(user);
  
  const [updatedCategory] = await database
    .update(categories)
    .set(data)
    .where(eq(categories.id, id))
    .returning();
    
  return updatedCategory;
}

export async function deleteCategoryUseCase(user: UserSession, id: number) {
  await assertAdmin(user);
  
  await database.delete(categories).where(eq(categories.id, id));
}
