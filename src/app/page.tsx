import { CardBlog } from "@/components/card-blog";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";

const Blog = () => {

  return (
    <div className="text-black">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold uppercase">List Blog</h1>
        <Button icon={<PlusOutlined />} type="primary">Add Blog</Button>
      </div>
      <Row gutter={[20, 16]} justify={"space-between"} className="my-8">
        <Col span={24} sm={24} md={12} lg={8} xl={6}>
          <CardBlog />
        </Col>
        <Col span={24} sm={24} md={12} lg={8} xl={6}>
          <CardBlog />
        </Col>
        <Col span={24} sm={24} md={12} lg={8} xl={6}>
          <CardBlog />
        </Col>
        <Col span={24} sm={24} md={12} lg={8} xl={6}>
          <CardBlog />
        </Col>
      </Row>
    </div>
  );
};

export default Blog;