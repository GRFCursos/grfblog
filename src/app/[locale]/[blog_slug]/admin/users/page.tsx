import { UsersPage } from "@/components/pages/admin/Users";
import { getBlogUsers } from "@/server/admin/blogUsersService";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Usuários | Dashboard'
}

type Props = {
    params: {
        blog_slug: string;
    }
}

const AdminUsers = async ({ params: { blog_slug } }: Props) => {
    const users = await getBlogUsers({ blogSlug: blog_slug })

    return (
        <UsersPage
            users={users.data!}
        />
    )
}

export default AdminUsers;