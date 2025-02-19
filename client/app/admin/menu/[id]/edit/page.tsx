"use client";

import { useState, useEffect, use } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Type } from "@/app/schema/type";
import { getTypes } from "@/app/api/type";
import { getMenuById, updateMenu } from "@/app/api/menu";

import Link from "next/link";
import { Pencil } from "lucide-react";

export default function EditMenuPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();

    const { id } = use(params);
    const menuId = parseInt(id);

    const [type, setType] = useState<Type[]>([]);
    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        slug: string;
        image: File | null;
        is_active: boolean;
        index_menu: number;
        id_user: number;
        type: string;
    }>({
        name: "",
        description: "",
        slug: "",
        image: null,
        is_active: true,
        index_menu: 1,
        id_user: 1,
        type: "",
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTypes() {
            const data = await getTypes();
            setType(data);
            setIsLoading(false);

        }
        fetchTypes();
    }, []);

    useEffect(() => {
        const fetchMenuData = async () => {
            const menuData = await getMenuById(menuId);
            if (menuData) {
                menuData.type = String(menuData.type.id);
                setFormData(menuData);
            }
        };

        fetchMenuData();
    }, [menuId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const updatedMenuData = {
            ...formData,
            id_type: parseInt(formData.type),
        };
        try {
            const updatedMenu = await updateMenu(menuId, updatedMenuData);

            if (updatedMenu) {
                router.push("/admin/menu");
            } else {
                console.error("Failed to update menu");
            }
        } catch (error) {
            console.error("Error updating menu:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
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
                <h1 className="text-2xl md:text-3xl font-bold">Edit Menu</h1>
                <Link href="/admin/menu">
                    <Button variant="outline">
                        <Pencil className="mr-1 h-4 w-4" /> Back to Menu List
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Menu Details</CardTitle>
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
                            <Label htmlFor="type">Type</Label>
                            <Select
                                name="id_type"
                                value={formData.type}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {type.map((item) => (
                                        <SelectItem key={item.id} value={String(item.id)}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="index_menu">Index Menu</Label>
                            <Input id="index_menu" name="index_menu" type="numnber" value={formData.index_menu} onChange={handleChange} required />
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

                        <div className="flex space-x-2">
                            <Button type="submit">Update Menu</Button>
                            <Button type="button" variant={"outline"} onClick={() => router.push("/admin/menus")}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
