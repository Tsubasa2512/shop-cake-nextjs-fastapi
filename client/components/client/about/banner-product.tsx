import Link from "next/link"
export default function BannerProduct() {
    return (

        <div className="bg-gray-800 text-white text-center py-10 flex">
            <div className="flex justify-between items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8  flex-wrap md:flex-wrap-reverse ">
                <h1 className="text-lg md:text-xl lg:text-2xl">Discover our first-class products baked for you with love!</h1>
                <Link href="/products"
                    className="border-2 border-yellow-500 text-yellow-500 py-2 px-4 text-sm mx-auto mt-5 md:text-base md:mx-0 md:mt-0 lg:text-lg hover:bg-yellow-500 hover:text-white transition duration-300">
                    VIEW PRODUCTS
                </Link>
            </div>
        </div>
    )
}