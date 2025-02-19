'use client';

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
export default function MessageAbout() {
    const message = [
        {
            name: "William Hence",
            image: "/demo/message1.jpg",
            text: "We just wanted to thank you for the beautiful cake you created for our wedding. It was simply delicious and meticulously decorated. You made the process easy, and put us at ease. You are a true professional and a talented baker and we are forever thankful for helping our dream wedding come true.",
            position: "Business Owner"
        },
        {
            name: "Richard Brooke",
            image: "/demo/message2.jpg",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit pellentesque habitant morbi tristique senectus et netus et. Mauris vitae ultricies leo integer malesuada nunc vel risus. Eu mi bibendum neque egestas congue quisque egestas.",
            position: "Management"
        },
        {
            name: "Jeff Hammer",
            image: "/demo/message3.jpg",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore etl dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquippl ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
            position: "Management"
        },

    ];

    return (
        <div className="w-full mb-12" >
            <Carousel className="max-w-7xl w-full px-6 mx-auto"
                opts={{
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 4000,
                        stopOnInteraction: false,
                    }),
                ]}>
                <CarouselContent>
                    {message.map((item, index) => (
                        <CarouselItem key={index} className="relative w-full">
                            <div className="flex items-center justify-center">
                                <div className="flex items-center bg-yellow-500 p-5 rounded-lg w-full flex-wrap h-full md:h-auto md:flex-nowrap ">
                                    <div className="w-3/5 mx-auto mb-3 md:mx-0  md:mb-0 lg:w-1/3 text-center">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            className="rounded-full w-36 h-36 mx-auto"
                                            width={200} height={350}
                                        />
                                    </div>
                                    <div className=" text-gray-800 pl-5 text-center md:text-right">
                                        <p className="text-lg">{item.text}</p>
                                        <div className="mt-5 ">
                                            <h3 className="text-xl font-bold">{item.name}</h3>
                                            <p className="text-gray-600">{item.position}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}