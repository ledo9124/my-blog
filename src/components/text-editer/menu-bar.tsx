
import { BoldOutlined, ItalicOutlined, StrikethroughOutlined } from '@ant-design/icons'
import {
    BubbleMenu,
    EditorContent,
    useEditor
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from 'antd'

interface Iprops {
    onChange: (data: string | undefined) => void
    initValue: string;
}

export const MenuBar = ({onChange, initValue} : Iprops) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
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

            <EditorContent editor={editor}/>
        </>
    )
}