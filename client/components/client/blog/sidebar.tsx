"use client"
import Link from "next/link"

// Categories data
const categories = [
    { name: "Breads", count: 2 },
    { name: "Cakes", count: 2 },
    { name: "Cookies", count: 1 },
    { name: "Cupcakes", count: 1 },
    { name: "Pies", count: 1 },
]


export default function SidebarBlog() {
    return (
        <aside className="space-y-8">
            {/* Categories */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <ul className="space-y-2 pl-3">
                    {categories.map((category) => (
                        <li key={category.name} className="pb-3 rounded-b-md border-b ">
                            <Link href="#" className="flex justify-between hover:text-yellow-500 ">
                                <span>{category.name}</span>
                                <span>({category.count})</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}