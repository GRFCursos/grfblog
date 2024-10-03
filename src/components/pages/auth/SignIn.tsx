"use client";

import { signIn } from "@/server/authService";
import { Button, Divider, Form, FormProps, Input, message, Space, Spin } from "antd";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn as signInProvider } from "next-auth/react";
import GoogleIcon from "@/assets/imgs/google-icon.svg";
import FacebookIcon from "@/assets/imgs/facebook-icon.svg";
import Image from "next/image";
import { Link } from "@/lib/navigation";

type FieldType = {
    email: string;
}

export const SignIn = () => {
    const signInTranslations = useTranslations('SignInPage')
    const formTranslations = useTranslations('Form')
    const commonTranslations = useTranslations('Common')
    const errorsTranslations = useTranslations('Errors')

    const [loading, setLoading] = useState(false)

    const searchParams = useSearchParams()

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setLoading(true)
        const signin = await signIn({ data: { email: values.email } })
        setLoading(false)

        if (signin?.error) {
            message.error(errorsTranslations(`auth/${signin.error}`))
        }
    }

    const handleSignInProvider = (provider: 'google' | 'facebook') => {
        setLoading(true)
        signInProvider(provider)
    }

    useEffect(() => {
        if (searchParams.get('error') === 'OAuthAccountNotLinked') {
            message.error(errorsTranslations('auth/ACCOUNT_ALREADY_EXISTS'))
        }
    }, [])

    return (
        <div className="border space-y-7 border-slate-100 dark:border-zinc-800 p-6 rounded-lg shadow w-full max-w-md">
            <Spin spinning={loading}>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label={formTranslations('email_label')}
                        name='email'
                        rules={[{ required: true }]}
                        required
                    >
                        <Input placeholder="Ex: JUf3@example.com" />
                    </Form.Item>

                    <Form.Item className="pt-2">
                        <Button type="primary" htmlType="submit" block>
                            {signInTranslations('btn_label', { provider: 'Email' })}
                        </Button>
                    </Form.Item>
                </Form>

                <Divider plain>{commonTranslations('or')}</Divider>

                <Space className="w-full" direction="vertical" size={16}>
                    <Button
                        block
                        className="font-semibold py-[17px]"
                        onClick={() => handleSignInProvider('google')}
                    >
                        {signInTranslations('btn_label', { provider: 'Google' })}
                        <Image
                            src={GoogleIcon}
                            alt="Google"
                            width={18}
                        />
                    </Button>

                    <Button
                        block
                        className="font-semibold py-[17px]"
                        onClick={() => handleSignInProvider('facebook')}
                    >
                        {signInTranslations('btn_label', { provider: 'Facebook' })}
                        <Image
                            src={FacebookIcon}
                            alt="Facebook"
                            width={18}
                        />
                    </Button>

                    <p className="mt-7 text-center">
                        {signInTranslations('no_account')}
                        <Link
                            href='/auth/signup'
                            className="text-blue-500 ml-1"
                        >
                            {signInTranslations('btn_no_account_label')}
                        </Link>
                    </p>
                </Space>
            </Spin>
        </div>
    )
}