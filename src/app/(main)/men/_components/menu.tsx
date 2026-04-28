import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CategoryButton from "@/components/women-sections/category-button";

const MenMenu = () => {
  const categories = [
    { name: "VIEW ALL", image: "/men-page/menu/men-viewAll.jpeg" },
    { name: "T-SHIRT", image: "/men-page/menu/men-tshirt.jpeg" },
    { name: "BLOUSE", image: "/men-page/menu/men-blouse.jpeg" },
    { name: "HIGH NECK", image: "/men-page/menu/men-highneck.jpg" },
    { name: "POLO", image: "/men-page/menu/men-polo.jpg" },
    { name: "CARDIGAN", image: "/men-page/menu/men-cardigan.jpg" },
  ];
  return (
    <ScrollArea className="w-full whitespace-nowrap py-6   ">
      <div className="flex w-full justify-between  space-x-4 px-4 lg:px-12">
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
  );
};

export default MenMenu;
