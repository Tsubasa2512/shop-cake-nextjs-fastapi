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
// import Image from "next/image";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Category } from "@/app/schema/category";
import { getCategories } from "@/app/api/category";
import { updateArticle, getArticleById } from "@/app/api/article";

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const articleId = parseInt(id);
    const [category, setCategory] = useState<Category[]>([]);
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

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCategory() {
            const data = await getCategories();
            setCategory(data);
            setIsLoading(false);
        };
        fetchCategory();
    }, []);

    useEffect(() => {
        const fetchArticleData = async () => {
            const articleData = await getArticleById(articleId);
            if (articleData) {
                articleData.category = String(articleData.category.id);
                setFormData(articleData);
            }
        };
        fetchArticleData();
    }, [articleId]);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const updatedArticleData = {
            ...formData,
            id_category: parseInt(formData.category),
        };
        try {
            const updatedArticle = await updateArticle(articleId, updatedArticleData);
            if (updatedArticle) {
                router.push("/admin/articles");
            } else {
                console.log("Failed to update article");
            }
        } catch (error) {
            console.error("Failed to update article", error);
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
                <h1 className="text-2xl md:text-3xl font-bold">Edit Article</h1>
                <Link href="/admin/articles">
                    <Button variant="outline">
                        <Pencil className="mr-1 h-4 w-4" /> Back to Articles List
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Article Details</CardTitle>
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
                            <Label htmlFor="id_category">Category</Label>
                            <Select
                                name="id_category"
                                value={formData.category}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: String(value) }))}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {category.map((item) => (
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
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex space-x-2">
                            <Button type="submit">Update Article</Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/admin/articles")}
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
