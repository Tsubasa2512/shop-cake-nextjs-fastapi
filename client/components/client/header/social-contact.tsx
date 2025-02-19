'use client';
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function SocialContactHeader() {
    return (
        <div className="bg-gray-400 text-white text-sm py-2">
            <div className="container flex justify-between items-center px-4 max-w-7xl mx-auto">
                <div className="hidden sm:flex space-x-4">
                    <Link href="mailto:contact@website.com" className="flex gap-2 items-center hover:text-yellow-500">
                        <FaEnvelope />
                        <span> contact@website.com</span>
                    </Link>
                    <span> || </span>
                    <Link href="tel:+123456789" className="flex gap-2 items-center  hover:text-yellow-500">
                        <FaPhoneAlt />
                        <span>+123 456 789</span>
                    </Link>                </div>

                <div className="w-fit flex space-x-3">
                    <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-white hover:text-blue-500 transition duration-200" size={18} />
                    </Link>
                    <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                        <FaTiktok className="text-white hover:text-blue-400 transition duration-200" size={18} />
                    </Link>
                    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-white hover:text-pink-500 transition duration-200" size={18} />
                    </Link>
                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-white hover:text-blue-400 transition duration-200" size={18} />
                    </Link>

                </div>
            </div>
        </div >
    );
}
