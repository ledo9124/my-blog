'use client'

import { deleteBlog, fetchBlog } from "@/lib/api"
import useBlogStore from "@/store/blogStore"
import { Blog } from "@/types"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Col, Flex, Row, Skeleton } from "antd"
import Image from "next/image"
import { useRouter } from "next/navigation";

export const BlogDetail = ({ id }: { id: string }) => {
    if (!id) {
        return;
    }
    const { data: blog, isLoading } = useQuery<Blog>({
        queryKey: ['blog', id],
        queryFn: () => fetchBlog(id)
    });
    const router = useRouter();
    const { openModalEdit } = useBlogStore();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            router.push("/");
        },
        onError: (error: Error) => {
            console.error('Failed to delete blog:', error.message);
        }
    });

    return (
        <>
            {
                blog && (
                    <Flex justify="end" gap={12}>
                        <Button icon={<EditOutlined key="edit" />}
                            onClick={() => openModalEdit(blog)}
                        />
                        <Button icon={<DeleteOutlined key="delete" />}
                            danger
                            onClick={() => mutation.mutate(id)}
                            loading={mutation.variables === id && mutation.isPending}
                        />,
                    </Flex>
                )
            }
            <Row className="mt-10">
                {
                    isLoading && (
                        <>
                            <Col span={24} lg={12}>
                                <Skeleton.Image active />
                            </Col>
                            <Col span={24} lg={12}>
                                <Skeleton active />
                            </Col>
                        </>
                    )
                }
                {
                    blog && (
                        <>
                            <Col span={24} lg={12}>
                                <Image src='/avatar.jpg' height={500} width={500} alt="" />
                            </Col>
                            <Col span={24} lg={12}>
                                <div className="text-lg font-medium text-black">{blog?.title}</div>
                                <div className="text-slate-400">{blog?.content}</div>
                            </Col>
                        </>
                    )
                }
            </Row>
        </>
    )
}