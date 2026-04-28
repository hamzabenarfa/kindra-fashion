import { database } from "@/db";
import { products, productVariants, productImages, subcategories, categories } from "@/db/schema";
import { assertAdmin } from "@/use-cases/authorization";
import { UserSession } from "@/use-cases/types";
import { eq, desc, and } from "drizzle-orm";

export type ProductInput = {
  subcategoryId: number;
  name: string;
  slug: string;
  description?: string;
  basePrice: string;
  currency?: string;
  sizeType?: "NONE" | "CLOTHING" | "SHOES";
  sku?: string;
  inventory?: number;
  isFeatured?: boolean;
  isActive?: boolean;
};

export type VariantInput = {
  color?: string;
  colorName?: string;
  size?: string;
  additionalPrice?: string;
  sku?: string;
  inventory?: number;
  isActive?: boolean;
};

export async function getAllProductsUseCase(user: UserSession) {
  await assertAdmin(user);
  return await database.query.products.findMany({
    orderBy: [desc(products.createdAt)],
    with: {
      subcategory: {
        with: {
          category: true,
        },
      },
      variants: {
        with: {
          images: true,
        },
      },
    },
  });
}

export async function getProductByIdUseCase(user: UserSession, id: number) {
  await assertAdmin(user);
  return await database.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      subcategory: true,
      variants: {
        with: {
          images: true,
        },
      },
    },
  });
}

export async function createProductUseCase(
  user: UserSession, 
  data: ProductInput,
  variants: VariantInput[] = []
) {
  await assertAdmin(user);
  
  return await database.transaction(async (tx) => {
    const [newProduct] = await tx.insert(products).values({
      ...data,
      currency: data.currency ?? "TND",
      sizeType: data.sizeType ?? "NONE",
      inventory: data.inventory ?? 0,
      isActive: data.isActive ?? true,
      isFeatured: data.isFeatured ?? false,
    }).returning();

    if (variants.length > 0) {
      for (const variant of variants) {
        await tx.insert(productVariants).values({
          productId: newProduct.id,
          ...variant,
          additionalPrice: variant.additionalPrice ?? "0.00",
          inventory: variant.inventory ?? 0,
          isActive: variant.isActive ?? true,
        });
      }
    }

    return newProduct;
  });
}

export async function updateProductUseCase(
  user: UserSession, 
  id: number, 
  data: Partial<ProductInput>
) {
  await assertAdmin(user);
  
  const [updatedProduct] = await database
    .update(products)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(products.id, id))
    .returning();
    
  return updatedProduct;
}

export async function deleteProductUseCase(user: UserSession, id: number) {
  await assertAdmin(user);
  await database.delete(products).where(eq(products.id, id));
}

export async function getAllSubcategoriesUseCase(user: UserSession) {
  await assertAdmin(user);
  return await database.query.subcategories.findMany({
    with: {
      category: true,
    },
    orderBy: [desc(subcategories.createdAt)],
  });
}
