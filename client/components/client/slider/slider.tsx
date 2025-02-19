'use client';

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"

const slides = [
    "/demo/slider1.jpg",
    "/demo/slider2.jpg",
    "/demo/slider3.jpg"
];

export default function HomeCarousel() {
    return (
        <div className="w-full mx-auto py-8">
            <Carousel
                opts={{
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 3000,
                        stopOnInteraction: false,
                    }),
                ]}>
                <CarouselContent>
                    {slides.map((src, index) => (
                        <CarouselItem key={index} className="relative w-full h-[400px]">
                            <Image
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="rounded-lg shadow-md object-cover"
                                fill
                                priority
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
