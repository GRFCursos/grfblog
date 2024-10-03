"use client";

import { useTheme } from "@/hooks/useTheme";
import { StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { theme as antdTheme, ConfigProvider } from "antd";
import { useLocale } from "next-intl";
import { useEffect } from "react";
import enUS from 'antd/locale/en_US';
import ptBR from 'antd/locale/pt_BR';
import 'react-quill/dist/quill.snow.css';

const { defaultAlgorithm, darkAlgorithm } = antdTheme;

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const { theme, getSavedTheme } = useTheme()

    const locale = useLocale()

    useEffect(() => {
        getSavedTheme()
    }, [])

    return (
        <StyleProvider layer>
            <AntdRegistry>
                <ConfigProvider
                    theme={{
                        algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm
                    }}
                    locale={locale === 'pt-BR' ? ptBR : enUS}
                >
                    {children}
                </ConfigProvider>
            </AntdRegistry>
        </StyleProvider>
    )
}