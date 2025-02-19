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

import { Product } from "@/app/schema/product";
import { getProducts, deleteProduct } from "@/app/api/product";

export default function ProductsPage() {
    const [isLoading, setIsLoading] = useState(true);

    const [products, setProducts] = useState<Product[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<number | null>
        (null);

    useEffect(() => {
        async function fetchProducts() {
            const data = await getProducts();
            setProducts(data)
            setIsLoading(false);

        }
        fetchProducts();
    }, [])
    const handleDelete = async (id: number) => {
        if (id) {
            await deleteProduct(id)
            setProducts(products.filter(product => product.id !== id))
            setDeleteDialogOpen(false)
            setProductToDelete(null)
        }
    }
    if (isLoading) return (
        <Button disabled><Loader2 className="animate-spin" />Please wait...</Button>
    );
    return (
        <div className="space-x-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
                <Link href="/admin/products/create">
                    <Button>
                        <Plus className="mr-1 h-4 w-4" />Add Product
                    </Button>
                </Link>
            </div>
            <div className="rounded-md border">
                <Table className="border-collapse">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border text-center w-[120px]">Category</TableHead>
                            <TableHead className="border text-center w-[80px]">Image</TableHead>
                            <TableHead className="border text-center ">Name</TableHead>
                            <TableHead className="border text-center ">Price</TableHead>
                            <TableHead className="border text-center ">Intro</TableHead>
                            <TableHead className="border text-center w-[80px]">Active</TableHead>
                            <TableHead className="border text-center w-[120px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-center">
                        {
                            products.map((product) => (
                                <TableRow key={product.id} className="border-b border-gray-300">
                                    <TableCell className="border py-2 px-3 capitalize">{product.category.name}</TableCell>
                                    <TableCell className="border relative py-2 px-3">
                                        {product.image ? (
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-md"
                                            />
                                        ) : (
                                            <CircleX className="mx-auto" />
                                        )}
                                    </TableCell>
                                    <TableCell className="border py-2 px-3">{product.name}</TableCell>
                                    <TableCell className="border py-2 px-3">{product.price}</TableCell>
                                    <TableCell className="border py-2 px-3"><div className="line-clampy-2 px-3">{product.intro}</div></TableCell>
                                    <TableCell className="border py-2 px-3">
                                        <div className="line-clamp-2">{product.is_active ? <CircleCheck className="mx-auto" /> : <CircleX className="mx-auto" />}</div>
                                    </TableCell>
                                    <TableCell className="py-2 px-3">
                                        <div className="flex space-x-2">
                                            <Link href={`/admin/products/${product.id}/edit`}>
                                                <Button variant="ghost" size="icon">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"
                                                onClick={() => {
                                                    setProductToDelete(product.id);
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
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete the product</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500 hover:bg-red-600"
                            onClick={() => productToDelete && handleDelete(productToDelete)}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>

            </AlertDialog>
        </div>


    )
}