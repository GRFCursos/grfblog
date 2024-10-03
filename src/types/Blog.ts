import { Prisma } from "@prisma/client";

export type BlogWithUsers = Prisma.BlogGetPayload<{
    include: {
        users: true;
    }
}>

export type BlogUsersWithUsers = Prisma.BlogUserGetPayload<{
    include: {
        user: true;
    }
}>