import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { getCurrentUser } from "@/lib/session";
import { getCategoryByIdUseCase } from "@/use-cases/admin-categories";
import { notFound } from "next/navigation";
import { updateCategoryAction } from "../../actions";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getCurrentUser();
    const category = await getCategoryByIdUseCase(user!, parseInt(id));

    if (!category) {
        notFound();
    }

    const updateAction = updateCategoryAction.bind(null, category.id);

    return (
        <div className="flex flex-col gap-8 py-8 max-w-2xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
            </div>

            <form action={updateAction} className="space-y-6 border p-6 rounded-lg">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required defaultValue={category.name} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" name="slug" required defaultValue={category.slug} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <Select name="section" required defaultValue={category.section}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="men">Men</SelectItem>
                            <SelectItem value="women">Women</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        defaultValue={category.description || ""}
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Switch id="isActive" name="isActive" defaultChecked={category.isActive} />
                    <Label htmlFor="isActive">Active</Label>
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="submit">Update Category</Button>
                </div>
            </form>
        </div>
    );
}
