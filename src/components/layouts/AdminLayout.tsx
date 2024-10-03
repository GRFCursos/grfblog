"use client";

import { Link, usePathname, useRouter } from "@/lib/navigation";
import { hasPermission } from "@/lib/permissions";
import { useBlogAdminStore } from "@/stores/blogAdminStore";
import { BlogWithUsers } from "@/types/Blog";
import { Button, Layout, Menu, MenuProps, Select, Breadcrumb, Spin } from "antd";
import { User } from "next-auth";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { DashboardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { getMyBlogs } from "@/server/admin/blogService";
import Image from "next/image";
import Logo from "@/assets/imgs/logo.svg";
import ShortLogo from "@/assets/imgs/shortLogo.svg";
import { LocaleDropdown } from "./LocaleDropdown";
import { ToggleTheme } from "./ToggleTheme";

type Props = {
    children: React.ReactNode;
    blog: BlogWithUsers;
    user: User
}

const { Header, Content, Sider } = Layout;

const AdminLayout: React.FC<Props> = ({ children, blog, user }) => {
    const [collapsed, setCollapsed] = React.useState(false)
    const [restricted, setRestricted] = React.useState(true)
    const [loading, setLoading] = React.useState(true)

    const router = useRouter()
    const pathname = usePathname()
    const t = useTranslations('Layout')
    const { blogs, setBlogs, setBlogSelected } = useBlogAdminStore()

    const handleCollapse = () => setCollapsed(!collapsed)

    const formatedPathname = '/' + pathname.split('/').slice(2).join('/')

    const handleChangeBlog = (slug: string) => {
        router.replace(`/${slug}/${formatedPathname}`)
    }

    const menuItems: MenuProps['items'] = [
        {
            key: '/admin',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            onClick: () => router.push(`/${blog.slug}/admin`)
        },
        {
            key: '/admin/posts',
            icon: <FileTextOutlined />,
            label: t('posts'),
            onClick: () => router.push(`/${blog.slug}/admin/posts`)
        },
        {
            key: '/admin/users',
            icon: <UserOutlined />,
            label: t('users'),
            disabled: !hasPermission({ blogUsers: blog.users, userId: user.id!, roles: ['OWNER', 'ADMIN'] }),
            onClick: () => router.push(`/${blog.slug}/admin/users`)
        },
        {
            key: '/admin/settings',
            icon: <SettingOutlined />,
            label: t('settings'),
            disabled: !hasPermission({ blogUsers: blog.users, userId: user.id!, roles: ['OWNER', 'ADMIN'] }),
            onClick: () => router.push(`/${blog.slug}/admin/settings`)
        },
    ]

    const breadcrumbItems: { pathname: string, items: BreadcrumbItemType[] }[] = [
        {
            pathname: '/admin',
            items: [
                {
                    title: 'Dashboard',
                    href: '/admin'
                }
            ]
        },
        {
            pathname: '/admin/users',
            items: [
                {
                    title: 'Dashboard',
                    href: '/admin'
                },
                {
                    title: t('users'),
                    href: '/admin/users'
                }
            ]
        },
        {
            pathname: '/admin/settings',
            items: [
                {
                    title: 'Dashboard',
                    href: '/admin'
                },
                {
                    title: t('settings'),
                    href: '/admin/settings'
                }
            ]
        }
    ]

    useEffect(() => {
        // Set blog selected
        setBlogSelected(blog)

        // Get blogs
        const handleGetBlogs = async () => {
            setLoading(true)
            const blogs = await getMyBlogs()
            setLoading(false)

            setBlogs(blogs.data)
        }

        handleGetBlogs()
    }, [blog])

    useEffect(() => {
        // Check if user has permission to access the page
        if ((formatedPathname.includes('/users') || formatedPathname.includes('/settings')) && !hasPermission({ blogUsers: blog.users, userId: user.id!, roles: ['OWNER', 'ADMIN'] })) {
            router.replace(`/${blog.slug}/admin`)
        } else {
            setRestricted(false)
        }
    }, [blog, formatedPathname])

    return (
        <Layout className="h-screen overflow-hidden">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="bg-white dark:bg-slate-950"
            >
                <Link
                    href='/'
                    className="flex items-center justify-center border-b border-slate-200 dark:border-b-zinc-800 mb-4"
                >
                    <Image
                        src={Logo}
                        alt="Logo - GRF Blog"
                        width={150}
                        className={`duration-300 absolute ${collapsed ? 'opacity-0' : 'opacity-100'}`}
                        priority
                    />

                    <Image
                        src={ShortLogo}
                        alt="Logo - GRF Blog"
                        width={40}
                        className={`py-[13.5px] transition ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                        priority
                    />
                </Link>

                <div className="px-2 pb-4 border-b border-slate-200 dark:border-b-zinc-800">
                    <Select
                        showSearch
                        className="w-full"
                        defaultValue={blog.slug}
                        onChange={handleChangeBlog}
                        loading={loading}
                        options={blogs.map(blog => ({
                            value: blog.slug,
                            label: blog.title
                        }))}
                    />
                </div>

                <Menu
                    mode="inline"
                    defaultSelectedKeys={[formatedPathname]}
                    selectedKeys={[formatedPathname]}
                    items={menuItems}
                    className="h-full border-r-0 bg-white dark:bg-slate-950"
                />
            </Sider>
            <Layout className="dark:bg-slate-900">
                <Header className="flex justify-between items-center p-0 pr-14 gap-4 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-b-zinc-800">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={handleCollapse}
                        className="size-16"
                    />

                    <div className="flex items-center gap-5">
                        <LocaleDropdown />
                        <ToggleTheme />
                    </div>
                </Header>

                <Content className="px-4 pb-2 flex flex-col overflow-auto">
                    <Breadcrumb
                        className="my-3"
                        items={breadcrumbItems.find(item => item.pathname === formatedPathname)?.items || []}
                        itemRender={
                            (route) => (
                                <Link href={`/${blog.slug}${route.href || ''}`}>{route.title}</Link>
                            )
                        }
                    />

                    <div className="flex-1 relative rounded-lg bg-white dark:bg-slate-950">
                        <Spin
                            className="flex items-center justify-center size-full absolute bg-white dark:bg-slate-950"
                            spinning={restricted}
                            size="large"
                        />

                        {!restricted && children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout;