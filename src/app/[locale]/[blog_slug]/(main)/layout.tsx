import BlogLayout from "@/components/layouts/BlogLayout";
import { getBlog } from "@/server/blogService";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    children: React.ReactNode;
    params: {
        blog_slug: string;
    }
}

export async function generateMetadata(
    { params: { blog_slug } }: Props
): Promise<Metadata> {
    const blog = await getBlog({ slug: blog_slug })

    return {
        title: blog.data?.title ?? 'Not Found',
        description: blog.data?.subtitle
    }
}

const Layout = async ({ children, params: { blog_slug } }: Props) => {
    const blog = await getBlog({ slug: blog_slug })

    if (!blog.data) return notFound()

    return (
        <BlogLayout
            blog={blog.data}
        >
            {children}
        </BlogLayout>
    )
}

export default Layout;