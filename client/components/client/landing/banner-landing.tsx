"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb: React.FC = () => {
    const pathname = usePathname();

    //Array ->  Item
    const pathSegments: string[] = pathname.split("/").filter((segment) => segment);
    if (pathSegments.length === 0) {
        return null;
    }

    return (
        <div className="w-full mt-32 md:mt-24 bg-[url(/demo/bg-breadcrum.png)] bg-cover bg-center ">
            <div className="bg-zinc-900/60 py-20 md:py-32">
            <div className="rounded-xl max-w-7xl mx-auto">
                <nav aria-label="breadcrumb" className="text-gray-50 text-xl md:text-2xl lg:text-3xl px-4">
                    <ul className="flex space-x-2  font-bold">
                        <li>
                            <Link href="/" className="text-gray-300 hover:text-white">
                                Home
                            </Link>
                        </li>
                        {pathSegments.map((segment, index) => {
                            const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
                            const isLast: boolean = index === pathSegments.length - 1;

                            return (
                                <li key={index} className="flex items-center">
                                    <span className="mx-2">/</span>
                                    {!isLast ? (
                                        <Link href={path} className="text-gray-300 capitalize  hover:text-white">
                                            {segment.replace(/-/g, " ")}
                                        </Link>
                                    ) : (
                                        <span className="text-yellow-500 capitalize">{segment.replace(/-/g, " ")}</span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
