/* eslint-disable @typescript-eslint/no-explicit-any, react/jsx-key */
import { createBlog, updateBlog } from "@/lib/api";
import { Blog, BlogUpload } from "@/types";
import { handleProcessImage } from "@/utils/helper";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, GetProp, Image, Input, Modal, Upload, UploadFile, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useState } from "react";

interface Props {
    initialValues?: Blog;
    isEdit?: boolean;
    onClose: () => void;
}

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const ModalBlogForm = ({ initialValues, isEdit = false, onClose }: Props) => {
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>(() => isEdit ? handleProcessImage(initialValues?.image) : []);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (values: FormData) => {
            if (isEdit && initialValues) {
                return updateBlog(initialValues._id, values);
            }
            return createBlog(values as FormData);
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

    const onFinish = useCallback((values: BlogUpload) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);
        if (values.upload && values.upload.length > 0) {

            formData.append('image', values.upload[0].originFileObj as FileType)
        }
        mutation.mutate(formData);
    }, [mutation]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

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
                initialValues={{
                    ...initialValues,
                    upload: handleProcessImage(initialValues?.image)
                }}
                onFinish={onFinish}
            >
                <Form.Item name={'title'} label="Title" rules={[{ required: true, message: 'Title is required!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'content'} label="Description" rules={[{ required: true, message: 'Description is required!' }]}>
                    <TextArea />
                </Form.Item>
                <Form.Item label="Image" name={'upload'} valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload
                        beforeUpload={() => false}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                </Form.Item>
            </Form>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                    alt="preview image"
                />
            )}
        </Modal>
    );
}