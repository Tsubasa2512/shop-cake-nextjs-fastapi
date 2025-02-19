"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import { Plus, Pencil, Trash2, CircleCheck, CircleX } from "lucide-react";
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

import { getCategories, deleteCategory } from "@/app/api/category";
import { Category } from "@/app/schema/category";


export default function CategoriesPage() {
    const [isLoading, setIsLoading] = useState(true);

    const [categories, setCategories] = useState<Category[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

    useEffect(() => {
        async function fetchCategories() {
            const data = await getCategories();
            setCategories(data);
            setIsLoading(false);

        }
            fetchCategories();

    }, []);

    const handleDelete = async (id: number) => {
        if (id) {
            await deleteCategory(id);
            setCategories(categories.filter(category => category.id !== id))
            setDeleteDialogOpen(false)
            setCategoryToDelete(null)
        }
    }
    if (isLoading) return (
        <Button disabled><Loader2 className="animate-spin" />Please wait...</Button>
    );
    return (
        <div className="space-x-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">Categories</h1>
                <Link href="/admin/categories/create">
                    <Button>
                        <Plus className="mr-1 h-4 w-4" />Add Category
                    </Button>
                </Link>
            </div>
            <div className="rounded-md border">
                <Table className="border-collapse">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border text-center w-[120px]">Menu</TableHead>
                            <TableHead className="border text-center w-[80px]">Image</TableHead>
                            <TableHead className="border text-center ">Name</TableHead>
                            <TableHead className="border text-center ">Slug</TableHead>
                            <TableHead className="border text-center w-[80px]">Active</TableHead>
                            <TableHead className="border text-center w-[120px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-center ">
                        {
                            categories.map((category) => (
                                <TableRow key={category.id} className="border-b border-gray-300">
                                    <TableCell className="border py-2 px-3 capitalize">{category.menu.name}</TableCell>
                                    <TableCell className="border relative py-2 px-3">
                                        {category.image ? (
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-md"
                                            />
                                        ) : (
                                            <CircleX className="mx-auto" />
                                        )}
                                    </TableCell>
                                    <TableCell className="border py-2 px-3">{category.name}</TableCell>
                                    <TableCell className="border py-2 px-3"><div className="line-clampy-2 px-3">{category.slug}</div></TableCell>
                                    <TableCell className="border py-2 px-3">
                                        <div className="line-clamp-2">{category.is_active ? <CircleCheck className="mx-auto" /> : <CircleX className="mx-auto" />}</div>
                                    </TableCell>
                                    <TableCell className="border py-2 px-3">
                                        <div className="flex space-x-2">
                                            <Link href={`/admin/categories/${category.id}/edit`}>
                                                <Button variant="ghost" size="icon">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"
                                                onClick={() => {
                                                    setCategoryToDelete(category.id);
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
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete the category</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500 hover:bg-red-600"
                            onClick={() => categoryToDelete && handleDelete(categoryToDelete)}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>

            </AlertDialog>
        </div>


    )
}