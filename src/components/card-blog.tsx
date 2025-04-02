'use client'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";

export const CardBlog = () => {
    return (
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
                <EditOutlined key="edit" />,
                <DeleteOutlined  key="delete" />,
            ]}
    >
        <Card.Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
            title="Card title"
            description="This is the description"
        />
    </Card >
    );
}