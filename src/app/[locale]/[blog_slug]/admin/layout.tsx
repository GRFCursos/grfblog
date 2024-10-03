import AdminLayout from "@/components/layouts/AdminLayout";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { getBlog } from "@/server/admin/blogService";
import { SessionProvider } from "next-auth/react";
import { notFound } from "next/navigation";

type Props = {
    children: React.ReactNode;
    params: {
        blog_slug: string;
    }
}

const Layout = async ({ children, params: { blog_slug } }: Props) => {
    const session = await isAuthenticated()
    const blog = await getBlog({ slug: blog_slug, user: session.user! })

    if (blog.error || !blog.data) return notFound()

    return (
        <SessionProvider session={session}>
            <AdminLayout
                blog={blog.data}
                user={session.user!}
            >
                {children}
            </AdminLayout>
        </SessionProvider>
    )
}

export default Layout;