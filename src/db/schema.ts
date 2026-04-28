import { relations, sql } from "drizzle-orm";
import {
  boolean,
  decimal,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["member", "admin"]);
export const accountTypeEnum = pgEnum("type", ["email", "google", "facebook"]);
export const sectionEnum = pgEnum("section", ["men", "women"]);
export const sizeTypeEnum = pgEnum("size_type", ["CLOTHING", "SHOES", "NONE"]);
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);
export const storageEnum = pgEnum("storage", ["r2", "vercel-blob"]);

// --- AUTHENTICATION & USERS ---

export const users = pgTable("gf_user", {
  id: serial("id").primaryKey(),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  isAdmin: boolean("isAdmin").default(false).notNull(),
});

export const accounts = pgTable(
  "gf_accounts",
  {
    id: serial("id").primaryKey(),
    userId: serial("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accountType: accountTypeEnum("accountType").notNull(),
    facebookId: text("facebookId").unique(),
    googleId: text("googleId").unique(),
    password: text("password"),
    salt: text("salt"),
  },
  (table) => ({
    userIdAccountTypeIdx: index("user_id_account_type_idx").on(
      table.userId,
      table.accountType
    ),
  })
);

export const magicLinks = pgTable(
  "gf_magic_links",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    token: text("token"),
    tokenExpiresAt: timestamp("tokenExpiresAt", { mode: "date" }),
  },
  (table) => ({
    tokenIdx: index("magic_links_token_idx").on(table.token),
  })
);

export const resetTokens = pgTable(
  "gf_reset_tokens",
  {
    id: serial("id").primaryKey(),
    userId: serial("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
      .unique(),
    token: text("token"),
    tokenExpiresAt: timestamp("tokenExpiresAt", { mode: "date" }),
  },
  (table) => ({
    tokenIdx: index("reset_tokens_token_idx").on(table.token),
  })
);

export const verifyEmailTokens = pgTable(
  "gf_verify_email_tokens",
  {
    id: serial("id").primaryKey(),
    userId: serial("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
      .unique(),
    token: text("token"),
    tokenExpiresAt: timestamp("tokenExpiresAt", { mode: "date" }),
  },
  (table) => ({
    tokenIdx: index("verify_email_tokens_token_idx").on(table.token),
  })
);

export const profiles = pgTable("gf_profile", {
  id: serial("id").primaryKey(),
  userId: serial("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  displayName: text("displayName"),
  imageId: text("imageId"),
  image: text("image"),
  bio: text("bio").notNull().default(""),
});

export const sessions = pgTable(
  "gf_session",
  {
    id: text("id").primaryKey(),
    userId: serial("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (table) => ({
    userIdIdx: index("sessions_user_id_idx").on(table.userId),
  })
);

export const newsletters = pgTable("gf_newsletter", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
});

// --- E-COMMERCE CORE ---

export const categories = pgTable("gf_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // "CLOTHING", "SHOES"
  slug: text("slug").notNull().unique(),
  section: sectionEnum("section").notNull(), // "men" | "women"
  description: text("description"),
  imageId: text("imageId"),
  image: text("image"),
  displayOrder: integer("displayOrder").default(0),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const subcategories = pgTable("gf_subcategories", {
  id: serial("id").primaryKey(),
  categoryId: integer("categoryId")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  name: text("name").notNull(), // "SHIRTS", "BOOTS"
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageId: text("imageId"),
  image: text("image"),
  displayOrder: integer("displayOrder").default(0),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const products = pgTable("gf_products", {
  id: serial("id").primaryKey(),
  subcategoryId: integer("subcategoryId")
    .notNull()
    .references(() => subcategories.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  basePrice: decimal("basePrice", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD").notNull(),
  sizeType: sizeTypeEnum("sizeType").default("NONE").notNull(),
  sku: text("sku").unique(),
  inventory: integer("inventory").default(0).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const productVariants = pgTable("gf_product_variants", {
  id: serial("id").primaryKey(),
  productId: integer("productId")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  color: text("color"), // Hex code e.g., "#FFFFFF"
  colorName: text("colorName"), // "Black"
  size: text("size"), // "S", "M", "L", "42"
  additionalPrice: decimal("additionalPrice", { precision: 10, scale: 2 })
    .default("0.00")
    .notNull(),
  sku: text("sku").unique(),
  inventory: integer("inventory").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
});

export const productImages = pgTable("gf_product_images", {
  id: serial("id").primaryKey(),
  productId: integer("productId")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  variantId: integer("variantId").references(() => productVariants.id, {
    onDelete: "set null",
  }),
  imageId: text("imageId").notNull(), // R2 or Blob ID
  imageUrl: text("imageUrl").notNull(),
  displayOrder: integer("displayOrder").default(0),
  storage: storageEnum("storage").default("r2").notNull(),
});

// --- SHOPPING CART ---

export const cart = pgTable("gf_cart", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .unique(), // One cart per user for now
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const cartItems = pgTable("gf_cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cartId")
    .notNull()
    .references(() => cart.id, { onDelete: "cascade" }),
  variantId: integer("variantId")
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  addedAt: timestamp("addedAt", { mode: "date" }).defaultNow().notNull(),
});

// --- ORDERS ---

export const orders = pgTable("gf_orders", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id, {
    onDelete: "set null",
  }),
  orderNumber: text("orderNumber").notNull().unique(),
  status: orderStatusEnum("status").default("pending").notNull(),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  tax: decimal("tax", { precision: 10, scale: 2 }).default("0.00").notNull(),
  shipping: decimal("shipping", { precision: 10, scale: 2 })
    .default("0.00")
    .notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  shippingAddress: jsonb("shippingAddress"),
  billingAddress: jsonb("billingAddress"),
  paymentId: text("paymentId"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const orderItems = pgTable("gf_order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("orderId")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  variantId: integer("variantId").references(() => productVariants.id, {
    onDelete: "set null",
  }),
  productName: text("productName").notNull(),
  variantName: text("variantName"), // "Black, Size M"
  quantity: integer("quantity").notNull(),
  priceAtPurchase: decimal("priceAtPurchase", {
    precision: 10,
    scale: 2,
  }).notNull(),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
});

// --- NOTIFICATIONS (Repurposed) ---

export const notifications = pgTable("gf_notifications", {
  id: serial("id").primaryKey(),
  userId: serial("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  orderId: integer("orderId").references(() => orders.id, {
    onDelete: "cascade",
  }),
  isRead: boolean("isRead").notNull().default(false),
  type: text("type").notNull(), // "order_status", "promo"
  message: text("message").notNull(),
  createdOn: timestamp("createdOn", { mode: "date" }).notNull(),
});

// --- RELATIONSHIPS ---

export const categoriesRelations = relations(categories, ({ many }) => ({
  subcategories: many(subcategories),
}));

export const subcategoriesRelations = relations(subcategories, ({ one, many }) => ({
  category: one(categories, {
    fields: [subcategories.categoryId],
    references: [categories.id],
  }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  subcategory: one(subcategories, {
    fields: [products.subcategoryId],
    references: [subcategories.id],
  }),
  variants: many(productVariants),
  images: many(productImages),
}));

export const productVariantsRelations = relations(productVariants, ({ one, many }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
  images: many(productImages),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
  variant: one(productVariants, {
    fields: [productImages.variantId],
    references: [productVariants.id],
  }),
}));

export const cartRelations = relations(cart, ({ one, many }) => ({
  user: one(users, {
    fields: [cart.userId],
    references: [users.id],
  }),
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(cart, {
    fields: [cartItems.cartId],
    references: [cart.id],
  }),
  variant: one(productVariants, {
    fields: [cartItems.variantId],
    references: [productVariants.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  variant: one(productVariants, {
    fields: [orderItems.variantId],
    references: [productVariants.id],
  }),
}));

// --- TYPES ---

export type User = typeof users.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type Session = typeof sessions.$inferSelect;

export type Category = typeof categories.$inferSelect;
export type Subcategory = typeof subcategories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type ProductVariant = typeof productVariants.$inferSelect;
export type ProductImage = typeof productImages.$inferSelect;

export type Cart = typeof cart.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;

export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
