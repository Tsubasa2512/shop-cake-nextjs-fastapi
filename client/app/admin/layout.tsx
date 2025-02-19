"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"
import Link from "next/link";
import "../globals.css";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Menu, Battery as Category, ShoppingBag, FileText, Image as ImageIcon, UserRoundCog, Share2, Settings, ChevronDown,ChevronLeftSquare, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAdmin } from "@/app/api/auth/actions"

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Menu", href: "/admin/menu", icon: Menu },
    { name: "Categories", href: "/admin/categories", icon: Category },
    { name: "Articles", href: "/admin/articles", icon: FileText },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Social Config", href: "/admin/social", icon: Share2 },
    { name: "General Config", href: "/admin/config", icon: Settings },
    { name: "Management", href: "/admin/user", icon: UserRoundCog },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const router = useRouter()
    const handleLogout = async () => {
        try {
            setIsLoggingOut(true)
            await logoutAdmin()
            router.push("/login")
            router.refresh()
        } catch (error) {
            console.error("Logout failed:", error)
        } finally {
            setIsLoggingOut(false)
        }
    }
    return (
        <html>
            <body>
                <div className="min-h-screen bg-gray-100">
                    {/* Sidebar */}
                    <aside className={cn(
                        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out",
                        !sidebarOpen && "-translate-x-full"
                    )}>
                        <div className="h-16 flex items-center justify-between px-4 border-b">
                            <h1 className="text-xl font-semibold">Admin Panel
                            </h1>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden border shadow"
                            >
                                <ChevronLeftSquare className="h-5 w-5" />
                            </Button>
                        </div>
                        <nav className="p-4 space-y-1">
                            {navigation.map((item) => {
                                const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                                            isActive
                                                ? "bg-gray-400 text-gray-50"
                                                : "text-gray-600 hover:bg-gray-400 hover:text-gray-50"
                                        )}
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Main content */}
                    <div className={cn(
                        "transition-margin duration-200 ease-in-out",
                        sidebarOpen ? "lg:ml-64" : "ml-0"
                    )}>
                        <header className="h-16 bg-white shadow-sm">
                            <div className="h-full px-4 flex items-center justify-between">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSidebarOpen(!sidebarOpen)} className="border shadow"
                                >
                                    <Menu className="h-5 w-5 " />
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex items-center gap-2 border shadow">
                                            Admin
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            className="text-red-600 cursor-pointer"
                                            onClick={handleLogout}
                                            disabled={isLoggingOut}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            {isLoggingOut ? "Logging out..." : "Logout"}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </header>
                        <main className="p-6">{children}</main>
                    </div>
                </div>
            </body>

        </html>

    );
}