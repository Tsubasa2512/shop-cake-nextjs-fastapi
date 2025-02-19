"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

const mockUser = [
    { id: 1, name: "Appetizers", imgage: "/demo/hot1.jpg", description: "Stay ahead of the trends with these must-try cake designs and flavors for this year.", type: "article", menu: "Blog" },
    { id: 2, name: "First Birthday Cake", imgage: "/demo/hot2.jpg", description: "Stay ahead of the trends with these must-try cake designs and flavors for this year.", type: "product", menu: "Product" },
    { id: 3, name: "Cream Puff", imgage: "/demo/hot3.jpg", description: "Stay ahead of the trends with these must-try cake designs and flavors for this year.", type: "product", menu: "Product" },
    { id: 4, name: "Album", imgage: "/demo/hot4.jpg", description: "Stay ahead of the trends flavors for this year.", type: "gallery", menu: "Gallery" },
]

export default function UserPage() {
    const [user, setUser] = useState(mockUser);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>
        (null);

    const handleDelete = (id: number) => {
        setUser(user.filter(user => user.id !== id))
        setDeleteDialogOpen(false)
        setUserToDelete(null)
    }

    return (
        <div className="space-x-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">User</h1>
                <Link href="/admin/user/create">
                    <Button>
                        <Plus className="mr-1 h-4 w-4" />Add User
                    </Button>
                </Link>
            </div>
            <div className="rounded-md border">
                <Table className="border-collapse">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Menu</TableHead>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            user.map((user) => (
                                <TableRow key={user.id} className="border-b border-gray-300">
                                    <TableCell className="py-2 px-3 capitalize">{user.menu}</TableCell>
                                    <TableCell className="relative py-2 px-3">
                                        <Image src={user.imgage} alt={user.name} fill />
                                    </TableCell>
                                    <TableCell className="py-2 px-3">{user.name}</TableCell>
                                    <TableCell className="py-2 px-3"><div className="line-clampy-2 px-3">{user.description}</div></TableCell>
                                    <TableCell className="py-2 px-3">
                                        <div className="flex space-x-2">
                                            <Link href={`/admin/user/${user.id}/edit`}>
                                                <Button variant="ghost" size="icon">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"
                                                onClick={() => {
                                                    setUserToDelete(user.id);
                                                    setDeleteDialogOpen(true)
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
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete the user</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500 hover:bg-red-600"
                            onClick={() => userToDelete && handleDelete(userToDelete)}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>

            </AlertDialog>
        </div>


    )
}