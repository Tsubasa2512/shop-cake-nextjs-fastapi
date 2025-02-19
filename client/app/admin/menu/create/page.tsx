"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Type } from "@/app/schema/type";
import { getTypes } from "@/app/api/type";
import { createMenu } from "@/app/api/menu";
import { Switch } from "@/components/ui/switch";

export default function CreateMenuPage() {
    const [type, setType] = useState<Type[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTypes() {
            const data = await getTypes();
            setType(data);
            setIsLoading(false);

        }
        fetchTypes();
    }, []);

    const router = useRouter();
    const [formData, setFormData] = useState<{
        name: string;
        slug: string;
        image: File | null;
        is_active: boolean;
        index_menu: number;
        id_user: number;
        type: string;
    }>({
        name: "",
        slug: "",
        image: null,
        is_active: true,
        index_menu: 1,
        id_user: 1,
        type: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const selectedType = type.find(t => t.id === parseInt(formData.type, 10));

        const menuData = {
            name: formData.name,
            slug: formData.slug,
            is_active: formData.is_active,
            index_menu: formData.index_menu,
            type: selectedType || { id: 0, name: "Unknown" },
            id_type: parseInt(formData.type, 10),
            id_user: formData.id_user,
            image: formData.image ? formData.image.name : null,
        };

        try {
            const createdMenu = await createMenu(menuData);
            if (createdMenu) {
                console.log("Menu created successfully!");
                router.push("/admin/menu");
            }
        } catch (error) {
            console.error("Failed to create menu:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const newFormData = {
                ...prev,
                [name]: value,
            };
            if (name === "name") {
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
                <h1 className="text-2xl md:text-3xl font-bold">Create Menu</h1>
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
                            <Label htmlFor="id_type">Type</Label>
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
                        {/* <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                        </div> */}
                        <div className="space-y-2">
                            <Label className="mr-2" htmlFor="is_active">Active</Label>
                            <Switch
                                id="is_active"
                                checked={formData.is_active}
                                onCheckedChange={(value) => setFormData((prev) => ({ ...prev, is_active: value }))}
                            />
                        </div>
                        <div className="flex space-x-2">
                            <Button type="submit">Create Menu</Button>
                            <Button type="button" variant={"outline"} onClick={() => router.push("/admin/menu")}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
