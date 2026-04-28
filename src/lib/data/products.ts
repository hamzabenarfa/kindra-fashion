import { database } from "@/db";
import { categories, products, productVariants, productImages, subcategories } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type ProductWithDetails = {
  id: number;
  name: string;
  description: string | null;
  basePrice: string;
  currency: string;
  slug: string;
  category: string;
  section: "men" | "women";
  img: string; // Main image for the product card/page
  variants: {
    id: number;
    color: string | null;
    colorName: string | null;
    size: string | null;
    images: string[];
  }[];
};

export async function getProductBySlug(
  section: string,
  categorySlug: string,
  productSlug: string
): Promise<ProductWithDetails | null> {
  // Validate section enum
  if (section !== "men" && section !== "women") return null;

  const result = await database
    .select({
      product: products,
      category: categories,
      subcategory: subcategories,
      variant: productVariants,
      image: productImages,
    })
    .from(products)
    .innerJoin(subcategories, eq(products.subcategoryId, subcategories.id))
    .innerJoin(categories, eq(subcategories.categoryId, categories.id))
    .leftJoin(productVariants, eq(products.id, productVariants.productId))
    .leftJoin(productImages, eq(productVariants.id, productImages.variantId))
    .where(
      and(
        eq(categories.section, section),
        eq(categories.slug, categorySlug), // Assuming the URL category maps to the main category slug
        eq(products.slug, productSlug),
        eq(products.isActive, true)
      )
    );

  if (result.length === 0) return null;

  // Group by product (should be only one product, but multiple rows due to joins)
  const firstRow = result[0];
  const product = firstRow.product;
  
  // Process variants and images
  const variantsMap = new Map<number, {
    id: number;
    color: string | null;
    colorName: string | null;
    size: string | null;
    images: Set<string>;
  }>();

  result.forEach((row) => {
    if (row.variant) {
      if (!variantsMap.has(row.variant.id)) {
        variantsMap.set(row.variant.id, {
          id: row.variant.id,
          color: row.variant.color,
          colorName: row.variant.colorName,
          size: row.variant.size,
          images: new Set(),
        });
      }
      if (row.image) {
        variantsMap.get(row.variant.id)!.images.add(row.image.imageUrl);
      }
    }
  });

  const variants = Array.from(variantsMap.values()).map((v) => ({
    id: v.id,
    color: v.color,
    colorName: v.colorName,
    size: v.size,
    images: Array.from(v.images),
  }));

  // Determine main image (fallback to first variant image or placeholder)
  const mainImage = variants.length > 0 && variants[0].images.length > 0
    ? variants[0].images[0]
    : "/placeholder.svg";

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    basePrice: product.basePrice,
    currency: product.currency,
    slug: product.slug,
    category: firstRow.category.slug,
    section: firstRow.category.section,
    img: mainImage,
    variants: variants,
  };
}
