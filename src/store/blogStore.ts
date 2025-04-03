import { Blog, FillterType } from "@/types";
import { create } from "zustand";

interface BlogState {
    isOpenModal: boolean;
    togglemodal: () => void;
    isEdit: boolean;
    recordEdit: Blog | undefined;
    openModalEdit: (blog: Blog) => void;
    closeModal: () => void;
    fillter: FillterType;
    setFillter: (fillter: FillterType) => void;
}

const useBlogStore = create<BlogState>((set) => ({
    isOpenModal: false,
    isEdit: false,
    recordEdit: undefined,
    togglemodal: () => set((state) => ({ isOpenModal: !state.isOpenModal })),
    openModalEdit: (blog) => set({ isEdit: true, recordEdit: blog, isOpenModal: true }),
    closeModal: () => set({ isEdit: false, isOpenModal: false, recordEdit: undefined }),
    fillter: {},
    setFillter: (fillter) => set((state) => ({ fillter: { ...state.fillter, ...fillter } })),
}));

export default useBlogStore;