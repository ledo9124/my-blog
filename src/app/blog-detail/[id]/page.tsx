import { BlogDetail } from "@/app/blog-detail/[id]/blog-detail";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import Link from "next/link";


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  return <>
    <Flex gap={12} align="center">
      <Link href={'/'}>
        <Button icon={<LeftOutlined />} />
      </Link>
      <h1 className="uppercase text-black font-semibold text-lg">Blog detail</h1>
    </Flex>
    <BlogDetail id={id} />
  </>
}