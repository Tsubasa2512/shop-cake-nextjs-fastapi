"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/app/schema/role";
import { getRoles } from "@/app/api/role";
import { createUser } from "@/app/api/user";
import { Switch } from "@/components/ui/switch";

export default function CreateUserPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchRoles() {
            const data = await getRoles();
            setRoles(data);
            setIsLoading(false);
        }
        fetchRoles();
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        is_active: true
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const selectedRole = roles.find(r => r.id === parseInt(formData.role, 10));

        const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: selectedRole || { id: 0, name: "Unknown" },
            id_role: parseInt(formData.role, 10),
            is_active: formData.is_active,

        };

        try {
            const createdUser = await createUser(userData);
            if (createdUser) {
                console.log("User created successfully!");
                router.push("/admin/user");
            }
        } catch (error) {
            console.error("Failed to create user:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (isLoading) return (
        <Button disabled><Loader2 className="animate-spin" /> Please wait...</Button>
    );

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
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select
                                name="role"
                                value={formData.role}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem key={role.id} value={String(role.id)}>
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                            <Button type="submit">Create User</Button>
                            <Button type="button" variant="outline" onClick={() => router.push("/admin/user")}>Cancel</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
