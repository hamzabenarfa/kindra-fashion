"use client";

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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const SHOE_SIZES = ["36", "37", "38", "39", "40", "41", "42", "43", "44"];

interface ProductEditFormProps {
    product: any;
    subcategories: any[];
    existingVariants: any[];
    onSubmit: (formData: FormData) => Promise<void>;
}

export function ProductEditForm({ product, subcategories, existingVariants, onSubmit }: ProductEditFormProps) {
    const [name, setName] = useState(product.name);
    const [slug, setSlug] = useState(product.slug);
    const [sizeType, setSizeType] = useState<"NONE" | "CLOTHING" | "SHOES">(
        product.sizeType || "NONE"
    );

    // Extract existing sizes from variants
    const existingSizes = existingVariants
        .map(v => v.size)
        .filter(Boolean)
        .filter((v, i, a) => a.indexOf(v) === i); // unique

    const [selectedSizes, setSelectedSizes] = useState<string[]>(existingSizes);

    const availableSizes = sizeType === "CLOTHING" ? CLOTHING_SIZES : sizeType === "SHOES" ? SHOE_SIZES : [];

    const toggleSize = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    // Auto-generate slug from name
    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        // Only auto-generate if slug matches the previous auto-generated slug
        const autoSlug = generateSlug(product.name);
        if (slug === product.slug || slug === autoSlug) {
            setSlug(generateSlug(newName));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Add size type
        formData.set("sizeType", sizeType);

        // Add selected sizes as JSON
        formData.set("sizes", JSON.stringify(selectedSizes));

        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 border p-6 rounded-lg">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                    id="slug"
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                />
                <p className="text-xs text-muted-foreground">Auto-generated from name, but you can edit it</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="subcategoryId">Category</Label>
                <Select name="subcategoryId" required defaultValue={product.subcategoryId.toString()}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {subcategories.map((sub) => (
                            <SelectItem key={sub.id} value={sub.id.toString()}>
                                {sub.category.name} - {sub.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="basePrice">Price</Label>
                    <Input
                        id="basePrice"
                        name="basePrice"
                        type="number"
                        step="0.01"
                        required
                        defaultValue={product.basePrice}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input id="currency" name="currency" defaultValue={product.currency} required />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="inventory">Inventory</Label>
                <Input
                    id="inventory"
                    name="inventory"
                    type="number"
                    defaultValue={product.inventory}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Size Type</Label>
                <Select value={sizeType} onValueChange={(value) => {
                    setSizeType(value as "NONE" | "CLOTHING" | "SHOES");
                    setSelectedSizes([]);
                }}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="NONE">No Sizes (Accessories, etc.)</SelectItem>
                        <SelectItem value="CLOTHING">Clothing Sizes</SelectItem>
                        <SelectItem value="SHOES">Shoe Sizes</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {sizeType !== "NONE" && (
                <div className="space-y-2">
                    <Label>Available Sizes</Label>
                    <div className="grid grid-cols-6 gap-2">
                        {availableSizes.map((size) => (
                            <div key={size} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`size-${size}`}
                                    checked={selectedSizes.includes(size)}
                                    onCheckedChange={() => toggleSize(size)}
                                />
                                <label
                                    htmlFor={`size-${size}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {size}
                                </label>
                            </div>
                        ))}
                    </div>

                    {existingSizes.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-2">
                            Current sizes: {existingSizes.join(", ")}
                        </p>
                    )}
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    defaultValue={product.description || ""}
                />
            </div>

            <div className="flex items-center space-x-2">
                <Switch id="isActive" name="isActive" defaultChecked={product.isActive} />
                <Label htmlFor="isActive">Active</Label>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="submit">Update Product</Button>
            </div>
        </form>
    );
}
