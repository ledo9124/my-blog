import { isImageUrl } from '@/utils/helper'
import './styles.scss'
import { BoldOutlined, CloudUploadOutlined, ItalicOutlined, StrikethroughOutlined } from '@ant-design/icons'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import {
    BubbleMenu,
    EditorContent,
    useEditor
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button, Flex, Input, Popover, Typography } from 'antd'
import { useCallback, useState } from 'react'
const { Text } = Typography;

interface Iprops {
    onChange: (data: string | undefined) => void
    initValue: string;
}

export const MenuBar = ({ onChange, initValue }: Iprops) => {

    const [linkImage, setLinkImage] = useState<string>('');
    const [errorMs, setErrorMs] = useState<string>('');

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'h-[200px] w-[200px] object-cover object-center outline'
                },
                inline: true
            }), 
            Dropcursor
        ],
        content: initValue,
        editorProps: {
            attributes: {
                class: 'min-h-[150px] border border-[#d9d9d9] rounded-md py-2 px-3'
            }
        },
        onUpdate: () => {
            const data = editor?.getHTML();
            onChange(data);
        }
    })

    const addImage = useCallback((url: string) => {
        if (!editor) return null;
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
            setErrorMs('')
            setLinkImage('')
        }
    }, [editor])

    // const props: UploadProps = {
    //     listType: 'picture-card',
    //     beforeUpload(file) {
    //         console.log('file: ', file.name);
    //         // const path = '/uploads/' + file.name;
    //         // const url = getImageUrl()
    //         // addImage(path);
    //         // return false;
    //         return new Promise((resolve) => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file);
    //             reader.onload = () => {
    //                 const img = document.createElement('img');
    //                 img.src = reader.result as string;
    //                 img.onload = () => {
    //                     const canvas = document.createElement('canvas');
    //                     canvas.width = img.naturalWidth;
    //                     canvas.height = img.naturalHeight;
    //                     const ctx = canvas.getContext('2d')!;
    //                     ctx.drawImage(img, 0, 0);
    //                     ctx.fillStyle = 'red';
    //                     ctx.textBaseline = 'middle';
    //                     ctx.font = '33px Arial';
    //                     ctx.fillText('Ant Design', 20, 20);
    //                     canvas.toBlob((result) => resolve(result as Blob));
    //                 };
    //             };
    //         });
    //     },
    // };

    const handleUploadImage = (url: string) => {
        if (isImageUrl(url)) {
            addImage(url);
        }else {
            setErrorMs('Link ảnh không chính xác!')
        }
    }

    return (
        <>
            {editor && <BubbleMenu className="p-2 rounded-md bg-white border flex gap-2" tippyOptions={{ duration: 100 }} editor={editor}>
                <Button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    type={editor.isActive('bold') ? 'primary' : 'default'}
                    icon={<BoldOutlined />}
                />
                <Button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    type={editor.isActive('italic') ? 'primary' : 'default'}
                    icon={<ItalicOutlined />}
                />

                <Button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    type={editor.isActive('strike') ? 'primary' : 'default'}
                    icon={<StrikethroughOutlined />}
                />
            </BubbleMenu>}
            <Popover content={
                <>
                    <Flex gap={8}>
                        <Input placeholder='Link image...' onChange={(e) => setLinkImage(e.target.value)} value={linkImage} />
                        <Button icon={<CloudUploadOutlined />} onClick={() => handleUploadImage(linkImage)} />
                    </Flex>
                    <Text type='danger'>{errorMs}</Text>
                </>
            } title="Input link image" trigger="click">
                <Button icon={<CloudUploadOutlined />} className='mb-2'>Upload Image</Button>
            </Popover>
            <EditorContent editor={editor} />
        </>
    )
}