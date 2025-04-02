import { deleteBlog } from "@/lib/api";
import useBlogStore from "@/store/blogStore";
import { Blog } from "@/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Card, Col, Row, Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";

interface BlogsList {
    blogs: Blog[];
    isLoading: boolean;
}

export const BlogsList = ({ blogs, isLoading }: BlogsList) => {
    const { openModalEdit } = useBlogStore();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
        onError: (error: Error) => {
            console.error('Failed to delete blog:', error.message);
        }
    });

    return (
        <Row gutter={[20, 16]} className="my-8">
            {
                isLoading && (
                    <>
                        <Col span={24} sm={24} md={12} lg={8} xl={6}>
                            <Card
                                hoverable
                                style={{ width: '100%' }
                                }
                                cover={
                                    <Skeleton.Image active />
                                }
                            >
                                <Skeleton active>
                                    <Card.Meta
                                        avatar={<Avatar src="" />}
                                        title={''}
                                        description={''}
                                    />
                                </Skeleton>
                            </Card >
                        </Col>
                        <Col span={24} sm={24} md={12} lg={8} xl={6}>
                            <Card
                                hoverable
                                style={{ width: '100%' }
                                }
                                cover={
                                    <Skeleton.Image active />
                                }
                            >
                                <Skeleton active>
                                    <Card.Meta
                                        avatar={<Avatar src="" />}
                                        title={''}
                                        description={''}
                                    />
                                </Skeleton>
                            </Card >
                        </Col>
                    </>
                )
            }
            {
                blogs.map(blog => (
                    <Col key={blog._id} span={24} sm={24} md={12} lg={8} xl={6}>
                        <Card
                            hoverable
                            className="w-full overflow-hidden"
                            cover={
                                <Link href={`/blog-detail/${blog._id}`}>
                                    <Image
                                        width={200}
                                        height={200}
                                        className="w-full h-[200px] object-cover object-top"
                                        alt="example"
                                        src="/avatar.jpg"
                                    />
                                </Link>
                            }
                            actions={
                                [
                                    <Button key={blog._id} icon={<EditOutlined key="edit" />} type="text"
                                        onClick={() => openModalEdit(blog)}
                                    />,
                                    <Button key={blog._id} icon={<DeleteOutlined key="delete" />} type="text"
                                        onClick={() => mutation.mutate(blog._id)}
                                        loading={mutation.variables === blog._id && mutation.isPending}
                                    />,
                                ]}
                        >
                            <Card.Meta
                                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                                title={blog.title}
                                description={blog.content}
                            />
                        </Card >
                    </Col>
                ))
            }
        </Row>
    )
}