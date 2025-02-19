import HomeCarousel from "@/components/client/slider/slider";
import CategoriesProduct from "./list-categories";
import BannerSale from "./banner-sale";
import ProductTabs from "./list-product";
import Partner from "./partner";
import BlogArticles from "./article";
export default function HomeMain() {
    return (
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <HomeCarousel />
            <CategoriesProduct />
            <BannerSale />
            <ProductTabs />
            <Partner />
            <BlogArticles />
        </main>
    );
}
