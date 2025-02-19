"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface Product {
    name: string
    image: string
    price: string
    desc: string
}

interface ProductDetailsProps {
    product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
    return (
        <div className="w-full">
            <div className="container mx-auto px-4 py-8 max-w-7xl">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-2 gap-8 bg-card rounded-lg shadow-lg p-6"
                >
                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative aspect-square rounded-lg overflow-hidden"
                    >
                        <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl font-bold text-card-foreground"
                            >
                                {product.name}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center gap-1 mt-2"
                            >
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                                ))}
                                <span className="text-sm text-muted-foreground ml-2">(4.8/5)</span>
                            </motion.div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-muted-foreground text-lg leading-relaxed"
                        >
                            {product.desc}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-4"
                        >
                            <div className="text-3xl font-bold text-primary">{product.price}</div>

                            <div className="flex gap-4">
                                <Button size="lg" className="flex-1">
                                    Add to Cart
                                </Button>
                                <Button size="lg" variant="outline" className="flex-1">
                                    Buy Now
                                </Button>
                            </div>
                        </motion.div>

                        {/* Additional Details */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="border-t pt-6 mt-6 space-y-4"
                        >
                            <h3 className="font-semibold text-lg">Product Details</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>• Freshly baked daily</li>
                                <li>• Best consumed within 3 days</li>
                                <li>• Store in a cool, dry place</li>
                                <li>• Available for delivery</li>
                            </ul>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

