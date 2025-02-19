"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch";
import { Category } from "@/app/schema/category";
import { getCategories } from "@/app/api/category";
import { createArticle } from "@/app/api/article";

export default function CreateArticlePage() {
    const [isLoading, setIsLoading] = useState(true);

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
        description: string;
        slug: string;
        image: File | null;
        is_active: boolean;
        id_user: number;
        keywords: string;
        tag: string;
        category: string;
    }>({
        name: "",
        intro: "",
        description: "",
        is_active: true,
        slug: "",
        image: null,
        category: "",
        tag: "",
        keywords: "",
        id_user: 1,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const selectedCategory = category.find(t => t.id === parseInt(formData.category, 10));
        const articleData = {
            name: formData.name,
            intro: formData.intro,
            slug: formData.slug,
            description: formData.description,
            is_active: formData.is_active,
            keywords: formData.keywords,
            tag: formData.tag,
            category: selectedCategory || { id: 0, name: "Unknown" },
            id_category: parseInt(formData.category, 10),
            image: formData.image ? formData.image.name : null,
            id_user: formData.id_user,
        };
        try {
            const createdArticle = await createArticle(articleData);
            if (createdArticle) {
                console.log("Article created successfully!");
                router.push("/admin/articles");
            }
        }
        catch (error) {
            console.log("Error creating article: ", error);
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
                <h1 className="text-2xl md:text-3xl font-bold"  >Create Article</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Article Details</CardTitle>
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
                            <Input id="image" type="file" name="image" onChange={handleFileChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
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
                            <Label htmlFor="keywords">Keywords</Label>
                            <Textarea id="keywords" name="keywords" value={formData.keywords} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tag">Tag</Label>
                            <Textarea id="tag" name="tag" value={formData.tag} onChange={handleChange} />
                        </div>
                        <div className="flex space-x-2">
                            <Button type="submit">Create Article</Button>
                            <Button type="button" variant={"outline"} onClick={() => router.push("/admin/articles")}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}