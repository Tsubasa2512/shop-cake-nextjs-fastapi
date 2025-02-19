"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Permission } from "@/app/schema/permission";
import { CreateRole } from "@/app/schema/role";
import { getPermissions } from "@/app/api/permission";
import { createRole } from "@/app/api/role";

interface RoleFormData {
    name: string;
    is_active: boolean;
    permission_ids: number[];
}

export default function CreateRolePage() {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState<RoleFormData>({
        name: "",
        is_active: true,
        permission_ids: [],
    });

    const router = useRouter();

    useEffect(() => {
        async function fetchPermissions() {
            const data = await getPermissions();
            setPermissions(data);
            setIsLoading(false);
        }
        fetchPermissions();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const roleData: CreateRole = {
                name: formData.name,
                permission_ids: formData.permission_ids, // Dùng permission_ids
            };
            const createdRole = await createRole(roleData);
            if (createdRole) {
                console.log("Role created successfully!");
                router.push("/admin/role");
            }
        } catch (error) {
            console.error("Failed to create role:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        const permissionId = parseInt(name, 10);

        setFormData((prev: RoleFormData) => ({
            ...prev,
            permission_ids: checked
                ? [...prev.permission_ids, permissionId] // Sử dụng permission_ids
                : prev.permission_ids.filter(id => id !== permissionId),
        }));
    };

    const handleSwitchChange = (value: boolean) => {
        setFormData((prev: RoleFormData) => ({
            ...prev,
            is_active: value,
        }));
    };

    if (isLoading) return (
        <Button disabled><Loader2 className="animate-spin" /> Please wait...</Button>
    );

    const groupedPermissions: { [key: string]: Permission[] } = permissions.reduce(
        (groups, permission) => {
            const group = permission.resource;
            if (!groups[group]) {
                groups[group] = [];
            }
            groups[group].push(permission);
            return groups;
        },
        {} as { [key: string]: Permission[] }
    );


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold">Create Role</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Role Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {Object.keys(groupedPermissions).map((resource) => (
                                <div key={resource} className="space-y-2">
                                    <h3 className="font-bold text-lg">{resource} </h3>
                                    {groupedPermissions[resource].map((permission) => (
                                        <div key={permission.id} className="flex items-center space-x-2">
                                            <input
                                                className="size-5"
                                                type="checkbox"
                                                id={String(permission.id)}
                                                name={String(permission.id)}
                                                checked={formData.permission_ids.includes(permission.id)} // Sử dụng permission_ids
                                                onChange={handlePermissionChange}
                                            />
                                            <Label htmlFor={String(permission.id)}>
                                                {permission.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <Label className="mr-2" htmlFor="is_active">Active</Label>
                            <Switch
                                id="is_active"
                                checked={formData.is_active}
                                onCheckedChange={handleSwitchChange}
                            />
                        </div>

                        <div className="flex space-x-2">
                            <Button type="submit">Create Role</Button>
                            <Button
                                type="button"
                                variant={"outline"}
                                onClick={() => router.push("/admin/role")}
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
