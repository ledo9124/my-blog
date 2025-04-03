'use client'
import { BlogsList } from "@/components/blogs-list";
import { fetchBlogs } from "@/lib/api";
import useBlogStore from "@/store/blogStore";
import { Blog as BlogProp } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Input, Select } from "antd";
import { useEffect, useRef, useState } from "react";

const { Search } = Input;

const Blog = () => {
  const [textSearch, setTextSearch] = useState<string>('');
  const [optionFil, setOptionFil] = useState<string>('');
  const [subFill, setSubFill] = useState<boolean>(false);
  const isFirstRender = useRef(true);
  const { togglemodal, openModalEdit, fillter, setFillter } = useBlogStore();

  const { data: blogs = [], isLoading } = useQuery<BlogProp[]>({
    queryKey: ['blogs', fillter],
    queryFn: () => fetchBlogs(fillter)
  });

  /** Event KeyEnter */
  useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        setSubFill((preState) => !preState);
      }
    };
    document.addEventListener('keydown', keyDownListener);
    return () => {
      document.removeEventListener('keydown', keyDownListener);
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setFillter({
      title: textSearch,
      sort: optionFil
    })
  }, [subFill, optionFil]);

  const onChangeSearch = (e: any) => {
    setTextSearch(e?.target?.value?.trim());
  }

  return (
    <div className="text-black">
      <div className="flex max-md:flex-col justify-between items-center">
        <h1 className="text-2xl font-semibold uppercase">List Blog</h1>
        <div className="flex max-md:flex-col gap-5">
          <Search
            allowClear
            placeholder="Search text"
            onClear={() => {
              setFillter({ title: '', sort: optionFil })
            }}
            onChange={onChangeSearch}
            style={{ width: 200 }}
            value={textSearch} />
          <Select
            style={{ width: 120 }}
            allowClear
            options={[{ value: 'old', label: 'Old' }, { value: 'latest', label: 'Latest' }]}
            placeholder="select it"
            value={optionFil}
            onChange={(value) => setOptionFil(value)}
          />
          <Button icon={<PlusOutlined />} type="primary" onClick={togglemodal}>Add Post</Button>
        </div>
      </div>
      <BlogsList blogs={blogs} isLoading={isLoading} openModalEdit={openModalEdit} />
    </div>
  );
};

export default Blog;