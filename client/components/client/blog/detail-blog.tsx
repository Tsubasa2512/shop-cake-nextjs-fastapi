"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Calendar,
    Clock,
    ChevronLeft,
    ChevronRight,
    Share2,
    Facebook,
    Twitter,
    Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Blog {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    publishDate: string;
    readTime: string;
    category: string;
    tags: string[];
    image: string;
}

interface BlogDetailProps {
    blog: Blog;
}

export default function BlogDetail({ blog }: BlogDetailProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}


            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-[1fr_300px] gap-4 md:gap-12 max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
                            <div className="relative">

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-2xl md:text-3xl font-bold mb-4"
                                >
                                    {blog.title}
                                </motion.h1>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex flex-wrap gap-4 items-center text-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {blog.publishDate || "Unknown Date"}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {blog.readTime || "N/A"}
                                    </div>
                                </motion.div>
                            </div>
                            <div className="mt-5 md:mt-10 prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
                            {/* Tags */}
                            {blog.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-8">
                                    {blog.tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/tags/${tag.toLowerCase()}`}
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Social Share */}
                            <Separator className="my-8" />
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" className="rounded-full">
                                        <Facebook className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="rounded-full">
                                        <Twitter className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="rounded-full">
                                        <Instagram className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="ghost" className="gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4 md:space-y-8"
                    >
                        {/* Category */}
                        {blog.category && (
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-4">Category</h2>
                                <Link href={`/category/${blog.category.toLowerCase()}`} className="text-gray-700 hover:text-primary transition-colors">
                                    {blog.category}
                                </Link>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <div className="flex justify-between">
                                <Button variant="ghost" className="gap-2">
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </Button>
                                <Button variant="ghost" className="gap-2">
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>
        </div>
    );
}
