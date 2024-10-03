import { Prisma } from "@prisma/client";

export type PostWithUser = Prisma.PostGetPayload<{
    include: {
        user: true
    }
}>