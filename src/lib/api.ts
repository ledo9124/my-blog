import { Blog } from "@/types";

export const fetchBlogs = async (): Promise<Blog[]> => {
  const res = await fetch('/api/blogs');
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
};

export const fetchBlog = async (id: string): Promise<Blog> => {
  const res = await fetch(`/api/blogs/${id}`);
  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
};

export const createBlog = async (blog: Omit<Blog, '_id' | 'createdAt'>): Promise<Blog> => {
  const res = await fetch('/api/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog),
  });
  if (!res.ok) throw new Error('Failed to create blog');
  return res.json();
};

export const updateBlog = async (id: string, blog: Partial<Blog>): Promise<Blog> => {
  const res = await fetch(`/api/blogs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog),
  });
  if (!res.ok) throw new Error('Failed to update blog');
  return res.json();
};

export const deleteBlog = async (id: string): Promise<{ message: string }> => {
  const res = await fetch(`/api/blogs/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete blog');
  return res.json();
};