import { getCurrentUser } from "@/lib/session";
import { getProductByIdUseCase, getAllSubcategoriesUseCase } from "@/use-cases/admin-products";
import { notFound } from "next/navigation";
import { updateProductAction } from "../../actions";
import { ProductEditForm } from "./product-edit-form";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getCurrentUser();
    const product = await getProductByIdUseCase(user!, parseInt(id));
    const subcategories = await getAllSubcategoriesUseCase(user!);

    if (!product) {
        notFound();
    }

    const updateAction = updateProductAction.bind(null, product.id);

    return (
        <div className="flex flex-col gap-8 py-8 max-w-2xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
            </div>

            <ProductEditForm
                product={product}
                subcategories={subcategories}
                existingVariants={product.variants || []}
                onSubmit={updateAction}
            />
        </div>
    );
}
