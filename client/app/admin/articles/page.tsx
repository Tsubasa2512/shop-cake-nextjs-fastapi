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

import { Article } from "@/app/schema/article";
import { getArticles, deleteArticle } from "@/app/api/article";

export default function ArticlePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [article, setArticle] = useState<Article[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState<number | null>
        (null);

    useEffect(() => {
        async function fetchArticles() {
            const data = await getArticles();
            setArticle(data);
            setIsLoading(false);
        }
        fetchArticles();

    }, []);
    const handleDelete = async (id: number) => {
        if (id) {
            await deleteArticle(id);
            setArticle(article.filter(article => article.id !== id))
            setDeleteDialogOpen(false)
            setArticleToDelete(null)
        }
    }
    if (isLoading) return (
        <Button disabled><Loader2 className="animate-spin" />Please wait...</Button>
    );
    return (
        <div className="space-x-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">Articles</h1>
                <Link href="/admin/articles/create">
                    <Button>
                        <Plus className="mr-1 h-4 w-4" />Add Article
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
                            <TableHead className="border text-center ">Intro</TableHead>
                            <TableHead className="border text-center w-[80px]">Active</TableHead>
                            <TableHead className="border text-center w-[120px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-center ">
                        {
                            article.map((article) => (
                                <TableRow key={article.id} className="border-b border-gray-300">
                                    <TableCell className="border py-2 px-3 capitalize">{article.category.name}</TableCell>
                                    <TableCell className="border relative py-2 px-3">
                                    {article.image ? (
                                            <Image
                                                src={article.image}
                                                alt={article.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-md"
                                            />
                                        ) : (
                                            <CircleX className="mx-auto" />
                                        )}                                    </TableCell>
                                    <TableCell className="border py-2 px-3">{article.name}</TableCell>
                                    <TableCell className="border py-2 px-3"><div className="line-clampy-2 px-3">{article.intro}</div></TableCell>
                                    <TableCell className="border py-2 px-3">
                                        <div className="line-clamp-2">{article.is_active ? <CircleCheck className="mx-auto" /> : <CircleX className="mx-auto" />}</div>
                                    </TableCell>
                                    <TableCell className="border py-2 px-3">
                                        <div className="flex space-x-2">
                                            <Link href={`/admin/articles/${article.id}/edit`}>
                                                <Button variant="ghost" size="icon">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"
                                                onClick={() => {
                                                    setArticleToDelete(article.id);
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
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete the article</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500 hover:bg-red-600"
                            onClick={() => articleToDelete && handleDelete(articleToDelete)}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>

            </AlertDialog>
        </div>


    )
}