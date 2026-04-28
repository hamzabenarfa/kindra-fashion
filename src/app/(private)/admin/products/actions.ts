"use server";

import { getCurrentUser } from "@/lib/session";
import { createProductUseCase, updateProductUseCase } from "@/use-cases/admin-products";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  subcategoryId: z.coerce.number(),
  description: z.string().optional(),
  basePrice: z.string().min(1),
  currency: z.string().default("TND"),
  inventory: z.coerce.number().default(0),
  sizeType: z.enum(["NONE", "CLOTHING", "SHOES"]).default("NONE"),
  sizes: z.string().optional(), // JSON string array
});

export async function createProductAction(formData: FormData) {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  const data = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    subcategoryId: formData.get("subcategoryId"),
    description: formData.get("description") as string,
    basePrice: formData.get("basePrice") as string,
    currency: formData.get("currency") as string,
    inventory: formData.get("inventory"),
    sizeType: formData.get("sizeType") as string,
    sizes: formData.get("sizes") as string,
  };

  const validated = productSchema.parse(data);
  
  // Parse sizes and create variants
  const variants = [];
  if (validated.sizeType !== "NONE" && validated.sizes) {
    const sizesArray = JSON.parse(validated.sizes) as string[];
    for (const size of sizesArray) {
      variants.push({
        size,
        inventory: validated.inventory,
      });
    }
  }

  const newProduct = await createProductUseCase(user, {
    name: validated.name,
    slug: validated.slug,
    subcategoryId: validated.subcategoryId,
    description: validated.description,
    basePrice: validated.basePrice,
    currency: validated.currency,
    inventory: validated.inventory,
  }, variants);
  
  revalidatePath("/admin/products");
  redirect(`/admin/products/${newProduct.id}/edit`);
}

export async function updateProductAction(id: number, formData: FormData) {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  const data = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    subcategoryId: formData.get("subcategoryId"),
    description: formData.get("description") as string,
    basePrice: formData.get("basePrice") as string,
    currency: formData.get("currency") as string,
    inventory: formData.get("inventory"),
    sizeType: formData.get("sizeType") as string,
    sizes: formData.get("sizes") as string,
    isActive: formData.get("isActive") === "on",
  };

  // We reuse the schema but make some fields optional if needed, or just parse
  const validated = productSchema.parse(data);

  await updateProductUseCase(user, id, {
    ...validated,
    sizeType: validated.sizeType,
    isActive: data.isActive,
  });
  
  // Note: For now, we're just updating the product properties
  // A full implementation would also sync variants (add new sizes, remove deleted sizes)
  // This can be enhanced later with variant management
  
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
  redirect("/admin/products");
}
