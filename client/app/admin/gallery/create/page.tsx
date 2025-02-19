"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch";
import { Category } from "@/app/schema/category";
import { getCategories } from "@/app/api/category";
import { createGallery } from "@/app/api/gallery";


export default function CreateGalleryPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState<Category[]>([]);
    useEffect(() => {
        async function fetchCategories() {
            const data = await getCategories();
            setCategory(data);
            setIsLoading(false);

        }
        fetchCategories();
    }, []);

    const router = useRouter();
    const [formData, setFormData] = useState<{
        name: string;
        intro: string;
        slug: string;
        image: File | null;
        is_active: boolean;
        id_user: number;
        category: string;
    }>({
        name: "",
        intro: "",
        is_active: true,
        slug: "",
        image: null,
        category: "",
        id_user: 1,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const selectedCategory = category.find(t => t.id === parseInt(formData.category, 10));
        const galleryData = {
            name: formData.name,
            intro: formData.intro,
            slug: formData.slug,
            is_active: formData.is_active,
            category: selectedCategory || { id: 0, name: "Unknown" },
            id_category: parseInt(formData.category, 10),
            image: formData.image ? formData.image.name : null,
            id_user: formData.id_user,
        };
        try {
            const createdGallery = await createGallery(galleryData);
            if (createdGallery) {
                console.log("Gallery created successfully");
                router.push("/admin/gallery")

            }
        } catch (error) {
            console.log("Error creating gallery", error);

        }
    }
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
                <h1 className="text-2xl md:text-3xl font-bold"  >Create Gallery</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Gallery Details</CardTitle>
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
                            <Label htmlFor="id_category">Category</Label>
                            <Select
                                name="id_category"
                                defaultValue={formData.category}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {category.map((item) => (
                                        <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="intro">Intro</Label>
                            <Textarea id="intro" name="intro" value={formData.intro} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image">Image</Label>
                            <Input id="image" type="file" name="image" onChange={handleFileChange} required />
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
                            <Button type="submit">Create Gallery</Button>
                            <Button type="button" variant={"outline"} onClick={() => router.push("/admin/gallery")}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}