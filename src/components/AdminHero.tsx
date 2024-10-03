"use client";

import { Typography } from "antd";

type Props = {
    title: string;
    description: string;
    extra?: React.ReactNode
}

const { Text } = Typography

export const AdminHero = ({ title, description, extra }: Props) => {
    return (
        <div className="rounded-t-md flex items-center gap-6 border-b border-b-slate-200 dark:border-b-zinc-800 py-6 px-8">
            <div className="space-y-1 flex-1">
                <Text strong className="text-3xl">{title}</Text>
                <p className="ml-0.5 font-semibold text-slate-600 dark:text-slate-200">{description}</p>
            </div>

            <div className="flex items-center gap-4">
                {extra}
            </div>
        </div>
    )
}