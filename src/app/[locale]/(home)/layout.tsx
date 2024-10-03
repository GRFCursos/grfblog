import HomeLayout from "@/components/layouts/HomeLayout";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { SessionProvider } from "next-auth/react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await isAuthenticated()

    return (
        <SessionProvider session={session}>
            <HomeLayout>
                {children}
            </HomeLayout>
        </SessionProvider>
    )
}

export default Layout;