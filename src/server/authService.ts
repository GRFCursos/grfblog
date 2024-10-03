"use server";

import prisma from "@/lib/db";
import { signIn as authSignIn } from "@/lib/auth";
import { redirect } from "@/lib/navigation";

export const signIn = async ({ data }: { data: { email: string } }) => {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (!user) return { error: 'ACCOUNT_NOT_FOUND' }

    // Send email verification link
    await authSignIn('nodemailer', {
        email: data.email,
        redirect: false
    })

    redirect('/auth/verify-email')
}

export const signUp = async ({ data }: { data: { name: string, email: string } }) => {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (user) return { error: 'ACCOUNT_ALREADY_EXISTS' }

    // Create user
    await prisma.user.create({ data })

    // Send email verification link
    await authSignIn('nodemailer', {
        email: data.email,
        redirect: false
    })

    redirect('/auth/verify-email')
}