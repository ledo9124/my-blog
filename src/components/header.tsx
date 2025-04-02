'use client'
import { Layout, Menu } from "antd"
import Image from "next/image"

export const Header = () => {
    return (
        <Layout.Header style={{ display: 'flex', alignItems: 'center', background: '#ffffff', borderBottom: '1px solid #ccc'}}>
            <Image src='next.svg' alt='logo' width={100} height={100} />
            <Menu
                theme="light"
                mode="horizontal"
                items={[{key: 0, label: 'BLOG'}]}
                style={{ flex: 1, minWidth: 0 }}
                className='justify-center max-sm:justify-end'
                defaultActiveFirst
                defaultSelectedKeys={['1']}
            />
        </Layout.Header>
    )
}
