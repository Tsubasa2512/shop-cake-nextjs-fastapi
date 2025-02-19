"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
    {
        name: "First Birthday Cake",
        icon: "/demo/category1.jpg",
    },
    {
        name: "Cream Puff",
        icon: "/demo/category2.jpg",
    },
    {
        name: "Salted Egg Sponge Cake",
        icon: "/demo/category3.jpg",
    },
    {
        name: "Cupcake",
        icon: "/demo/category4.jpg",
    },
    {
        name: "Tiramisu Cake",
        icon: "/demo/category5.jpg",
    },
    {
        name: "Mousse – Cheesecake",
        icon: "/demo/category6.jpg",
    },
    {
        name:"Wedding Cake - Party Cake",
        icon: "/demo/category7.jpg",
    },
    {
        name: "Tools & Accessories",
        icon: "/demo/category8.jpg",
    },
];


const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
};

export default function CategoriesProduct() {
    return (
        <div className="w-full ">
            <div className="rounded-xl  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="text-center" ><h2 className="font-serif font-semibold text-3xl mb-7 ">Category</h2></div>
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category.name}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Card className="group cursor-pointer overflow-hidden h-full">
                                <CardContent className="p-4">
                                    <motion.div
                                        className="w-16 h-16  mx-auto rounded-full flex items-center justify-center mb-3 bg-secondary overflow-hidden"
                                        // whileHover={{ rotate: 360 }}
                                        whileHover={{ scale: 1.2 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                    >
                                        <Image
                                            src={category.icon}
                                            alt={category.name}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <h3 className="text-lg font-serif font-semibold text-gray-900 dark:text-white text-center">
                                        {category.name}
                                    </h3>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}