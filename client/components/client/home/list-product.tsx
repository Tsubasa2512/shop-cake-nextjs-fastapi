"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

const newProducts = [
    { name: "Chocolate Cake", image: "/demo/newproduct1.jpg", price: "$15.00" },
    { name: "Vanilla Cupcake", image: "/demo/newproduct2.jpg", price: "$12.00" },
    { name: "Mango Mousse", image: "/demo/newproduct3.jpg", price: "$18.00" },
    { name: "Blueberry Cheesecake", image: "/demo/newproduct4.jpg", price: "$20.00" },
    { name: "Matcha Roll Cake", image: "/demo/newproduct5.jpg", price: "$16.00" },
    { name: "Coffee Tiramisu", image: "/demo/newproduct6.jpg", price: "$22.00" },
];
const bestSellers = [
    { name: "Tiramisu Cake", image: "/demo/bestseller1.jpg", price: "$25.00" },
    { name: "Cheesecake", image: "/demo/bestseller2.jpg", price: "$22.00" },
    { name: "Strawberry Cake", image: "/demo/bestseller3.jpg", price: "$20.00" },
    { name: "Pistachio Mousse", image: "/demo/bestseller4.jpg", price: "$28.00" },
    { name: "Dark Chocolate Brownie", image: "/demo/bestseller5.jpg", price: "$14.00" },
    { name: "Orange Chiffon Cake", image: "/demo/bestseller6.jpg", price: "$19.00" },
];

const hotProducts = [
    { name: "Red Velvet Cake", image: "/demo/hot1.jpg", price: "$18.00" },
    { name: "Lemon Tart", image: "/demo/hot2.jpg", price: "$21.00" },
    { name: "Carrot Cake", image: "/demo/hot3.jpg", price: "$20.00" },
    { name: "Black Forest Cake", image: "/demo/hot4.jpg", price: "$32.00" },
    { name: "Coconut Cream Pie", image: "/demo/hot5.jpg", price: "$22.00" },
    { name: "Almond Croissant", image: "/demo/hot6.jpg", price: "$24.00" },
];
const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ProductTabs = () => {
    return (
        <motion.div
            className="container max-w-7xl mx-auto px-4 md:py-8"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
            <motion.h1 className="text-4xl font-bold text-center mb-6" variants={fadeUpVariant}>
                Our Products
            </motion.h1>

            <Tabs defaultValue="newProducts">
                <motion.div className="flex justify-center space-x-4 mb-6" variants={fadeUpVariant}>
                    <TabsList>
                        <TabsTrigger value="newProducts">New Products</TabsTrigger>
                        <TabsTrigger value="bestSellers">Bestsellers</TabsTrigger>
                        <TabsTrigger value="hotProducts">Hot Products</TabsTrigger>
                    </TabsList>
                </motion.div>

                <TabsContent value="newProducts">
                    <motion.div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" variants={fadeUpVariant}>
                        {newProducts.map((product, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUpVariant}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Card className="shadow-md rounded-lg relative overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={400}
                                        height={300}
                                        className="rounded-t-lg"
                                    />
                                    <CardContent className="p-4 flex items-center">
                                        <p className="text-xl font-semibold w-2/3 truncate">{product.name}</p>
                                        <p className="text-xl font-semibold w-1/3 text-right text-pink-400">{product.price}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </TabsContent>
                <TabsContent value="bestSellers">
                    <motion.div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" variants={fadeUpVariant}>
                        {bestSellers.map((product, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUpVariant}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Card className="shadow-md rounded-lg relative overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={400}
                                        height={300}
                                        className="rounded-t-lg"
                                    />
                                    <CardContent className="p-4 flex items-center">
                                        <p className="text-xl font-semibold w-2/3 truncate">{product.name}</p>
                                        <p className="text-xl font-semibold w-1/3 text-right text-pink-400">{product.price}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </TabsContent>
                <TabsContent value="hotProducts">
                    <motion.div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" variants={fadeUpVariant}>
                        {hotProducts.map((product, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUpVariant}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Card className="shadow-md rounded-lg relative overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={400}
                                        height={300}
                                        className="rounded-t-lg"
                                    />
                                    <CardContent className="p-4 flex items-center">
                                        <p className="text-xl font-semibold w-2/3 truncate">{product.name}</p>
                                        <p className="text-xl font-semibold w-1/3 text-right text-pink-400">{product.price}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </TabsContent>
            </Tabs>
        </motion.div>
    );
};

export default ProductTabs;
