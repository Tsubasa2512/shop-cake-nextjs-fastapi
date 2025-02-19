'use client'
import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FilterOption {
    label: string
    count: number
    value: string
}

const categoryOptions: FilterOption[] = [
    { label: "First Birthday Cake", count: 12, value: "birthday" },
    { label: "Cream Puff", count: 8, value: "cream-puff" },
    { label: "Salted Egg Sponge Cake", count: 6, value: "sponge-cake" },
    { label: "Cupcake", count: 15, value: "cupcake" },
    { label: "Tiramisu Cake", count: 7, value: "tiramisu" },
    { label: "Mousse – Cheesecake", count: 9, value: "mousse-cheesecake" },
    { label: "Wedding Cake - Party Cake", count: 5, value: "wedding-cake" },
    { label: "Tools & Accessories", count: 3, value: "tools" },
]

export function FilterSidebar() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState([12, 400])

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Filter</h2>
            <div className="space-y-4">
                <h3 className="font-semibold">Category</h3>
                <div className="space-y-2">
                    {categoryOptions.map((category) => (
                        <div key={category.value} className="flex items-center space-x-2">
                            <Checkbox
                                id={`category-${category.value}`}
                                checked={selectedCategories.includes(category.value)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setSelectedCategories([...selectedCategories, category.value])
                                    } else {
                                        setSelectedCategories(
                                            selectedCategories.filter((cat) => cat !== category.value)
                                        )
                                    }
                                }}
                            />
                            <Label
                                htmlFor={`category-${category.value}`}
                                className="text-sm flex-1 flex justify-between items-center"
                            >
                                {category.label}
                                <span className="text-muted-foreground">({category.count})</span>
                            </Label>
                        </div>
                    ))}
                </div>
            </div>


            <div className="space-y-4">
                <h3 className="font-semibold">Filter by price</h3>
                <Slider
                    min={12}
                    max={400}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                />
                <div className="text-sm">
                    Price: ${priceRange[0]} - ${priceRange[1]}
                </div>
            </div>


        </div>
    )
}
