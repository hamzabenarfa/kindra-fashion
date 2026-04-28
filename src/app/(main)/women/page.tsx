import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryButton from "@/components/women-sections/category-button";
import { copeland } from "@/fonts/font";
import { ProductCarousel } from "@/components/women-sections/product-carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getPublicProductsUseCase } from "@/use-cases/products";

export default async function Home() {
  const products = await getPublicProductsUseCase({ section: "women", limit: 8 });
  console.log("Women Page Products:", JSON.stringify(products, null, 2));

  const categories = [
    { name: "VIEW ALL", image: "/women-page/shoe-category/view-all.jpg" },
    { name: "SNEAKERS", image: "/women-page/shoe-category/SNEAKER.jpg" },
    { name: "SANDALS", image: "/women-page/shoe-category/SANSALS.jpg" },
    { name: "BOOTS", image: "/women-page/shoe-category/BOOTS.jpg" },
    { name: "FLAT", image: "/women-page/shoe-category/FLAT.jpg" },
    { name: "FLIP FLOP", image: "/women-page/shoe-category/flipflop.jpg" },
  ];

  return (
    <>
      <div className="mt-14"></div>
      {/* Hero Section */}
      <section className="flex flex-col relative bg-gradient-to-r from-[#f8e9e2] to-[#f9ede7] lg:p-0 py-8">
        <h2
          className={`text-2xl  lg:hidden pl-8 leading-tight ${copeland.className} font-normal`}
        >
          Crafted for comfort.
          <br className=" hidden lg:block" />
          Styled for impact
        </h2>
        <div className=" flex flex-row items-start lg:items-center justify-between  ">
          <div className="space-y-4 py-8  px-8">
            <h2
              className={`hidden lg:block text-3xl  md:text-4xl lg:text-5xl leading-tight ${copeland.className} font-normal`}
            >
              Crafted for comfort.
              <br className=" " />
              Styled for impact
            </h2>
            <p className="text-lg  max-w-md font-light">
              From day to night, street to spotlight.
              <br />
              Your feet deserve more than just steps.
            </p>
          </div>
          <Image
            src="/women-page/hero-shoe.png"
            alt="Stylish shoe"
            height={500}
            width={300}
            className="object-fill w-40 lg:w-fit"
            priority
          />
        </div>
      </section>

      <ScrollArea className="w-full whitespace-nowrap py-6   ">
        <div className="flex  space-x-4 justify-between px-4 lg:px-12">
          {categories.map((category, index) => (
            <CategoryButton
              key={index}
              name={category.name}
              image={category.image}
            />
          ))}
          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>

      <main className="lg:p-8 space-y-6">

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2  lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.id}>
                {/* @ts-ignore - Temporary ignore until we align types */}
                <ProductCarousel product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <section className="py-8 bg-white">

          <div className="container mx-auto px-4 space-y-10">

            <div className="grid lg:grid-cols-2 lg:grid-rows-1  lg:gap-6 ">

              <div className="flex flex-col w-full">
                <Image
                  src="/women-page/womenn.jpg"
                  alt="Woman wearing KINDRA shoes"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex space-x-2">
                    <div className="size-5  bg-[#e6d2c5] border border-gray-300"></div>
                    <div className="size-5  bg-black border border-gray-300"></div>
                  </div>
                  <div className="a">
                    <p className="text-xs text-gray-700">Classic High Heels</p>
                    <p className="font-medium">129.00 TND</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 grid-rows-2  gap-6">
                {products.slice(0, 4).map((product) => (
                  // @ts-ignore
                  <ProductCarousel key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Sec  Products  GRID */}

            <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:grid-rows-1   lg:gap-6 ">
              <div className="grid grid-cols-2 grid-rows-2 gap-6">
                {products.slice(4, 8).map((product) => (
                  // @ts-ignore
                  <ProductCarousel key={product.id} product={product} />
                ))}
              </div>

              <div className="flex flex-col">
                <Image
                  src="/women-page/womennn.jpg"
                  alt="Woman wearing KINDRA shoes"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full rounded-tl-full rounded-tr-full"
                />
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex space-x-2">
                    <div className="size-5  bg-[#e6d2c5] border border-gray-300"></div>
                    <div className="size-5  bg-black border border-gray-300"></div>
                  </div>
                  <div className="a">
                    <p className="text-xs text-gray-700">Classic High Heels</p>
                    <p className="font-medium">129.00 TND</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metallic Magic Promotional Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 bg-gradient-to-r  rounded-lg overflow-hidden">
              <div className="relative h-[400px]">
                <Image
                  src="/women-page/PartyBootsCollection.jpg"
                  alt="Metallic blue boots"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-serif mb-2">
                  Metallic Magic in Every Step
                </h2>
                <p className="text-lg mb-2">
                  Heels with Attitude. Shine on Demand
                </p>
                <p className="mb-6">
                  Glam That Doesn't Whisper — It Roars... Check our Party-Ready
                  Boots That Own the Floor
                </p>
                <Link
                  href="/category/boots"
                  className="border border-black py-2 px-4 inline-flex items-center justify-center w-full md:w-48"
                >
                  Step Into Glam <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Luxury Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id}>
                  {/* @ts-ignore */}
                  <ProductCarousel product={product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 mt-16 mb-8">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                1
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                2
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                3
              </button>
              <span className="px-2">...</span>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                11
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
