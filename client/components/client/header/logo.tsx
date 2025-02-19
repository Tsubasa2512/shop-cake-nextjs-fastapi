import Link from "next/link"
import Image from "next/image"
export default function Logo() {
    return (
        <div className="cursor-pointer">
            <div className="text-xl font-bold font-serif uppercase"><Link href="/">
                <Image src="/demo/logo.png" alt="Logo" width={70} height={40}></ Image>
            </Link></div>
        </div>
    )
}