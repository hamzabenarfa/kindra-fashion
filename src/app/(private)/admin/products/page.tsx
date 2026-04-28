import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { getAllProductsUseCase } from "@/use-cases/admin-products";
import Link from "next/link";
import { Plus, Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/util/currency"; // Assuming this utility exists or I'll create it

export default async function AdminProductsPage() {
    const user = await getCurrentUser();
    const products = await getAllProductsUseCase(user!);

    return (
        <div className="flex flex-col gap-8 py-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <Button asChild>
                    <Link href="/admin/products/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Product
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Variants</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Inventory</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {products.map((product) => (
                                <tr key={product.id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle font-medium">{product.name}</td>
                                    <td className="p-4 align-middle">
                                        {product.subcategory.category.name} / {product.subcategory.name}
                                    </td>
                                    <td className="p-4 align-middle">
                                        {product.basePrice} {product.currency}
                                    </td>
                                    <td className="p-4 align-middle">{product.variants.length}</td>
                                    <td className="p-4 align-middle">{product.inventory}</td>
                                    <td className="p-4 align-middle">
                                        <Badge variant={product.isActive ? "default" : "secondary"}>
                                            {product.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/products/${product.id}/edit`}>
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="p-4 text-center text-muted-foreground">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
