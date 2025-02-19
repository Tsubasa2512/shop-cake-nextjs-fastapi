'use client';

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button";
const bannersales = [
    {
        name: "Best Quality Products",
        sale: "70% Sale Off",
        src: "/demo/bannersale1.jpg",

    },
    {
        name: "Hot & Spicy Pastry",
        sale: "50% Sale Off",
        src: "/demo/bannersale2.jpg",

    },
    {
        name: "Best Quality Tools",
        sale: "20% Sale Off",
        src: "/demo/bannersale3.jpg",

    },
];

export default function BannerSale() {
    return (
        <div className="w-full p-2 my-3 md:my-5 lg:my-7">
            <div className="rounded-xl max-w-7xl mx-auto overflow-hidden">
                <Carousel
                    opts={{
                        loop: true,
                        align: "start",
                        slidesToScroll: 2,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 5000,
                            stopOnInteraction: false,
                        }),
                    ]}>
                    <CarouselContent className="-ml-2">
                        {bannersales.map((item, index) => (
                            <CarouselItem key={index} className="mx-3 basis-full md:basis-1/2">
                                {/* <div className="relative aspect-[16/9] w-full flex items-end h-[300px]"> */}
                                <div className="relative aspect-[16/9] w-full flex items-end">
                                    <Image
                                        src={item.src}
                                        alt={`Slide ${index + 1}`}
                                        className="rounded-lg shadow-md object-cover"
                                        fill
                                        priority
                                    />
                                    <div className="z-10 mx-au rounded-lg p-4 bg-slate-400/80 w-1/2 cursor-pointer ">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <div className=" italic my-3 text-4xl "><label>{item.sale}</label></div>
                                        <Button variant="secondary" className="font-serif">See Now</Button>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}