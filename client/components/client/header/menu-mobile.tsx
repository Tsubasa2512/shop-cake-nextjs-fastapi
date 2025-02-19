import Link from 'next/link';
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function MobileMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    if (!isOpen) return null;
    return (
        <nav className="md:hidden bg-white border-t p-4 absolute w-full left-0 top-full shadow-md">
            <ul className="flex flex-col space-y-2">
                <li >
                    <Link href="/" className="block py-2 border-b-2 rounded-r-lg" onClick={() => setIsOpen(false)}>
                        Home
                    </Link>
                </li>
                {['About Us', 'Products', 'Price', 'Blog', 'Contact'].map((item, index) => (
                    <li key={index}>
                        <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="block py-2 border-b-2 rounded-r-lg" onClick={() => setIsOpen(false)}>
                            {item}
                        </Link>
                    </li>
                ))}
                <li>
                    <Link href="mailto:contact@website.com" className="py-2 border-b-2 rounded-r-lg flex gap-2 items-center">
                        <FaEnvelope />
                        <span> contact@website.com</span>
                    </Link>
                </li>
                <li>
                    <Link href="tel:+123456789" className="py-2 border-b-2 rounded-r-lg flex gap-2 items-center">
                        <FaPhoneAlt />
                        <span>+123 456 789</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
