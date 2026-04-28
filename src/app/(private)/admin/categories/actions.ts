"use server";

import { getCurrentUser } from "@/lib/session";
import { createCategoryUseCase, updateCategoryUseCase } from "@/use-cases/admin-categories";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  section: z.enum(["men", "women"]),
  description: z.string().optional(),
});

export async function createCategoryAction(formData: FormData) {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  const data = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    section: formData.get("section") as "men" | "women",
    description: formData.get("description") as string,
  };

  const validated = categorySchema.parse(data);

  await createCategoryUseCase(user, validated);
  
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategoryAction(id: number, formData: FormData) {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  const data = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    section: formData.get("section") as "men" | "women",
    description: formData.get("description") as string,
    isActive: formData.get("isActive") === "on",
  };

  await updateCategoryUseCase(user, id, data);
  
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}
