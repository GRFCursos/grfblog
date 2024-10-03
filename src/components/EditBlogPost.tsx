"use client";

import { updateBlogPost } from "@/server/admin/blogPostsService";
import { useBlogAdminStore } from "@/stores/blogAdminStore";
import { Button, Col, Drawer, Form, FormProps, Input, message, Row, Space, Spin } from "antd";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import { PostWithUser } from "@/types/Post";

type Props = {
    open: boolean;
    onClose: () => void;
    defaultValues: PostWithUser
}

type FieldType = {
    title: string;
    subtitle: string;
    slug: string;
    body: string;
}

const EditBlogPost = ({ open, defaultValues, onClose }: Props) => {
    const [loading, setLoading] = React.useState(false)
    const [form] = Form.useForm()
    const { blogSelected } = useBlogAdminStore()

    const editPostTranslations = useTranslations('EditBlogPost')
    const formTranslations = useTranslations('Form')
    const commonTranslations = useTranslations('Common')
    const errorsTranslations = useTranslations('Errors')

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        if (!blogSelected) return;

        setLoading(true)
        const blogPost = await updateBlogPost({ data: values, postId: defaultValues.id })
        setLoading(false)

        if (blogPost?.error) {
            message.error(errorsTranslations(`post/${blogPost.error}`))
        } else {
            message.success(editPostTranslations('success'))
            onClose()
        }
    }

    useEffect(() => {
        form.resetFields()
    }, [blogSelected])

    useEffect(() => {
        form.setFieldsValue(defaultValues)
    }, [defaultValues, open])

    return (
        <Drawer
            title={editPostTranslations('title')}
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
                                name="title"
                                label={formTranslations('title_label')}
                                rules={[{ required: true, max: 100 }]}
                            >
                                <Input
                                    showCount
                                    maxLength={100}
                                    placeholder="Ex: Publicação X"
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
                                <Input
                                    showCount
                                    maxLength={191}
                                    placeholder="Ex: Uma publicação de teste"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item<FieldType>
                                name="slug"
                                label={formTranslations('slug_label')}
                                rules={[{ required: true, max: 60, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ }]}
                            >
                                <Input
                                    showCount
                                    maxLength={60}
                                    addonBefore="/"
                                    placeholder="Ex: publicacao-x"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item<FieldType>
                                name="body"
                                label={formTranslations('body_label')}
                                rules={[{ required: true }]}
                            >
                                <ReactQuill theme="snow" value={form.getFieldValue('body')} onChange={(value) => form.setFieldsValue({ body: value })} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </Drawer>
    )
}

export default EditBlogPost;