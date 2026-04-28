import { ProductCarousel } from "@/components/women-sections/product-carousel";

const FeaturedMenProducts = ({ products }: { products: any[] }) => {
  return (
    <div className="container mx-auto px-12">
      <div className="grid grid-cols-2  lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id}>
            {/* @ts-ignore */}
            <ProductCarousel variant="men" product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMenProducts;
