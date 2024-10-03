"use client";

import { useBlogAdminStore } from "@/stores/blogAdminStore";
import { Button, Col, Drawer, Form, FormProps, Input, message, Row, Select, Space, Spin } from "antd";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { BlogUser } from "@prisma/client";
import { createBlogUser } from "@/server/admin/blogUsersService";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void
}

type FieldType = {
    email: string;
    role: BlogUser['role']
}

const NewBlogUser = ({ open, setOpen }: Props) => {
    const [loading, setLoading] = React.useState(false)
    const [form] = Form.useForm()
    const { blogSelected } = useBlogAdminStore()

    const newBlogUserTranslations = useTranslations('NewBlogUser')
    const formTranslations = useTranslations('Form')
    const commonTranslations = useTranslations('Common')
    const errorsTranslations = useTranslations('Errors')

    const onClose = () => setOpen(false)

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        if (!blogSelected) return;

        setLoading(true)
        const blogUser = await createBlogUser({ data: { ...values, blogId: blogSelected.id } })
        setLoading(false)

        if (blogUser?.error) {
            message.error(errorsTranslations(`blog/${blogUser.error}`))
        } else {
            message.success(newBlogUserTranslations('success'))
            setOpen(false)
        }
    }

    useEffect(() => {
        form.resetFields()
    }, [blogSelected])

    return (
        <Drawer
            title={newBlogUserTranslations('title')}
            width={520}
            onClose={onClose}
            open={open}
            styles={{
                body: {
                    paddingBottom: 80
                }
            }}
            extra={
                <Space>
                    <Button onClick={onClose}>{commonTranslations('cancel')}</Button>
                    <Button type="primary" onClick={form.submit} loading={loading}>
                        {commonTranslations('save')}
                    </Button>
                </Space>
            }
        >
            <Spin spinning={loading}>
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark="optional"
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item<FieldType>
                                name="email"
                                label={formTranslations('user_email_label')}
                                rules={[{ required: true, max: 191 }]}
                            >
                                <Input
                                    showCount
                                    maxLength={191}
                                    placeholder="Ex: 1N7q@example.com"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item<FieldType>
                                name="role"
                                label={formTranslations('role_label')}
                                rules={[{ required: true }]}
                            >
                                <Select
                                    placeholder="Ex: Editor"
                                    options={[
                                        { value: 'ADMIN', label: commonTranslations('admin') },
                                        { value: 'AUTHOR', label: commonTranslations('author') },
                                        { value: 'EDITOR', label: commonTranslations('editor') },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </Drawer>
    )
}

export default NewBlogUser;