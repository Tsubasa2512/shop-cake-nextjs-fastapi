"use client"

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { Pencil } from "lucide-react";
import Link from "next/link";
import dynamic from 'next/dynamic';
const CustomEditor = dynamic(() => import('@/components/editor/editor'), { ssr: false });


const menu = [
    { id: 1, name: "About Us" },
    { id: 2, name: "Product" },
    { id: 3, name: "Blog" },
];

export default function EditGalleryPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        slug: string;
        image: File | null;
        id_menu: string;
        currentImage?: string;
    }>({
        name: "",
        description: "",
        slug: "",
        image: null,
        id_menu: "",
        currentImage: "",
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Replace this with actual data fetching logic if needed
        setIsLoading(true);
        setTimeout(() => {
            setFormData({
                name: "Sample Gallery",
                description: "Sample Description",
                slug: "sample-gallery",
                id_menu: "2",
                currentImage: "/demo/gallery1.jpg",
                image: null,
            });
            setIsLoading(false);
        }, 500);
    }, [params]);

    if (isLoading) return (
        <Button disabled><Loader2 className="animate-spin" />Please wait...</Button>
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updating Gallery: ", formData);
        router.push("/admin/gallery");
    };

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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold">Edit Gallery</h1>
                <Link href="/admin/gallery">
                    <Button variant="outline">
                        <Pencil className="mr-1 h-4 w-4" /> Back to Menu List
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Gallery Details</CardTitle>
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
                            <Label htmlFor="id_menu">Menu</Label>
                            <Select
                                name="id_menu"
                                value={formData.id_menu}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, id_menu: String(value) }))}
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
                            {formData.currentImage && (
                                <div className="mb-2 w-60 h-40 relative">
                                    <Image
                                        src={formData.currentImage}
                                        alt="Current gallery image"
                                        fill
                                        className="w-32 h-32 object-cover rounded-md"
                                    />
                                </div>
                            )}
                            <Input
                                id="image"
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                            />
                            <p className="text-sm text-gray-500">
                                Leave empty to keep the current image
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" className="hidden" name="description" value={formData.description} onChange={handleChange} />
                            <CustomEditor data={formData.description} onChange={(data: string) => setFormData((prev) => ({ ...prev, description: data }))} />
                        </div>
                        <div className="flex space-x-2">
                            <Button type="submit">Update Gallery</Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/admin/gallery")}
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
