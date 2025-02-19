"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const products = [
    { name: "Chocolate Fudge Cake", image: "/demo/product1.jpg", price: "$15.00", link: "products/product-1", desc: "A rich and moist chocolate cake topped with creamy fudge icing." },
    { name: "Vanilla Dream Cupcake", image: "/demo/product2.jpg", price: "$12.00", link: "products/product-2", desc: "Soft vanilla cupcakes with a light, fluffy texture and a sweet vanilla buttercream frosting." },
    { name: "Tropical Mango Mousse", image: "/demo/product3.jpg", price: "$18.00", link: "products/product-3", desc: "A creamy, fruity mango mousse with a smooth and refreshing tropical flavor." },
    { name: "Blueberry Cheesecake", image: "/demo/product4.jpg", price: "$20.00", link: "products/product-4", desc: "A rich, creamy cheesecake made with fresh blueberries and a buttery graham cracker crust." },
    { name: "Matcha Roll Cake", image: "/demo/product5.jpg", price: "$16.00", link: "products/product-5", desc: "A soft and fluffy matcha sponge cake rolled with creamy filling, lightly dusted with matcha powder." },
    { name: "Coffee Tiramisu", image: "/demo/product6.jpg", price: "$22.00", link: "products/product-6", desc: "A decadent Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream." },
    { name: "Carrot Cake", image: "/demo/product7.jpg", price: "$14.00", link: "products/product-7", desc: "A moist carrot cake with walnuts and a rich cream cheese frosting." },
    { name: "Lemon Meringue Pie", image: "/demo/product8.jpg", price: "$17.00", link: "products/product-8", desc: "A zesty lemon filling topped with a light, fluffy meringue on a buttery pie crust." },
    { name: "Strawberry Shortcake", image: "/demo/product9.jpg", price: "$19.00", link: "products/product-9", desc: "Fresh strawberries and whipped cream layered on a soft and buttery shortcake." },
    { name: "Chocolate Chip Cookies", image: "/demo/product10.jpg", price: "$10.00", link: "products/product-10", desc: "Classic chocolate chip cookies, crispy on the edges and soft in the middle." },
    { name: "Raspberry Tart", image: "/demo/product11.jpg", price: "$21.00", link: "products/product-11", desc: "A delicate raspberry tart with a buttery pastry shell and a creamy filling." },
    { name: "Coconut Macaroons", image: "/demo/product12.jpg", price: "$13.00", link: "products/product-12", desc: "Sweet coconut macaroons, golden brown on the outside and chewy on the inside." },
    { name: "Peach Cobbler", image: "/demo/product13.jpg", price: "$16.00", link: "products/product-13", desc: "A warm, comforting peach cobbler with a golden biscuit topping, perfect with a scoop of vanilla ice cream." },
    { name: "Apple Pie", image: "/demo/product14.jpg", price: "$18.00", link: "products/product-14", desc: "Classic apple pie with a flaky crust and a sweet cinnamon-spiced filling." },
    { name: "Pumpkin Spice Cake", image: "/demo/product15.jpg", price: "$14.00", link: "products/product-15", desc: "A spiced pumpkin cake topped with creamy frosting, perfect for autumn." },
    { name: "Pineapple Upside-Down Cake", image: "/demo/product16.jpg", price: "$19.00", link: "products/product-16", desc: "A moist cake topped with caramelized pineapple slices and a buttery, rich batter." },
    { name: "Red Velvet Cake", image: "/demo/product17.jpg", price: "$22.00", link: "products/product-17", desc: "A soft and moist red velvet cake with a tangy cream cheese frosting." },
    { name: "Chocolate Eclairs", image: "/demo/product18.jpg", price: "$16.00", link: "products/product-18", desc: "Delicate choux pastry filled with rich cream and topped with smooth chocolate glaze." },
    { name: "Cinnamon Rolls", image: "/demo/product19.jpg", price: "$12.00", link: "products/product-19", desc: "Warm cinnamon rolls swirled with brown sugar and topped with a sweet glaze." },
    { name: "Pistachio Cake", image: "/demo/product20.jpg", price: "$20.00", link: "products/product-20", desc: "A fragrant pistachio cake with a light texture, topped with a pistachio cream." }
];

const ITEMS_PER_PAGE = 12

export default function ListProduct() {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE)

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
        <div className="w-full">
            <div className="max-w-7xl mx-auto pb-8 w-full px-4 mb-10 sm:px-6 lg:px-8">
                <div className="bg-white text-gray-800">
                    <div className="container mx-auto">
                        <motion.div
                            key={currentPage}
                            className="grid grid-cols-1 ,md:grid-cols-1 lg:grid-cols-2 gap-7"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            {paginatedProducts.map((item) => (
                                <motion.div
                                    key={item.name}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-4 rounded-lg shadow-xl border-t-2 cursor-pointer border-gray-500 hover:border-yellow-500"
                                >
                                    <div className="space-y-8">
                                        <div className="flex items-center">
                                            <Image
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                className="w-24 h-24 rounded-full mr-4"
                                                width={200}
                                                height={200}
                                            />
                                            <div>
                                                <Link href={item.link}>
                                                    <h3 className="text-lg font-semibold line-clamp-1">{item.name}</h3>
                                                    <p className="text-gray-600 line-clamp-3">{item.desc}</p>
                                                    <p className="text-yellow-500 font-bold mt-2">{item.price}</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
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
                            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, products.length)} of {products.length}{" "}
                            products
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

