import { PostsPage } from "@/components/pages/admin/Posts";
import { getBlogPosts } from "@/server/admin/blogPostsService";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Publicações | Dashboard'
}

type Props = {
    params: {
        blog_slug: string;
    }
}

const AdminPosts = async ({ params: { blog_slug } }: Props) => {
    const posts = await getBlogPosts({ blogSlug: blog_slug })

    return (
        <PostsPage
            posts={posts.data!}
        />
    )
}

export default AdminPosts;