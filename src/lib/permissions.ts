import { BlogUser } from "@prisma/client"

export const hasPermission = ({
    blogUsers,
    userId,
    roles = ['OWNER']
}: {
    blogUsers: BlogUser[],
    userId: string,
    roles: BlogUser['role'][]
}) => (
    blogUsers.some(item => item.userId === userId && roles.includes(item.role))
)