"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaClock } from "react-icons/fa";

// Blog posts data
const blogs = [
    {
        id: 1,
        title: "Standard Post Format",
        image: "/demo/blog1.jpg",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Idque Caesaris",
        date: "Oct 31 2017",
        comments: 0,
        imageAlt: "Baker with bread",
        link: "/blog/standard-post-format",
    },
    {
        id: 2,
        title: "Image Post Format",
        image: "/demo/blog2.jpg",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Idque Caesaris",
        date: "Oct 31 2017",
        comments: 0,
        imageAlt: "Teaching baking",
        link: "/blog/image-post-format",
    },
    {
        id: 3,
        title: "Another Post Format",
        image: "/demo/blog3.jpg",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Idque Caesaris",
        date: "Oct 31 2017",
        comments: 0,
        imageAlt: "Baking process",
        link: "/blog/another-post-format",
    },
    {
        id: 4,
        title: "Fourth Post Format",
        image: "/demo/blog4.jpg",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Idque Caesaris ",
        date: "Oct 31 2017",
        comments: 0,
        imageAlt: "Baking items",
        link: "/blog/fourth-post-format",
    },
    {
        id: 5,
        title: "Healthy Baking Tips",
        image: "/demo/blog5.jpg",
        excerpt:
            "Discover the best tips and tricks for baking delicious and healthy treats without compromising on taste or texture.",
        date: "Nov 10 2017",
        comments: 2,
        imageAlt: "Healthy ingredients",
        link: "/blog/healthy-baking-tips",
    },
    {
        id: 6,
        title: "The Art of Bread Making",
        image: "/demo/blog6.jpg",
        excerpt:
            "Bread making is an art and science. Learn how to create the perfect loaf with simple ingredients and techniques.",
        date: "Nov 15 2017",
        comments: 3,
        imageAlt: "Freshly baked bread",
        link: "/blog/art-of-bread-making",
    },
    {
        id: 7,
        title: "Decorating Cakes Like a Pro",
        image: "/demo/blog7.jpg",
        excerpt:
            "Master the skills of cake decoration and create stunning designs for any occasion with expert techniques.",
        date: "Dec 05 2017",
        comments: 5,
        imageAlt: "Cake decoration",
        link: "/blog/decorating-cakes-like-a-pro",
    },
    {
        id: 8,
        title: "Best Chocolate Recipes",
        image: "/demo/blog8.jpg",
        excerpt:
            "Indulge in rich and delicious chocolate recipes that will satisfy your sweet cravings and impress your guests.",
        date: "Dec 20 2017",
        comments: 4,
        imageAlt: "Chocolate desserts",
        link: "/blog/best-chocolate-recipes",
    },
];


const ITEMS_PER_PAGE = 6

export default function BlogPosts() {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedBlogs = blogs.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    }

    return (


        <div>
            <motion.div
                key={currentPage}
                className="grid md:grid-cols-2 lg:grid-cols-3  gap-6 md:gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {paginatedBlogs.map((blog) => (
                    <motion.article
                        key={blog.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        className="flex flex-col shadow-xl rounded-lg overflow-hidden"
                    >
                        <Link href={blog.link} className="block relative min-h-[180] border hover:opacity-90">
                            <Image
                                src={blog.image || "/placeholder.svg"}
                                alt={blog.imageAlt}
                                fill
                                className="object-cover w-full"
                            />
                        </Link>
                        <div className="p-2 pt-4">
                            <h2 className="text-xl font-semibold mb-2">
                                <Link href={blog.link} className="hover:text-yellow-500">{blog.title}</Link>
                            </h2>
                            <p className="text-gray-600 mb-3 line-clamp-4">{blog.excerpt}</p>
                            <div className="text-sm text-gray-400 font-semibold mb-2 flex gap-2 items-center w-fit ml-auto mr-2">
                                <FaClock /> <span>{blog.date}</span>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </motion.div>

            {/* Pagination Controls */}
            <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="icon"
                            onClick={() => setCurrentPage(pageNum)}
                            className="w-8 h-8"
                        >
                            {pageNum}
                        </Button>
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Page Info */}
            <div className="mt-4 text-center text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, blogs.length)} of {blogs.length} posts
            </div>
        </div>
    )
}

