"use client";

import { deleteBlog, updateBlog } from "@/server/admin/blogService";
import { Button, Col, Form, FormProps, Input, message, Popconfirm, Row, Spin } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
import { useBlogAdminStore } from "@/stores/blogAdminStore";
import { useSession } from "next-auth/react";
import { AdminHero } from "@/components/AdminHero";
import { hasPermission } from "@/lib/permissions";

type FieldType = {
    title: string;
    subtitle: string;
    slug: string;
    bgColor: string;
    textColor: string;
}

export const AdminSettingsPage = () => {
    const [loading, setLoading] = React.useState(false)
    const [form] = Form.useForm()

    const pageTranslations = useTranslations('SettingsPage')
    const formTranslations = useTranslations('Form')
    const commonTranslations = useTranslations('Common')
    const errorsTranslations = useTranslations('Errors')

    const { blogSelected } = useBlogAdminStore()
    const session = useSession()

    const user = session.data?.user

    const handleDeleteBlog = () => deleteBlog({ blogId: blogSelected?.id! })

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        if (!blogSelected) return;

        setLoading(true)
        const blog = await updateBlog({ data: values, blogId: blogSelected.id })
        setLoading(false)

        if (blog?.error) {
            message.error(errorsTranslations(`blog/${blog.error}`))
        }
    }

    return (
        <div>
            <AdminHero
                title={pageTranslations('title')}
                description={pageTranslations('description')}
                extra={
                    hasPermission({ blogUsers: blogSelected?.users!, userId: user?.id!, roles: ['OWNER'] }) ?
                        <Popconfirm
                            title={pageTranslations('delete_blog_label')}
                            description={pageTranslations('delete_blog_description')}
                            rootClassName="max-w-72"
                            onConfirm={handleDeleteBlog}
                            okText={commonTranslations('continue')}
                            cancelText={commonTranslations('cancel')}
                        >
                            <Button
                                type="primary"
                                danger
                            >
                                {pageTranslations('delete_blog_label')}
                            </Button>
                        </Popconfirm>
                        :
                        null
                }
            />

            <div className="py-4 px-9">
                <Spin spinning={loading}>
                    <Form
                        form={form}
                        layout="vertical"
                        requiredMark="optional"
                        onFinish={onFinish}
                        initialValues={{
                            title: blogSelected?.title,
                            subtitle: blogSelected?.subtitle,
                            slug: blogSelected?.slug,
                            bgColor: blogSelected?.bgColor,
                            textColor: blogSelected?.textColor,
                        }}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    name="title"
                                    label={formTranslations('title_label')}
                                    rules={[{ required: true, max: 60 }]}
                                >
                                    <Input
                                        showCount
                                        maxLength={60}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    name="slug"
                                    label={formTranslations('slug_label')}
                                    rules={[{ required: true, max: 60, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        showCount
                                        maxLength={60}
                                        addonBefore="/"
                                        placeholder="Ex: meu-blog"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    name="bgColor"
                                    label={formTranslations('bg_color_label')}
                                    rules={[{ required: true, max: 45 }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="color"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    name="textColor"
                                    label={formTranslations('text_color_label')}
                                    rules={[{ required: true, max: 45 }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        type="color"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item<FieldType>
                                    name="subtitle"
                                    label={formTranslations('subtitle_label')}
                                    rules={[{ max: 191 }]}
                                >
                                    <Input.TextArea showCount rows={4} maxLength={191} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                {commonTranslations('save')}
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        </div>
    )
} 