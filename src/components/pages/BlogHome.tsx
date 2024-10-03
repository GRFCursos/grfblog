"use client";

import { Link } from "@/lib/navigation";
import { getBlogPosts } from "@/server/blogService";
import { useBlogStore } from "@/stores/blogStore";
import { Post } from "@prisma/client";
import { Button, Card, List } from "antd";
import { useEffect, useState } from "react";

export const BlogHomePage = () => {
    const { blog } = useBlogStore()

    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleGetBlogPosts = async () => {
            if (!blog) return;

            setLoading(true)
            const posts = await getBlogPosts({ blogId: blog.id })
            setLoading(false)

            const data = posts?.data
            if (!data) return;

            setPosts(data)
        }

        handleGetBlogPosts()
    }, [blog])

    return (
        <div>
            <List
                loading={loading}
                grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                dataSource={posts}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            title={item.title}
                        >
                            <div>
                                {item.subtitle}
                            </div>
                            <Button type="primary" className="mt-5">
                                <Link href={`/${blog?.slug}/posts/${item.slug}`}>Leia mais</Link>
                            </Button>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    )
}