"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, CircleCheck, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { getMenus, deleteMenu } from "@/app/api/menu";
import { Menu } from "@/app/schema/menu";



export default function MenusPage() {
    const [isLoading, setIsLoading] = useState(true);

    const [menus, setMenus] = useState<Menu[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [menuToDelete, setmenuToDelete] = useState<number | null>(null);

    useEffect(() => {
        async function fetchMenus() {
            const data = await getMenus();
            setMenus(data);
            setIsLoading(false);

        }
        fetchMenus();
    }, []);

    const handleDelete = async (id: number) => {
        if (id) {
            await deleteMenu(id);
            setMenus(menus.filter((menu) => menu.id !== id));
            setDeleteDialogOpen(false);
            setmenuToDelete(null);
        }
    };

    if (isLoading) return (
        <Button disabled><Loader2 className="animate-spin" />Please wait...</Button>
    );
    return (
        <div className="space-x-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">Menu</h1>
                <Link href="/admin/menu/create">
                    <Button>
                        <Plus className="mr-1 h-4 w-4" /> Add menu
                    </Button>
                </Link>
            </div>
            <div className="rounded-md border">
                <Table className="border-collapse">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border text-center w-[80px]">Index</TableHead>
                            <TableHead className="border text-center w-[80px]">Image</TableHead>
                            <TableHead className="border text-center ">Type</TableHead>
                            <TableHead className="border text-center ">Name</TableHead>
                            <TableHead className="border text-center ">Slug</TableHead>
                            <TableHead className="border text-center w-[80px]">Active</TableHead>
                            <TableHead className="border text-center w-[120px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-center ">
                        {menus.map((menu) => (
                            <TableRow key={menu.id} className="border-b border-gray-300">
                                <TableCell className="border py-2 px-2 capitalize">{menu.index_menu}</TableCell>
                                <TableCell className="border relative py-2 px-3">
                                    {menu.image ? (
                                        <Image
                                            src={menu.image}
                                            alt={menu.name}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-md"
                                        />
                                    ) : (
                                        <CircleX className="mx-auto" />
                                    )}
                                </TableCell>
                                <TableCell className="border py-2 px-3 capitalize">{menu.type.name}</TableCell>
                                <TableCell className="border py-2 px-3">{menu.name}</TableCell>
                                <TableCell className="border py-2 px-3">{menu.slug}</TableCell>
                                <TableCell className="border py-2 px-3">
                                    <div className="line-clamp-2">{menu.is_active ? <CircleCheck className="mx-auto" /> : <CircleX className="mx-auto" />}</div>
                                </TableCell>
                                <TableCell className="border py-2 px-3">
                                    <div className="flex space-x-2">
                                        <Link href={`/admin/menu/${menu.id}/edit`}>
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:text-red-600"
                                            onClick={() => {
                                                setmenuToDelete(menu.id);
                                                setDeleteDialogOpen(true);
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the menu.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => menuToDelete && handleDelete(menuToDelete)}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
