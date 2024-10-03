"use client";

import { Button, Result, theme } from "antd";
import { useTranslations } from "next-intl";
import { CloseCircleFilled } from '@ant-design/icons';
import { Link } from "@/lib/navigation";

export const AuthError = () => {
    const { token: { red5 } } = theme.useToken()

    const t = useTranslations('AuthErrorPage')

    return (
        <Result
            status="error"
            icon={<CloseCircleFilled style={{ color: red5 }} />}
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