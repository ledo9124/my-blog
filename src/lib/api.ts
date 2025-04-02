import { Blog, FillterType } from "@/types";

// Hàm helper để tạo ra các request HTTP
const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Request failed: ${errorText}`);
  }
  
  return response.json();
};

// Giữ nguyên chức năng gốc, chỉ cải thiện cách triển khai
export const fetchBlogs = async (): Promise<Blog[]> => {
  return request<Blog[]>('/api/blogs');
};

export const fetchBlog = async (id: string): Promise<Blog> => {
  return request<Blog>(`/api/blogs/${id}`);
};

export const createBlog = async (blog: Omit<Blog, '_id' | 'createdAt'>): Promise<Blog> => {
  return request<Blog>('/api/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog),
  });
};

export const updateBlog = async (id: string, blog: Partial<Blog>): Promise<Blog> => {
  return request<Blog>(`/api/blogs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog),
  });
};

export const deleteBlog = async (id: string): Promise<{ message: string }> => {
  return request<{ message: string }>(`/api/blogs/${id}`, {
    method: 'DELETE',
  });
};

// Thêm hàm mới cho tính năng lọc
export const filterBlogs = async (filter: FillterType): Promise<Blog[]> => {
  return request<Blog[]>('/api/blogs/filter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filter),
  });
};