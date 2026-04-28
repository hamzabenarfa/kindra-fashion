
import Hero from "./_components/hero";
import MenCollectionGrid from "./_components/MenCollectionGrid";
import FeaturedMenProducts from "./_components/FeaturedMenProducts";
import ProductPairSection from "./_components/ProductPairSection";
import MenMenu from "./_components/menu";
import { getPublicProductsUseCase } from "@/use-cases/products";

export default async function Men() {
  const products = await getPublicProductsUseCase({ section: "men", limit: 12 });

  // Split products for different sections
  const featuredProducts = products.slice(0, 4);
  const collection1 = products.slice(4, 8);
  const collection2 = products.slice(8, 12);

  return (
    <>
      <div className="mt-10"></div>

      <Hero />

      <MenMenu />

      <FeaturedMenProducts products={featuredProducts} />

      <ProductPairSection
        firstImage="/men-page/kindra-men20.jpg"
        secondImage="/men-page/kindra-men22.jpeg"
      />

      <MenCollectionGrid data={collection1} />

      <ProductPairSection
        firstImage="/men-page/kindra-men21.jpg"
        secondImage="/men-page/kindra-men19.jpeg"
      />
      <MenCollectionGrid data={collection2} />
    </>
  );
}
