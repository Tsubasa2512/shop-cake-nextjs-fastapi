"use client"

import { useState, useEffect, use } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
// import Image from "next/image";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Menu } from "@/app/schema/menu";
import { getMenus } from "@/app/api/menu";
import { getCategoryById, updateCategory } from "@/app/api/category";
import dynamic from 'next/dynamic';
const CustomEditor = dynamic(() => import('@/components/editor/editor'), { ssr: false });


export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const categoryId = parseInt(id);

    const [menu, setMenu] = useState<Menu[]>([]);
    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        slug: string;
        is_active: boolean;
        image: File | null;
        id_user: number;
        menu: string;
    }>({
        name: "",
        description: "",
        slug: "",
        image: null,
        menu: "",
        is_active: true,
        id_user: 1,

    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchMenus() {
            const data = await getMenus()
            setMenu(data);
            setIsLoading(false);

        };
        fetchMenus();
    }, []);

    useEffect(() => {
        const fetchCategoryData = async () => {
            const categoryData = await getCategoryById(categoryId);
            if (categoryData) {
                categoryData.menu = String(categoryData.menu.id);
                setFormData(categoryData);
            }
        };
        fetchCategoryData();
    }, [categoryId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const updatedCategoryData = {
            ...formData,
            id_menu: parseInt(formData.menu),
        };
        try {
            const updatedCategory = await updateCategory(categoryId, updatedCategoryData);
            if (updatedCategory) {
                router.push("/admin/categories");
            } else {
                console.log("Failed to update category");
            }
        }
        catch (error) {
            console.error("Error updating category:", error);
        };
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "name" && !formData.slug
                ? { slug: value.toLowerCase().replace(/\s+/g, "-") }
                : {}),
        }));
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
                <h1 className="text-2xl md:text-3xl font-bold">Edit Category</h1>
                <Link href="/admin/categories">
                    <Button variant="outline">
                        <Pencil className="mr-1 h-4 w-4" /> Back to Categories List
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Category Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="menu">Menu</Label>
                            <Select
                                name="id_menu"
                                value={formData.menu}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, menu: value }))}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a menu" />
                                </SelectTrigger>
                                <SelectContent>
                                    {menu.map((item) => (
                                        <SelectItem key={item.id} value={String(item.id)}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image">Image</Label>
                            <Input id="image" type="file" name="image" onChange={handleFileChange} />
                        </div>
                        <div className="space-y-2">
                            <Label className="mr-2" htmlFor="is_active">Active</Label>
                            <Switch
                                id="is_active"
                                checked={formData.is_active}
                                onCheckedChange={(value) => setFormData((prev) => ({ ...prev, is_active: value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" className="hidden" name="description" value={formData.description} onChange={handleChange} />
                            <CustomEditor data={formData.description} onChange={(data: string) => setFormData((prev) => ({ ...prev, description: data }))} />
                        </div>
                    
                        <div className="flex space-x-2">
                            <Button type="submit">Update Category</Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/admin/categories")}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
