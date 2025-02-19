"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { getUserById, updateUser } from "@/app/api/user";

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const userId = parseInt(id, 10);

    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        is_active: boolean;
    }>({
        name: "",
        email: "",
        is_active: true,
    });


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUserData() {
            const userData = await getUserById(userId);
            if (userData) {
                setFormData(userData);
            }
            setIsLoading(false);
        }
        fetchUserData();
    }, [userId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const updatedUser = await updateUser(userId, formData);
            if (updatedUser) {
                router.push("/admin/user");
            } else {
                console.error("Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (isLoading) return (
        <Button disabled>Loading...</Button>
    );

    return (
        <div className="space-y-6">
                        <div className="flex items-center justify-between">

            <h1 className="text-2xl font-bold">Edit User</h1>
            <Link href="/admin/user">
                    <Button variant="outline">
                        <Pencil className="mr-1 h-4 w-4" /> Back to User List
                    </Button>
                </Link>
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
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                        <Label className="mr-2" htmlFor="is_active">Active</Label>
                        <Switch id="is_active" checked={formData.is_active} onCheckedChange={(value) => setFormData((prev) => ({ ...prev, is_active: value }))} />
                        </div>
                        <div className="flex space-x-2">
                            <Button type="submit">Update User</Button>
                            <Button type="button" variant="outline" onClick={() => router.push("/admin/user")}>Cancel</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
