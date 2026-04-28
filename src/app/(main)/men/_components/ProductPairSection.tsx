import Image from "next/image";

const ProductPairSection = ({
  firstImage,
  secondImage,
}: {
  firstImage: string;
  secondImage: string;
}) => {
  return (
    <section className="flex flex-col justify-between lg:flex-row items-center gap-4 p-4 lg:p-12">
      <ProductCard imageSrc={firstImage} />
      <ProductCard imageSrc={secondImage} />
    </section>
  );
};

export default ProductPairSection;

const ProductCard = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div className="flex flex-col w-full lg:w-auto">
      <div className="h-[600px] w-full lg:w-[600px] relative">
        <Image
          src={imageSrc}
          alt="Man wearing KINDRA shoes"
          width={500}
          height={500}
          className="object-cover absolute inset-0 w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-4 py-4">
        <div className="flex space-x-2">
          <div className="size-5 bg-[#e6d2c5] border border-gray-300"></div>
          <div className="size-5 bg-black border border-gray-300"></div>
        </div>
        <div>
          <p className="text-xs text-gray-700">Classic High Heels</p>
          <p className="font-medium">129.00 TND</p>
        </div>
      </div>
    </div>
  );
};
