'use client';
import Image from 'next/image';

export default function IntroAbout() {
    return (
        <section className="py-16 px-4 md:px-16 lg:px-32 flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 flex justify-center">
                <Image
                    src="/demo/about-image.png"
                    alt="Bakery"
                    width={500}
                    height={300}
                    className="rounded-lg hover:shadow-lg"
                />
            </div>

            <div className="md:w-1/2 text-gray-700">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-6">OUR BUSINESS</h2>
                <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="mb-6">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mt-8 mb-4">WHO WE ARE</h2>
                <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
            </div>
        </section>
    )
}