"use server";

import prisma from "@/lib/db";
import { BlogUser } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getBlogUsers = async ({ blogSlug }: { blogSlug: string }) => {
    const users = await prisma.blogUser.findMany({
        where: {
            blog: { slug: blogSlug },
        },
        include: {
            user: true
        }
    })

    return { data: users }
}

export const getBlogUser = async ({ userId, blogId }: { userId: string, blogId: string }) => {
    const user = await prisma.blogUser.findFirst({
        where: {
            userId,
            blogId
        },
        include: {
            user: true
        }
    })

    return { data: user }
}

export const createBlogUser = async ({ data }: { data: { email: string, blogId: string, role: BlogUser['role'] } }) => {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (!user) return { error: 'USER_EMAIL_NOT_FOUND' }

    const blogUserExists = await prisma.blogUser.count({
        where: {
            blogId: data.blogId, userId: user.id
        }
    })

    if (blogUserExists > 0) return { error: 'USER_ALREADY_IN_BLOG' }

    await prisma.blogUser.create({
        data: {
            blogId: data.blogId,
            role: data.role,
            userId: user.id
        }
    })

    revalidatePath('/admin/users')
}

export const updateBlogUserRole = async ({ blogUserId, data }: { blogUserId: string, data: { role: BlogUser['role'] } }) => {
    await prisma.blogUser.update({
        where: {
            id: blogUserId
        },
        data: {
            role: data.role
        }
    })

    revalidatePath('/admin/users')
}

export const deleteBlogUser = async ({ blogUserId }: { blogUserId: string }) => {
    await prisma.blogUser.delete({
        where: {
            id: blogUserId
        }
    })

    revalidatePath('/admin/users')
}