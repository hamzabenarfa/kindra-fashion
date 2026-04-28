import { ProductCarousel } from "@/components/women-sections/product-carousel";

const MenCollectionGrid = ({ data }: { data: any[] }) => {
  return (
    <div className="grid grid-cols-2  lg:grid-cols-4 gap-6 py-4 px-12 ">
      {data.map((product) => (
        <div key={product.id}>
          {/* @ts-ignore */}
          <ProductCarousel variant="men" product={product} />
        </div>
      ))}
    </div>
  );
};

export default MenCollectionGrid;
