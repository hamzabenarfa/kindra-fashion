import { database } from "@/db";
import {
  categories,
  subcategories,
  products,
  productVariants,
  productImages,
  users,
  accounts,
  profiles,
} from "@/db/schema";
import { productData as womenProducts } from "@/data/women-page/product-data";
import { MenCollectionData } from "@/data/men-collection-data";
import { menProductData } from "@/data/men-data";
import { eq } from "drizzle-orm";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";

// Category Structure from Navbar
const categoryStructure = {
  women: [
    {
      name: "CLOTHING",
      slug: "women-clothing",
      subcategories: [
        "SHIRTS",
        "TROUSERS",
        "JEANS",
        "LONG SLEEVES",
        "BLOUSES",
        "DRESSES",
        "JUMPSUITS",
      ],
    },
    {
      name: "OUTWEAR",
      slug: "women-outwear",
      subcategories: ["JACKETS", "COATS", "CARDIGAN", "BLAZERS"],
    },
    {
      name: "SHOES",
      slug: "women-shoes",
      subcategories: [
        "PLATFORMS",
        "BOOTS",
        "SNEAKERS",
        "SANDALS",
        "FLATS",
        "HEELS",
      ],
    },
    {
      name: "BAGS",
      slug: "women-bags",
      subcategories: [
        "SHOULDER BAG",
        "CROSS BODY",
        "HAND BAG",
        "PURSE",
        "WALLET",
        "TOTE",
      ],
    },
    {
      name: "ACCESSORIES",
      slug: "women-accessories",
      subcategories: [
        "JEWERLY",
        "BELTS",
        "SUN GLASSES",
        "CHARMS",
        "WALLET",
        "HAIR ACCESSORY",
      ],
    },
  ],
  men: [
    {
      name: "CLOTHING",
      slug: "men-clothing",
      subcategories: [
        "SHIRTS",
        "TROUSERS",
        "JEANS",
        "T-SHIRTS",
        "POLOS",
        "SUITS",
      ],
    },
    {
      name: "OUTWEAR",
      slug: "men-outwear",
      subcategories: ["JACKETS", "COATS", "SWEATERS", "BLAZERS"],
    },
    {
      name: "SHOES",
      slug: "men-shoes",
      subcategories: ["BOOTS", "SNEAKERS", "LOAFERS", "DRESS SHOES"],
    },
    {
      name: "BAGS",
      slug: "men-bags",
      subcategories: ["BACKPACKS", "MESSENGER BAGS", "BRIEFCASES", "WALLETS"],
    },
    {
      name: "ACCESSORIES",
      slug: "men-accessories",
      subcategories: ["WATCHES", "BELTS", "SUNGLASSES", "TIES"],
    },
  ],
};

async function seed() {
  console.log("🌱 Starting seeding...");

  // 1. Clear existing data (optional, be careful in prod)
  await database.delete(productImages);
  await database.delete(productVariants);
  await database.delete(products);
  await database.delete(subcategories);
  await database.delete(categories);
  // await database.delete(users); // Keep users for now

  // 2. Seed Categories & Subcategories
  const categoryMap = new Map<string, number>(); // slug -> id
  const subcategoryMap = new Map<string, number>(); // slug -> id

  for (const [section, cats] of Object.entries(categoryStructure)) {
    for (const cat of cats) {
      const [newCat] = await database
        .insert(categories)
        .values({
          name: cat.name,
          slug: cat.slug,
          section: section as "men" | "women",
          isActive: true,
        })
        .returning();
      
      categoryMap.set(cat.slug, newCat.id);
      console.log(`Created category: ${cat.name} (${section})`);

      for (const sub of cat.subcategories) {
        const subSlug = `${section}-${cat.slug.split('-')[1]}-${sub.toLowerCase().replace(/\s+/g, "-")}`;
        const [newSub] = await database
          .insert(subcategories)
          .values({
            categoryId: newCat.id,
            name: sub,
            slug: subSlug,
            isActive: true,
          })
          .returning();
        
        subcategoryMap.set(subSlug, newSub.id);
      }
    }
  }

  // 3. Seed Products
  // Helper to find subcategory ID
  const findSubId = (section: string, category: string, subcategory: string) => {
    // Try to match loosely
    // In real app, data should be cleaner. Here we map "shoes" -> "women-shoes" -> "BOOTS" -> "women-shoes-boots"
    // The data files have 'category' field which matches our subcategory names roughly
    
    // For now, let's just put everything in the first subcategory of the matching category
    // or try to find a match
    return undefined; 
  };

  // Seed Women's Products
  for (const p of womenProducts) {
    // Map data category to our structure
    // p.category is "shoes", p.section is "women"
    // We need to find a subcategory. The data has href "women/shoes/ankel-boots"
    // Let's assume "shoes" maps to "women-shoes" category
    // And "ankel-boots" might be a subcategory or just the product slug
    
    // For simplicity in this seed, we'll put them in "SNEAKERS" or "BOOTS" based on name
    let subId: number | undefined;
    
    // Hardcoded mapping for this seed script
    const catSlug = "women-shoes";
    const catId = categoryMap.get(catSlug);
    
    // Find a subcategory ID belonging to this category
    // We'll just pick one for now to ensure data exists
    // In a real migration we'd map precisely
    const subSlug = "women-shoes-sneakers"; 
    subId = subcategoryMap.get(subSlug);

    if (!subId) continue;

    const [newProduct] = await database.insert(products).values({
      subcategoryId: subId,
      name: p.name,
      slug: p.slug + "-" + p.id, // Ensure uniqueness
      description: p.name,
      basePrice: p.price.toString(),
      currency: p.currency,
      isActive: true,
    }).returning();

    // Variants
    if (p.variants) {
      for (const v of p.variants) {
        const [newVariant] = await database.insert(productVariants).values({
          productId: newProduct.id,
          color: v.color,
          colorName: v.colorName,
          isActive: true,
        }).returning();

        // Images
        if (v.images) {
           let order = 0;
           for (const img of v.images) {
             await database.insert(productImages).values({
               productId: newProduct.id,
               variantId: newVariant.id,
               imageId: "seed-image", // Placeholder
               imageUrl: img,
               displayOrder: order++,
               storage: "r2",
             });
           }
        }
      }
    }
  }

  // Seed Men's Products (combining both data files)
  const allMenProducts = [...MenCollectionData, ...menProductData];
  
  for (const p of allMenProducts) {
    // Map to Men's Clothing -> T-Shirts or similar
    const subSlug = "men-clothing-t-shirts";
    const subId = subcategoryMap.get(subSlug);
    
    if (!subId) continue;

    const [newProduct] = await database.insert(products).values({
      subcategoryId: subId,
      name: p.name,
      slug: p.slug + "-" + p.id + "-men-" + Math.random().toString(36).substring(7),
      description: p.name,
      basePrice: p.price.toString(),
      currency: p.currency,
      isActive: true,
    }).returning();

    if (p.variants) {
      for (const v of p.variants) {
        const [newVariant] = await database.insert(productVariants).values({
          productId: newProduct.id,
          color: v.color,
          colorName: v.colorName,
          isActive: true,
        }).returning();

        if (v.images) {
           let order = 0;
           for (const img of v.images) {
             await database.insert(productImages).values({
               productId: newProduct.id,
               variantId: newVariant.id,
               imageId: "seed-image",
               imageUrl: img,
               displayOrder: order++,
               storage: "r2",
             });
           }
        }
      }
    }
  }

  // 4. Create Admin User
  const adminEmail = "admin@kindra.com";
  const existingAdmin = await database.query.users.findFirst({
    where: eq(users.email, adminEmail),
  });

  if (!existingAdmin) {
    const [admin] = await database.insert(users).values({
      email: adminEmail,
      emailVerified: new Date(),
      isAdmin: true,
    }).returning();

    await database.insert(profiles).values({
      userId: admin.id,
      displayName: "Admin User",
      bio: "System Administrator",
    });
    
    // Create password account (password: admin123)
    // In a real app, use the auth library's hashing. 
    // Here we'll just simulate or skip password creation if using social auth mainly
    // But let's add a dummy password entry so they can login if we implement email/pass
    // Note: The salt/hash logic depends on your auth implementation.
    
    console.log(`Created admin user: ${adminEmail}`);
  } else {
    // Ensure admin flag is set
    await database.update(users).set({ isAdmin: true }).where(eq(users.id, existingAdmin.id));
    console.log(`Updated admin user: ${adminEmail}`);
  }

  console.log("✅ Seeding complete!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
