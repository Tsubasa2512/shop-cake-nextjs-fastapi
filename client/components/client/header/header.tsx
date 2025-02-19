'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import MobileMenu from './menu-mobile';
import NavLinks from './navlinks';
import Logo from './logo';
import SocialContactHeader from './social-contact';
export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50 font-mono">
            <div className="w-full border-b">
                <SocialContactHeader />
                <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <Logo />
                    <nav aria-label="Main"
                        data-orientation="horizontal"
                        dir="ltr"
                        className="relative z-10 max-w-max flex-1 items-center justify-center hidden md:flex"
                    >
                        <NavLinks />
                    </nav>
                    <button
                        className="menu-button md:hidden"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </header>
    );
}
