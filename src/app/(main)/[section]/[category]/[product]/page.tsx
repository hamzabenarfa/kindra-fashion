import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/data/products"
import { AnimatedProductImages } from "./_components/animated-product-images"
import { AnimatedProductDetails } from "./_components/animated-product-details"
import { AnimatedCareInstructions } from "./_components/animated-care-instructions"
import { AnimatedStickyMenu } from "./_components/animated-sticky-menu"
import { AnimatedBreadcrumb } from "./_components/animated-breadcrumb"

const validSections = ["women", "men"]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; category: string; product: string }>
}) {
  const { section, category, product } = await params
  const productData = await getProductBySlug(section, category, product)

  if (!productData) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${productData.name} | ${section.charAt(0).toUpperCase() + section.slice(1)}`,
    description: productData.description || `Buy ${productData.name} online.`,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ section: string; category: string; product: string }>
}) {
  const { section, category, product } = await params

  // Validate section
  if (!validSections.includes(section)) {
    notFound()
  }

  const matchedProduct = await getProductBySlug(section, category, product)

  if (!matchedProduct) {
    notFound()
  }

  const formattedSection = section.charAt(0).toUpperCase() + section.slice(1)
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)
  const formattedProduct = matchedProduct.name

  const defaultVariant = matchedProduct.variants[0] || { images: [], color: "", colorName: "" }

  // Prepare description based on product category
  const description = matchedProduct.description || "Product description goes here."

  return (
    <section>
      <AnimatedBreadcrumb
        section={section}
        category={category}
        product={product}
        formattedSection={formattedSection}
        formattedCategory={formattedCategory}
        formattedProduct={formattedProduct}
      />

      <AnimatedProductImages images={defaultVariant.images} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-8">
        <AnimatedProductDetails
          formattedProduct={formattedProduct}
          description={description}
          category={matchedProduct.category}
          name={matchedProduct.name}
        />

        <AnimatedCareInstructions img={matchedProduct.img} />
      </div>



      <AnimatedStickyMenu
        productId={matchedProduct.id}
        productSlug={product}
        name={formattedProduct}
        price={Number(matchedProduct.basePrice)}
        currency={matchedProduct.currency}
        reference={`REF-${matchedProduct.id}`}
        variants={matchedProduct.variants}
        defaultVariant={defaultVariant}
      />
    </section>
  )
}
