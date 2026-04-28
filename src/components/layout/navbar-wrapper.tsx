import { getCategoriesBySectionUseCase } from "@/use-cases/products";
import { getCurrentUser } from "@/lib/session";
import Navbar from "./navbar";

export async function NavbarWrapper() {
    const menCategories = await getCategoriesBySectionUseCase("men");
    const womenCategories = await getCategoriesBySectionUseCase("women");
    const user = await getCurrentUser();

    return (
        <Navbar
            brandName="KINDRA"
            menCategoriesData={menCategories}
            womenCategoriesData={womenCategories}
            user={user}
        />
    );
}
