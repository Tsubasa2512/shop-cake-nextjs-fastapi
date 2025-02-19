"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Menu } from "@/app/schema/menu";
import { getMenus } from "@/app/api/menu";
import { createCategory } from "@/app/api/category";

export default function CreateCategoryPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [menu, setMenu] = useState<Menu[]>([]);
    useEffect(() => {
        async function fetchMenus() {
            const data = await getMenus();
            setMenu(data);
            setIsLoading(false);
        }
        fetchMenus();
    }, []);

    const router = useRouter();
    const [formData, setFormData] = useState<{
        name: string;
        description: string | null;
        slug: string;
        image: File | null;
        is_active: boolean;
        id_user: number;
        menu: string;
    }>({
        name: "",
        description: null,
        is_active: true,
        slug: "",
        image: null,
        menu: "",
        id_user: 1,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const selectedMenu = menu.find(t => t.id === parseInt(formData.menu, 10));
        const categoryData = {
            name: formData.name,
            slug: formData.slug,
            is_active: formData.is_active,
            description: formData.description,
            menu: selectedMenu || { id: 0, name: "Unknown" },
            id_menu: parseInt(formData.menu, 10),
            image: formData.image ? formData.image.name : null,
            id_user: formData.id_user,

        };
        try {
            const createdCategory = await createCategory(categoryData);
            if (createdCategory) {
                console.log("Menu created successfully!");
                router.push("/admin/categories");
            }
        } catch (error) {
            console.log("Error creating category: ", error);
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const newFormData = {
                ...prev,
                [name]: value,
            };
            if (name === "name" ) {
                newFormData.slug = value
                    .toLocaleLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9\-]/g, "");
            }
            return newFormData;
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file,
            }));
        }
    };

    if (isLoading) return (
        <Button disabled><Loader2 className="animate-spin" />Please wait...</Button>
    );
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold"  >Create Category</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Category Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="id_menu">Menu</Label>
                            <Select
                                name="id_menu"
                                defaultValue={formData.menu}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, menu: value }))}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a menu" />
                                </SelectTrigger>
                                <SelectContent>
                                    {menu.map((item) => (
                                        <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image">Image</Label>
                            <Input id="image" type="file" name="image" onChange={handleFileChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label className="mr-2" htmlFor="is_active">Active</Label>
                            <Switch
                                id="is_active"
                                checked={formData.is_active}
                                onCheckedChange={(value) => setFormData((prev) => ({ ...prev, is_active: value }))}
                            />
                        </div>
                        <div className="flex space-x-2">
                            <Button type="submit">Create Category</Button>
                            <Button type="button" variant={"outline"} onClick={() => router.push("/admin/categories")}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}