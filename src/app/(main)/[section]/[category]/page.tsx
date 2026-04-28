import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ProductCarousel } from "@/components/women-sections/product-carousel";
import { AnimatedBreadcrumb } from "./[product]/_components/animated-breadcrumb";
import { getProductsByCategory } from "@/lib/data/category-products";
import { EmptyCategoryState } from "@/components/empty-states/empty-category";

// Validate section to ensure it's one of our allowed values
const validSections = ["women", "men"];

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ section: string; category: string }>;
}) {
  const { section, category } = await params;

  // Validate section
  if (!validSections.includes(section)) {
    notFound();
  }

  // Fetch products from database
  const products = await getProductsByCategory(section, category);

  // Format section and category for display
  const formattedSection = section.charAt(0).toUpperCase() + section.slice(1);
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="">

      <AnimatedBreadcrumb
        section={section}
        category={category}
        formattedSection={formattedSection}
        formattedCategory={formattedCategory}
      />

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 py-8 px-4 container mx-auto">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCarousel product={product} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyCategoryState categoryName={formattedCategory} section={section} />
      )}
    </div>
  );
}
