import SidebarBlog from "@/components/client/blog/sidebar"
import BlogPosts from "@/components/client/blog/list-blog"
export default function Blog() {
    return (
        <main>
            <div className="max-w-7xl mx-auto py-8 w-full px-4 md:my-10 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[300px_1fr] gap-8">
                    <SidebarBlog />
                    <BlogPosts />
                </div>
            </div>
        </main>
    )
}