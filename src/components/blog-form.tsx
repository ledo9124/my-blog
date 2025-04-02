import { createBlog, updateBlog } from "@/lib/api";
import { Blog } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCallback } from "react";

interface Props {
    initialValues?: Blog;
    isEdit?: boolean;
    onClose: () => void;
}

export const ModalBlogForm = ({ initialValues, isEdit = false, onClose }: Props) => {
    const [form] = Form.useForm();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (values: Omit<Blog, '_id' | 'createdAt'>) => {
            if (isEdit && initialValues) {
                return updateBlog(initialValues._id, values as Partial<Blog>);
            }
            return createBlog(values as Omit<Blog, '_id' | 'createdAt'>);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            if (isEdit && initialValues?._id) {
                queryClient.invalidateQueries({ queryKey: ['blog', initialValues._id] });
            }
            onClose();
        }
    })

    const handleSubmit = useCallback(() => {
        form.submit();
    }, [form]);

    const onFinish = useCallback((values: Blog) => {
        mutation.mutate(values);
    }, [mutation]);

    return (
        <Modal
            open
            okText={isEdit ? 'Save' : 'Post'}
            title={isEdit ? 'Edit blog' : 'Create blog'}
            onOk={handleSubmit}
            onCancel={onClose}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
                onFinish={onFinish}
            >
                <Form.Item name={'title'} label="Title" rules={[{ required: true, message: 'Title is required!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'content'} label="Description" rules={[{ required: true, message: 'Description is required!' }]}>
                    <TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
}