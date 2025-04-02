'use client'
import { BlogsList } from "@/components/blogs-list";
import { fetchBlogs } from "@/lib/api";
import useBlogStore from "@/store/blogStore";
import { Blog as BlogProp } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";

const Blog = () => {

  const { togglemodal } = useBlogStore();

  const { data: blogs = [], isLoading } = useQuery<BlogProp[]>({
    queryKey: ['blogs'],
    queryFn: fetchBlogs
  })

  return (
    <div className="text-black">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold uppercase">List Blog</h1>
        <Button icon={<PlusOutlined />} type="primary" onClick={togglemodal}>Add Blog</Button>
      </div>
      <BlogsList blogs={blogs} isLoading={isLoading} />
    </div>
  );
};

export default Blog;