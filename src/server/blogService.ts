"use server";

import prisma from "@/lib/db";

export const getBlog = async ({ slug }: { slug: string }) => {
    const blog = await prisma.blog.findFirst({
        where: {
            slug,
            deletedAt: null
        }
    })

    return { data: blog }
}

export const getBlogPosts = async ({ blogId }: { blogId: string }) => {
    const posts = await prisma.post.findMany({
        where: {
            blogId,
            deletedAt: null
        }
    })

    return { data: posts }
}

export const getBlogPost = async ({ blogSlug, postSlug }: { blogSlug: string, postSlug: string }) => {
    const blog = await getBlog({ slug: blogSlug })
    if (!blog.data) return { error: 'BLOG_NOT_FOUND' }

    const post = await prisma.post.findFirst({
        where: {
            slug: postSlug,
            blogId: blog.data.id,
            deletedAt: null
        },
        include: {
            user: true
        }
    })

    return { data: post }
}