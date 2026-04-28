import { getCurrentUser } from "@/lib/session";
import { getAllSubcategoriesUseCase } from "@/use-cases/admin-products";
import { createProductAction } from "../actions";
import { ProductForm } from "./product-form";

export default async function NewProductPage() {
    const user = await getCurrentUser();
    const subcategories = await getAllSubcategoriesUseCase(user!);

    return (
        <div className="flex flex-col gap-8 py-8 max-w-2xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">New Product</h1>
            </div>

            <ProductForm subcategories={subcategories} onSubmit={createProductAction} />
        </div>
    );
}
