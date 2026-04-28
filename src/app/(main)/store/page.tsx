
import { getPublicProductsUseCase, getAllCategoriesUseCase } from "@/use-cases/products";
import { ProductCarousel } from "@/components/women-sections/product-carousel";
import { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Store - All Products",
    description: "Browse all our products.",
};

export default async function StorePage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; sort?: string }>;
}) {
    const resolvedSearchParams = await searchParams;
    const categoryFilter = resolvedSearchParams.category;
    const sortOption = resolvedSearchParams.sort || "newest";

    const [allProducts, categories] = await Promise.all([
        getPublicProductsUseCase({}),
        getAllCategoriesUseCase(),
    ]);

    let filteredProducts = allProducts;

    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(
            (p) => p.subcategory.category.slug === categoryFilter
        );
    }

    // Simple sorting (in-memory for MVP)
    if (sortOption === "price-asc") {
        filteredProducts.sort((a, b) => parseFloat(a.basePrice) - parseFloat(b.basePrice));
    } else if (sortOption === "price-desc") {
        filteredProducts.sort((a, b) => parseFloat(b.basePrice) - parseFloat(a.basePrice));
    }
    // Default is newest (already sorted by DB query usually, but let's ensure)
    // The DB query orders by createdAt desc, so we are good for 'newest'.

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-8">
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Categories</h3>
                            <div className="space-y-2">
                                <Link
                                    href="/store"
                                    className={cn(
                                        "block px-3 py-2 rounded-md transition-colors",
                                        !categoryFilter
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted"
                                    )}
                                >
                                    All Products
                                </Link>
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/store?category=${category.slug}${sortOption !== "newest" ? `&sort=${sortOption}` : ""}`}
                                        className={cn(
                                            "block px-3 py-2 rounded-md transition-colors",
                                            categoryFilter === category.slug
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-muted"
                                        )}
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Sort By</h3>
                            <div className="space-y-2">
                                <Link
                                    href={`/store?${categoryFilter ? `category=${categoryFilter}&` : ""}sort=newest`}
                                    className={cn(
                                        "block px-3 py-2 rounded-md transition-colors",
                                        sortOption === "newest"
                                            ? "bg-secondary text-secondary-foreground"
                                            : "hover:bg-muted"
                                    )}
                                >
                                    Newest
                                </Link>
                                <Link
                                    href={`/store?${categoryFilter ? `category=${categoryFilter}&` : ""}sort=price-asc`}
                                    className={cn(
                                        "block px-3 py-2 rounded-md transition-colors",
                                        sortOption === "price-asc"
                                            ? "bg-secondary text-secondary-foreground"
                                            : "hover:bg-muted"
                                    )}
                                >
                                    Price: Low to High
                                </Link>
                                <Link
                                    href={`/store?${categoryFilter ? `category=${categoryFilter}&` : ""}sort=price-desc`}
                                    className={cn(
                                        "block px-3 py-2 rounded-md transition-colors",
                                        sortOption === "price-desc"
                                            ? "bg-secondary text-secondary-foreground"
                                            : "hover:bg-muted"
                                    )}
                                >
                                    Price: High to Low
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-6 flex justify-between items-center">
                        <h1 className="text-3xl font-bold">
                            {categoryFilter
                                ? categories.find((c) => c.slug === categoryFilter)?.name ||
                                "Products"
                                : "All Products"}
                        </h1>
                        <span className="text-muted-foreground">
                            {filteredProducts.length} results
                        </span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="w-full">
                                {/* @ts-ignore */}
                                <ProductCarousel variant="men" product={product} />
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20 bg-muted/30 rounded-lg">
                            <p className="text-xl text-muted-foreground">No products found.</p>
                            <Link href="/store" className="text-primary hover:underline mt-2 inline-block">
                                Clear filters
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
