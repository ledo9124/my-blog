import { Blog } from "@/types";

// Helper function for HTTP requests
const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Request failed: ${errorText}`);
  }
  
  return response.json();
};

export const fetchBlogs = async (): Promise<Blog[]> => {
  return request<Blog[]>('/api/blogs');
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

// Updated filter function to use FormData
export const filterBlogs = async (filterData: FormData): Promise<Blog[]> => {
  return request<Blog[]>('/api/blogs/filter', {
    method: 'POST',
    body: filterData,
  });
};