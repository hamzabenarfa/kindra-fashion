import { database } from "@/db";
import { categories, products, productVariants, productImages, subcategories } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type CategoryProduct = {
  id: number;
  name: string;
  slug: string;
  basePrice: string;
  currency: string;
  img: string; // Main product image
  variants: {
    color: string | null;
    colorName: string | null;
    size: string | null;
    images: string[];
  }[];
};

export async function getProductsByCategory(
  section: string,
  categorySlug: string
): Promise<CategoryProduct[]> {
  // Validate section enum
  if (section !== "men" && section !== "women") return [];

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
        eq(categories.slug, categorySlug),
        eq(products.isActive, true)
      )
    );

  if (result.length === 0) return [];

  // Group by product
  const productsMap = new Map<number, {
    id: number;
    name: string;
    slug: string;
    basePrice: string;
    currency: string;
    variants: Map<number, {
      color: string | null;
      colorName: string | null;
      size: string | null;
      images: Set<string>;
    }>;
  }>();

  result.forEach((row) => {
    const product = row.product;
    
    if (!productsMap.has(product.id)) {
      productsMap.set(product.id, {
        id: product.id,
        name: product.name,
        slug: product.slug,
        basePrice: product.basePrice,
        currency: product.currency,
        variants: new Map(),
      });
    }

    const productData = productsMap.get(product.id)!;

    if (row.variant) {
      if (!productData.variants.has(row.variant.id)) {
        productData.variants.set(row.variant.id, {
          color: row.variant.color,
          colorName: row.variant.colorName,
          size: row.variant.size,
          images: new Set(),
        });
      }

      if (row.image) {
        productData.variants.get(row.variant.id)!.images.add(row.image.imageUrl);
      }
    }
  });

  // Convert to final format
  return Array.from(productsMap.values()).map((product) => {
    const variants = Array.from(product.variants.values()).map((v) => ({
      color: v.color,
      colorName: v.colorName,
      size: v.size,
      images: Array.from(v.images),
    }));

    // Determine main image (first image from first variant or placeholder)
    const mainImage = variants.length > 0 && variants[0].images.length > 0
      ? variants[0].images[0]
      : "/placeholder.svg";

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      basePrice: product.basePrice,
      currency: product.currency,
      img: mainImage,
      variants,
    };
  });
}
