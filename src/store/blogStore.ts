import { Blog } from "@/types";
import { create } from "zustand";

interface BlogState {
    blogs: Blog[],
    setBlogs: (blogs: Blog[]) => void,
    addBlog: (blog: Blog) => void,
    updateBlog: (id: string, updateBlog: Partial<Blog>) => void,
    deleteBlog: (id: string) => void,
}

const useBlogStore = create<BlogState>((set) => ({
    blogs: [],
    setBlogs: (blogs) => set({ blogs }),
    addBlog: (blog) => set((state) => ({ blogs: [...state.blogs, blog] })),
    updateBlog: (id, updateBlog) => set((state) => ({
        blogs: state.blogs.map(blog => blog._id === id ? { ...blog, ...updateBlog } : blog),
    })),
    deleteBlog: (id) => set((state) => ({
        blogs: state.blogs.filter(blog => blog._id !== id),
    }))
}));

export default useBlogStore;