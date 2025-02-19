'use client';

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
const partner = [
    {
        name: "Best Quality Products",
        src: "/demo/partner1.jpg",

    },
    {
        name: "Hot & Spicy Pastry",
        src: "/demo/partner2.jpg",

    },
    {
        name: "Best Quality Tools",
        src: "/demo/partner3.jpg",
    },
    {
        name: "Best Quality Products",
        src: "/demo/partner4.jpg",

    },
    {
        name: "Hot & Spicy Pastry",
        src: "/demo/partner5.jpg",

    },
    {
        name: "Best Quality Tools",
        src: "/demo/partner6.jpg",
    },
    {
        name: "Best Quality Products",
        src: "/demo/partner7.jpg",

    },
    {
        name: "Hot & Spicy Pastry",
        src: "/demo/partner8.jpg",

    },
];

export default function Partner() {
    return (
        <div className="w-full p-2 my-4">
            <div className="rounded-xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center"><h2 className="font-serif font-semibold text-3xl mb-7 ">Partner</h2></div>
                <Carousel
                    opts={{
                        loop: true,
                        align: "start",
                        slidesToScroll: 4,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 3000,
                            stopOnInteraction: false,
                        }),
                    ]}>
                    <CarouselContent className="-ml-2">
                        {partner.map((item, index) => (
                            <CarouselItem key={index} className="p-2 basis-1/4 md:basis-1/6 lg:basis-1/8">
                                <div className="relative aspect-[16/9] w-full border border-gray-50 rounded-2xl ">
                                    <Image
                                        src={item.src}
                                        alt={item.name}
                                        className="rounded-lg shadow-md object-cover"
                                        width={200}
                                        height={200}
                                        priority
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}