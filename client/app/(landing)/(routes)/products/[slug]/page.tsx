import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/client/product/detail-product"

interface Product {
    name: string;
    image: string;
    price: string;
    link: string;
    desc: string;
}

interface ProductPageProps {
    params: {
        slug: string;
    };
}
const products = [
    { name: "Chocolate Fudge Cake", image: "/demo/product1.jpg", price: "$15.00", link: "product/product-1", desc: "A rich and moist chocolate cake topped with creamy fudge icing." },
    { name: "Vanilla Dream Cupcake", image: "/demo/product2.jpg", price: "$12.00", link: "product/product-2", desc: "Soft vanilla cupcakes with a light, fluffy texture and a sweet vanilla buttercream frosting." },
    { name: "Tropical Mango Mousse", image: "/demo/product3.jpg", price: "$18.00", link: "product/product-3", desc: "A creamy, fruity mango mousse with a smooth and refreshing tropical flavor." },
    { name: "Blueberry Cheesecake", image: "/demo/product4.jpg", price: "$20.00", link: "product/product-4", desc: "A rich, creamy cheesecake made with fresh blueberries and a buttery graham cracker crust." },
    { name: "Matcha Roll Cake", image: "/demo/product5.jpg", price: "$16.00", link: "product/product-5", desc: "A soft and fluffy matcha sponge cake rolled with creamy filling, lightly dusted with matcha powder." },
    { name: "Coffee Tiramisu", image: "/demo/product6.jpg", price: "$22.00", link: "product/product-6", desc: "A decadent Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream." },
    { name: "Carrot Cake", image: "/demo/product7.jpg", price: "$14.00", link: "product/product-7", desc: "A moist carrot cake with walnuts and a rich cream cheese frosting." },
    { name: "Lemon Meringue Pie", image: "/demo/product8.jpg", price: "$17.00", link: "product/product-8", desc: "A zesty lemon filling topped with a light, fluffy meringue on a buttery pie crust." },
    { name: "Strawberry Shortcake", image: "/demo/product9.jpg", price: "$19.00", link: "product/product-9", desc: "Fresh strawberries and whipped cream layered on a soft and buttery shortcake." },
    { name: "Chocolate Chip Cookies", image: "/demo/product10.jpg", price: "$10.00", link: "product/product-10", desc: "Classic chocolate chip cookies, crispy on the edges and soft in the middle." },
    { name: "Raspberry Tart", image: "/demo/product11.jpg", price: "$21.00", link: "product/product-11", desc: "A delicate raspberry tart with a buttery pastry shell and a creamy filling." },
    { name: "Coconut Macaroons", image: "/demo/product12.jpg", price: "$13.00", link: "product/product-12", desc: "Sweet coconut macaroons, golden brown on the outside and chewy on the inside." },
    { name: "Peach Cobbler", image: "/demo/product13.jpg", price: "$16.00", link: "product/product-13", desc: "A warm, comforting peach cobbler with a golden biscuit topping, perfect with a scoop of vanilla ice cream." },
    { name: "Apple Pie", image: "/demo/product14.jpg", price: "$18.00", link: "product/product-14", desc: "Classic apple pie with a flaky crust and a sweet cinnamon-spiced filling." },
    { name: "Pumpkin Spice Cake", image: "/demo/product15.jpg", price: "$14.00", link: "product/product-15", desc: "A spiced pumpkin cake topped with creamy frosting, perfect for autumn." },
    { name: "Pineapple Upside-Down Cake", image: "/demo/product16.jpg", price: "$19.00", link: "product/product-16", desc: "A moist cake topped with caramelized pineapple slices and a buttery, rich batter." },
    { name: "Red Velvet Cake", image: "/demo/product17.jpg", price: "$22.00", link: "product/product-17", desc: "A soft and moist red velvet cake with a tangy cream cheese frosting." },
    { name: "Chocolate Eclairs", image: "/demo/product18.jpg", price: "$16.00", link: "product/product-18", desc: "Delicate choux pastry filled with rich cream and topped with smooth chocolate glaze." },
    { name: "Cinnamon Rolls", image: "/demo/product19.jpg", price: "$12.00", link: "product/product-19", desc: "Warm cinnamon rolls swirled with brown sugar and topped with a sweet glaze." },
    { name: "Pistachio Cake", image: "/demo/product20.jpg", price: "$20.00", link: "product/product-20", desc: "A fragrant pistachio cake with a light texture, topped with a pistachio cream." }
];

export default async function ProductPage({ params }: ProductPageProps) {
    // Simulate async data fetching
    const product = await new Promise<Product | undefined>((resolve) => {
        setTimeout(() => {
            const found = products.find((p) => {
                const productSlug = p.link.split("/").pop(); // Lấy "product-1" từ "product/product-1"
                return productSlug === params.slug;
            });
            resolve(found);
        }, 100);
    });

    if (!product) {
        notFound();
        return null; // Bắt buộc phải return null sau khi gọi `notFound()`
    }

    return <ProductDetails product={product} />;
}