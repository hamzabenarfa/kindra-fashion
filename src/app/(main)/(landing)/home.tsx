import HeroSection from "@/components/home-sections/hero-section"
import LuxuryCasualSection from "@/components/home-sections/luxury-casual-section"
import TrendSection from "@/components/home-sections/trend-section"
import WearItSection from "@/components/home-sections/wear-it-section"
import ScrollingText from "@/components/home-sections/scrolling-text"
import UltimateFashionSection from "@/components/home-sections/ultimate-fashion-section"
import FashionGallerySection from "@/components/home-sections/fashion-gallery-section"
import LastChanceSection from "@/components/home-sections/last-chance-section"
function Home() {

  const lastChanceProducts = [
    {
      name: "Denim Jacket",
      price: "259.00 TND",
      colors: ["bg-gray-700", "bg-gray-900", "bg-amber-200"],
      image: "/LastChance/1.jpg",
    },
    {
      name: "Cozy Casual Blazer",
      price: "189.00 TND",
      colors: ["bg-amber-200", "bg-black"],
      image: "/LastChance/2.jpg",
    },
    {
      name: "Basic Men Sneaker",
      price: "159.00 TND",
      colors: ["bg-white", "bg-gray-200", "bg-green-700"],
      image: "/LastChance/3.jpg",
    },
    {
      name: "Men Trousers",
      price: "89.00 TND",
      colors: ["bg-gray-300", "bg-gray-200", "bg-green-700"],
      image: "/LastChance/4.jpg",
    },
  ]

  // Gallery images
  const galleryImages = [
    { src: "/Home-WomenSection/1.jpg", alt: "Fashion item 1" },
    { src: "/Home-WomenSection/2.jpg", alt: "Fashion item 2" },
    { src: "/Home-WomenSection/3.jpg", alt: "Fashion item 3" },
    { src: "/Home-WomenSection/4.jpg", alt: "Fashion item 4" },
    { src: "/Home-WomenSection/5.jpg", alt: "Fashion item 5" },
    { src: "/Home-WomenSection/6.jpg", alt: "Fashion item 6" },
    { src: "/Home-WomenSection/7.jpg", alt: "Fashion item 7" },
  ]



  return (
    <main className="min-h-screen bg-[#ffffff] -mt-16 overflow-x-hidden">

      {/* Hero Section */}
      <HeroSection leftImage="/Hero-section/ModelMen.jpg" rightImage="/Hero-section/ModelWomen.jpg" />

      {/* Luxury Casual Section */}
      <LuxuryCasualSection />

      {/* Trend Section */}
      <TrendSection />

      {/* Wear It Your Way Section */}
      <WearItSection />

      {/* Essentials Section - Scrolling Text */}
      <ScrollingText text="Now Essentials → Now Season, Now Essentials → Now Season, Now Essentials → Now Season, Now Essentials → Now Season, Now Essentials → Now Season, Now Essentials → Now Season, Now Essentials → Now Season" />

      {/* Ultimate Fashion Section */}
      <UltimateFashionSection />

      {/* Fashion Gallery Section */}
      <FashionGallerySection
        leftItems={["Exclusive gifts.", "Insider access.", "Special events."]}
        rightItems={["Beauty", "Fashion", "Culture"]}
        images={galleryImages}
      />

      {/* Last Chance Section */}
      <LastChanceSection products={lastChanceProducts} />

    </main>
  )
}
export default Home
