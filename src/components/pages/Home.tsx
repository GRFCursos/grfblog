"use client";

import { Blog } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import NewBlog from "@/components/NewBlog";
import { Button, Empty, Tooltip } from "antd";
import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from "@/lib/navigation";

type Props = {
    blogs: Blog[]
}

export const HomePage = ({ blogs }: Props) => {
    const [newBlogOpen, setNewBlogOpen] = useState(false)

    const { data: session } = useSession()

    const t = useTranslations('HomePage')

    const handleShowNewBlog = () => setNewBlogOpen(true)

    return (
        <div className="bg-slate-100 dark:bg-slate-900 w-full max-w-3xl p-4 rounded-lg">
            <NewBlog
                open={newBlogOpen}
                setOpen={setNewBlogOpen}
            />

            <div className="text-center border-b border-b-slate-300 dark:border-b-slate-700 pb-3 space-y-1">
                <span className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
                    {t('title', { name: session?.user?.name })}
                </span>
                <p className="ml-4">
                    {t('description')}
                </p>
            </div>

            <div className="py-4 px-1">
                <Button
                    type="primary"
                    block
                    onClick={handleShowNewBlog}
                >
                    <PlusOutlined />
                    {t('btn_label')}
                </Button>

                {blogs.length > 0 ?
                    <div className="flex items-center flex-wrap gap-4 mt-12">
                        {blogs.map(blog => (
                            <Link
                                key={blog.id}
                                href={`/${blog.slug}/admin`}
                                className="text-slate-600 dark:text-slate-300"
                            >
                                <Tooltip
                                    title={t('tooltip_title')}
                                    arrow={false}
                                >
                                    <div className="space-y-2 border border-slate-300 dark:border-slate-700 w-fit py-3 px-5 rounded-lg cursor-pointer hover:bg-slate-200/60 hover:dark:bg-slate-800">
                                        <div className="flex items-center gap-4">
                                            <ExportOutlined classID="text-xl" />
                                            <span className="font-semibold max-w-36 truncate">{blog.title}</span>
                                        </div>
                                    </div>
                                </Tooltip>
                            </Link>
                        ))}
                    </div>
                    :
                    <Empty
                        className="mt-9 mb-4"
                    />
                }
            </div>
        </div>
    )
}