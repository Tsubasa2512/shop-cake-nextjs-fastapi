"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

const articles = [
    {
        title: "The Art of Baking: Secrets from Pastry Chefs",
        image: "/demo/article1.jpg",
        excerpt: "Discover the hidden techniques that professional pastry chefs use to create stunning desserts.",
    },
    {
        title: "Why Quality Ingredients Matter in Baking",
        image: "/demo/article2.jpg",
        excerpt: "Learn how choosing the right ingredients can elevate your baking and enhance flavors.",
    },
    {
        title: "Top 5 Trending Cakes for 2025",
        image: "/demo/article3.jpg",
        excerpt: "Stay ahead of the trends with these must-try cake designs and flavors for this year.",
    },
    {
        title: "A Beginner’s Guide to Perfect Cupcakes",
        image: "/demo/article4.jpg",
        excerpt: "Step-by-step instructions to help you bake soft, moist, and delicious cupcakes every time.",
    },
];

const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BlogArticles() {
    return (
        <motion.div
            className="container max-w-7xl mx-auto px-4 py-8"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
            <motion.h2 className="text-3xl font-bold text-center mb-10" variants={fadeUpVariant}>
                Our Blog
            </motion.h2>
            <motion.div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 cursor-pointer" variants={fadeUpVariant}>
                {articles.map((article, index) => (
                    <motion.div
                        key={index}
                        variants={fadeUpVariant}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Card className="shadow-md rounded-lg overflow-hidden">
                            <Image
                                src={article.image}
                                alt={article.title}
                                width={600}
                                height={400}
                                className="w-full h-60 object-cover"
                            />
                            <CardContent className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                                <p className="text-gray-600">{article.excerpt}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
