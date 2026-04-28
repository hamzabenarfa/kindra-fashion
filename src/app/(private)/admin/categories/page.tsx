import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { getAllCategoriesUseCase } from "@/use-cases/admin-categories";
import Link from "next/link";
import { Plus, Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function AdminCategoriesPage() {
    const user = await getCurrentUser();
    const categories = await getAllCategoriesUseCase(user!);

    return (
        <div className="flex flex-col gap-8 py-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                <Button asChild>
                    <Link href="/admin/categories/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Category
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Section</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Slug</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Subcategories</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {categories.map((category) => (
                                <tr key={category.id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle font-medium">{category.name}</td>
                                    <td className="p-4 align-middle capitalize">{category.section}</td>
                                    <td className="p-4 align-middle">{category.slug}</td>
                                    <td className="p-4 align-middle">{category.subcategories.length}</td>
                                    <td className="p-4 align-middle">
                                        <Badge variant={category.isActive ? "default" : "secondary"}>
                                            {category.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/categories/${category.id}/edit`}>
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                        No categories found.
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
