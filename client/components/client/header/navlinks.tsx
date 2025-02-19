import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <ul className="group flex flex-1 list-none items-center justify-center space-x-1 font-serif font-bold" dir="ltr">
            <li>
                <Link className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm transition-colors 
                        hover:bg-gray-500 hover:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 
                        ${pathname === "/" ? "bg-gray-500 text-white" : "bg-background text-gray-700"}`}
                    href="/"
                >Home
                </Link>
            </li>
            {["About Us", "Products", "Price", "Blog", "Contact"].map((item, index) => {
                const href = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
                const isActive = pathname.startsWith(href);

                return (
                    <li key={index}>
                        <Link
                            className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm transition-colors 
                                hover:bg-gray-500 hover:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 
                                ${isActive ? "bg-gray-500 text-white" : "bg-background text-gray-700"}`}
                            href={href}
                        >
                            {item}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
