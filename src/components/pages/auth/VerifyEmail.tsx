"use client";

import { Button, Result, theme } from "antd";
import { useTranslations } from "next-intl";
import { InfoCircleOutlined } from '@ant-design/icons';
import { Link } from "@/lib/navigation";

export const VerifyEmail = () => {
    const { token: { colorPrimary } } = theme.useToken()

    const t = useTranslations('VerifyEmailPage')

    return (
        <Result
            status="info"
            icon={<InfoCircleOutlined style={{ color: colorPrimary }} />}
            title={t('title')}
            subTitle={t('subtitle')}
            className="max-w-3xl"
            extra={
                <Link href="/auth/signin">
                    <Button type="primary">
                        {t('btn_label')}
                    </Button>
                </Link>
            }
        />
    )
}