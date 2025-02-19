import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/client/header/header";
import Footer from "@/components/client/footer/footer";
import Breadcrumb from "@/components/client/landing/banner-landing";
// import FooterTopHome from "@/components/client/footer/footer-top-home";
// import { Link } from "lucide-react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AllyAi - Shop Cake App",
  description: "AllyAi - Shop Cake App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <Breadcrumb />
        <section className="font-serif">
          {children}
        </section>
        {/* <FooterTopHome /> */}
        <Footer />
      </body> 
    </html>
  );
}


