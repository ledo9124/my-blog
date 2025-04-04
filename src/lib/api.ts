import { User } from "@/models/user";
import { Blog, FillterType } from "@/types";

// Helper function for HTTP requests
const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Request failed: ${errorText}`);
  }
  
  return response.json();
};

export const fetchBlogs = async (filters?: FillterType): Promise<Blog[]> => {
  // Build query parameters
  const params = new URLSearchParams();
  
  if (filters) {
    if (filters.title) {
      params.append('title', filters.title);
    }
    if (filters.sort) {
      params.append('sort', filters.sort);
    }
  }
  
  const queryString = params.toString();
  const url = queryString ? `/api/blogs?${queryString}` : '/api/blogs';
  
  return request<Blog[]>(url);
};

export const fetchUsers = async (): Promise<User[]> => {
  return request<User[]>('/api/users');
};

export const fetchBlog = async (id: string): Promise<Blog> => {
  return request<Blog>(`/api/blogs/${id}`);
};

export const createBlog = async (formData: FormData): Promise<Blog> => {
  return request<Blog>('/api/blogs', {
    method: 'POST',
    body: formData,
    // Note: Do not set Content-Type header when sending FormData
    // The browser will automatically set the correct boundary
  });
};

export const updateBlog = async (id: string, formData: FormData): Promise<Blog> => {
  return request<Blog>(`/api/blogs/${id}`, {
    method: 'PUT',
    body: formData,
    // Content-Type header is automatically set when using FormData
  });
};

export const deleteBlog = async (id: string): Promise<{ message: string }> => {
  return request<{ message: string }>(`/api/blogs/${id}`, {
    method: 'DELETE',
  });
};