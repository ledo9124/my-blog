import { deleteBlog } from "@/lib/api";
import useBlogStore from "@/store/blogStore";
import { Blog } from "@/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Card, Col, Row, Skeleton } from "antd";
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
                                    <Skeleton>
                                        < img
                                            alt="example"
                                            src=""
                                        />
                                    </Skeleton>
                                }
                                actions={
                                    [
                                        <Button icon={<EditOutlined key="edit" />} type="text"
                                        />,
                                        <Button icon={<DeleteOutlined key="delete" />} type="text"
                                        />,
                                    ]}
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
                                    <Skeleton>
                                        < img
                                            alt="example"
                                            src=""
                                        />
                                    </Skeleton>
                                }
                                actions={
                                    [
                                        <Button icon={<EditOutlined key="edit" />} type="text"
                                        />,
                                        <Button icon={<DeleteOutlined key="delete" />} type="text"
                                        />,
                                    ]}
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
                        <Link href={`/blog-detail/${blog._id}`}>
                            <Card
                                hoverable
                                style={{ width: '100%' }
                                }
                                cover={
                                    < img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={
                                    [
                                        <Button icon={<EditOutlined key="edit" />} type="text"
                                            onClick={() => openModalEdit(blog)}
                                        />,
                                        <Button icon={<DeleteOutlined key="delete" />} type="text"
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
                        </Link>
                    </Col>
                ))
            }
        </Row>
    )
}