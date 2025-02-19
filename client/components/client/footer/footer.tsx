"use client";

import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaGlobe, FaEnvelope, FaPhoneAlt, FaMapPin } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";
import FooterTopHome from "./footer-top-home";
const gallery = [
    {
        name: "Best Quality Products",
        src: "/demo/gallery1.jpg",

    },
    {
        name: "Hot & Spicy Pastry",
        src: "/demo/gallery2.jpg",

    },
    {
        name: "Best Quality Tools",
        src: "/demo/gallery3.jpg",
    },
    {
        name: "Best Quality Products",
        src: "/demo/gallery4.jpg",

    },
    {
        name: "Hot & Spicy Pastry",
        src: "/demo/gallery5.jpg",

    },
    {
        name: "Best Quality Tools",
        src: "/demo/gallery6.jpg",
    },
    {
        name: "Best Quality Products",
        src: "/demo/gallery7.jpg",

    },
    {
        name: "Hot & Spicy Pastry",
        src: "/demo/gallery8.jpg",

    },
];

const timeActive = [
    { day: "Monday", hours: "8:00 - 16:00" },
    { day: "Tuesday", hours: "8:00 - 16:00" },
    { day: "Wednesday", hours: "8:00 - 16:00" },
    { day: "Thursday", hours: "8:00 - 16:00" },
    { day: "Friday", hours: "8:00 - 16:00" },
    { day: "Saturday", hours: "10:00 - 16:00" },
    { day: "Sunday", hours: "Closed" }
]

const social = [
    { icon: <FaFacebook />, link: "#" },
    { icon: <FaTiktok />, link: "#" },
    { icon: <FaInstagram />, link: "#" },
    { icon: <FaTwitter />, link: "#" },
];

export default function Footer() {
    return (
        <div className="bg-background font-serif">
            {/* Footer */}
            <footer className="bg-[#2A2A2A] text-white">
                <FooterTopHome />
                {/* Main Footer */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Opening Hours Section */}
                        <div>
                            <h2 className="text-lg font-semibold mb-6 uppercase tracking-wide">Opening Hours</h2>
                            <div className="space-y-3 text-sm">
                                {timeActive.map((schedule) => (
                                    <div key={schedule.day} className="flex justify-between text-gray-400">
                                        <span>{schedule.day}</span>
                                        <span>{schedule.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Our Gallery Section */}
                        <div>
                            <h2 className="text-lg font-semibold mb-6 uppercase tracking-wide">Our Gallery</h2>
                            <div className="grid grid-cols-4 gap-2">
                                {gallery.map((photoId, index) => (
                                    <div key={index} className="aspect-square overflow-hidden rounded-sm">
                                        <Image
                                            src={photoId.src}
                                            alt={`Gallery image ${index + 1}`}
                                            width={250} height={250}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Us Section */}
                        <div>
                            <h2 className="text-lg font-semibold mb-6 uppercase tracking-wide">Contact Us</h2>
                            <div className="space-y-4 text-gray-400">
                                <div className="flex gap-4 items-center">
                                    <FaPhoneAlt />
                                    <div>
                                        <span>0363.125.789</span>
                                        <span className="mx-2">-</span>
                                        <span>0363.125.789</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <FaMapPin /> <p>30 Hampton Road Southampton, NY 11968</p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <FaEnvelope />  <p>info@shopcaketheme.com</p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <FaGlobe />
                                    <p>www.shopcake.com</p>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8">
                                {social.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.link}
                                        className="bg-gray-500 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                                    >
                                        {item.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-[#3A3A3A]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <p className="text-center text-gray-500 text-sm">
                            Copyright © 2025 Shop Cake by <span className="text-white">Ally Ai</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}