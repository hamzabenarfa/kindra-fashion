import { database } from "@/db";
import { products, categories, subcategories, productVariants, productImages } from "@/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";

export type ProductFilter = {
  section?: "men" | "women";
  categorySlug?: string;
  subcategorySlug?: string;
  isFeatured?: boolean;
  limit?: number;
};

export async function getPublicProductsUseCase(filter: ProductFilter = {}) {
  // Use query builder with explicit joins for filtering
  if (filter.section) {
    const rows = await database.select({
      product: products,
      variant: productVariants,
      image: productImages,
      subcategory: subcategories,
      category: categories,
    })
    .from(products)
    .innerJoin(subcategories, eq(products.subcategoryId, subcategories.id))
    .innerJoin(categories, eq(subcategories.categoryId, categories.id))
    .leftJoin(productVariants, eq(products.id, productVariants.productId))
    .leftJoin(productImages, eq(productVariants.id, productImages.variantId))
    .where(and(
      eq(products.isActive, true),
      eq(categories.section, filter.section),
      filter.isFeatured ? eq(products.isFeatured, true) : undefined
    ))
    .orderBy(desc(products.createdAt));

    // Group results manually since we're doing a flat join
    // This is getting complicated to reconstruct the nested object structure expected by the UI
    // Let's revert to the relational query but fetch more and filter in memory for this MVP
    // OR, better: fetch IDs first then fetch details
  }

  // Simpler approach: Fetch products and filter in memory (MVP)
  // Note: limit won't be accurate at DB level but fine for small dataset
  const allProducts = await database.query.products.findMany({
    where: (products, { eq, and }) => {
      const conditions = [eq(products.isActive, true)];
      if (filter.isFeatured) {
        conditions.push(eq(products.isFeatured, true));
      }
      return and(...conditions);
    },
    orderBy: [desc(products.createdAt)],
    with: {
      subcategory: {
        with: {
          category: true,
        },
      },
      variants: {
        where: eq(productVariants.isActive, true),
        with: {
          images: {
            orderBy: (images, { asc }) => [asc(images.id)],
          },
        },
      },
    },
  });

  let filtered = allProducts;
  if (filter.section) {
    filtered = filtered.filter(p => p.subcategory.category.section === filter.section);
  }

  if (filter.limit) {
    filtered = filtered.slice(0, filter.limit);
  }

  return filtered;
}

export async function getProductBySlugUseCase(slug: string) {
  return await database.query.products.findFirst({
    where: and(eq(products.slug, slug), eq(products.isActive, true)),
    with: {
      subcategory: {
        with: {
          category: true,
        },
      },
      variants: {
        where: eq(productVariants.isActive, true),
        with: {
          images: {
            orderBy: (images, { asc }) => [asc(images.id)],
          },
        },
      },
    },
  });
}


export async function getCategoriesBySectionUseCase(section: "men" | "women") {
  return await database.query.categories.findMany({
    where: and(eq(categories.section, section), eq(categories.isActive, true)),
    with: {
      subcategories: true,
    },
    orderBy: [desc(categories.createdAt)],
  });
}

export async function getAllCategoriesUseCase() {
  return await database.query.categories.findMany({
    where: eq(categories.isActive, true),
    with: {
      subcategories: true,
    },
    orderBy: [desc(categories.createdAt)],
  });
}
