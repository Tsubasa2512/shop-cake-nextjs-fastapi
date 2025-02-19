
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "../header/logo";
export default function FooterTopHome() {
    return (
        < div className="border-b border-[#3A3A3A] bg-[#3a3a3a] text-white font-serif" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-y-8 md:gap-12">
                    {/* About Section */}
                    <div className="col-span-2 ">
                        <h2 className="text-lg font-semibold mb-3 uppercase tracking-wide">About</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Bakery is a premium WordPress theme with over 2,000 active users around the globe. It prides itself on being incredibly easy to use and powerful through its advanced options that allow you to build professional and stunning website without any coding knowledge.
                        </p>
                    </div>

                    {/* Logo Section */}
                    <div className="flex justify-center items-center">
                        <div className="rounded-full bg-gray-300 p-8 my-auto text-gray-900 hover:bg-gray-400">
                            <Logo />
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="col-span-2 ">
                        <h2 className="text-lg font-semibold mb-3 uppercase tracking-wide">Newsletter</h2>
                        <p className="text-gray-400 mb-4">Subscribe to get regular updates for new stuff and events.</p>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Your email address *"
                                type="email"
                                className="bg-[#2A2A2A] border-zinc-200 text-white placeholder:text-gray-500"
                            />
                            <Button className="bg-white text-black hover:bg-gray-200 uppercase font-medium">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}