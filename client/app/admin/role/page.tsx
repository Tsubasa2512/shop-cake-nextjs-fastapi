"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { getRoles, deleteRole } from "@/app/api/role";
import { Role } from "@/app/schema/role";

export default function RolePage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch roles from API
    useEffect(() => {
        const fetchRoles = async () => {
            const rolesData = await getRoles();
            setRoles(rolesData);
            setIsLoading(false)
        };

        fetchRoles();
    }, []);
    console.log(roles);

    // Handle delete role
    const handleDelete = async (id: number) => {
        if (roleToDelete) {
            await deleteRole(id); // Call delete API
            setRoles(roles.filter(role => role.id !== id)); // Remove the role from state
            setDeleteDialogOpen(false);
            setRoleToDelete(null);
        }
    }
    if (isLoading) return (
        <Button disabled><Loader2 className="animate-spin" /> Please wait...</Button>
    );
    return (
        <div className="space-x-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">Role</h1>
                <Link href="/admin/role/create">
                    <Button>
                        <Plus className="mr-1 h-4 w-4" />Add Role
                    </Button>
                </Link>
            </div>
            <div className="rounded-md border">
                <Table className="border-collapse">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border py-2 px-3 w-[200px]">Name</TableHead>
                            <TableHead className="border py-2 px-3">Permissions</TableHead>
                            <TableHead className="border py-2 px-3 w-[100px] text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            roles.map((role) => (
                                <TableRow key={role.id} className="border-b border-gray-300">
                                    <TableCell className="border py-2 px-3">{role.name}</TableCell>
                                    <TableCell className="border py-2 px-3">
                                        [ {role.permissions.map((item) =>item.name).join(" - ") } ]
                                    </TableCell>
                                    <TableCell className="border py-2 px-3">
                                        <div className="flex space-x-2">
                                            <Link href={`/admin/role/${role.id}/edit`}>
                                                <Button variant="ghost" size="icon">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"
                                                onClick={() => {
                                                    setRoleToDelete(role.id);
                                                    setDeleteDialogOpen(true);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete the role.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500 hover:bg-red-600"
                            onClick={() => roleToDelete && handleDelete(roleToDelete)}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
