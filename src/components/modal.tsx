'use client'

import { ModalBlogForm } from "@/components/blog-form";
import useBlogStore from "@/store/blogStore";

export const ModalBlog = () => {
    const {isOpenModal, isEdit, recordEdit, closeModal} = useBlogStore();
    return (
        <>
            {isOpenModal && <ModalBlogForm onClose={closeModal} isEdit={isEdit} initialValues={recordEdit} />}
        </>
    );
}