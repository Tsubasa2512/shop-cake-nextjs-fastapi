import { notFound } from "next/navigation"
import BlogDetail from "@/components/client/blog/detail-blog";
interface Blog {
    id: number;
    title: string;
    image: string;
    excerpt: string;
    date: string;
    comments: number;
    imageAlt: string;
    link: string;
    content: string; 
    publishDate: string;
    readTime: string;
    category: string;
    tags: string[];
}

interface BlogPageProps {
    params: {
        slug: string;
    };
}



// Blog posts data
const blogs = [
    {
        id: 1,
        title: "Standard Post Format",
        image: "/demo/blog1.jpg",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Idque Caesaris",
        date: "Oct 31 2017",
        comments: 0,
        imageAlt: "Baker with bread",
        link: "/blog/standard-post-format",
	content: "<p>Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique fringilla tempus. Vivamus bibendum nibh in dolor pharetra, a euismod nulla dignissim. Aenean viverra tincidunt nibh, in imperdiet nunc. Suspendisse eu ante pretium, consectetur leo at, congue quam. Nullam hendrerit porta ante vitae tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ligula libero, feugiat faucibus mattis eget, pulvinar et ligula.<br>Special Ingredients <br> Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique fringilla tempus. Vivamus bibendum nibh in dolor pharetra, a euismod nulla dignissim. Aenean viverra tincidunt nibh, in imperdiet nunc. Suspendisse eu ante pretium, consectetur leo at, congue quam. Nullam hendrerit porta ante vitae tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ligula libero, feugiat faucibus mattis eget, pulvinar et ligula.</p>",
        publishDate: "October 31, 2017",
        readTime: "5 min read",
        category: "Baking Tips",
        tags: ["Baking", "Recipes", "Tips"],
    },
    {
        id: 2,
        title: "Image Post Format",
        image: "/demo/blog2.jpg",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Idque Caesaris",
        date: "Oct 31 2017",
        comments: 0,
        imageAlt: "Teaching baking",
        link: "/blog/image-post-format",
	content: "<p>Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique fringilla tempus. Vivamus bibendum nibh in dolor pharetra, a euismod nulla dignissim. Aenean viverra tincidunt nibh, in imperdiet nunc. Suspendisse eu ante pretium, consectetur leo at, congue quam. Nullam hendrerit porta ante vitae tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ligula libero, feugiat faucibus mattis eget, pulvinar et ligula.<br>Special Ingredients <br> Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique fringilla tempus. Vivamus bibendum nibh in dolor pharetra, a euismod nulla dignissim. Aenean viverra tincidunt nibh, in imperdiet nunc. Suspendisse eu ante pretium, consectetur leo at, congue quam. Nullam hendrerit porta ante vitae tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ligula libero, feugiat faucibus mattis eget, pulvinar et ligula.</p>",
        publishDate: "October 31, 2017",
        readTime: "6 min read",
        category: "Baking Techniques",
        tags: ["Baking", "Techniques", "Artisan"],
    },
    {
        id: 3,
        title: "Another Post Format",
        image: "/demo/blog3.jpg",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Idque Caesaris",
        date: "Oct 31 2017",
        comments: 0,
        imageAlt: "Baking process",
        link: "/blog/another-post-format",
	content: "<p>Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique fringilla tempus. Vivamus bibendum nibh in dolor pharetra, a euismod nulla dignissim. Aenean viverra tincidunt nibh, in imperdiet nunc. Suspendisse eu ante pretium, consectetur leo at, congue quam. Nullam hendrerit porta ante vitae tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ligula libero, feugiat faucibus mattis eget, pulvinar et ligula.<br>Special Ingredients <br> Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique fringilla tempus. Vivamus bibendum nibh in dolor pharetra, a euismod nulla dignissim. Aenean viverra tincidunt nibh, in imperdiet nunc. Suspendisse eu ante pretium, consectetur leo at, congue quam. Nullam hendrerit porta ante vitae tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ligula libero, feugiat faucibus mattis eget, pulvinar et ligula.</p>",
        publishDate: "October 31, 2017",
        readTime: "7 min read",
        category: "Bread Making",
        tags: ["Bread", "Process", "Baking"],
    },
    {
        id: 4,
        title: "Fourth Post Format",
        image: "/demo/blog4.jpg",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Idque Caesaris",
        date: "Oct 31 2017",
        comments: 0,
        imageAlt: "Baking items",
        link: "/blog/fourth-post-format",
        	content: "<p>Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique fringilla tempus. Vivamus bibendum nibh in dolor pharetra, a euismod nulla dignissim. Aenean viverra tincidunt nibh, in imperdiet nunc. Suspendisse eu ante pretium, consectetur leo at, congue quam. Nullam hendrerit porta ante vitae tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ligula libero, feugiat faucibus mattis eget, pulvinar et ligula.<br>Special Ingredients <br> Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique fringilla tempus. Vivamus bibendum nibh in dolor pharetra, a euismod nulla dignissim. Aenean viverra tincidunt nibh, in imperdiet nunc. Suspendisse eu ante pretium, consectetur leo at, congue quam. Nullam hendrerit porta ante vitae tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ligula libero, feugiat faucibus mattis eget, pulvinar et ligula.</p>",
        publishDate: "October 31, 2017",
        readTime: "8 min read",
        category: "Cake Decoration",
        tags: ["Cake", "Decoration", "Pro Techniques"],
    },
    {
        id: 5,
        title: "Healthy Baking Tips",
        image: "/demo/blog5.jpg",
        excerpt: "Discover the best tips and tricks for baking delicious and healthy treats without compromising on taste or texture.",
        date: "Nov 10 2017",
        comments: 2,
        imageAlt: "Healthy ingredients",
        link: "/blog/healthy-baking-tips",
        content: "<p>Learn how to make healthy yet delicious baked goods.</p>",
        publishDate: "November 10, 2017",
        readTime: "5 min read",
        category: "Healthy Baking",
        tags: ["Healthy", "Baking", "Tips"],
    },
    {
        id: 6,
        title: "The Art of Bread Making",
        image: "/demo/blog6.jpg",
        excerpt: "Bread making is an art and science. Learn how to create the perfect loaf with simple ingredients and techniques.",
        date: "Nov 15 2017",
        comments: 3,
        imageAlt: "Freshly baked bread",
        link: "/blog/art-of-bread-making",
        content: "<p>Master the art of bread making with these detailed steps.</p>",
        publishDate: "November 15, 2017",
        readTime: "10 min read",
        category: "Bread Making",
        tags: ["Bread", "Making", "Artisanal"],
    },
    {
        id: 7,
        title: "Decorating Cakes Like a Pro",
        image: "/demo/blog7.jpg",
        excerpt: "Master the skills of cake decoration and create stunning designs for any occasion with expert techniques.",
        date: "Dec 05 2017",
        comments: 5,
        imageAlt: "Cake decoration",
        link: "/blog/decorating-cakes-like-a-pro",
        content: "<p>Step-by-step guide to decorating cakes professionally.</p>",
        publishDate: "December 5, 2017",
        readTime: "6 min read",
        category: "Cake Decoration",
        tags: ["Cake", "Decoration", "Pro Tips"],
    },
    {
        id: 8,
        title: "Best Chocolate Recipes",
        image: "/demo/blog8.jpg",
        excerpt: "Indulge in rich and delicious chocolate recipes that will satisfy your sweet cravings and impress your guests.",
        date: "Dec 20 2017",
        comments: 4,
        imageAlt: "Chocolate desserts",
        link: "/blog/best-chocolate-recipes",
        content: "<p>Try out these amazing chocolate recipes that will surely satisfy your sweet tooth.</p>",
        publishDate: "December 20, 2017",
        readTime: "7 min read",
        category: "Chocolate Recipes",
        tags: ["Chocolate", "Desserts", "Recipes"],
    },
];



export default async function BlogPage({ params }: BlogPageProps) {
    // Simulate async data fetching
    const blog = await new Promise<Blog | undefined>((resolve) => {
        setTimeout(() => {
            const found = blogs.find((b) => {
                const blogSlug = b.link.split("/").pop();
                return blogSlug === params.slug;
            });
            resolve(found);
        }, 100);
    });

    if (!blog) {
        notFound();
        return null;
    }

    return <BlogDetail blog={blog} />;
}