import { Blog } from "@/types";
import { create } from "zustand";

interface BlogState {
    isOpenModal: boolean;
    togglemodal: () => void;
    // fillter: FillterType;
    isEdit: boolean;
    recordEdit: Blog | undefined;
    openModalEdit: (blog: Blog) => void;
    closeModal: () => void;
}

const useBlogStore = create<BlogState>((set) => ({
    isOpenModal: false,
    isEdit: false,
    recordEdit: undefined,
    togglemodal: () => set((state) => ({isOpenModal: !state.isOpenModal})),
    openModalEdit: (blog) => set({isEdit: true, recordEdit: blog , isOpenModal: true}),
    closeModal: () => set({isEdit: false, isOpenModal: false, recordEdit: undefined}),
}));

export default useBlogStore;