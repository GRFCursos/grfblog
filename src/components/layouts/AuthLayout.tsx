"use client";

import { Link } from "@/lib/navigation";
import { Layout } from "antd";
import Image from "next/image";
import Logo from "@/assets/imgs/logo.svg";
import { LocaleDropdown } from "./LocaleDropdown";
import { ToggleTheme } from "./ToggleTheme";

const { Header, Content } = Layout;

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Layout className="h-screen overflow-hidden">
            <Layout className="dark:bg-slate-900">
                <Header className="flex justify-between items-center gap-4 xl:px-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-b-zinc-800">
                    <Link href='/auth/signin'>
                        <Image
                            src={Logo}
                            alt="Logo - GRF Blog"
                            width={150}
                            priority
                        />
                    </Link>

                    <div className="flex items-center gap-5">
                        <LocaleDropdown />
                        <ToggleTheme />
                    </div>
                </Header>
                <Content className="flex items-center justify-center overflow-auto bg-white dark:bg-slate-950">
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default AuthLayout;