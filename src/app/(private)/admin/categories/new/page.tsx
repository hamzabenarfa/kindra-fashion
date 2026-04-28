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
import { createCategoryAction } from "../actions";

export default function NewCategoryPage() {
    return (
        <div className="flex flex-col gap-8 py-8 max-w-2xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">New Category</h1>
            </div>

            <form action={createCategoryAction} className="space-y-6 border p-6 rounded-lg">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required placeholder="e.g. Clothing" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" name="slug" required placeholder="e.g. clothing" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <Select name="section" required>
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
                    <Textarea id="description" name="description" placeholder="Category description..." />
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="submit">Create Category</Button>
                </div>
            </form>
        </div>
    );
}
