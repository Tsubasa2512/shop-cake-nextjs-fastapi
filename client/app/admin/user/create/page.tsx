"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"

export default function CreateUserPage() {
    const menu = [
        {
            id: 1,
            name: "About Us",
        },
        {
            id: 2,
            name: "Product",
        },
        {
            id: 3,
            name: "Blog",
        },

    ];

    const router = useRouter();
    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        slug: string;
        image: File | null;
        id_menu: string;
    }>({
        name: "",
        description: "",
        slug: "",
        image: null,
        id_menu: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Creating User: ", formData);
        router.push("/admin/user")
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "name" && !formData.slug
                ? { slug: value.toLocaleLowerCase().replace(/\s+/g, "-") }
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
                <h1 className="text-2xl md:text-3xl font-bold">Create User</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>User Details</CardTitle>
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
                                defaultValue={formData.id_menu}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, id_menu: value }))}
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
                            <Input id="image" type="file" name="image" onChange={handleFileChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                        </div>
                        <div className="flex space-x-2">
                            <Button type="submit">Create User</Button>
                            <Button type="button" variant={"outline"} onClick={() => router.push("/admin/user")}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}